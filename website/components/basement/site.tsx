/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
'use client';

import { SystemDiagram } from './system-diagram';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Reveal } from './previews';
import { SiteFrame, BookingCTA, Closing } from './frame';
import { Products } from './products';
export function BasementSite({ pricing }: { pricing: import('@/lib/pricing').RegionalPrice }) {
  return (
    <SiteFrame>
      <section className="new-hero ecosystem-hero">
        <Reveal className="new-hero-copy">
          <div className="eyebrow">
            <i className="dot" />
            WORK, REPROGRAMMED.
          </div>
          <h1>
            Better systems
            <br />
            for the way
            <br />
            <span>you work.</span>
          </h1>
          <p>
            Native AI systems for businesses. Intelligence tools for companies.
            AI workflows for individuals. Three ways to make work work better.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#services">
              Explore the systems <ArrowUpRight size={16} />
            </a>
            <BookingCTA className="btn btn-plain" />
          </div>
        </Reveal>
        <Reveal className="ecosystem-visual" delay={0.1}>
          <SystemDiagram />
        </Reveal>
      </section>
      <nav
        className="hero-index new-index"
        aria-label="Explore the three offerings"
      >
        {[
          [
            '01',
            'Built around your business',
            'Native enterprise AI',
            '/enterprise',
          ],
          [
            '02',
            'A clearer view of your market',
            'Company intelligence',
            '#tools',
          ],
          ['03', 'A better way to work', 'Individual workflows', '#templates'],
        ].map(([n, title, sub, url]) => (
          <a href={url} key={n}>
            <span className="mono">{n}</span>
            <div>
              {title}
              <small>{sub}</small>
            </div>
            <ArrowDown />
          </a>
        ))}
      </nav>
      <Reveal className="sme-home-callout">
        <div>
          <span className="eyebrow">FOR INDIAN SMEs</span>
          <h2>SMEs grow with systems.</h2>
          <p>
            Turn the work you chase every day into a process your team can run.
          </p>
          <a className="text-link" href="/ai-consulting-for-smes">
            What AI consulting for an SME actually involves{' '}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <a className="btn btn-primary" href="/smes">
          Build your next system <ArrowUpRight size={17} />
        </a>
      </Reveal>
      <section id="services" className="section enterprise-intro">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>01</span>NATIVE AI FOR ENTERPRISES
            </div>
            <h2>
              Your business is unique.
              <br />
              Your AI should be, too.
            </h2>
          </div>
          <p className="section-lead">
            An agent is only useful when it fits the work. We connect business
            problems to systems your team can actually use.
          </p>
        </Reveal>
        <div className="enterprise-overview">
          <Reveal className="enterprise-manifesto">
            <p>
              From finding your next customer to running your next operation.
            </p>
            <a className="text-link" href="/enterprise">
              Inside our enterprise practice <ArrowUpRight />
            </a>
            <a className="text-link" href="/ai-consulting">
              How AI consulting works here <ArrowUpRight />
            </a>
            <a className="text-link" href="/ai-agent-development">
              Custom AI agent development <ArrowUpRight />
            </a>
          </Reveal>
          <div className="capability-list">
            {[
              [
                '01',
                'Revenue systems',
                'Lead generation, SEO agents and market-entry workflows.',
              ],
              [
                '02',
                'Operating interfaces',
                'Purpose-built dashboards that bring business workflows into one place.',
              ],
              [
                '03',
                'Creative workflows',
                'AI-assisted systems for turning business context into creative output.',
              ],
            ].map(([n, title, desc]) => (
              <Reveal key={n}>
                <span className="mono">{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="solar-feature">
          <div>
            <div className="eyebrow">FEATURED ENGAGEMENT / SOLAR ENERGY</div>
            <h3>
              A new geography.
              <br />A new growth system.
            </h3>
            <p>
              A London-headquartered solar business came to us for a lead system
              to support a new market. The brief grew to include SEO and
              creative workflow agents.
            </p>
            <a className="text-link" href="/enterprise#solar">
              Read the project story <ArrowUpRight />
            </a>
          </div>
          <div className="solar-feature-flow">
            <span className="mono">THE EXPANDING BRIEF</span>
            <ol>
              <li>
                <span>01</span>Lead generation system
              </li>
              <li>
                <span>02</span>SEO agent
              </li>
              <li>
                <span>03</span>Creative workflow agent
              </li>
            </ol>
            <span className="flow-footnote">
              From a single need to a broader AI brief.
            </span>
          </div>
        </Reveal>
        <div className="more-projects">
          <a href="/enterprise#real-estate">
            <span className="mono">REAL ESTATE</span>
            <span>A system for finding the next lead.</span>
            <ArrowUpRight />
          </a>
          <a href="/enterprise#franchise">
            <span className="mono">FRANCHISE OPERATIONS</span>
            <span>A dedicated interface for dealers.</span>
            <ArrowUpRight />
          </a>
        </div>
      </section>
      <Products pricing={pricing} />
      <Closing />
    </SiteFrame>
  );
}
