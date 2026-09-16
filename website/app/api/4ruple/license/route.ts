// Manage-page proxy to the 4ruple license service. Forwards only "devices" and
// "deactivate", so the browser never sees the service URL or reaches its other actions.
import { takeSubmissionSlot } from '@/lib/lead-store';
import {
  clientAddress,
  readSameSiteJson,
  reply,
  textValue,
} from '@/lib/submissions';

const UNAVAILABLE =
  'The license service isn’t available right now. Please try again in a few minutes.';
const allowedFields: Record<string, string[]> = {
  devices: ['action', 'key'],
  deactivate: ['action', 'key', 'deviceId'],
};

const fail = (code: string, error: string, status: number, extra = {}) =>
  reply({ ok: false, code, error }, status, extra);

function deviceList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((d): d is Record<string, unknown> => !!d && typeof d === 'object')
    .map((d) => ({
      id:
        typeof d.id === 'string'
          ? d.id.slice(0, 100)
          : typeof d.id === 'number'
            ? String(d.id)
            : '',
      name: typeof d.name === 'string' && d.name ? d.name.slice(0, 80) : 'Unnamed device',
      platform: typeof d.platform === 'string' ? d.platform.slice(0, 40) : '',
      lastSeen: typeof d.lastSeen === 'string' ? d.lastSeen : null,
    }))
    .filter((d) => d.id);
}

export async function POST(request: Request) {
  const guard = await readSameSiteJson(request, {
    maxBytes: 2000,
    extra: { ok: false, code: 'BAD_REQUEST' },
    messages: {
      blocked: 'Please manage your license from the Basement Protocol website.',
      wrongType: 'Please send a valid request.',
      tooLong: 'That request is too long.',
      unreadable: 'We couldn’t read that request. Please try again.',
    },
  });
  if ('response' in guard) return guard.response;
  const { input } = guard;

  const action = typeof input.action === 'string' ? input.action : '';
  const fields = allowedFields[action];
  if (!fields || Object.keys(input).some((k) => !fields.includes(k)))
    return fail('BAD_REQUEST', 'Please send a valid request.', 400);
  const key = textValue(input.key, 64);
  if (!key) return fail('BAD_REQUEST', 'Paste your license key first.', 400);
  const deviceId = action === 'deactivate' ? textValue(input.deviceId, 100) : null;
  if (action === 'deactivate' && !deviceId)
    return fail('BAD_REQUEST', 'Choose a device to remove.', 400);

  const api = process.env.FOURUPLE_LICENSE_API;
  if (!api) return fail('UNAVAILABLE', UNAVAILABLE, 503);

  try {
    // A separate, roomier budget than the lead forms: people look up and free seats in one sitting.
    const allowed = await takeSubmissionSlot(
      `license:${clientAddress(request)}`,
      Date.now(),
      30,
    );
    if (!allowed)
      return fail(
        'RATE_LIMITED',
        'Too many license lookups. Please try again in 10 minutes.',
        429,
        { 'Retry-After': '600' },
      );
  } catch {
    return fail('UNAVAILABLE', UNAVAILABLE, 503);
  }

  let status: number;
  let data: Record<string, unknown>;
  try {
    const upstream = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        action === 'devices' ? { action, key } : { action, key, deviceId },
      ),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    status = upstream.status;
    const raw: unknown = await upstream.json();
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error();
    data = raw as Record<string, unknown>;
  } catch {
    // Never return infrastructure details.
    console.error('4ruple license service request failed.');
    return fail('UNAVAILABLE', UNAVAILABLE, 502);
  }

  if (data.ok !== true) {
    const code = typeof data.code === 'string' ? data.code : 'UNAVAILABLE';
    // The service writes its error messages for customers, so they pass through as given.
    const error = typeof data.error === 'string' && data.error ? data.error : UNAVAILABLE;
    return fail(code, error, status >= 400 && status < 500 ? status : 502);
  }
  return reply({
    ok: true,
    ...(action === 'devices'
      ? {
          plan: typeof data.plan === 'string' ? data.plan : '',
          hint: typeof data.hint === 'string' ? data.hint : '',
        }
      : {}),
    devices: deviceList(data.devices),
    maxDevices: typeof data.maxDevices === 'number' ? data.maxDevices : 0,
  });
}
