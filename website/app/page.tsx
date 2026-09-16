import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { requestPrice } from '@/lib/pricing-server';
import { BasementSite } from '@/components/basement/site';
import { JsonLd, organizationSchema, websiteSchema } from '@/lib/seo';
export const metadata: Metadata = {
  description:
    'AI consulting and build studio in India. Custom AI agents, workflow automation and dashboards for enterprises and Indian SMEs. Book a 30-minute meeting.',
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
};
export default async function Home() {
  const pricing = requestPrice(await headers());
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <BasementSite pricing={pricing} />
    </>
  );
}
