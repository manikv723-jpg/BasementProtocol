/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteFrame } from './frame';
import { Reveal } from './previews';
import { LEGAL_UPDATED } from '@/lib/business';

export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalHero({
  crumb,
  eyebrow,
  title,
  intro,
  updated = true,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  updated?: boolean;
}) {
  return (
    <section className="legal-hero">
      <Reveal>
        <a className="landing-crumb mono" href="/">
          BASEMENT PROTOCOL <ArrowRight size={12} /> {crumb.toUpperCase()}
        </a>
        <div className="eyebrow">
          <i className="dot" />
          {eyebrow}
        </div>
        <h1>{title}</h1>
        <p>{intro}</p>
        {updated && <p className="legal-updated">Last updated {LEGAL_UPDATED}</p>}
      </Reveal>
    </section>
  );
}

// Static legal copy: sections render open with an in-page index, no animation
// on the text itself so reviewers and crawlers see everything immediately.
export function LegalPage({
  crumb,
  eyebrow,
  title,
  intro,
  sections,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <SiteFrame>
      <LegalHero crumb={crumb} eyebrow={eyebrow} title={title} intro={intro} />
      <div className="legal-body">
        <nav className="legal-toc" aria-label="On this page">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.title}
            </a>
          ))}
        </nav>
        <div className="legal-sections">
          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`}>{s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </SiteFrame>
  );
}
