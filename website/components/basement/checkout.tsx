/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
'use client';
// Shared entry dialog for the local demo and Razorpay Standard Checkout.
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { BOOKING_URL, LICENSE_DEVICES, PRODUCT_NAME } from '@/lib/business';
import type { RegionalPrice } from '@/lib/pricing';
import {
  DEMO_CHECKOUT_EVENT,
  RAZORPAY_CHECKOUT_EVENT,
  CHECKOUT_PROVIDER,
  CHECKOUT_FALLBACK_MAILTO,
  loadScript,
  IS_DEMO_CHECKOUT,
  type CheckoutOptions,
} from '@/lib/checkout';
import type { RazorpayInstance, RazorpayResponse } from '@/lib/razorpay-browser';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PaymentCheckout({ testMode = false, pricing }: { testMode?: boolean; pricing: RegionalPrice }) {
  const [request, setRequest] = useState<{
    id: number;
    options: CheckoutOptions;
  } | null>(null);
  useEffect(() => {
    if (!IS_DEMO_CHECKOUT && CHECKOUT_PROVIDER !== 'razorpay') return;
    const eventName = IS_DEMO_CHECKOUT ? DEMO_CHECKOUT_EVENT : RAZORPAY_CHECKOUT_EVENT;
    const open = (event: Event) =>
      setRequest({
        id: Date.now(),
        options: (event as CustomEvent<CheckoutOptions>).detail,
      });
    window.addEventListener(eventName, open);
    return () => window.removeEventListener(eventName, open);
  }, []);
  if (!request) return null;
  return (
    <CheckoutDialog
      key={request.id}
      options={request.options}
      testMode={testMode}
      pricing={pricing}
      onClose={() => setRequest(null)}
    />
  );
}

function CheckoutDialog({
  options,
  onClose,
  testMode,
  pricing,
}: {
  options: CheckoutOptions;
  onClose: () => void;
  testMode: boolean;
  pricing: RegionalPrice;
}) {
  const [email, setEmail] = useState(options.email ?? '');
  const [state, setState] = useState<'idle' | 'processing' | 'checkout' | 'verifying' | 'success' | 'error'>('idle');
  const [verified, setVerified] = useState<{ paymentId: string; test: boolean } | null>(null);
  const [message, setMessage] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [readiness, setReadiness] = useState<'loading' | 'ready' | 'unavailable'>(IS_DEMO_CHECKOUT ? 'ready' : 'loading');
  const [serverTestMode, setServerTestMode] = useState(testMode);
  useEffect(() => {
    if (IS_DEMO_CHECKOUT) return;
    const controller = new AbortController();
    void fetch('/api/checkout-status', { cache: 'no-store', signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]) })
      .then(async (response) => {
        const status = await response.json();
        if (!controller.signal.aborted) {
          setReadiness(response.ok && status.available === true ? 'ready' : 'unavailable');
          setServerTestMode(status.test_mode === true);
        }
      })
      .catch(() => { if (!controller.signal.aborted) setReadiness('unavailable'); });
    return () => controller.abort();
  }, []);
  const abort = useRef<AbortController | null>(null);
  const razorpay = useRef<RazorpayInstance | null>(null);
  const busy = useRef(false);
  const [pendingVerification, setPendingVerification] = useState<RazorpayResponse | null>(null);
  useEffect(
    () => () => {
      abort.current?.abort();
      razorpay.current?.close();
    },
    [],
  );

  async function verifyPayment(result: RazorpayResponse) {
    setPendingVerification(result);
    setState('verifying');
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result), signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok || data.success !== true)
        throw new Error(data.error || 'Payment could not be verified.');
      setPendingVerification(null);
      setVerified({ paymentId: data.payment_id, test: data.test_mode === true });
      setState('success');
    } catch (error) {
      setMessage(`${error instanceof Error ? error.message : 'Verification connection failed.'} Your payment may have completed. Retry verification below; do not pay again.`);
      setState('error');
    } finally {
      busy.current = false;
    }
  }

  async function pay(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (readiness !== 'ready') return;
    if (busy.current) return;
    if (pendingVerification) {
      busy.current = true;
      await verifyPayment(pendingVerification);
      return;
    }
    const address = email.trim();
    if (!emailPattern.test(address)) {
      setInvalid(true);
      setMessage('Enter a valid email address. Your license key is sent there.');
      setState('error');
      return;
    }
    setInvalid(false);
    setMessage('');
    setState('processing');
    busy.current = true;
    const controller = new AbortController();
    abort.current = controller;
    try {
      if (CHECKOUT_PROVIDER === 'razorpay') {
        if (!(await loadScript('https://checkout.razorpay.com/v1/checkout.js')) || !window.Razorpay)
          throw new Error('Razorpay could not load. Check your connection or content blocker and try again.');
        if (controller.signal.aborted) return;
        const response = await fetch('/api/create-order', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: pricing.amount, currency: pricing.currency, email: address }),
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(20000)]),
        });
        const order = await response.json();
        if (!response.ok || !order.order_id) throw new Error(order.error || 'Could not create your order.');
        let finished = false;
        const checkout = new window.Razorpay({
          key: order.key_id, amount: order.amount, currency: order.currency, order_id: order.order_id,
          name: 'Basement Protocol', description: `${PRODUCT_NAME} lifetime license + setup${order.test_mode ? ' — TEST PAYMENT' : ''}`,
          prefill: { email: address }, theme: { color: '#4D7CFF' }, retry: { enabled: false },
          modal: { ondismiss: () => {
            if (finished || controller.signal.aborted) return;
            busy.current = false;
            setMessage('Payment cancelled. You can try again when you’re ready.');
            setState('error');
          } },
          handler: (result) => {
            finished = true;
            void verifyPayment(result);
          },
        });
        checkout.on('payment.failed', (result) => {
          finished = true;
          checkout.close();
          busy.current = false;
          setMessage(result.error?.description || 'Payment failed. Please try again or choose another payment method.');
          setState('error');
        });
        razorpay.current = checkout;
        setState('checkout');
        checkout.open();
        return;
      }
      // The short wait stands in for the payment provider confirming the charge.
      const [response] = await Promise.all([
        fetch('/api/4ruple/demo-purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: address }),
          signal: controller.signal,
        }),
        new Promise((resolve) => setTimeout(resolve, 1400)),
      ]);
      const raw: unknown = await response.json().catch(() => null);
      const payload = (raw && typeof raw === 'object' ? raw : {}) as {
        key?: string;
        error?: string;
      };
      if (!response.ok || !payload.key)
        throw new Error(
          payload.error || 'The demo payment didn’t go through. Please try again.',
        );
      // Stays in the processing state while the thanks page loads.
      options.onSuccess({ email: address.toLowerCase(), key: payload.key });
    } catch (error) {
      if (controller.signal.aborted) return;
      setMessage(
        error instanceof Error
          ? error.message
          : 'Connection failed. Please try again.',
      );
      setState('error');
      busy.current = false;
    }
  }

  const processing = state === 'processing' || state === 'checkout' || state === 'verifying';
  return (
    <Dialog
      open={state !== 'checkout'}
      onOpenChange={(open) => {
        if (!open && !processing) onClose();
      }}
    >
      <DialogContent className="bp-dialog fr-checkout">
        <p className="fr-checkout-demo">
          <i className="dot" />
          {IS_DEMO_CHECKOUT ? 'Demo checkout. No money is taken.' : readiness === 'loading' ? 'Checking checkout availability…' : readiness === 'unavailable' ? 'Online checkout unavailable' : serverTestMode ? 'Razorpay test mode. No money is taken.' : 'Secure checkout powered by Razorpay.'}
        </p>
        <div className="fr-checkout-body">
          <div className="eyebrow fr-checkout-eyebrow">CHECKOUT</div>
          <DialogTitle>{verified ? 'Payment signature verified' : `Buy ${PRODUCT_NAME}`}</DialogTitle>
          <DialogDescription>
            {verified ? (verified.test ? 'Test payment only. No money was charged and no license was issued.' : 'Your payment response has been authenticated. Capture and license delivery are handled separately.')
              : readiness === 'unavailable' ? 'We can’t accept an online payment right now. Please try again later or contact us about your purchase.'
              : readiness === 'loading' ? 'Checking that online payments are available for your order.'
              : IS_DEMO_CHECKOUT ? 'Your license key is emailed right after payment.'
              : serverTestMode ? 'Continue to Razorpay to choose your payment method. Test payments do not issue licenses.'
              : 'Continue to Razorpay to choose your payment method.'}
          </DialogDescription>
          {verified ? (
            <output className="lead-form">
              <p>Reference: <code>{verified.paymentId}</code></p>
              <a className="text-link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a meeting with our deployment engineer</a>
              <button className="btn btn-primary" onClick={onClose}>Done</button>
            </output>
          ) : <>
          <dl className="fr-order">
            <div>
              <dt>{PRODUCT_NAME} license</dt>
              <dd>{pricing.label}</dd>
            </div>
            <div>
              <dt>Devices</dt>
              <dd>{LICENSE_DEVICES}</dd>
            </div>
            <div>
              <dt>Billing</dt>
              <dd>One-time · lifetime license</dd>
            </div>
            <div>
              <dt>Setup</dt>
              <dd>Deployment engineer included</dd>
            </div>
            <div className="fr-order-total">
              <dt>Total</dt>
              <dd>{pricing.label} ({pricing.currency})</dd>
            </div>
          </dl>
          {readiness === 'unavailable' ? <div className="lead-form"><output>No payment has been taken.</output><a className="btn btn-primary" href={CHECKOUT_FALLBACK_MAILTO}>Email us about checkout <ArrowUpRight size={16} /></a></div> : <form className="lead-form" onSubmit={pay} noValidate>
            <div className="field">
              <label htmlFor="checkout-email">Email for your license key</label>
              <Input
                type="email"
                id="checkout-email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@company.com"
                value={email}
                disabled={processing || readiness !== 'ready'}
                aria-invalid={invalid || undefined}
                aria-describedby={
                  state === 'error' ? 'checkout-error' : 'checkout-email-note'
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (invalid) setInvalid(false);
                  if (state === 'error') setState('idle');
                }}
              />
              <p className="fr-checkout-note" id="checkout-email-note">
                Use the email you want associated with your order.
              </p>
            </div>
            {state === 'error' && (
              <p className="form-message" role="alert" id="checkout-error">
                {message}
              </p>
            )}
            <p className="sr-only" aria-live="polite">
              {processing ? 'Processing your payment.' : ''}
            </p>
            <button
              type="submit"
              className="btn btn-primary fr-pay"
              disabled={processing || readiness !== 'ready'}
            >
              {readiness === 'loading' ? 'Checking availability…' : processing ? 'Processing payment…' : pendingVerification ? 'Retry verification' : `Pay ${pricing.label}`}
              {processing ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <ArrowUpRight size={16} />
              )}
            </button>
            <p className="form-note">
              By paying you agree to the <a href="/terms">Terms</a> and the{' '}
              <a href="/refund-policy">Refund policy</a>.
            </p>
          </form>}
          </>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
