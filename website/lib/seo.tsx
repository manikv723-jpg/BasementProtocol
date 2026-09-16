// Single source for search and answer-engine facts. Every claim here must stay
// true: answer engines quote structured data verbatim.
import type { Metadata } from 'next';
import { CHECKOUT_URL } from './business';
import { priceForCountry, type RegionalPrice } from './pricing';

export const SITE_URL = 'https://basementprotocol.com';
export const SITE_NAME = 'Basement Protocol';
export const BOOKING_URL = 'https://calendly.com/team-manikai/30min';
export const SITE_DESCRIPTION =
  'Basement Protocol is an AI consulting and build studio based in India. We design and build custom AI agents, workflow automation and business dashboards for enterprises and Indian SMEs.';

const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Basement Protocol: AI consulting and custom AI agents, built in India',
};

// Every page sets its own canonical; the root layout deliberately sets none so
// no route silently inherits the home canonical.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_IN',
      url: path,
      title: `${title} | ${SITE_NAME}`,
      description,
      // A page-level openGraph object replaces the root one, so restate the image.
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export type Faq = { q: string; a: string };
export type Crumb = { name: string; path: string };

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/threshold.svg`,
  description: SITE_DESCRIPTION,
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  knowsAbout: [
    'AI consulting',
    'AI agent development',
    'AI workflow automation',
    'AI lead generation systems',
    'SEO agents',
    'Creative workflow automation',
    'Business dashboards',
    'AI for small and medium enterprises',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: BOOKING_URL,
    availableLanguage: ['English', 'Hindi'],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
};

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
  };
}

// Product page schema. Availability follows CHECKOUT_URL so the Offer never
// claims the license is purchasable before checkout exists.
export function softwareApplicationSchema({
  name,
  description,
  path,
  pricing = priceForCountry('IN'),
}: {
  name: string;
  description: string;
  path: string;
  pricing?: RegionalPrice;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}${path}#software`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: 'BusinessApplication',
    softwareRequirements: 'Node.js 22, Google Chrome, Claude Code with a paid Claude plan, a Gmail account',
    image: `${SITE_URL}/4ruple/review.jpg`,
    publisher: { '@id': ORG_ID },
    offers: {
      '@type': 'Offer',
      price: String(pricing.price),
      priceCurrency: pricing.currency,
      url: `${SITE_URL}${path}#pricing`,
      availability: CHECKOUT_URL
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: { '@id': ORG_ID },
    },
  };
}

export function faqSchema(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
