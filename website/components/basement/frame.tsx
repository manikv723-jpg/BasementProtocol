/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import Image from 'next/image';
import { ArrowUpRight, Menu } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LeadDialog, PrivacyDialog, type Product } from './forms';
import { Wordmark, Threshold } from './brand';
import { Reveal } from './previews';
import {
  assistantUrl,
  COMPANY_PROMPT,
  type AssistantName,
} from './assistant-links';
type Lead = Product | 'project' | null;
const Actions = createContext<{ setLead: (lead: Lead) => void }>({
  setLead: () => {},
});
export const useSiteActions = () => useContext(Actions);
const links = [
  ['For Indian SMEs', '/smes'],
  ['Enterprise AI', '/enterprise'],
  ['Company tools', '/#tools'],
  ['For individuals', '/#templates'],
  ['Guides', '/guides'],
];
// Footer-only: crawlable internal links to the keyword pages.
const serviceLinks = [
  ['4ruple.ai', '/4ruple'],
  ['AI consulting', '/ai-consulting'],
  ['AI agent development', '/ai-agent-development'],
  ['AI lead generation', '/ai-lead-generation'],
  ['About', '/about'],
];
export const BOOKING_URL = 'https://calendly.com/team-manikai/30min';
export function BookingCTA({
  className = 'btn btn-primary',
}: {
  className?: string;
}) {
  return (
    <a
      className={className}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      Book a meeting
      <ArrowUpRight size={17} />
    </a>
  );
}
export function ProjectCTA({
  children = 'Discuss a project',
  className = 'btn btn-primary',
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { setLead } = useSiteActions();
  return (
    <button className={className} onClick={() => setLead('project')}>
      {children}
      <ArrowUpRight size={17} />
    </button>
  );
}
export function Closing() {
  return (
    <Reveal className="enterprise-close">
      <div className="eyebrow">
        <i className="dot" />
        YOUR NEXT SYSTEM STARTS HERE
      </div>
      <div>
        <h2>
          What should work
          <br />
          <span>better in your business?</span>
        </h2>
        <BookingCTA />
      </div>
    </Reveal>
  );
}
export function SiteFrame({
  children,
  enterprise = false,
  sme = false,
}: {
  children: ReactNode;
  enterprise?: boolean;
  sme?: boolean;
}) {
  const [lead, setLead] = useState<Lead>(null);
  const [privacy, setPrivacy] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <Actions.Provider value={{ setLead }}>
      <MotionConfig reducedMotion="user">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="shell enterprise-shell">
          <header className="site-nav">
            <Wordmark />
            <nav className="desktop-nav" aria-label="Main navigation">
              {links.map(([label, url]) => (
                <a
                  key={url}
                  href={url}
                  className={url === '/smes' ? 'sme-nav-link' : undefined}
                  aria-current={
                    (enterprise && url === '/enterprise') ||
                    (sme && url === '/smes')
                      ? 'page'
                      : undefined
                  }
                >
                  {label}
                </a>
              ))}
            </nav>
            <BookingCTA className="nav-cta" />
            <a
              className="mobile-sme-link sme-nav-link"
              href="/smes"
              aria-current={sme ? 'page' : undefined}
            >
              For Indian SMEs
            </a>
            <div className="mobile-menu">
              <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
                <DialogTrigger
                  render={
                    <button
                      className="menu-trigger"
                      aria-label="Open navigation"
                    />
                  }
                >
                  <Menu size={19} />
                </DialogTrigger>
                <DialogContent className="bp-dialog">
                  <DialogTitle>Basement Protocol</DialogTitle>
                  <DialogDescription>
                    Systems for every level of work.
                  </DialogDescription>
                  <nav className="menu-links" aria-label="Mobile navigation">
                    {links.map(([label, url]) => (
                      <a
                        key={url}
                        href={url}
                        className={url === '/smes' ? 'sme-nav-link' : undefined}
                        onClick={() => setMobileOpen(false)}
                      >
                        {label}
                        <ArrowUpRight size={20} />
                      </a>
                    ))}
                    <BookingCTA className="text-link" />
                  </nav>
                </DialogContent>
              </Dialog>
            </div>
          </header>
          <main id="main">{children}</main>
          <footer>
            <div className="footer-top">
              <div className="footer-ai">
                <p>Ask AI about Basement Protocol</p>
                <div className="ai-icons">
                  {(
                    [
                      'ChatGPT',
                      'Claude',
                      'Perplexity',
                      'Gemini',
                    ] as AssistantName[]
                  ).map((name) => (
                    <a
                      key={name}
                      className="ai-icon"
                      title={`Ask ${name} about Basement Protocol`}
                      aria-label={`Ask ${name} about Basement Protocol`}
                      href={assistantUrl(name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        unoptimized
                        src={`/icons/${name.toLowerCase()}.svg`}
                        alt=""
                        width={26}
                        height={26}
                      />
                    </a>
                  ))}
                </div>
                <details className="ai-brief-fallback">
                  <summary>Copy company brief</summary>
                  <label htmlFor="company-brief">
                    If an assistant does not load the prompt, copy it here.
                  </label>
                  <textarea
                    id="company-brief"
                    readOnly
                    value={COMPANY_PROMPT}
                    onFocus={(event) => event.currentTarget.select()}
                  />
                </details>
              </div>
              <nav className="footer-links" aria-label="Footer navigation">
                {[...links, ...serviceLinks].map(([label, url]) => (
                  <a key={url} href={url}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="new-footer-brand" aria-hidden="true">
              <Threshold />
              <span>basement protocol</span>
            </div>
            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} Basement Protocol. AI consulting
                and custom AI agents, built in India.
              </span>
              <nav className="footer-legal" aria-label="Legal">
                <a href="/terms">Terms</a>
                <a href="/privacy">Privacy</a>
                <a href="/refund-policy">Refunds</a>
                <a href="/contact">Contact</a>
              </nav>
            </div>
          </footer>
          {lead && (
            <LeadDialog
              key={lead}
              kind={lead}
              onClose={() => setLead(null)}
              onPrivacy={() => setPrivacy(true)}
            />
          )}
          <PrivacyDialog open={privacy} onClose={() => setPrivacy(false)} />
        </div>
      </MotionConfig>
    </Actions.Provider>
  );
}
