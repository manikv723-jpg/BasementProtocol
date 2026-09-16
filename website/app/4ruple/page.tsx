import { FourupleProduct } from '@/components/basement/fouruple';
import { headers } from 'next/headers';
import { requestPrice } from '@/lib/pricing-server';
import {
  FOURUPLE_DESCRIPTION,
  FOURUPLE_PATH,
  FOURUPLE_TITLE,
  fourupleFaqs,
} from '@/lib/fouruple-content';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
  softwareApplicationSchema,
} from '@/lib/seo';

export const metadata = pageMetadata({
  title: FOURUPLE_TITLE,
  description: FOURUPLE_DESCRIPTION,
  path: FOURUPLE_PATH,
});

export default async function Page() {
  const pricing = requestPrice(await headers());
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: '4ruple.ai',
            description: FOURUPLE_DESCRIPTION,
            path: FOURUPLE_PATH,
            pricing,
          }),
          faqSchema(fourupleFaqs.map(({ q, a }) => ({ q, a }))),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: '4ruple.ai', path: FOURUPLE_PATH },
          ]),
        ]}
      />
      <FourupleProduct pricing={pricing} testMode={process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test_') ?? false} />
    </>
  );
}
