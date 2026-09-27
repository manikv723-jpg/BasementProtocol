/* oxlint-disable jsx-a11y/no-noninteractive-tabindex -- Overflowing code and tables need keyboard scrolling. */
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Download, Mic, Split, Braces, MousePointer2 } from 'lucide-react';
import { SiteFrame } from '@/components/basement/frame';
import { getGuide, guides, type GuideBlock } from '@/lib/guides';
import { JsonLd, SITE_URL, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return guides.map(g => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  const base = pageMetadata({ title: guide.title, description: guide.description, path: `/guides/${guide.slug}` });
  const og = `/guides/${guide.slug}/opengraph-image`;
  return { ...base, authors: [{ name: 'Manikk.ai', url: `${SITE_URL}/guides` }], openGraph: { ...base.openGraph, type: 'article', publishedTime: guide.date, modifiedTime: guide.date, authors: ['Manikk.ai'], images: [{ url: og, width: 1200, height: 630, alt: guide.title }] }, twitter: { ...base.twitter, images: [og] } };
}
function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'text': return <p>{block.text}</p>;
    case 'list': return <ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul>;
    case 'steps': return <ol className="mg-steps">{block.items.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>;
    case 'code': return <pre tabIndex={0} aria-label="Example decision log"><code>{block.text}</code></pre>;
    case 'table': return <section className="mg-table-scroll" aria-label={block.caption} tabIndex={0}><table><caption>{block.caption}</caption><thead><tr>{block.headings.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{block.rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></section>;
  }
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const path = `/guides/${guide.slug}`;
  return <SiteFrame>
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.description, datePublished: `${guide.date}T12:00:00+05:30`, dateModified: `${guide.date}T12:00:00+05:30`, author: { '@type': 'Organization', name: 'Manikk.ai', url: `${SITE_URL}/guides` }, publisher: { '@type': 'Organization', name: 'Basement Protocol', url: SITE_URL }, mainEntityOfPage: `${SITE_URL}${path}`, image: `${SITE_URL}${path}/opengraph-image`, inLanguage: 'en', associatedMedia: { '@type': 'DigitalDocument', name: 'Original SayOpen Jev guide', url: `${SITE_URL}${guide.pdf}`, encodingFormat: 'application/pdf' } }, breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides' }, { name: 'SayOpen + Jev', path }])]} />
    <div className="mg-main">
      <header className="mg-article-hero"><Link href="/guides" className="mg-back"><ArrowLeft size={16} /> Guides by Manikk.ai</Link><h1>A Mac you can<br /><span>just talk to.</span></h1><p className="mg-deck">Inside SayOpen: how Jev turns spoken intent into actions, and what it took to make those actions useful.</p><div className="mg-article-byline"><div><strong>Manikk.ai</strong><span><time dateTime={guide.date}>27 September 2026</time> · {guide.readMinutes} min read</span></div><a className="btn btn-primary" href={guide.pdf} download>Get the guide <Download size={17} /></a></div></header>
      <figure className="mg-flow"><figcaption>“Open terminal, add a new tab and let me type.”<span>A command flow from the build</span></figcaption><ol>{[{ icon: Mic, name: 'Hear', detail: 'Speech → words' }, { icon: Split, name: 'Split', detail: 'Words → clauses' }, { icon: Braces, name: 'Decide', detail: 'Jev → action + confidence' }, { icon: MousePointer2, name: 'Act', detail: 'Code → app controls' }].map(({ icon: Icon, name, detail }) => <li key={name}><Icon size={23} aria-hidden="true" /><div><strong>{name}</strong><span>{detail}</span></div></li>)}</ol></figure>
      <div className="mg-reading-layout"><aside className="mg-contents"><nav aria-label="On this page"><h2>In this guide</h2>{guide.sections.map(s => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}<a href="#original">Original PDF & sources</a></nav><p>A build guide, with the rough edges left in.</p></aside>
        <article className="mg-article" aria-label={guide.title}>
          {guide.sections.map(section => <section id={section.id} key={section.id}><h2>{section.title}</h2>{section.blocks.map((block, i) => <Block key={i} block={block} />)}</section>)}
          <section id="original" className="mg-original"><h2>Keep the original guide.</h2><div className="mg-original-body"><a href={guide.pdf} target="_blank" rel="noopener noreferrer" aria-label="Open the original four-page PDF"><Image src={guide.cover} alt="Cover page of the original SayOpen Jev PDF" width={919} height={1300} /></a><div><p>The original four-page Manikk.ai guide, preserved as supplied. Includes the command examples, test table, build walkthrough and fixes.</p><a className="text-link" href={guide.pdf} download>Download PDF · 695 KB <Download size={17} /></a><p className="mg-source-note">This article adapts the supplied guide. Measurements are attributed to that build. Product status and interfaces may change.</p></div></div><h3>Sources & further reading</h3><ul><li><a href={guide.pdf}>Manikk.ai — SayOpen / Jev build guide (original PDF)</a></li><li><a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener noreferrer">TypeSafe AI — Introducing System One Models & Jev</a></li><li><a href="https://docs.typesafe.ai/" target="_blank" rel="noopener noreferrer">TypeSafe AI — official developer documentation</a></li></ul></section>
        </article>
      </div>
      <section className="mg-bridge"><h2>Which decision slows<br />your business down?</h2><div><p>We build AI systems around real workflows. Bring us one process worth improving.</p><Link className="text-link" href="/enterprise">See what we build <ArrowUpRight size={17} /></Link></div></section>
    </div>
  </SiteFrame>;
}
