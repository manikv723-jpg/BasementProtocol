import { submitLead } from '@/lib/submissions';
export async function POST(request: Request) {
  return submitLead(request, 'waitlist');
}
