import type { Metadata } from 'next';
import { FourupleThanks } from '@/components/basement/fouruple-license';
import { pageMetadata } from '@/lib/seo';

// Reached only after checkout: kept out of search and the sitemap.
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Thanks for buying 4ruple.ai',
    description:
      'Your 4ruple.ai license key is on its way. Install Claude Code, run npx 4ruple and paste your key.',
    path: '/4ruple/thanks',
  }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FourupleThanks />;
}
