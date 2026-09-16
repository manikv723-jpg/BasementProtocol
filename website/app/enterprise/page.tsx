import type { Metadata } from 'next';
import { EnterprisePage } from '@/components/basement/enterprise';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  serviceSchema,
} from '@/lib/seo';
const description =
  'Custom AI agents, workflows and dashboards built into your business. See our solar, real estate and franchise engagements. Built by Basement Protocol in India.';
export const metadata: Metadata = pageMetadata({
  title: 'Enterprise AI Solutions and Case Studies',
  description,
  path: '/enterprise',
});
// Mirrors the visible FAQ in components/basement/enterprise.tsx word for word.
const faqs = [
  {
    q: 'Do we need to know which AI tool to use?',
    a: 'Start with the business problem. Tell us what your team is trying to achieve and how the work happens today. We can discuss what a suitable system would involve.',
  },
  {
    q: 'Can we start with a single workflow?',
    a: 'Yes. The solar engagement began with lead generation before the client requested SEO and creative workflow agents. A focused starting point can make the scope easier to define.',
  },
  {
    q: 'How is this different from your products?',
    a: 'Enterprise engagements are built around a company’s specific needs. Dipstick is our upcoming D2C intelligence product, while Marketing and Corporate are upcoming workflows for individuals.',
  },
];
export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Enterprise AI solutions',
            description,
            path: '/enterprise',
            serviceType: 'Enterprise AI development',
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Enterprise AI', path: '/enterprise' },
          ]),
        ]}
      />
      <EnterprisePage />
    </>
  );
}
