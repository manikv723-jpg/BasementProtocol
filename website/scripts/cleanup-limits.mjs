import { list, del } from '@vercel/blob';

if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Provide the private store token in the environment.');
const apply = process.argv.includes('--apply');
const currentBucket = Math.floor(Date.now() / 600000);
let cursor;
let count = 0;
do {
  const page = await list({ prefix: 'limits/', limit: 1000, cursor });
  const expired = page.blobs.filter(blob => {
    const match = /^limits\/(\d+)\/[a-f0-9]{64}\/[0-7]\.json$/.exec(blob.pathname);
    return match && Number(match[1]) < currentBucket - 1;
  });
  if (apply && expired.length) await del(expired.map(blob => blob.url));
  count += expired.length;
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);
console.log(`${apply ? 'Removed' : 'Would remove'} ${count} expired rate-limit slots. Submission records are unaffected.`);
