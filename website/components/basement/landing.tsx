/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
'use client';

import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiteFrame, BookingCTA, Closing } from './frame';
import { Reveal } from './previews';
import type { LandingContent } from '@/lib/landing-content';

// Keyword landing pages. FAQ answers render always-open (not in an accordion)
// so crawlers and answer engines read the same text as the FAQPage schema.
export function LandingPage({ content: c }: { content: LandingContent }) {
  return (
    <SiteFrame>
      <section className="landing-hero">
        <Reveal className="landing-hero-copy">
          <a className="landing-crumb mono" href="/">
            BASEMENT PROTOCOL <ArrowRight size={12} /> {c.crumb.toUpperCase()}
          </a>
          <div className="eyebrow">
            <i className="dot" />
            {c.kicker}
          </div>
          <h1>
            {c.title} <span>{c.accent}</span>
          </h1>
          <p>{c.intro}</p>
          <div className="hero-actions">
            <BookingCTA />
            <a className="btn btn-plain" href="#faq">
              Common questions <ArrowDown size={16} />
            </a>
          </div>
        </Reveal>
      </section>
      {c.sections.map((s, i) => (
        <section className="section" key={s.title}>
          <Reveal className="section-heading">
            <div>
              <div className="eyebrow">
                <span>0{i + 1}</span>
                {s.eyebrow}
              </div>
              <h2>{s.title}</h2>
            </div>
            <p className="section-lead">{s.lead}</p>
          </Reveal>
          <div className="landing-grid">
            {s.items.map(([title, desc], j) => (
              <Reveal key={title}>
                <span className="mono">0{j + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
      <section className="enterprise-faq" id="faq">
        <div>
          <span className="eyebrow">QUESTIONS PEOPLE ASK</span>
          <h2>{c.faqTitle}</h2>
        </div>
        <div className="landing-faq-list">
          {c.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="landing-related" aria-labelledby="related-heading">
        <span className="eyebrow" id="related-heading">
          KEEP EXPLORING
        </span>
        <div className="landing-related-links">
          {c.related.map(([label, href, desc]) => (
            <a key={href} href={href}>
              <span className="mono">{label.toUpperCase()}</span>
              <span>{desc}</span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      </section>
      <Closing />
    </SiteFrame>
  );
}
