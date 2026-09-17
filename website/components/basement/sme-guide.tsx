/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
'use client';

import { ArrowDown, ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';
import { SiteFrame, BookingCTA, Closing } from './frame';
import { Reveal } from './previews';
import { smeGuide as c } from '@/lib/sme-guide-content';

// Long-form buyer guide. Every section renders always-open prose, never an
// accordion, so crawlers and answer engines read the same text a person does.
export function SmeGuidePage() {
  return (
    <SiteFrame sme>
      <section className="landing-hero">
        <Reveal className="landing-hero-copy">
          <a className="landing-crumb mono" href="/smes">
            AI FOR INDIAN SMEs <ArrowRight size={12} /> {c.crumb.toUpperCase()}
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

      <section className="section guide-section">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>01</span>
              {c.meaning.eyebrow}
            </div>
            <h2>{c.meaning.title}</h2>
          </div>
          <div className="guide-prose">
            {c.meaning.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal className="guide-negative">
          <span className="mono">{c.meaning.notTitle.toUpperCase()}</span>
          <ul>
            {c.meaning.not.map(([title, desc]) => (
              <li key={title}>
                <X size={16} />
                <div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="section guide-section">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>02</span>
              {c.lost.eyebrow}
            </div>
            <h2>{c.lost.title}</h2>
          </div>
          <p className="section-lead">{c.lost.lead}</p>
        </Reveal>
        <div className="landing-grid guide-grid">
          {c.lost.items.map(([title, desc], i) => (
            <Reveal key={title}>
              <span className="mono">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section guide-section">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>03</span>
              {c.system.eyebrow}
            </div>
            <h2>{c.system.title}</h2>
          </div>
          <div className="guide-prose">
            {c.system.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal className="guide-stack-head">
          <h3>{c.system.listTitle}</h3>
          <p>{c.system.listNote}</p>
        </Reveal>
        <div className="guide-stack">
          {c.system.items.map(([title, desc]) => (
            <Reveal key={title}>
              <strong>{title}</strong>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section guide-section">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>04</span>
              {c.delivery.eyebrow}
            </div>
            <h2>{c.delivery.title}</h2>
          </div>
          <p className="section-lead">{c.delivery.lead}</p>
        </Reveal>
        <ol className="guide-steps">
          {c.delivery.steps.map(([title, desc], i) => (
            <li key={title}>
              <Reveal>
                <span className="mono">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="section guide-section" id="choosing">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>05</span>
              {c.questions.eyebrow}
            </div>
            <h2>{c.questions.title}</h2>
          </div>
          <p className="section-lead">{c.questions.lead}</p>
        </Reveal>
        <div className="guide-questions">
          {c.questions.items.map(([q, a]) => (
            <Reveal key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section guide-section" id="cost">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>06</span>
              {c.cost.eyebrow}
            </div>
            <h2>{c.cost.title}</h2>
          </div>
          <div className="guide-prose">
            {c.cost.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal className="guide-drivers">
          <span className="mono">{c.cost.driversTitle.toUpperCase()}</span>
          <ul>
            {c.cost.drivers.map(([title, desc]) => (
              <li key={title}>
                <Check size={16} />
                <div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="guide-cost-note">
          <p>{c.cost.closingParagraph}</p>
          <a className="text-link" href="/4ruple">
            See 4ruple.ai <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </section>

      <section className="section guide-section">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>07</span>
              {c.notFor.eyebrow}
            </div>
            <h2>{c.notFor.title}</h2>
          </div>
          <p className="section-lead">{c.notFor.lead}</p>
        </Reveal>
        <div className="guide-questions guide-notfor">
          {c.notFor.items.map(([title, desc]) => (
            <Reveal key={title}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

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
