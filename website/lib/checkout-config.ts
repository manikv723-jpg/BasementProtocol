import 'server-only';

export function checkoutStatus(env: NodeJS.ProcessEnv = process.env) {
  const keyId = env.RAZORPAY_KEY_ID?.trim() ?? '';
  const secret = env.RAZORPAY_KEY_SECRET?.trim() ?? '';
  const test = keyId.startsWith('rzp_test_');
  const validKey = test || keyId.startsWith('rzp_live_');
  const production = env.VERCEL_ENV === 'production';
  // Explicit opt-in for the owner's publicly labelled gateway testing session.
  const allowPublicTest = env.RAZORPAY_ALLOW_TEST_MODE === 'true';
  const storageReady = !env.VERCEL || Boolean(env.BLOB_READ_WRITE_TOKEN);
  return {
    available: Boolean(validKey && secret && storageReady && !(production && test && !allowPublicTest)),
    test_mode: test,
  };
}
