import type { Metadata } from 'next';
import { SmesPage } from '@/components/basement/smes';
import { smeFaqs } from '@/lib/sme-guide-content';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  serviceSchema,
} from '@/lib/seo';
const description =
  'Practical AI systems for Indian SMEs: enquiries, quotations, order handoffs and follow-ups, connected to WhatsApp, Tally or Zoho, Sheets and email. Start with one process.';
export const metadata: Metadata = pageMetadata({
  title: 'AI Automation for SMEs in India',
  description,
  path: '/smes',
});
// The visible FAQ lives in lib/sme-guide-content.ts so this FAQPage schema and
// the page copy can never drift apart.
const faqs = smeFaqs;
export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'AI automation for Indian SMEs',
            description,
            path: '/smes',
            serviceType: 'AI workflow automation for small and medium businesses',
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'AI for Indian SMEs', path: '/smes' },
          ]),
        ]}
      />
      <SmesPage />
    </>
  );
}
