import { createHash, randomUUID } from 'node:crypto';
import { mkdir, writeFile, readFile, link, unlink } from 'node:fs/promises';
import path from 'node:path';
import { get, put } from '@vercel/blob';

type RecordValue = Record<string, string | number>;
const localRoot = path.join(process.cwd(), 'data');
const hasBlobStorage = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
function requireStorage() {
  if (process.env.VERCEL && !hasBlobStorage()) throw new Error('Private storage unavailable');
}
export const digest = (value: string) => createHash('sha256').update(value).digest('hex');

async function readRecord(key: string): Promise<RecordValue | null> {
  requireStorage();
  if (hasBlobStorage()) {
    const result = await get(key, { access: 'private', useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200) throw new Error('Storage read failed');
    return JSON.parse(await new Response(result.stream).text());
  }
  try {
    return JSON.parse(await readFile(/* turbopackIgnore: true */ path.join(/* turbopackIgnore: true */ localRoot, key), 'utf8'));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

// Immutable keys make duplicate handling safe across concurrent server instances.
async function createRecord(key: string, value: RecordValue): Promise<boolean> {
  requireStorage();
  const content = JSON.stringify(value);
  if (hasBlobStorage()) {
    try {
      await put(key, content, {
        access: 'private', contentType: 'application/json',
        addRandomSuffix: false, allowOverwrite: false,
      });
      return true;
    } catch (error) {
      // Confirm a duplicate from durable storage, including an ambiguous upload result.
      if (await readRecord(key)) return false;
      throw error;
    }
  }
  const destination = path.join(/* turbopackIgnore: true */ localRoot, key);
  await mkdir(path.dirname(destination), { recursive: true, mode: 0o700 });
  const temporary = `${destination}.${randomUUID()}.tmp`;
  await writeFile(temporary, content, { mode: 0o600, flag: 'wx' });
  try {
    // Linking a complete temporary file atomically prevents partial duplicate reads.
    await link(temporary, destination);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') return false;
    throw error;
  } finally {
    await unlink(temporary);
  }
}

// Checkout records use the same private storage as submissions, never public assets.
export async function saveCheckoutOrder(value: RecordValue) {
  if (!(await createRecord(`checkout/orders/${digest(String(value.id))}.json`, value)))
    throw new Error('Order already exists');
}

export async function readCheckoutOrder(id: string) {
  return readRecord(`checkout/orders/${digest(id)}.json`);
}

export async function saveVerifiedPayment(value: RecordValue) {
  const key = `checkout/verified/${digest(String(value.orderId))}.json`;
  if (await createRecord(key, value)) return true;
  const existing = await readRecord(key);
  return existing?.paymentId === value.paymentId;
}

// `limit` requests per address in each 10-minute bucket. Pass a prefixed address for a separate budget.
export async function takeSubmissionSlot(address: string, now: number, limit = 8) {
  const bucket = Math.floor(now / 600000);
  const prefix = `limits/${bucket}/${digest(`${address}:${bucket}`)}`;
  if (await readRecord(`${prefix}/${limit - 1}.json`)) return false;
  for (let slot = 0; slot < limit; slot++) {
    if (await createRecord(`${prefix}/${slot}.json`, { expiresAt: (bucket + 1) * 600000 })) return true;
  }
  return false;
}

export async function saveWaitlist(value: RecordValue) {
  const key = `waitlist/${digest(`${value.email}:${value.product}`)}.json`;
  const receipt = `requests/${value.id}.json`;
  const claim = { kind: 'waitlist', email: value.email, product: value.product };
  if (!(await createRecord(receipt, claim))) {
    const existing = await readRecord(receipt);
    if (!existing || Object.keys(claim).some(k => existing[k] !== claim[k as keyof typeof claim])) return false;
  }
  if (await createRecord(key, value)) return true;
  const existing = await readRecord(key);
  return existing?.email === value.email && existing?.product === value.product;
}

export async function saveEnquiry(value: RecordValue) {
  const key = `enquiries/${value.id}.json`;
  const receipt = `requests/${value.id}.json`;
  const claim = { kind: 'enquiries', email: value.email };
  if (!(await createRecord(receipt, claim))) {
    const existing = await readRecord(receipt);
    if (!existing || existing.kind !== claim.kind || existing.email !== claim.email) return false;
  }
  if (await createRecord(key, value)) return true;
  const existing = await readRecord(key);
  return !!existing && ['email', 'name', 'company', 'description'].every(k => existing[k] === value[k]);
}
