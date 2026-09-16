// Client-side checkout seam for the 4ruple license. Every buy button calls
// openCheckout(); which checkout opens is decided here, from one build-time env var.
//
// NEXT_PUBLIC_CHECKOUT_PROVIDER = 'demo' | 'razorpay' | 'paddle' | 'dodo' | ''
//   demo      the in-page demo overlay (components/basement/checkout.tsx). Never in production.
//   razorpay  Standard Checkout, with server-side orders and signature verification.
//   paddle    not wired yet. Load https://cdn.paddle.com/paddle/v2/paddle.js with loadScript(),
//             then Paddle.Checkout.open({ items, customData, settings: { displayMode: 'overlay' } }).
//   dodo      not wired yet. Its overlay checkout ships as an npm package.
// Razorpay is the default. Its dialog checks server readiness before collecting payment details.
// If a provider's script fails to load,
// openCheckout() resolves 'failed' and the button turns into CHECKOUT_FALLBACK_MAILTO.
// Razorpay displays a verified receipt in the dialog. License fulfillment is separate;
// never redirect to the existing email-delivery thanks page without issuing a license.
import { CONTACT_EMAIL, PRODUCT_NAME } from './business';

export type CheckoutProvider = 'demo' | 'razorpay' | 'paddle' | 'dodo' | '';
export type Purchase = { email: string; key?: string };
export type CheckoutOptions = {
  email?: string;
  onSuccess: (purchase: Purchase) => void;
};
export type CheckoutResult = 'opened' | 'unavailable' | 'failed';

const providers = ['demo', 'razorpay', 'paddle', 'dodo'] as const;
const requested = process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER || 'razorpay';
export const CHECKOUT_PROVIDER: CheckoutProvider = (
  providers as readonly string[]
).includes(requested)
  ? (requested as CheckoutProvider)
  : '';

export const DEMO_CHECKOUT_EVENT = '4ruple:demo-checkout';
export const RAZORPAY_CHECKOUT_EVENT = '4ruple:razorpay-checkout';
export const PURCHASE_STORAGE_KEY = '4ruple:purchase';
export const THANKS_PATH = '/4ruple/thanks';
export const CHECKOUT_FALLBACK_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  `Buying a ${PRODUCT_NAME} license`,
)}`;

type Opener = (options: CheckoutOptions) => Promise<CheckoutResult>;
const openers: Partial<Record<Exclude<CheckoutProvider, ''>, Opener>> = {
  razorpay: async (options) => {
    window.dispatchEvent(
      new CustomEvent<CheckoutOptions>(RAZORPAY_CHECKOUT_EVENT, { detail: options }),
    );
    return 'opened';
  },
  demo: async (options) => {
    window.dispatchEvent(
      new CustomEvent<CheckoutOptions>(DEMO_CHECKOUT_EVENT, { detail: options }),
    );
    return 'opened';
  },
};

export const IS_DEMO_CHECKOUT =
  CHECKOUT_PROVIDER === 'demo' && process.env.NODE_ENV !== 'production';
export const CHECKOUT_AVAILABLE =
  CHECKOUT_PROVIDER !== '' &&
  !!openers[CHECKOUT_PROVIDER] &&
  (CHECKOUT_PROVIDER !== 'demo' || IS_DEMO_CHECKOUT);

export async function openCheckout(
  options: CheckoutOptions,
): Promise<CheckoutResult> {
  const open = CHECKOUT_AVAILABLE && CHECKOUT_PROVIDER ? openers[CHECKOUT_PROVIDER] : undefined;
  if (!open) return 'unavailable';
  try {
    return await open(options);
  } catch {
    return 'failed';
  }
}

// Loads a provider's checkout script once. Resolves false when it is blocked or fails.
const scripts = new Map<string, Promise<boolean>>();
export function loadScript(src: string): Promise<boolean> {
  let pending = scripts.get(src);
  if (!pending) {
    pending = new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      const finish = (ok: boolean) => {
        clearTimeout(timeout);
        if (!ok) {
          scripts.delete(src);
          script.remove();
        }
        resolve(ok);
      };
      const timeout = setTimeout(() => finish(false), 15000);
      script.src = src;
      script.async = true;
      script.onload = () => finish(true);
      script.onerror = () => finish(false);
      document.head.appendChild(script);
    });
    scripts.set(src, pending);
  }
  return pending;
}

// After a successful payment: remember who bought (session only, never the URL), then show the thanks page.
export function completePurchase(purchase: Purchase) {
  try {
    sessionStorage.setItem(PURCHASE_STORAGE_KEY, JSON.stringify(purchase));
  } catch {
    // Private mode or blocked storage: the thanks page still works without the email.
  }
  window.location.assign(THANKS_PATH);
}

export function parsePurchase(raw: string | null): Purchase | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return null;
    const { email, key } = value as Record<string, unknown>;
    if (typeof email !== 'string' || !email) return null;
    return { email, ...(typeof key === 'string' && key ? { key } : {}) };
  } catch {
    return null;
  }
}
