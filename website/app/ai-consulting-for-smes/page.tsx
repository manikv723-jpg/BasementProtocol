import type { Metadata } from 'next';
import { SmeGuidePage } from '@/components/basement/sme-guide';
import { smeGuide as c } from '@/lib/sme-guide-content';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  pageMetadata,
  serviceSchema,
} from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: c.metaTitle,
  description: c.metaDescription,
  path: c.path,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          // Emitted here too so the Service node's provider @id resolves on
          // this page rather than only from the home page graph.
          { ...organizationSchema, '@context': 'https://schema.org' },
          serviceSchema({
            name: c.metaTitle,
            description: c.metaDescription,
            path: c.path,
            serviceType: c.serviceType,
          }),
          faqSchema(c.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'AI for Indian SMEs', path: '/smes' },
            { name: c.crumb, path: c.path },
          ]),
        ]}
      />
      <SmeGuidePage />
    </>
  );
}
