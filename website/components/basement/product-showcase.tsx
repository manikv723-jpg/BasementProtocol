'use client';
/* oxlint-disable jsx-a11y/no-noninteractive-tabindex -- Scrollable screenshot regions need keyboard focus for panning. */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { SalesSymbol } from './sales-visuals';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const screens = [
  { id: 'leads', icon: 'people', label: 'Find people', title: 'A pipeline you can actually work through.', caption: 'Keep people, companies and outreach stages together.', focus: 140 },
  { id: 'review', icon: 'write', label: 'Personalise & review', title: 'An email with a reason to reach out.', caption: 'One personal email, two follow-ups and a deck for each person. You review before sending.', focus: 350 },
  { id: 'outreach', icon: 'reply', label: 'Send & follow up', title: 'Follow-through, from your own Gmail.', caption: 'Set sending hours and daily limits. Follow-ups stop when someone replies.', focus: 140 },
] as const;

function ProductScreen({ screen }: { screen: (typeof screens)[number] }) {
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = viewport.current;
    if (element && element.clientWidth < 700) element.scrollLeft = screen.focus;
  }, [screen.focus]);
  return (
    <figure className="fr-product-screen">
      <div className="fr-screen-meta"><span>4ruple.ai / {screen.id}</span><span>Fictional demo workspace</span></div>
      <p className="fr-mobile-screen-instruction"><MoveHorizontal size={15} aria-hidden="true" />Swipe across the screenshot to explore.</p>
      <section ref={viewport} className="fr-screen-viewport" tabIndex={0} aria-label={`${screen.id} screenshot. Scroll to explore the full interface.`}>
        <Image src={`/4ruple/${screen.id}.jpg`} alt={`4ruple ${screen.id} screen using fictional demo contacts. ${screen.caption}`} width={2880} height={1800} sizes="(max-width: 700px) 1000px, (max-width: 1440px) 90vw, 1320px" loading={screen.id === 'review' ? 'eager' : 'lazy'} />
      </section>
      <figcaption>
        <span className="fr-screen-swipe"><MoveHorizontal size={15} aria-hidden="true" />Swipe to explore</span>
        <p>{screen.caption}</p>
        <a href={`/4ruple/${screen.id}.jpg`} target="_blank" rel="noopener noreferrer">Open full-size <ArrowUpRight size={15} aria-hidden="true" /></a>
      </figcaption>
    </figure>
  );
}

export function ProductShowcase() {
  const [active, setActive] = useState('review');
  return (
    <div className="fr-product-showcase">
      <Tabs value={active} onValueChange={(value) => setActive(String(value))}>
        <div className="fr-showcase-top">
          <span className="mono">INSIDE 4RUPLE</span>
          <TabsList className="fr-showcase-tabs" aria-label="Explore 4ruple screens">
            {screens.map((screen) => <TabsTrigger key={screen.id} value={screen.id}><SalesSymbol name={screen.icon} />{screen.label}</TabsTrigger>)}
          </TabsList>
        </div>
        {screens.map((screen) => (
          <TabsContent key={screen.id} value={screen.id} className="fr-showcase-panel">
            <h2>{screen.title}</h2>
            <ProductScreen screen={screen} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
