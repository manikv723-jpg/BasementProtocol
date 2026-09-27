import Link from 'next/link';
import { SiteFrame } from '@/components/basement/frame';
import { GuideLibrary } from '@/components/guides/library';
import { guides } from '@/lib/guides';
import { JsonLd, SITE_URL, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'AI build guides by Manikk.ai', description: 'Practical AI guides from Manikk.ai: real builds, working decisions, test results and lessons learned. Read online or download the original PDFs.', path: '/guides' });
export default function GuidesPage() {
  return <SiteFrame>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Guides by Manikk.ai', url: `${SITE_URL}/guides`, mainEntity: { '@type': 'ItemList', itemListElement: guides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.title, url: `${SITE_URL}/guides/${g.slug}` })) } }} />
    <div className="mg-main">
      <header className="mg-index-hero"><h1>Less theory.<br /><span>More “here’s how.”</span></h1><div className="mg-index-intro"><h2>Guides by Manikk.ai</h2><p>The builds behind the reels. What worked, what broke, and what you can take into your own work.</p><p>Read here. Keep the PDF. Put an idea to work.</p></div></header>
      <GuideLibrary guides={guides} />
      <section className="mg-bridge"><h2>From an interesting idea<br />to a working system.</h2><div><p>Basement Protocol builds AI agents, workflows and interfaces around real business problems.</p><Link className="text-link" href="/enterprise">Explore enterprise AI services <span aria-hidden="true">↗</span></Link></div></section>
    </div>
  </SiteFrame>;
}
