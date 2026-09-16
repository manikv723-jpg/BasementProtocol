import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { readCheckoutOrder } from './lead-store';

// Razorpay says a payment was captured; this turns that into a licence key in the buyer's inbox.
// Signature verification in /api/verify-payment is not delivery: only this path issues a key.
//
// Why the buyer's email comes from our own order record: Razorpay frequently reports
// void@razorpay.com, while create-order stored the address the buyer actually typed.
//
// Razorpay dashboard (Account & Settings, Webhooks): URL /api/4ruple/razorpay-webhook, with the events
// payment.captured, order.paid and refund.processed, and the secret in RAZORPAY_WEBHOOK_SECRET.
// Delivery needs FOURUPLE_ISSUE_URL (the licence service) and FOURUPLE_ADMIN_TOKEN.

const json = (status: number, body: unknown) => Response.json(body, { status });

// Everything in a webhook body is untrusted and untyped, so values are read as text deliberately.
const text = (value: unknown) =>
  typeof value === 'string' ? value : typeof value === 'number' ? String(value) : '';

export function validWebhookSignature(raw: string, signature: string | null, secret: string) {
  if (!signature || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = createHmac('sha256', secret).update(raw).digest();
  return timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}

// The floor is in paise, so it only applies to rupees: US$100 arrives as 10000 cents.
export function bigEnough(currency: unknown, amount: unknown, floor: number) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) return false;
  return (text(currency) || 'INR').toUpperCase() === 'INR' ? value >= floor : true;
}

type Issued = { ok: boolean; emailed?: boolean; error?: string };

async function callLicenceService(url: string, token: string, body: Record<string, unknown>): Promise<Issued> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });
    const answer = (await response.json().catch(() => ({}))) as Issued;
    return { ok: response.ok && answer.ok !== false, emailed: answer.emailed, error: answer.error };
  } catch (error) {
    return { ok: false, emailed: false, error: String(error) };
  }
}

const dependencies = {
  settings: () => ({
    secret: process.env.RAZORPAY_WEBHOOK_SECRET?.trim() ?? '',
    issueUrl: process.env.FOURUPLE_ISSUE_URL?.trim() ?? '',
    adminToken: process.env.FOURUPLE_ADMIN_TOKEN?.trim() ?? '',
    floor: Number(process.env.LICENSE_MIN_PAISE || 200000),
  }),
  readOrder: readCheckoutOrder,
  issue: callLicenceService,
};

// Injectable boundary, so the delivery rules can be tested without keys, storage or network.
export function licenceDelivery(deps = dependencies) {
  return {
    async handle(request: Request) {
      const { secret, issueUrl, adminToken, floor } = deps.settings();
      const raw = await request.text();

      if (!secret || !validWebhookSignature(raw, request.headers.get('x-razorpay-signature'), secret))
        return json(401, { ok: false, error: 'Bad signature' });
      // A 500 keeps Razorpay retrying, so a paid sale is never silently lost while setup is unfinished.
      if (!issueUrl || !adminToken) return json(500, { ok: false, error: 'License service not configured' });

      let event: Record<string, unknown>;
      try {
        event = JSON.parse(raw);
      } catch {
        return json(400, { ok: false, error: 'Send JSON' });
      }

      const name = text((event as { event?: unknown }).event);
      const payload = (event as { payload?: Record<string, { entity?: Record<string, unknown> }> }).payload ?? {};

      // A refunded sale switches off every key that payment issued.
      if (name === 'refund.processed') {
        const refunded = text(payload.refund?.entity?.payment_id);
        if (!refunded) return json(200, { ok: true, ignored: 'no payment id' });
        const answer = await deps.issue(issueUrl, adminToken, { action: 'revoke', orderRef: `razorpay:${refunded}` });
        return json(answer.ok ? 200 : 500, { ok: answer.ok, refunded: answer.ok });
      }

      // Standard Checkout fires both; whichever arrives first issues, and the other is a safe repeat.
      if (name !== 'payment.captured' && name !== 'order.paid') return json(200, { ok: true, ignored: name });
      const payment = payload.payment?.entity;
      if (!payment) return json(200, { ok: true, ignored: 'no payment' });
      if (!bigEnough(payment.currency, payment.amount, floor)) return json(200, { ok: true, ignored: 'amount' });

      const orderId = text(payment.order_id);
      const order = orderId ? await deps.readOrder(orderId) : null;
      const notes = (payment.notes ?? {}) as Record<string, unknown>;
      const claimed = text(payment.email);
      const email = (text(order?.email) || (claimed === 'void@razorpay.com' ? '' : claimed) || text(notes.email))
        .trim()
        .toLowerCase();
      const paymentId = text(payment.id);
      if (!email) return json(200, { ok: true, ignored: 'no email' });

      const seats = Math.max(1, Number(notes.seats ?? order?.seats ?? 1) || 1);
      const answer = await deps.issue(issueUrl, adminToken, {
        email,
        orderRef: `razorpay:${paymentId}`,
        provider: 'razorpay',
        amountPaise: text(payment.currency).toUpperCase() === 'INR' ? Number(payment.amount) : null,
        quantity: seats,
        plan: seats > 1 ? `team${seats}` : 'lifetime',
      });

      // Retry until the key is issued and emailed. Issuing is safe to repeat for one payment.
      if (!answer.ok) return json(500, { ok: false });
      return json(answer.emailed === false ? 500 : 200, { ok: true, emailed: answer.emailed !== false });
    },
  };
}
