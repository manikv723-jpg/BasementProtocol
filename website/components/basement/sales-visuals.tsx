import Image from 'next/image';

export type SalesSymbolName = 'firm' | 'people' | 'write' | 'reply' | 'deck' | 'laptop';

/** A shared, deliberately simple drawing language for the sales workflow. */
export function SalesSymbol({ name, className = '' }: { name: SalesSymbolName; className?: string }) {
  return (
    <svg className={`fr-sales-symbol ${className}`} width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === 'firm' && <><path d="M5 27V8h14v19M19 14h8v13M3 27h26M10 12h4M10 17h4M23 18v2M10 27v-5h4v5" /><path d="M8 4h8" strokeWidth="3" /></>}
      {name === 'people' && <><rect x="4" y="5" width="24" height="22" rx="3" /><circle cx="12" cy="13" r="3" /><path d="M7 22c0-5 10-5 10 0M21 11h3M21 16h3M21 21h3" /></>}
      {name === 'write' && <><path d="M17 5H5v22h22V15M9 20h5M9 23h10M16 17l1-5L26 3l4 4-9 9-5 1ZM24 5l4 4" /></>}
      {name === 'reply' && <><path d="M4 6h24v17H15l-7 5v-5H4V6Z" /><path d="m12 11-4 4 4 4M8 15h9c4 0 6 2 6 5" /></>}
      {name === 'deck' && <><rect x="5" y="4" width="22" height="18" rx="2" /><path d="M16 22v6M10 28h12M10 16v-4M16 16V9M22 16v-6" /></>}
      {name === 'laptop' && <><rect x="6" y="4" width="20" height="19" rx="2" /><path d="M6 23 2 28h28l-4-5M13 25h6M11 10h10M11 14h6" /></>}
    </svg>
  );
}

const journey = [
  { icon: 'firm', label: 'Your business', detail: 'Offer + proof' },
  { icon: 'people', label: 'The right people', detail: 'People + context' },
  { icon: 'write', label: 'A personal pitch', detail: 'Email + deck' },
  { icon: 'reply', label: 'A conversation', detail: 'Replies + follow-ups' },
] as const;

export function SalesJourney() {
  return (
    <ol className="fr-sales-journey" aria-label="The sales workflow at a glance">
      {journey.map(({ icon, label, detail }) => <li key={icon}>
        <div className={`fr-journey-drawing fr-journey-${icon}`} aria-hidden="true">
          <SalesSymbol name={icon} />
          <span className="fr-journey-detail"><i /><i /><i /></span>
        </div>
        <strong>{label}</strong><span>{detail}</span>
      </li>)}
    </ol>
  );
}

export function LocalWorkspaceVisual() {
  return (
    <div className="fr-local-map">
      <figure className="fr-laptop-figure">
        <div className="fr-laptop-screen">
          <div className="fr-laptop-toolbar"><span className="fr-mini-wordmark">4ruple<span>.ai</span></span><span className="mono">ON YOUR LAPTOP</span></div>
          <div className="fr-laptop-files">
            <div><SalesSymbol name="people" /><span>Leads</span></div>
            <div><SalesSymbol name="write" /><span>Drafts</span></div>
            <div><SalesSymbol name="deck" /><span>Decks</span></div>
          </div>
          <div className="fr-local-save"><span aria-hidden="true" /><span>Saved on this device</span></div>
        </div>
        <div className="fr-laptop-base" aria-hidden="true"><span /></div>
        <figcaption>Your workspace stays with you.</figcaption>
      </figure>
      <div className="fr-service-bridge" aria-hidden="true"><span>CONNECTS TO</span><i /></div>
      <div className="fr-service-accounts">
        <div className="fr-service-account"><div className="fr-service-mark"><Image src="/icons/claude.svg" width={31} height={31} alt="" /></div><div><h3>Your Claude plan</h3><p>Personalised writing.<br />Your own subscription.</p></div></div>
        <div className="fr-service-account"><div className="fr-service-mark"><Image src="/brands/gmail.png" width={36} height={29} alt="" /></div><div><h3>Your Gmail</h3><p>You approve.<br />Your account sends.</p></div></div>
      </div>
    </div>
  );
}
