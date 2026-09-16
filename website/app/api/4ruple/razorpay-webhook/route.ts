import { licenceDelivery } from '@/lib/licence-delivery';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  return licenceDelivery().handle(request);
}
