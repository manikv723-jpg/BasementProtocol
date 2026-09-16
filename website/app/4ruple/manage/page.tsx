import type { Metadata } from 'next';
import { FourupleManage } from '@/components/basement/fouruple-license';
import { pageMetadata } from '@/lib/seo';

// Self-service tool for existing buyers: kept out of search and the sitemap.
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Manage your 4ruple.ai license',
    description:
      'See which devices your 4ruple.ai license key is active on and free a seat when you move to a new laptop.',
    path: '/4ruple/manage',
  }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FourupleManage />;
}
