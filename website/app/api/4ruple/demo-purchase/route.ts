// Demo checkout only: stands in for "payment succeeded, webhook issued a key".
// Exists outside production and only when FOURUPLE_DEMO_ISSUE_URL is set. No money moves.
import {
  emailPattern,
  readSameSiteJson,
  reply,
  textValue,
} from '@/lib/submissions';

const KEY_PATTERN = /^4R(-[0-9A-Z]{5}){4}$/;

export async function POST(request: Request) {
  const issueUrl = process.env.FOURUPLE_DEMO_ISSUE_URL;
  if (process.env.NODE_ENV === 'production' || !issueUrl)
    return new Response('Not found', { status: 404 });

  const guard = await readSameSiteJson(request, { maxBytes: 1000 });
  if ('response' in guard) return guard.response;
  const email = textValue(guard.input.email, 254)?.toLowerCase();
  if (!email || !emailPattern.test(email))
    return reply({ error: 'Please enter a valid email address.' }, 400);

  try {
    const upstream = await fetch(issueUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    const data = (await upstream.json()) as { ok?: unknown; key?: unknown };
    if (data.ok !== true || typeof data.key !== 'string' || !KEY_PATTERN.test(data.key))
      throw new Error();
    return reply({ ok: true, key: data.key });
  } catch {
    return reply(
      {
        error:
          'The demo checkout couldn’t create a key. Check that the local license service is running.',
      },
      502,
    );
  }
}
