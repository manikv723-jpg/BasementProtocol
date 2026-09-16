/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
'use client';
import Image from 'next/image';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import type { RegionalPrice } from '@/lib/pricing';
import { Button } from '@/components/ui/button';
import { Reveal, Status, MarketingPreview, DipstickPreview } from './previews';
import { BOOKING_URL, useSiteActions } from './frame';
export function Products({ pricing }: { pricing: RegionalPrice }) {
  const { setLead } = useSiteActions();
  return (
    <>
      {' '}
      <section className="section" id="tools" aria-labelledby="tools-heading">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>02</span>TOOLS FOR COMPANIES
            </div>
            <h2 id="tools-heading">See what others miss.</h2>
          </div>
          <p className="section-lead">
            Turn scattered market signals into a clearer view of your business.
          </p>
        </Reveal>
        <div className="tools-layout">
          <Reveal>
            <DipstickPreview />
          </Reveal>
          <Reveal className="tool-story" delay={0.1}>
            <Status />
            <h3>Dipstick</h3>
            <p className="tool-subtitle">D2C Intelligence Platform</p>
            <p>
              Know where your brand stands. Benchmark your competitors across
              commerce, advertising, websites and social — from one place.
            </p>
            <div className="tools-tags">
              <span>Quick commerce</span>
              <span>Meta + Google ads</span>
              <span>Website</span>
              <span>Social</span>
            </div>
            <div className="tool-actions">
              <Button
                variant="outline"
                className="btn"
                onClick={() => setLead('dipstick')}
              >
                Join the waitlist <ArrowUpRight size={16} />
              </Button>
              <a
                className="text-link"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the demo (book a meeting) <ArrowUpRight />
              </a>
            </div>
            <p className="demo-note">
              We&apos;ll walk you through the platform and live scenarios over a short
              call.
            </p>
          </Reveal>
        </div>
        <div className="tools-layout fr-tools-row">
          <Reveal className="tool-story">
            <Status available />
            <h3>4ruple.ai</h3>
            <p className="tool-subtitle">Crack 4x revenue.</p>
            <p>
              A single-person sales team + 4RUPLE. Outreach, a sales pipeline and your business context in one local
              workspace. Personal emails, follow-ups and decks with your own
              Claude plan. Pay once for a lifetime license for one device,
              with engineer-led laptop setup included.
            </p>
            <div className="tools-tags">
              <span>Apollo, Prospeo, Hunter or CSV</span>
              <span>Personal decks</span>
              <span>Your Gmail</span>
              <span>Preview mode</span>
            </div>
            <div className="tool-actions">
              <a className="btn btn-primary" href="/4ruple">
                See 4ruple.ai <ArrowUpRight size={16} />
              </a>
              <a className="text-link" href="/4ruple#pricing">
                Lifetime license, {pricing.label} <ArrowUpRight />
              </a>
            </div>
          </Reveal>
          <Reveal className="fr-shot" delay={0.1}>
            <div className="fr-shot-label">
              <span>4ruple.ai / Leads</span>
              <span>Fictional demo data</span>
            </div>
            <Image
              src="/4ruple/leads.jpg"
              alt="The 4ruple Leads screen listing fictional prospects with their status."
              width={2880}
              height={1800}
              sizes="(max-width: 800px) 100vw, 58vw"
            />
          </Reveal>
        </div>
      </section>
      <section
        className="section templates"
        id="templates"
        aria-labelledby="templates-heading"
      >
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>03</span>FOR THE INDIVIDUAL
            </div>
            <h2 id="templates-heading">
              Less busywork.
              <br />
              More real work.
            </h2>
          </div>
          <p className="section-lead">
            Your expertise, with a better operating system. AI workflows
            designed around the work you actually do.
          </p>
        </Reveal>
        <Reveal className="product-stage">
          <div className="product-story">
            <Status />
            <h3>Marketing</h3>
            <p>
              From your brand’s context to a 30-day content plan. Copy,
              creatives and feedback, in one connected workspace.
            </p>
            <div className="product-features">
              <span>Brand context</span>
              <span>Content calendar</span>
              <span>Copy + creatives</span>
              <span>Team review</span>
            </div>
            <Button
              className="btn"
              variant="outline"
              onClick={() => setLead('marketing')}
            >
              Join the waitlist <ArrowUpRight size={16} />
            </Button>
          </div>
          <MarketingPreview />
        </Reveal>
        <Reveal className="corporate-row">
          <div className="corporate-icon">
            <BriefcaseBusiness />
          </div>
          <div className="corporate-copy">
            <h3>
              Corporate <Status />
            </h3>
            <p>AI workflows for everyday corporate work.</p>
          </div>
          <button className="text-link" onClick={() => setLead('corporate')}>
            Get early access updates <ArrowUpRight />
          </button>
        </Reveal>
      </section>
    </>
  );
}
