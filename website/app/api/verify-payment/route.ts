import { paymentHandlers } from '@/lib/razorpay';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  return paymentHandlers().verifyPayment(request);
}
