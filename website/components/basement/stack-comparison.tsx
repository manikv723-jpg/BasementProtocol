import Image from 'next/image';
import { ArrowDownRight, Check, BrainCircuit, Send, ContactRound } from 'lucide-react';
import { Reveal } from './previews';
import { LICENSE_DEVICE_LABEL } from '@/lib/business';
import type { RegionalPrice } from '@/lib/pricing';

// Public annual-billing prices checked 16 September 2026. Keep the sources and
// billing basis visible, and recheck both vendors before changing these values.
const outreachAnnual = 37.6 * 12;
const crmAnnual = 14 * 12;
const usd = (amount: number) => `US$${amount.toLocaleString('en-US', { minimumFractionDigits: amount % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

export function StackComparison({ pricing }: { pricing: RegionalPrice }) {
  return (
    <section className="section fr-stack" id="compare">
      <Reveal className="fr-stack-heading">
        <h2>Outreach + your sales CRM.<br /><span>One workspace. One purchase.</span></h2>
        <p>Bring lead tracking, personalised outreach and your business context together on your laptop. Keep paying for your AI plan. Stop renting the 4ruple software.</p>
      </Reveal>
      <Reveal className="fr-stack-grid">
        <div className="fr-stack-rented">
          <p className="mono fr-stack-label">AN EXAMPLE SUBSCRIPTION STACK</p>
          <div className="fr-vendor-row">
            <div><Image src="/brands/instantly.svg" alt="Instantly" width={123} height={28} className="fr-vendor-logo" /><p>Growth · email outreach</p></div>
            <div className="fr-vendor-cost"><strong>{usd(outreachAnnual)}</strong><span>/ year</span></div>
          </div>
          <div className="fr-stack-plus" aria-hidden="true">+</div>
          <div className="fr-vendor-row">
            <div><Image src="/brands/pipedrive.svg" alt="Pipedrive" width={121} height={26} className="fr-vendor-logo" /><p>Lite · CRM · 1 seat</p></div>
            <div className="fr-vendor-cost"><strong>{usd(crmAnnual)}</strong><span>/ year</span></div>
          </div>
          <div className="fr-stack-total"><span>Combined software cost</span><strong>{usd(outreachAnnual + crmAnnual)}<small> / year</small></strong><p>A recurring subscription expense.</p></div>
        </div>
        <div className="fr-stack-owned">
          <div className="fr-stack-own-head"><span className="fr-stack-wordmark">4ruple<span>.ai</span></span><ArrowDownRight size={27} /></div>
          <p className="fr-stack-own-intro">Your outreach. Your pipeline.<br />Your business context, connected.</p>
          <div className="fr-stack-own-price"><strong>{pricing.label}</strong><span>once. yours for life.</span></div>
          <p className="fr-stack-region">{pricing.region} pricing · lifetime license for {LICENSE_DEVICE_LABEL}</p>
          <ul className="fr-stack-includes">
            <li><Send size={17} />Personal emails, decks and follow-ups</li>
            <li><ContactRound size={17} />Local lead tracking and sales pipeline</li>
            <li><BrainCircuit size={17} />Your firm’s context + your own Claude plan</li>
            <li><Check size={17} />Deployment engineer sets up your laptop</li>
          </ul>
          <a href="#pricing" className="text-link">See what’s included <ArrowDownRight size={16} /></a>
        </div>
      </Reveal>
      <p className="fr-stack-method">
        An illustrative cost comparison, not feature-for-feature equivalence. Annual billing: <a href="https://instantly.ai/pricing" target="_blank" rel="noopener noreferrer">Instantly Growth</a> at US$37.60/month and <a href="https://www.pipedrive.com/en/pricing" target="_blank" rel="noopener noreferrer">Pipedrive Lite</a> at US$14/seat/month. Checked 16 September 2026; prices may change. 4ruple: ₹9,999 in India or US$100 internationally, paid once. No currency conversion assumed. Taxes, email accounts, your Claude subscription and any lead-provider credits are separate from this comparison. Different products have different limits and features, including warmup, multi-inbox sending and team collaboration. Logos belong to their respective owners; no affiliation or endorsement.
      </p>
    </section>
  );
}
