import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
const origin = process.env.TEST_ORIGIN || 'http://localhost:3000';
const base = () => ({
  email: 'bp-api-test@example.com',
  product: 'marketing',
  requestId: randomUUID(),
  startedAt: Date.now() - 6000,
  website: '',
});
const send = async (path, data, headers = {}) => {
  const r = await fetch(origin + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin, ...headers },
    body: JSON.stringify(data),
  });
  const raw = await r.text();
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    body = raw;
  }
  return { status: r.status, body };
};
const check = async (name, path, data, expected, headers = {}) => {
  const r = await send(path, data, headers);
  assert.equal(r.status, expected, `${name}: ${JSON.stringify(r)}`);
  console.log(`PASS ${name} (${r.status})`);
  return r;
};
await check(
  'invalid email',
  '/api/waitlist',
  { ...base(), email: 'invalid' },
  400,
);
await check(
  'unknown product',
  '/api/waitlist',
  { ...base(), product: 'unknown' },
  400,
);
await check(
  'honeypot rejection',
  '/api/waitlist',
  { ...base(), website: 'spam' },
  400,
);
await check(
  'too-fast submission',
  '/api/waitlist',
  { ...base(), startedAt: Date.now() + 1000 },
  400,
);
await check('cross-origin request', '/api/waitlist', base(), 403, {
  Origin: 'https://example.net',
});
await check('missing project details', '/api/enquiries', base(), 400);
await check(
  'oversized payload',
  '/api/enquiries',
  { ...base(), description: 'a'.repeat(13000) },
  413,
);
const wait = base();
await check('valid waitlist', '/api/waitlist', wait, 200);
await check(
  'duplicate email and product',
  '/api/waitlist',
  { ...wait, requestId: randomUUID() },
  200,
);
await check(
  'new product same email',
  '/api/waitlist',
  { ...base(), product: 'corporate' },
  200,
);
const enquiry = {
  ...base(),
  name: 'API Verification',
  company: 'Basement Protocol Test',
  description: 'Local automated verification of project enquiry persistence.',
};
await check('valid enquiry', '/api/enquiries', enquiry, 200);
await check('idempotent enquiry retry', '/api/enquiries', enquiry, 200);
for (let i = 0; i < 3; i++)
  await check(`rate limit allowed ${i + 1}`, '/api/waitlist', base(), 200);
await check('rate limit enforced', '/api/waitlist', base(), 429);
for (const path of ['/api/waitlist', '/api/enquiries']) {
  const r = await fetch(origin + path);
  assert.equal(r.status, 405);
  console.log(`PASS no public listing ${path} (${r.status})`);
}
console.log(
  'All API scenarios passed. Local QA rows are labelled bp-api-test@example.com.',
);
