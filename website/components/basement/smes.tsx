/* oxlint-disable nextjs/no-html-link-for-pages -- Native links avoid the verified Vinext production router failure. */
'use client';
import { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Check,
  MessageSquare,
  FileText,
  UserRound,
  ClipboardList,
  CheckCheck,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { SiteFrame, BookingCTA } from './frame';
import { Reveal } from './previews';
import { Threshold } from './brand';
import { smeFaqs } from '@/lib/sme-guide-content';
const examples = [
  {
    id: 'sales',
    tab: 'Sales & follow-ups',
    number: '01',
    title: 'An enquiry needs a next step.',
    pain: 'An enquiry arrives in a chat. The quotation lives in a spreadsheet. The next follow-up depends on someone remembering.',
    system:
      'A shared enquiry workflow: organise the request, assign an owner, draft a response and make the next follow-up visible.',
    steps: [
      'Capture the enquiry',
      'Assign an owner',
      'Prepare the quotation',
      'Review & follow up',
    ],
    change: 'A clear owner and next action for every enquiry.',
    review: 'Your team reviews quotations and messages before they go out.',
  },
  {
    id: 'orders',
    tab: 'Orders & handoffs',
    number: '02',
    title: 'An order needs a clear handoff.',
    pain: 'Sales knows what was promised. Operations needs the details. The owner gets pulled in to connect the two.',
    system:
      'A shared order workspace: turn the confirmed brief into a checklist, show responsibilities and keep the current status in one place.',
    steps: [
      'Confirm the order',
      'Create the checklist',
      'Assign the handoff',
      'Review the status',
    ],
    change: 'A shared view of what was agreed and what needs to happen next.',
    review: 'Your team confirms commitments, dates and changes.',
  },
  {
    id: 'visibility',
    tab: 'Owner visibility',
    number: '03',
    title: 'Your day needs fewer status calls.',
    pain: 'Updates are spread across people and files. A simple “where are we?” turns into another round of calls.',
    system:
      'An owner dashboard: bring agreed updates into a daily view, highlight items needing attention and link back to the people responsible.',
    steps: [
      'Gather team updates',
      'Organise by workflow',
      'Highlight open actions',
      'Review with the team',
    ],
    change:
      'One place to see open work and decide where your attention is needed.',
    review: 'Your team owns the underlying updates and business decisions.',
  },
];
function SmeExplorer() {
  const [value, setValue] = useState('sales');
  return (
    <Tabs
      className="sme-explorer"
      value={value}
      onValueChange={(v) => setValue(String(v))}
    >
      <TabsList className="sme-tabs" aria-label="Explore SME workflow examples">
        {examples.map((e) => (
          <TabsTrigger value={e.id} key={e.id}>
            <span>{e.number}</span>
            {e.tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {examples.map((e) => (
        <TabsContent value={e.id} key={e.id} className="sme-example">
          <div className="sme-example-story">
            <span className="eyebrow">A FAMILIAR BUSINESS CHALLENGE</span>
            <h3>{e.title}</h3>
            <p>{e.pain}</p>
            <div className="sme-system-answer">
              <span className="mono">THE SYSTEM WE COULD BUILD</span>
              <p>{e.system}</p>
            </div>
          </div>
          <div className="sme-example-flow">
            <span className="mono">ILLUSTRATIVE WORKFLOW / {e.number}</span>
            <ol>
              {e.steps.map((s, i) => (
                <li key={s}>
                  <span className="mono">0{i + 1}</span>
                  {s}
                  {i === 3 ? <Check size={17} /> : <ArrowRight size={17} />}
                </li>
              ))}
            </ol>
            <div className="sme-change">
              <CheckCheck size={22} />
              <p>{e.change}</p>
            </div>
            <small>{e.review}</small>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
export function SmesPage() {
  return (
    <SiteFrame sme>
      <section className="sme-hero">
        <Reveal className="sme-hero-copy">
          <span className="sme-kicker">
            <span />
            BUILT FOR INDIAN SMEs
          </span>
          <h1>
            Less chasing.
            <br />
            <span>More business.</span>
          </h1>
          <p>
            Your business runs on enquiries, quotations, orders and follow-ups.
            We turn those everyday processes into practical AI-powered systems
            your team can use.
          </p>
          <div className="hero-actions">
            <BookingCTA />
            <a className="btn btn-plain" href="#sme-systems">
              See what we can build <ArrowDown size={16} />
            </a>
          </div>
          <span className="sme-hero-note">
            Start with one process that needs to work better.
          </span>
          <a className="text-link" href="/ai-consulting-for-smes">
            Read the full guide to AI consulting for SMEs{' '}
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
        <Reveal className="sme-workboard" delay={0.1}>
          <div className="sme-board-top">
            <Threshold />
            <span>FROM ENQUIRY TO ACTION</span>
            <span className="mono">EXAMPLE</span>
          </div>
          <div className="sme-request">
            <span className="mono">A FAMILIAR STARTING POINT</span>
            <MessageSquare size={24} />
            <p>“Can you send me a quotation?”</p>
            <span>A customer enquiry. A business opportunity.</span>
          </div>
          <div className="sme-board-steps">
            {[
              [UserRound, 'A clear owner', 'Who takes this forward?'],
              [FileText, 'A ready draft', 'What needs to be sent?'],
              [ClipboardList, 'A next action', 'When do we follow up?'],
            ].map(([Icon, title, desc]) => {
              const Mark = Icon as typeof UserRound;
              return (
                <div key={String(title)}>
                  <Mark size={20} />
                  <div>
                    <strong>{String(title)}</strong>
                    <span>{String(desc)}</span>
                  </div>
                  <Check size={16} />
                </div>
              );
            })}
          </div>
          <div className="sme-board-bottom">
            <span className="dot" />A system your team can run.
          </div>
        </Reveal>
      </section>
      <Reveal className="sme-belief">
        <span className="eyebrow">OUR BELIEF</span>
        <h2>
          At the heart of AI’s potential
          <br />
          are businesses like yours.
        </h2>
        <div>
          <p>
            There is plenty of advice about AI. Another webinar can explain the
            possibilities. Your business still needs a way to turn them into
            everyday work.
          </p>
          <p>
            <strong>SMEs grow with systems.</strong> Clear processes. Clear
            responsibilities. Clear next steps. AI makes more of those systems
            possible, and we help you build them.
          </p>
        </div>
      </Reveal>
      <section className="section" id="sme-systems">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>01</span>START WITH THE WORK
            </div>
            <h2>
              Where does your
              <br />
              business get stuck?
            </h2>
          </div>
          <p className="section-lead">
            A trading business, a service firm or a growing dealer network may
            start in different places. Here are three practical examples to
            discuss.
          </p>
        </Reveal>
        <Reveal>
          <SmeExplorer />
        </Reveal>
        <p className="sme-scope-note">
          These are example systems, not off-the-shelf product promises. We
          agree the workflow, data access and integrations with you before
          building.
        </p>
      </section>
      <section className="sme-deliverables section">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span>02</span>WHAT YOU’RE BUILDING TOWARDS
            </div>
            <h2>
              A working system.
              <br />A team that can use it.
            </h2>
          </div>
          <p className="section-lead">
            We build around the process, the people and the tools involved in
            your business.
          </p>
        </Reveal>
        <div className="sme-delivery-list">
          {[
            [
              'A clear workflow',
              'Agree where the work starts, who owns each step and what a useful outcome looks like.',
            ],
            [
              'A practical workspace',
              'Give your team an interface for the information, drafts and actions that matter.',
            ],
            [
              'AI where it helps',
              'Use AI for tasks such as organising information, preparing drafts and summarising updates.',
            ],
            [
              'People in control',
              'Keep approvals and business decisions with your team. Define how the system will be used and reviewed.',
            ],
          ].map(([title, desc], i) => (
            <Reveal key={title}>
              <span className="mono">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <ArrowUpRight size={20} />
            </Reveal>
          ))}
        </div>
        <Reveal className="guide-stack-head">
          <h3>The tools a system usually connects to</h3>
          <p>
            Candidates, not a fixed stack. Which of these a build connects to is
            agreed with you during scoping, based on the access and permissions
            available in your own accounts.
          </p>
        </Reveal>
        <div className="guide-stack">
          {[
            [
              'WhatsApp Business API',
              'Business messaging under Meta’s template, opt-in and messaging-window rules. Not a personal handset, and not an unofficial automation.',
            ],
            [
              'Tally or Zoho',
              'Where the ledger, the item master and often the rate list already live. Usually read through an export or an official connector.',
            ],
            [
              'Google Sheets',
              'The real system of record in a lot of SMEs. Often the fastest place to keep a shared list your team already trusts.',
            ],
            [
              'A shared email inbox',
              'A queue whether or not it is treated as one. Giving every message an owner and a next action is often the first useful change.',
            ],
            [
              'Razorpay',
              'Payment links and payment status, so a quotation, an invoice and a paid order are one record instead of three.',
            ],
            [
              'Shopify',
              'For SMEs selling online, the order and customer data a follow-up or an operations handoff can be built on.',
            ],
          ].map(([title, desc]) => (
            <Reveal key={title}>
              <strong>{title}</strong>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="sme-start section">
        <Reveal>
          <div className="eyebrow">
            <span>03</span>ONE USEFUL STARTING POINT
          </div>
          <h2>
            Bring us the process
            <br />
            you keep chasing.
          </h2>
          <p>
            You do not need an AI strategy deck to start a conversation. Bring
            an example of the work: an enquiry, a quotation, an order handoff or
            a recurring status update. A first engagement covers one process:
            the workflow, the integrations it needs, the interface your team
            uses, the points where a person approves what goes out, and the
            training at handover.
          </p>
          <p className="sme-start-note">
            We do not publish fixed durations. How long a build takes depends on
            how many tools the scope touches and how quickly access and answers
            come from your side, so the duration is agreed in writing at the end
            of scoping rather than guessed before it.
          </p>
        </Reveal>
        <div className="sme-start-steps">
          {[
            [
              'Scope',
              'Walk through the process with the person who does it. Agree the workflow, the inputs, the integrations and who approves what. Ends with a written scope, a quote and a duration.',
            ],
            [
              'Build',
              'Develop the workflow, the interface and the integrations named in the scope, with you seeing it in progress rather than only at the end.',
            ],
            [
              'Pilot on one process',
              'Run it live on the single process it was built for, with your team using it and approving what goes out.',
            ],
            [
              'Handover and training',
              'Train the people who use it, hand over the accounts, credentials and documentation, and agree what happens when something breaks.',
            ],
          ].map(([title, desc], i) => (
            <Reveal key={title}>
              <span className="mono">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Reveal className="sme-proof">
        <div>
          <span className="eyebrow">BUILT AROUND REAL BUSINESS NEEDS</span>
          <h3>
            Lead systems. Dealer dashboards.
            <br />
            Business-specific workflows.
          </h3>
          <p>
            Explore our real estate, franchise and solar engagements to see the
            kinds of business problems we work on.
          </p>
        </div>
        <a className="text-link" href="/enterprise#work">
          Explore our work <ArrowUpRight size={17} />
        </a>
      </Reveal>
      <section className="enterprise-faq sme-faq">
        <div>
          <span className="eyebrow">BEFORE WE START</span>
          <h2>Practical questions.</h2>
        </div>
        <Accordion className="faq-items">
          {smeFaqs.map((f, i) => (
            <AccordionItem value={`q${i}`} key={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <a className="text-link sme-faq-more" href="/ai-consulting-for-smes">
          More questions answered in the full guide{' '}
          <ArrowUpRight size={17} />
        </a>
      </section>
      <Reveal className="sme-final">
        <span className="eyebrow">SMEs GROW WITH SYSTEMS.</span>
        <h2>
          Let’s build
          <br />
          your next one.
        </h2>
        <p>A 30-minute conversation about the work you want to improve.</p>
        <BookingCTA />
      </Reveal>
    </SiteFrame>
  );
}
