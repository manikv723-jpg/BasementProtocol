import 'server-only';
import Razorpay from 'razorpay';
import { checkoutStatus } from './checkout-config';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { requestPrice } from './pricing-server';
import { clientAddress, emailPattern, readSameSiteJson, reply, textValue } from './submissions';
import { readCheckoutOrder, saveCheckoutOrder, saveVerifiedPayment, takeSubmissionSlot } from './lead-store';

function config() {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!keyId || !secret || !checkoutStatus().available) throw new Error('Checkout is not configured');
  return { keyId, secret };
}

const dependencies = {
  price: (request: Request) => requestPrice(request.headers),
  config,
  create: async (settings: ReturnType<typeof config>, order: {
    amount: number; currency: string; receipt: string;
  }) => new Razorpay({ key_id: settings.keyId, key_secret: settings.secret }).orders.create(order),
  saveOrder: saveCheckoutOrder,
  readOrder: readCheckoutOrder,
  savePayment: saveVerifiedPayment,
  allow: (request: Request) => takeSubmissionSlot(`checkout:${clientAddress(request)}`, Date.now(), 12),
};

function providerError(error: unknown) {
  const status = error && typeof error === 'object' && 'statusCode' in error
    ? Number(error.statusCode) : 500;
  return reply({ error: status === 401
    ? 'Payment provider authentication failed. Please contact support.'
    : 'Checkout is temporarily unavailable. Please try again shortly.' }, status === 401 ? 401 : 500);
}

// Constant-time comparison after enforcing exactly 32 bytes of hex input.
export function validPaymentSignature(orderId: string, paymentId: string, signature: string, secret: string) {
  if (!/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest();
  return timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}

// Injectable boundary lets tests exercise upstream and storage failures without charging anyone.
export function paymentHandlers(deps = dependencies) {
  return {
    async createOrder(request: Request) {
      const guard = await readSameSiteJson(request, { maxBytes: 2000 });
      if ('response' in guard) return guard.response;
      const price = deps.price(request);
      const { amount, currency = price.currency, receipt } = guard.input;
      const email = textValue(guard.input.email, 254)?.toLowerCase();
      if (!Number.isSafeInteger(amount) || Number(amount) < 100)
        return reply({ error: 'Amount must be an integer of at least 100 paise.' }, 400);
      // A buyer cannot change the license price by editing a browser request.
      if (amount !== price.amount || typeof currency !== 'string' || currency !== price.currency)
        return reply({ error: 'The amount or currency does not match your regional license price. Refresh this page before trying again.' }, 400);
      if (!email || !emailPattern.test(email))
        return reply({ error: 'Please enter a valid email address.' }, 400);
      if (receipt !== undefined && (typeof receipt !== 'string' || !/^[a-zA-Z0-9_-]{1,40}$/.test(receipt)))
        return reply({ error: 'Receipt must contain 1–40 letters, numbers, underscores or hyphens.' }, 400);
      try {
        const settings = deps.config();
        if (!(await deps.allow(request)))
          return reply({ error: 'Too many checkout attempts. Please try again in 10 minutes.' }, 429, { 'Retry-After': '600' });
        const order = await deps.create(settings, {
          amount: Number(amount), currency,
          receipt: typeof receipt === 'string' ? receipt : `bp_${randomUUID().replaceAll('-', '')}`,
        });
        if (!/^order_[a-zA-Z0-9]+$/.test(order.id) || Number(order.amount) !== amount || order.currency !== currency)
          throw new Error('Invalid provider response');
        // Save the provider's original order before returning anything to Checkout.
        await deps.saveOrder({ id: order.id, amount: Number(amount), currency, email,
          receipt: order.receipt ?? '', keyId: settings.keyId, createdAt: Date.now() });
        return reply({ order_id: order.id, amount: Number(amount), currency,
          key_id: settings.keyId, test_mode: settings.keyId.startsWith('rzp_test_') });
      } catch (error) {
        return providerError(error);
      }
    },
    async verifyPayment(request: Request) {
      const guard = await readSameSiteJson(request, { maxBytes: 2000 });
      if ('response' in guard) return guard.response;
      const { razorpay_order_id: orderId, razorpay_payment_id: paymentId,
        razorpay_signature: signature } = guard.input;
      if (typeof orderId !== 'string' || !/^order_[a-zA-Z0-9]{1,64}$/.test(orderId) ||
          typeof paymentId !== 'string' || !/^pay_[a-zA-Z0-9]{1,64}$/.test(paymentId) ||
          typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature))
        return reply({ error: 'Missing or invalid payment verification fields.' }, 400);
      try {
        const settings = deps.config();
        const order = await deps.readOrder(orderId);
        if (!order || order.keyId !== settings.keyId ||
            !validPaymentSignature(String(order.id), paymentId, signature, settings.secret))
          return reply({ error: 'Payment signature verification failed.' }, 400);
        const saved = await deps.savePayment({ orderId: String(order.id), paymentId,
          amount: order.amount, currency: order.currency, verifiedAt: Date.now(),
          status: 'signature_verified' });
        if (!saved) return reply({ error: 'This order already has a different verified payment.' }, 409);
        // Authentication is not capture or license delivery. Do not mark the order paid here.
        return reply({ success: true, status: 'signature_verified', payment_id: paymentId,
          test_mode: settings.keyId.startsWith('rzp_test_') });
      } catch (error) {
        return providerError(error);
      }
    },
  };
}
