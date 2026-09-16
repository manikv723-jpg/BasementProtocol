import { takeSubmissionSlot, saveWaitlist, saveEnquiry } from './lead-store';

type Kind = 'waitlist' | 'enquiries';
const products = new Set(['marketing', 'corporate', 'dipstick', '4ruple']);
const productNames: Record<string, string> = {
  '4ruple': '4ruple.ai',
  dipstick: 'Dipstick',
  corporate: 'Corporate',
  marketing: 'Marketing',
};
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function reply(
  body: unknown,
  status = 200,
  extra: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extra },
  });
}
export function textValue(value: unknown, max: number, min = 1): string | null {
  if (typeof value !== 'string') return null;
  const result = value.trim();
  return result.length >= min && result.length <= max ? result : null;
}
// Vercel overwrites this header at its trusted edge. Locally all requests share a bucket.
export function clientAddress(request: Request) {
  return process.env.VERCEL
    ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    : 'local-preview';
}
type GuardMessages = {
  blocked: string;
  wrongType: string;
  tooLong: string;
  unreadable: string;
};
const formMessages: GuardMessages = {
  blocked: 'Please submit this form from the Basement Protocol website.',
  wrongType: 'Please send a valid form submission.',
  tooLong: 'Your submission is too long. Please shorten it.',
  unreadable: 'We couldn’t read the form. Please try again.',
};
// Same-origin, JSON-only, size-capped POST body. Shared by the lead forms and the 4ruple routes.
// Errors go out as { error } plus any `extra` fields, so each route keeps its own response shape.
export async function readSameSiteJson(
  request: Request,
  {
    maxBytes = 12000,
    messages = formMessages,
    extra = {},
  }: { maxBytes?: number; messages?: GuardMessages; extra?: Record<string, unknown> } = {},
): Promise<{ input: Record<string, unknown> } | { response: Response }> {
  const fail = (error: string, status: number) => ({
    response: reply({ ...extra, error }, status),
  });
  const origin = request.headers.get('Origin');
  const ownOrigin = new URL(request.url).origin;
  if (origin && origin !== ownOrigin) return fail(messages.blocked, 403);
  if (request.headers.get('Sec-Fetch-Site') === 'cross-site')
    return fail(messages.blocked, 403);
  if (
    !request.headers
      .get('Content-Type')
      ?.toLowerCase()
      .includes('application/json')
  )
    return fail(messages.wrongType, 415);
  if (Number(request.headers.get('Content-Length') || 0) > maxBytes)
    return fail(messages.tooLong, 413);
  try {
    const raw = await request.text();
    if (raw.length > maxBytes) return fail(messages.tooLong, 413);
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value))
      throw new Error();
    return { input: value as Record<string, unknown> };
  } catch {
    return fail(messages.unreadable, 400);
  }
}
export async function submitLead(
  request: Request,
  kind: Kind,
): Promise<Response> {
  const guard = await readSameSiteJson(request);
  if ('response' in guard) return guard.response;
  const { input } = guard;
  if (input.website)
    return reply({ error: 'This submission could not be accepted.' }, 400);
  const now = Date.now();
  if (
    typeof input.startedAt !== 'number' ||
    now - input.startedAt < 1500 ||
    now - input.startedAt > 86400000
  )
    return reply(
      { error: 'Please take a moment to complete the form, then try again.' },
      400,
    );
  const email = textValue(input.email, 254)?.toLowerCase();
  if (!email || !emailPattern.test(email))
    return reply({ error: 'Please enter a valid email address.' }, 400);
  const product = typeof input.product === 'string' ? input.product : '';
  if (kind === 'waitlist' && !products.has(product))
    return reply(
      { error: 'Choose 4ruple.ai, Marketing, Corporate or Dipstick.' },
      400,
    );
  const id = textValue(input.requestId, 36);
  if (!id || !/^\w{8}-\w{4}-4\w{3}-[89ab]\w{3}-\w{12}$/i.test(id))
    return reply(
      { error: 'Please close and reopen the form, then try again.' },
      400,
    );
  const name = textValue(input.name, 100, 2),
    company = textValue(input.company, 150, 2),
    description = textValue(input.description, 3000, 20);
  if (kind === 'enquiries' && (!name || !company || !description))
    return reply(
      {
        error:
          'Please include your name, company and at least 20 characters about your project.',
      },
      400,
    );
  try {
    const allowed = await takeSubmissionSlot(clientAddress(request), now);
    if (!allowed)
      return reply(
        { error: 'Too many submissions. Please try again in 10 minutes.' },
        429,
        { 'Retry-After': '600' },
      );
    if (kind === 'waitlist') {
      const saved = await saveWaitlist({ id, email, product, createdAt: now });
      if (!saved)
        return reply(
          {
            error:
              'This form was already used for another submission. Please close and reopen it.',
          },
          409,
        );
      // Identical response protects whether an address was already registered.
      return reply({
        ok: true,
        message:
          product === '4ruple'
            ? 'Your interest in 4ruple.ai is saved. We’ll email you as soon as checkout opens.'
            : `Your interest in ${productNames[product]} is saved. We’ll get in touch when it’s ready.`,
      });
    }
    const saved = await saveEnquiry({
      id, email, name: name!, company: company!, description: description!, createdAt: now,
    });
    if (!saved)
      return reply(
        {
          error:
            'This form was already submitted with different details. Please close and reopen it.',
        },
        409,
      );
    return reply({
      ok: true,
      message:
        'Your enquiry has been saved privately. The Basement Protocol team will review your project and contact you using the email you provided.',
    });
  } catch {
    // Never log submission content or return infrastructure details.
    console.error('Lead submission could not be persisted.');
    return reply(
      {
        error:
          'We couldn’t save your details right now. Please try again shortly.',
      },
      503,
    );
  }
}
