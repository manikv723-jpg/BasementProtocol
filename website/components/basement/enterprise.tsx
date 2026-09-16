/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Check,
  Search,
  SlidersHorizontal,
  PanelTop,
  Workflow,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { SiteFrame, ProjectCTA, BookingCTA, Closing } from './frame';
import { Reveal } from './previews';
import { Threshold } from './brand';
const capabilities = [
  {
    id: 'growth',
    name: 'Acquire',
    label: 'REVENUE SYSTEMS',
    title: 'Give growth a system.',
    desc: 'Connect lead generation, search and creative production around a commercial goal. Start with the part of the journey that needs to work better.',
    items: ['Lead generation systems', 'SEO agents', 'Market-entry workflows'],
    steps: [
      'Business context',
      'Lead generation',
      'Team review',
      'Next action',
    ],
  },
  {
    id: 'operations',
    name: 'Operate',
    label: 'NATIVE INTERFACES',
    title: 'Put the work in one place.',
    desc: 'Build an interface around the people doing the work. Bring the actions and information they need into a dashboard designed for their role.',
    items: [
      'Dealer dashboards',
      'Role-specific workspaces',
      'Custom business interfaces',
    ],
    steps: [
      'Business process',
      'Dedicated interface',
      'Human decision',
      'Next action',
    ],
  },
  {
    id: 'creative',
    name: 'Create',
    label: 'CREATIVE WORKFLOWS',
    title: 'Build context into creation.',
    desc: 'Bring the brief, brand context and review into a connected workflow. Make AI part of how creative work gets made, with people shaping the output.',
    items: [
      'Creative workflow agents',
      'Brand-aware briefs',
      'Human review steps',
    ],
    steps: [
      'Brand context',
      'Creative brief',
      'AI-assisted output',
      'Team review',
    ],
  },
];
function CapabilityExplorer() {
  const [value, setValue] = useState('growth');
  return (
    <Tabs
      value={value}
      onValueChange={(v) => setValue(String(v))}
      className="capability-explorer"
    >
      <TabsList
        className="capability-tabs"
        aria-label="Explore enterprise capabilities"
      >
        {capabilities.map((c, i) => (
          <TabsTrigger key={c.id} value={c.id}>
            <span className="mono">0{i + 1}</span>
            {c.name}
            <ArrowUpRight size={17} />
          </TabsTrigger>
        ))}
      </TabsList>
      {capabilities.map((c) => (
        <TabsContent key={c.id} value={c.id} className="capability-panel">
          <div className="capability-description">
            <span className="eyebrow">{c.label}</span>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <ul>
              {c.items.map((item) => (
                <li key={item}>
                  <Check size={14} />
                  {item}
                </li>
              ))}
            </ul>
            <ProjectCTA className="text-link">
              Talk about this workflow
            </ProjectCTA>
          </div>
          <div className="workflow-demo">
            <div className="demo-toolbar">
              <span>
                <Threshold />A SYSTEM BUILT AROUND YOU
              </span>
              <span className="mono">CONCEPT</span>
            </div>
            <div className="workflow-center">
              <div className="context-chip">
                <SlidersHorizontal size={14} /> Your business context
              </div>
              <div className="workflow-vertical">
                {c.steps.map((step, i) => (
                  <div key={step} className="workflow-step">
                    <span className="mono">0{i + 1}</span>
                    <span>{step}</span>
                    {i === 2 ? (
                      <Workflow size={17} />
                    ) : (
                      <ArrowRight size={16} />
                    )}
                  </div>
                ))}
              </div>
              <div className="review-strip">
                <Check size={13} /> Human decisions stay in the workflow.
              </div>
            </div>
            <p className="demo-note">
              Illustrative workflow. The final system is scoped around your
              business.
            </p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
function CaseFact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="case-fact">
      <dt className="mono">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
export function EnterprisePage() {
  return (
    <SiteFrame enterprise>
      <section className="enterprise-hero">
        <Reveal>
          <a className="breadcrumb mono" href="/">
            BASEMENT PROTOCOL <ArrowRight size={12} /> ENTERPRISE AI
          </a>
          <h1>
            AI systems.
            <br />
            Built into your
            <br />
            <span>business.</span>
          </h1>
          <p>
            AI agents, native interfaces and connected workflows. Built for the
            way your company needs to grow, operate and create.
          </p>
          <div className="hero-actions">
            <BookingCTA />
            <a className="btn btn-plain" href="#work">
              Explore the work <ArrowDown size={16} />
            </a>
          </div>
        </Reveal>
        <div className="enterprise-hero-art">
          <Image
            src="/brand/threshold-architecture.jpg"
            alt="Graphite architectural portal with a blue-lit foundation"
            width={1254}
            height={1254}
            sizes="(max-width: 900px) 100vw, 45vw"
            priority
          />
          <span className="mono">THE FOUNDATION FOR WHAT’S NEXT.</span>
        </div>
      </section>
      <div className="enterprise-strip">
        <span className="mono">THE WORK COMES FIRST.</span>
        <p>
          Understand the problem.
          <ArrowRight />
          Build the right system.
          <ArrowRight />
          Put it to work.
        </p>
      </div>
      <section className="section" id="capabilities">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>01</span>WHAT WE BUILD
            </div>
            <h2>
              Intelligence that fits
              <br />
              the work.
            </h2>
          </div>
          <p className="section-lead">
            We start with a business need, then shape the agents, interfaces and
            workflows around it.
          </p>
        </Reveal>
        <Reveal>
          <CapabilityExplorer />
        </Reveal>
      </section>
      <section className="section case-studies" id="work">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>02</span>SELECTED ENGAGEMENTS
            </div>
            <h2>
              Real businesses.
              <br />
              Specific problems.
            </h2>
          </div>
          <p className="section-lead">
            A closer look at the brief, the system and the outcome. Client
            identities remain confidential.
          </p>
        </Reveal>
        <article id="solar" className="case-study case-solar">
          <Reveal className="case-title">
            <div className="eyebrow">
              01 / SOLAR ENERGY <span>LONDON HEADQUARTERS</span>
            </div>
            <h3>
              Entering a new market
              <br />
              starts with a new lead system.
            </h3>
            <p>
              A market-entry brief that expanded into a broader AI engagement.
            </p>
          </Reveal>
          <div className="solar-narrative">
            <div className="solar-journey">
              <div className="journey-label mono">THE ENGAGEMENT</div>
              <div className="journey-origin">
                <span className="mono">STARTING POINT</span>
                <strong>London HQ</strong>
                <p>Expansion into a new geography</p>
              </div>
              <ArrowDown size={26} />
              <div className="journey-destination">
                <Search size={20} />
                <strong>
                  A lead system
                  <br />
                  for the new market
                </strong>
              </div>
              <div className="journey-branches">
                <span>SEO agent</span>
                <span>Creative workflow agent</span>
              </div>
              <p>Follow-on requests extended the brief.</p>
            </div>
            <dl className="case-facts">
              <CaseFact label="THE PROBLEM">
                <h4>A new geography. A new customer base.</h4>
                <p>
                  A solar company headquartered in London wanted to launch in a
                  new geography. They brought Basement Protocol in to build a
                  lead system for that expansion.
                </p>
              </CaseFact>
              <CaseFact label="THE OUTPUT">
                <h4>Lead generation first. A broader AI brief next.</h4>
                <p>
                  We built a lead generation system for the business. The client
                  then asked for an SEO agent and a creative workflow agent,
                  extending the scope beyond lead generation.
                </p>
              </CaseFact>
              <CaseFact label="THE RESULT">
                <h4>The engagement grew beyond the initial system.</h4>
                <p>
                  The lead system became the starting point for a wider brief
                  across search and creative workflows. Commercial performance
                  figures and the new geography have not been disclosed.
                </p>
              </CaseFact>
            </dl>
          </div>
        </article>
        <article id="real-estate" className="case-study compact-case">
          <Reveal className="compact-case-heading">
            <span className="eyebrow">02 / REAL ESTATE</span>
            <h3>
              A dedicated system
              <br />
              for lead generation.
            </h3>
            <div className="case-symbol">
              <Search size={42} />
              <span className="mono">CUSTOMER ACQUISITION</span>
            </div>
          </Reveal>
          <dl className="case-facts">
            <CaseFact label="THE PROBLEM">
              <h4>A business need: generate leads.</h4>
              <p>
                The real estate business engaged Basement Protocol for lead
                generation.
              </p>
            </CaseFact>
            <CaseFact label="THE OUTPUT">
              <h4>A purpose-built lead generation system.</h4>
              <p>We delivered a lead generation solution for the business.</p>
            </CaseFact>
            <CaseFact label="THE RESULT">
              <h4>A delivered lead generation capability.</h4>
              <p>
                The completed build gives the business a dedicated system for
                this function. Lead volumes and conversion results have not been
                disclosed.
              </p>
            </CaseFact>
          </dl>
        </article>
        <article id="franchise" className="case-study compact-case">
          <Reveal className="compact-case-heading">
            <span className="eyebrow">03 / FRANCHISE OPERATIONS</span>
            <h3>
              An interface built
              <br />
              around the dealer.
            </h3>
            <div className="case-symbol">
              <PanelTop size={42} />
              <span className="mono">OPERATING INTERFACE</span>
            </div>
          </Reveal>
          <dl className="case-facts">
            <CaseFact label="THE PROBLEM">
              <h4>A franchise needed a dealer dashboard.</h4>
              <p>
                The brief was to build a dedicated dashboard for a franchise’s
                dealers.
              </p>
            </CaseFact>
            <CaseFact label="THE OUTPUT">
              <h4>A custom dealer interface.</h4>
              <p>
                We designed and built the dealer dashboard for the franchise.
              </p>
            </CaseFact>
            <CaseFact label="THE RESULT">
              <h4>A delivered dashboard for dealer operations.</h4>
              <p>
                The franchise received a purpose-built interface for its
                dealers. Adoption and operational impact figures have not been
                disclosed.
              </p>
            </CaseFact>
          </dl>
        </article>
      </section>
      <section className="section engagement-process">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>03</span>HOW WE APPROACH THE WORK
            </div>
            <h2>
              Start with the problem.
              <br />
              Build from there.
            </h2>
          </div>
          <p className="section-lead">
            A clear business brief comes before a model, a tool or an interface.
          </p>
        </Reveal>
        <div className="process-grid">
          {[
            [
              'Understand',
              'Map the business goal, the current workflow and where a system could help.',
            ],
            [
              'Define',
              'Agree on the first use case, the required inputs and what a useful output looks like.',
            ],
            [
              'Build',
              'Develop the agents, workflows and interfaces around that agreed scope.',
            ],
            [
              'Refine',
              'Review the system in context and identify what needs to improve next.',
            ],
          ].map(([title, desc], i) => (
            <Reveal key={title}>
              <span className="mono">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="enterprise-faq">
        <div>
          <span className="eyebrow">A FEW THINGS TO KNOW</span>
          <h2>Before we build.</h2>
        </div>
        <Accordion className="faq-items">
          <AccordionItem value="starting">
            <AccordionTrigger>
              Do we need to know which AI tool to use?
            </AccordionTrigger>
            <AccordionContent>
              Start with the business problem. Tell us what your team is trying
              to achieve and how the work happens today. We can discuss what a
              suitable system would involve.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="scope">
            <AccordionTrigger>
              Can we start with a single workflow?
            </AccordionTrigger>
            <AccordionContent>
              Yes. The solar engagement began with lead generation before the
              client requested SEO and creative workflow agents. A focused
              starting point can make the scope easier to define.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="products">
            <AccordionTrigger>
              How is this different from your products?
            </AccordionTrigger>
            <AccordionContent>
              Enterprise engagements are built around a company’s specific
              needs. Dipstick is our upcoming D2C intelligence product, while
              Marketing and Corporate are upcoming workflows for individuals.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Closing />
    </SiteFrame>
  );
}
