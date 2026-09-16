// Run with Node 22.15+. Uses the installed TypeScript compiler; no real keys or API calls.
import { registerHooks } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createHmac } from 'node:crypto';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';

registerHooks({
  resolve(specifier, context, next) {
    if (specifier === 'server-only') return { url: 'data:text/javascript,export {}', shortCircuit: true };
    if (specifier.startsWith('.') && context.parentURL?.endsWith('.ts')) {
      const candidate = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(candidate)) return { url: candidate.href, shortCircuit: true };
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (url.endsWith('.ts')) return {
      format: 'module', shortCircuit: true,
      source: ts.transpileModule(readFileSync(fileURLToPath(url), 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
      }).outputText,
    };
    return next(url, context);
  },
});

const { priceForCountry } = await import('../lib/pricing.ts');
const { requestPrice } = await import('../lib/pricing-server.ts');
const { paymentHandlers, validPaymentSignature } = await import('../lib/razorpay.ts');
const { checkoutStatus } = await import('../lib/checkout-config.ts');

await test('checkout reports unavailable without server credentials', () => {
  assert.deepEqual(checkoutStatus({}), { available: false, test_mode: false });
  assert.equal(checkoutStatus({ RAZORPAY_KEY_ID: 'rzp_live_unit' }).available, false);
});
await test('test checkout works locally but cannot be enabled in Vercel production', () => {
  const env = { RAZORPAY_KEY_ID: 'rzp_test_unit', RAZORPAY_KEY_SECRET: 'private-test-value' };
  assert.deepEqual(checkoutStatus(env), { available: true, test_mode: true });
  assert.equal(checkoutStatus({ ...env, VERCEL_ENV: 'production' }).available, false);
});
await test('live checkout requires private production storage and never exposes keys', () => {
  const env = { VERCEL: '1', VERCEL_ENV: 'production', RAZORPAY_KEY_ID: 'rzp_live_unit', RAZORPAY_KEY_SECRET: 'private-test-value' };
  assert.equal(checkoutStatus(env).available, false);
  assert.deepEqual(checkoutStatus({ ...env, BLOB_READ_WRITE_TOKEN: 'private-storage' }), { available: true, test_mode: false });
});
await test('explicit public test opt-in permits test keys while retaining test flag and storage requirement', () => {
  const env = { VERCEL: '1', VERCEL_ENV: 'production', RAZORPAY_KEY_ID: 'rzp_test_unit', RAZORPAY_KEY_SECRET: 'private-test-value', RAZORPAY_ALLOW_TEST_MODE: 'true' };
  assert.equal(checkoutStatus(env).available, false);
  assert.deepEqual(checkoutStatus({ ...env, BLOB_READ_WRITE_TOKEN: 'private-storage' }), { available: true, test_mode: true });
  assert.equal(checkoutStatus({ ...env, RAZORPAY_ALLOW_TEST_MODE: 'false', BLOB_READ_WRITE_TOKEN: 'private-storage' }).available, false);
});
const secret = 'unit-test-secret';
const orderId = 'order_unit123';
const paymentId = 'pay_unit123';
const signature = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex');
const validOrder = { amount: 999900, currency: 'INR', email: 'checkout-test@example.com' };
const validPayment = { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature };
const request = (body, origin = 'https://example.com') => new Request('https://example.com/api/checkout', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body),
});
function setup(overrides = {}) {
  const orders = new Map();
  const payments = new Map();
  let calls = 0;
  const handlers = paymentHandlers({
    price: () => priceForCountry('IN'),
    config: () => ({ keyId: 'rzp_test_unit', secret }),
    allow: async () => true,
    create: async (_config, value) => { calls++; return { ...value, id: orderId }; },
    saveOrder: async (value) => { orders.set(value.id, value); },
    readOrder: async (id) => orders.get(id) ?? null,
    savePayment: async (value) => {
      const old = payments.get(value.orderId);
      if (old) return old.paymentId === value.paymentId;
      payments.set(value.orderId, value);
      return true;
    },
    ...overrides,
  });
  return { ...handlers, orders, payments, calls: () => calls };
}

await test('creates an order, returns only public key, and persists original price and email', async () => {
  const app = setup();
  const response = await app.createOrder(request(validOrder));
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.order_id, orderId);
  assert.equal(data.amount, 999900);
  assert.equal(data.test_mode, true);
  assert.equal(JSON.stringify(data).includes(secret), false);
  assert.equal(app.orders.get(orderId).email, validOrder.email);
  assert.match(app.orders.get(orderId).receipt, /^bp_[a-f0-9]{32}$/);
});
for (const [name, payload] of Object.entries({
  missing: {}, minimum: { ...validOrder, amount: 99 }, negative: { ...validOrder, amount: -1 },
  fraction: { ...validOrder, amount: 100.5 }, string: { ...validOrder, amount: '999900' },
  underpayment: { ...validOrder, amount: 100 }, overpayment: { ...validOrder, amount: 999999 },
  currency: { ...validOrder, currency: 'USD' }, email: { ...validOrder, email: 'invalid' },
  receipt: { ...validOrder, receipt: 'x'.repeat(41) },
})) await test(`rejects ${name} without contacting Razorpay`, async () => {
  const app = setup();
  assert.equal((await app.createOrder(request(payload))).status, 400);
  assert.equal(app.calls(), 0);
});
await test('rejects cross-origin requests', async () => {
  const app = setup();
  assert.equal((await app.createOrder(request(validOrder, 'https://attacker.example'))).status, 403);
  assert.equal((await app.verifyPayment(request(validPayment, 'https://attacker.example'))).status, 403);
});
await test('enforces rate limit before creating an order', async () => {
  const app = setup({ allow: async () => false });
  assert.equal((await app.createOrder(request(validOrder))).status, 429);
  assert.equal(app.calls(), 0);
});
for (const statusCode of [401, 500]) await test(`handles provider ${statusCode} without leaking secrets`, async () => {
  const app = setup({ create: async () => { throw { statusCode, secret }; } });
  const response = await app.createOrder(request(validOrder));
  assert.equal(response.status, statusCode);
  assert.equal((await response.text()).includes(secret), false);
});
await test('fails closed when configuration or order storage is unavailable', async () => {
  for (const override of [
    { config: () => { throw new Error('missing'); } },
    { saveOrder: async () => { throw new Error('disk unavailable'); } },
  ]) assert.equal((await setup(override).createOrder(request(validOrder))).status, 500);
});
await test('verifies the HMAC against the original stored order, with idempotent retries', async () => {
  const app = setup();
  await app.createOrder(request(validOrder));
  for (let i = 0; i < 2; i++) {
    const response = await app.verifyPayment(request(validPayment));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, 'signature_verified');
  }
  assert.equal(app.payments.size, 1);
  assert.equal(app.payments.get(orderId).status, 'signature_verified');
});
await test('bad or missing signature, unknown order, and altered payment ID never persist payment', async () => {
  const app = setup();
  await app.createOrder(request(validOrder));
  for (const payload of [{}, { ...validPayment, razorpay_signature: 'short' },
    { ...validPayment, razorpay_signature: '0'.repeat(64) },
    { ...validPayment, razorpay_order_id: 'order_unknown' },
    { ...validPayment, razorpay_payment_id: 'pay_altered' }]) {
    assert.equal((await app.verifyPayment(request(payload))).status, 400);
  }
  assert.equal(app.payments.size, 0);
});
await test('never returns success if verified payment cannot be saved', async () => {
  const app = setup({ savePayment: async () => { throw new Error('unavailable'); } });
  await app.createOrder(request(validOrder));
  assert.equal((await app.verifyPayment(request(validPayment))).status, 500);
});
await test('rejects a second different payment for the same order', async () => {
  const app = setup();
  await app.createOrder(request(validOrder));
  await app.verifyPayment(request(validPayment));
  const second = 'pay_second';
  const sig = createHmac('sha256', secret).update(`${orderId}|${second}`).digest('hex');
  assert.equal((await app.verifyPayment(request({ ...validPayment,
    razorpay_payment_id: second, razorpay_signature: sig }))).status, 409);
});
await test('signature comparison rejects malformed hex and accepts exact HMAC only', () => {
  assert.equal(validPaymentSignature(orderId, paymentId, signature, secret), true);
  assert.equal(validPaymentSignature(orderId, paymentId, 'x'.repeat(64), secret), false);
  assert.equal(validPaymentSignature(orderId, paymentId, signature, 'wrong'), false);
});

await test('regional catalog: India INR 9999; every other or unknown country USD 100', () => {
  assert.deepEqual([priceForCountry('IN').amount, priceForCountry('IN').currency], [999900, 'INR']);
  for (const country of ['US', 'GB', 'AE', null, 'XX']) {
    const price = priceForCountry(country);
    assert.deepEqual([price.amount, price.currency, price.label], [10000, 'USD', 'US$100']);
  }
});
await test('trusts country headers only on Vercel and ignores local overrides in production', () => {
  const headers = new Headers({ 'x-vercel-ip-country': 'US' });
  assert.equal(requestPrice(headers, {}).currency, 'INR');
  assert.equal(requestPrice(headers, { VERCEL: '1', FOURUPLE_PREVIEW_COUNTRY: 'IN' }).currency, 'USD');
  assert.equal(requestPrice(new Headers({ 'x-vercel-ip-country': 'IN' }), { VERCEL: '1' }).currency, 'INR');
  assert.equal(requestPrice(new Headers(), { VERCEL: '1' }).currency, 'USD');
  assert.equal(requestPrice(new Headers(), { FOURUPLE_PREVIEW_COUNTRY: 'US' }).currency, 'USD');
});
await test('international order uses USD cents and persists its currency', async () => {
  const app = setup({ price: () => priceForCountry('US') });
  const response = await app.createOrder(request({ ...validOrder, amount: 10000, currency: 'USD' }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).currency, 'USD');
  assert.equal(app.orders.get(orderId).amount, 10000);
  assert.equal(app.orders.get(orderId).currency, 'USD');
  assert.equal((await app.verifyPayment(request(validPayment))).status, 200);
  assert.equal(app.payments.get(orderId).currency, 'USD');
});
await test('regional price tampering and stale INR price are rejected', async () => {
  assert.equal((await setup().createOrder(request({ ...validOrder, amount: 249900 }))).status, 400);
  assert.equal((await setup().createOrder(request({ ...validOrder, amount: 10000, currency: 'USD' }))).status, 400);
  const overseas = setup({ price: () => priceForCountry('US') });
  assert.equal((await overseas.createOrder(request(validOrder))).status, 400);
});
