export type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export type RazorpayOptions = {
  key: string; amount: number; currency: string; order_id: string;
  name: string; description: string;
  prefill: { email: string };
  theme: { color: string };
  retry: { enabled: boolean };
  modal: { ondismiss: () => void };
  handler: (response: RazorpayResponse) => void;
};

export type RazorpayInstance = {
  open: () => void;
  close: () => void;
  on: (event: 'payment.failed', handler: (response: {
    error?: { description?: string };
  }) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
