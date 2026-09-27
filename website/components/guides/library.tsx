'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Download, Search } from 'lucide-react';
import type { Guide } from '@/lib/guides';

export function GuideLibrary({ guides }: { guides: Guide[] }) {
  const [query, setQuery] = useState('');
  const found = guides.filter(g => `${g.title} ${g.description} ${g.category}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <div className="mg-library-toolbar">
      <p aria-live="polite">{found.length} {found.length === 1 ? 'guide' : 'guides'}</p>
      <label className="mg-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search guides</span><input value={query} onChange={e => setQuery(e.target.value)} type="search" placeholder="Find a guide" /></label>
    </div>
    <div className="mg-library-list">
      {found.map(guide => <article className="mg-feature" key={guide.slug}>
        <div className="mg-feature-copy">
          <div className="mg-meta"><span>{guide.category}</span><span>{guide.readMinutes} min read</span><span>PDF included</span></div>
          <h2><a href={`/guides/${guide.slug}`}>{guide.title}<ArrowUpRight size={28} aria-hidden="true" /></a></h2>
          <p>{guide.description}</p>
          <div className="mg-actions"><a className="btn btn-primary" href={`/guides/${guide.slug}`}>Read the guide <ArrowUpRight size={17} /></a><a className="text-link" href={guide.pdf} download>Download PDF <Download size={17} /></a></div>
          <p className="mg-author">By Manikk.ai <span>27 September 2026</span></p>
        </div>
        <a className="mg-cover" href={`/guides/${guide.slug}`} aria-label={`Read ${guide.title}`}><Image src={guide.cover} alt="First page of the original SayOpen and Jev guide by Manikk.ai" width={919} height={1300} /></a>
      </article>)}
      {found.length === 0 && <div className="mg-empty"><h2>No matching guide yet.</h2><p>Try “SayOpen”, “Jev” or “voice”.</p><button className="text-link" onClick={() => setQuery('')}>Show all guides</button></div>}
    </div>
  </>;
}
