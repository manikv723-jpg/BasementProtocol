/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
'use client';

import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy, MonitorCheck, ArrowDown } from 'lucide-react';
import { SiteFrame } from './frame';
import { Reveal, Status } from './previews';
import { PaymentCheckout } from './checkout';
import { ProductShowcase } from './product-showcase';
import { SalesJourney, SalesSymbol, LocalWorkspaceVisual, type SalesSymbolName } from './sales-visuals';
import { StackComparison } from './stack-comparison';
import {
  CHECKOUT_URL,
  LICENSE_DEVICE_LABEL,
  REFUND_WINDOW_DAYS,
  BOOKING_URL,
} from '@/lib/business';
import {
  CHECKOUT_AVAILABLE,
  CHECKOUT_FALLBACK_MAILTO,
  IS_DEMO_CHECKOUT,
  completePurchase,
  openCheckout,
} from '@/lib/checkout';
import { fourupleFaqs } from '@/lib/fouruple-content';
import type { RegionalPrice } from '@/lib/pricing';

// Opens the checkout chosen in lib/checkout.ts. Without one, the payment link when
// CHECKOUT_URL is set; otherwise meeting booking.
export function BuyCTA({
  className = 'btn btn-primary',
  pricing,
  label,
}: {
  className?: string;
  label?: string;
  pricing: RegionalPrice;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <a className={className} href={CHECKOUT_FALLBACK_MAILTO}>
        Checkout didn’t load. Email us to buy
        <ArrowUpRight size={17} />
      </a>
    );
  if (CHECKOUT_AVAILABLE)
    return (
      <button
        className={className}
        onClick={() => {
          void openCheckout({ onSuccess: completePurchase }).then((result) => {
            if (result === 'failed') setFailed(true);
            else if (result === 'unavailable') setFailed(true);
          });
        }}
      >
        {label ?? `Get started — ${pricing.label}`}
        <ArrowUpRight size={17} />
      </button>
    );
  if (CHECKOUT_URL)
    return (
      <a className={className} href={CHECKOUT_URL} rel="noopener noreferrer">
        {label ?? `Get started — ${pricing.label}`}
        <ArrowUpRight size={17} />
      </a>
    );
  return (
      <a className={className} href={CHECKOUT_FALLBACK_MAILTO}>
        Contact us about checkout
      <ArrowUpRight size={17} />
    </a>
  );
}

export function CopyButton({ text, what }: { text: string; what: string }) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  return (
    <span className="fr-copy-group">
    <button
      type="button"
      className="fr-copy"
      onClick={async () => {
        try {
          if (!navigator.clipboard) throw new Error('Clipboard unavailable');
          await navigator.clipboard.writeText(text);
          setCopyFailed(false);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopyFailed(true);
        }
      }}
      aria-label={copied ? 'Copied' : `Copy ${what}`}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
    <output className="sr-only">{copied ? 'Copied to clipboard.' : ''}</output>
    {copyFailed && <output className="fr-copy-fallback">Copy unavailable. Select and copy the command beside this button.</output>}
    </span>
  );
}

const workflow = [
  ['Your firm', 'Founder / sales lead', 'Explain the offer and brief the team.', 'Add your website, services and portfolio once. Give the writing a real business brief.'],
  ['Leads', 'Sales development rep', 'Find companies and the right people.', 'Find people at target companies or import a CSV. Keep them in a local sales pipeline.'],
  ['Review', 'Researcher + copywriter', 'Find a relevant angle and write each pitch.', 'Draft a personal email, two follow-ups and a 4-page deck per person. Edit and approve before sending.'],
  ['Outreach', 'Sales rep / sales ops', 'Send, follow up and track replies.', 'Send through your Gmail within your limits. Follow-ups stop on reply; you handle the conversation.'],
] as const;

const workflowSymbols: SalesSymbolName[] = ['firm', 'people', 'write', 'reply'];

const needs: [string, string][] = [
  ['Your laptop', 'Our deployment engineer checks compatibility and handles installation. Confirm Windows setup with us before purchase.'],
  ['Node.js 22 or later', 'It runs the npx command.'],
  ['Google Chrome', 'Turns your decks into PDFs. Chromium or Edge also work.'],
  [
    'Claude Code with a paid Claude plan',
    'Use your own Claude subscription. Writing counts toward its usage limits.',
  ],
  [
    'A Gmail account with an app password',
    'Google asks you to turn on 2-step verification first.',
  ],
  [
    'Optional: an Apollo, Prospeo or Hunter key',
    'Or upload a CSV of the people you want to reach.',
  ],
];

export function FourupleProduct({ testMode = false, pricing }: { testMode?: boolean; pricing: RegionalPrice }) {
  return (
    <SiteFrame>
      <section className="fr-product-intro">
        {testMode && <div className="fr-public-test-notice"><strong>Razorpay test checkout</strong><span>No real money is charged. Test payments do not issue a license.</span></div>}
        <a className="landing-crumb mono" href="/">BASEMENT PROTOCOL <ArrowRight size={12} /> 4RUPLE.AI</a>
        <div className="fr-product-intro-grid">
          <Reveal>
            <div className="eyebrow">4RUPLE.AI / MULTIPLY YOUR SALES TEAM</div>
            <h1>Crack <span>4x<br />revenue.</span></h1>
          </Reveal>
          <Reveal className="fr-product-intro-copy" delay={0.08}>
            <p className="fr-product-promise">A single-person sales team<br /><span>+ 4RUPLE.</span></p>
            <p>Find the right people. Give each one a reason to reply.
              Keep the follow-through moving, from your own laptop.</p>
            <div className="hero-actions">
              <BuyCTA pricing={pricing} />
              <a className="btn btn-plain" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a meeting <ArrowUpRight size={16} /></a>
            </div>
            <p className="fr-product-offer">Lifetime license · {LICENSE_DEVICE_LABEL} · Engineer-led setup</p>
          </Reveal>
        </div>
        <ProductShowcase />
      </section>

      <section className="section fr-workflow" id="how-it-works">
        <Reveal className="fr-workflow-heading">
          <h2>Four jobs.<br /><span>Often, one person doing them.</span></h2>
          <p>Research, writing, follow-ups, pipeline admin. In a small sales team, those jobs can all land on you.
            4RUPLE helps with the preparation and follow-through. You bring the judgement and close the conversation.</p>
        </Reveal>
        <SalesJourney />
        <div className="fr-workflow-labels mono" aria-hidden="true"><span>THE STEP</span><span>WHO HANDLES IT TODAY</span><span>YOU + 4RUPLE</span></div>
        <ol className="fr-workflow-list">
          {workflow.map(([name, role, manual, output], index) => (
            <li key={name}>
              <div className="fr-workflow-step"><SalesSymbol name={workflowSymbols[index]} /><div><span className="mono">0{index + 1}</span><h3>{name}</h3></div></div>
              <div className="fr-workflow-manual"><span className="fr-mobile-label">Today</span><strong>{role}</strong><p>{manual}</p></div>
              <div className="fr-workflow-output"><span className="fr-mobile-label">With 4RUPLE</span><p>{output}</p></div>
            </li>
          ))}
        </ol>
        <Reveal className="fr-personalisation">
          <div><span className="mono">THE PART A CONTACT LIST CAN’T DO</span><h3>Personalisation needs<br />more than a first name.</h3></div>
          <p>A company, a relevant reason to reach out and a link to your actual work.
            4RUPLE uses that context to draft an email and deck for the person you’re contacting.
            You check the details before anything is sent.</p>
        </Reveal>
      </section>

      <StackComparison pricing={pricing} />

      <section className="section fr-local-compact" id="local-first">
        <Reveal className="fr-local-compact-heading"><h2>Local is the future.</h2><p>Your sales workspace lives on your laptop.</p></Reveal>
        <LocalWorkspaceVisual />
        <p className="fr-local-connection">Local storage, connected services: Claude, Gmail, lead searches and license checks use the internet. No hosted 4RUPLE copy of your leads, drafts or decks. Service logos identify connected tools, not partnerships.</p>
      </section>

      <section className="section fr-assisted-install" id="install">
        <Reveal className="fr-install-title"><h2>Your laptop.<br /><span>Our deployment engineer.</span></h2><p>We install it, connect your accounts with you and walk you through your first workflow. Setup is included.</p></Reveal>
        <div className="fr-setup-board">
          <div className="fr-setup-bring"><span className="mono">YOU BRING</span><div className="fr-setup-heading-icon"><SalesSymbol name="laptop" /><h3>A laptop. Your accounts.</h3></div>
            <ul><li><Check size={17} />Your laptop</li><li><Check size={17} />Your paid Claude subscription</li><li><Check size={17} />Your Gmail account</li><li><Check size={17} />A lead-provider account or a CSV</li></ul>
            <p>We confirm laptop compatibility before purchase, including Windows setup.</p>
          </div>
          <div className="fr-setup-handle"><span className="mono">WE HANDLE</span><h3>From setup to your first outreach.</h3>
            <ol><li><span>01</span><div><strong>Check & install</strong><p>Check compatibility, install the tools and activate 4RUPLE.</p></div></li><li><span>02</span><div><strong>Connect with you</strong><p>Help you sign in to Claude Code and connect Gmail.</p></div></li><li><span>03</span><div><strong>Run it together</strong><p>Add your firm, prepare a draft and test Preview mode.</p></div></li></ol>
          </div>
          <div className="fr-setup-command"><div><MonitorCheck size={21} aria-hidden="true" /><span>Installed locally. Open it with one command.</span></div><code>npx 4ruple</code><CopyButton text="npx 4ruple" what="the command npx 4ruple" /></div>
        </div>
        <details className="fr-install-details">
          <summary>Technical requirements & setup guide <ArrowDown size={16} aria-hidden="true" /></summary>
          <div className="fr-setup-details-grid"><div><h3>Before we start</h3><ul className="fr-needs">{needs.map(([item, note]) => <li key={item}><Check size={17} /><span>{item}<small>{note}</small></span></li>)}</ul></div>
          <div><h3>What happens on first run</h3><p>Run <code>npx 4ruple</code>. Checks show what needs attention, then the app opens at <code>http://localhost:4600</code>. Activate with your license key. Keep Terminal open while working; Ctrl+C stops the app.</p>
            <h3>Claude Code setup</h3><p>Our engineer helps install Claude Code and sign in to your paid plan.</p><pre><code>npm install -g @anthropic-ai/claude-code{'\n'}claude auth login</code></pre>
            <p>Claude processes generation remotely. Usage counts toward your plan’s limits. Claude and Claude Code are Anthropic products; 4ruple is not affiliated with Anthropic.</p>
          </div></div>
          <h3>Useful commands</h3><dl>
            <dt><code>npx 4ruple doctor</code></dt><dd>Check setup without starting the app.</dd>
            <dt><code>npx 4ruple@latest</code></dt><dd>Update and run the latest version.</dd>
            <dt><code>npx 4ruple deactivate</code></dt><dd>Free this laptop’s license seat.</dd>
            <dt><code>npx 4ruple --port 4700</code></dt><dd>Use another port.</dd>
            <dt><code>npx 4ruple --no-open</code></dt><dd>Start without opening the browser.</dd>
          </dl>
          <p>Need Node? Get Node.js 22 or later from <a href="https://nodejs.org/">nodejs.org</a>. Need Chrome? Get it from <a href="https://www.google.com/chrome/">google.com/chrome</a>, or set CHROME_BIN to its location. Gmail requires 2-step verification and an app password.</p>
        </details>
      </section>

      <section className="section" id="pricing">
        <div className="fr-buy">
          <Reveal>
            <div className="eyebrow">
              LIFETIME ACCESS + SETUP
            </div>
            <h2>We get you up
              <br />and running.</h2>
            <p className="section-lead">Our deployment engineer installs and configures 4ruple on your laptop,
              helps you connect Claude Code and Gmail, and walks you through Your firm → Leads → Review → Outreach.</p>
            <p className="section-lead">Buy once for lifetime access. Your Claude subscription and any lead-provider
              credits stay on your own accounts.</p>
            <a className="text-link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Talk through your setup <ArrowUpRight size={16} />
            </a>
          </Reveal>
          <Reveal className="fr-price" delay={0.1}>
            <div className="fr-price-head">
              <span className="mono">4RUPLE.AI LICENSE</span>
              <Status available />
            </div>
            <div className="fr-price-body">
              <div className="fr-amount">
                <strong>{pricing.label}</strong>
                <span>one-time purchase · lifetime license</span>
              </div>
              <p className="fr-region">{pricing.region} pricing · {pricing.currency}</p>
              <p className="fr-fine">
                Engineer-led setup included. Refund within {REFUND_WINDOW_DAYS} days.
              </p>
              <ul className="fr-includes">
                {[
                  'One-time purchase. Lifetime access.',
                  'Deployment engineer installs and configures it for you',
                  'Works with your own paid Claude subscription',
                  `License for ${LICENSE_DEVICE_LABEL}`,
                  'Updates to version 0.x included',
                  'License key delivered by email',
                  `Refund within ${REFUND_WINDOW_DAYS} days if the key is not active on more than one device`,
                ].map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <BuyCTA pricing={pricing} />
              <a className="fr-booking-link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a meeting
              </a>
              <p className="fr-price-legal">
                {(IS_DEMO_CHECKOUT || testMode) && CHECKOUT_AVAILABLE
                  ? 'This is a demo checkout for testing. No money is taken. '
                  : CHECKOUT_AVAILABLE || CHECKOUT_URL
                    ? 'Payments are processed securely by our payment partner. '
                    : 'Book a meeting to confirm laptop compatibility and arrange your purchase and setup. '}
                By buying you agree to the <a href="/terms">Terms</a> and the{' '}
                <a href="/refund-policy">Refund policy</a>. See how we handle
                data in the <a href="/privacy">Privacy policy</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="enterprise-faq" id="faq">
        <div>
          <span className="eyebrow">QUESTIONS PEOPLE ASK</span>
          <h2>4ruple, answered.</h2>
        </div>
        <div className="landing-faq-list">
          {fourupleFaqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>
                {f.a}
                {f.link && (
                  <>
                    {' '}
                    <a href={f.link[1]}>{f.link[0]}</a>.
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Reveal className="enterprise-close">
        <div className="eyebrow">
          <i className="dot" />
          YOUR NEXT CUSTOMER STARTS HERE
        </div>
        <div>
          <h2>
            One person.
            <br />
            <span>Backed by 4RUPLE.</span>
          </h2>
          <BuyCTA pricing={pricing} />
        </div>
      </Reveal>
      <PaymentCheckout testMode={testMode} pricing={pricing} />
    </SiteFrame>
  );
}
