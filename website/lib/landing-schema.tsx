import type { Metadata } from 'next';
import type { LandingContent } from './landing-content';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  pageMetadata,
  serviceSchema,
} from './seo';

export function landingMetadata(c: LandingContent): Metadata {
  return pageMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: c.path,
  });
}

export function LandingSchema({ content: c }: { content: LandingContent }) {
  const primary = c.serviceType
    ? serviceSchema({
        name: c.metaTitle,
        description: c.metaDescription,
        path: c.path,
        serviceType: c.serviceType,
      })
    : { ...organizationSchema, '@context': 'https://schema.org' };
  return (
    <JsonLd
      data={[
        primary,
        faqSchema(c.faqs),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: c.crumb, path: c.path },
        ]),
      ]}
    />
  );
}
