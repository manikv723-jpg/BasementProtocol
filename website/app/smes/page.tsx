import type { Metadata } from 'next';
import { SmesPage } from '@/components/basement/smes';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  serviceSchema,
} from '@/lib/seo';
const description =
  'Practical AI systems for Indian SMEs: automate enquiries, quotations, order handoffs and follow-ups, with your team approving what goes out. Start with one process.';
export const metadata: Metadata = pageMetadata({
  title: 'AI Automation for SMEs in India',
  description,
  path: '/smes',
});
// Mirrors the visible FAQ in components/basement/smes.tsx word for word.
const faqs = [
  {
    q: 'Can we start small?',
    a: 'Yes. Start with one recurring workflow. We can use the first conversation to understand the problem and discuss a focused scope.',
  },
  {
    q: 'We use WhatsApp and spreadsheets. Is that a starting point?',
    a: 'Yes—show us how the work moves between them. We will discuss what can be organised or connected, based on available access and permissions. Specific integrations are agreed as part of the scope.',
  },
  {
    q: 'Does our team need to learn AI first?',
    a: 'You can begin with your knowledge of the business. The conversation starts with the process your team already understands and the work you want to improve.',
  },
  {
    q: 'How much will it cost?',
    a: 'Scope comes first. The workflow, interfaces and integrations determine the work involved. Book a meeting so we can discuss your needs and a suitable proposal.',
  },
];
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
