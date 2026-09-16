'use client';
import { useState } from 'react';
import {
  Blocks,
  ChartNoAxesCombined,
  Layers3,
  Pause,
  Play,
} from 'lucide-react';
import { Threshold } from './brand';
import { useVisible } from './previews';
export function SystemDiagram() {
  const { ref, running, reduce } = useVisible();
  const [paused, setPaused] = useState(false);
  return (
    <figure
      ref={ref}
      className="hero-diagram motion-surface"
      data-running={running && !paused}
      data-reduced={!!reduce}
      aria-label="Basement Protocol connects AI workflow templates, company intelligence tools, and native AI services."
    >
      <div className="diagram-header mono">
        <span>THE BASEMENT ECOSYSTEM</span>
        <span>01 — 03</span>
      </div>
      <div className="diagram-canvas">
        <svg
          className="network-lines"
          viewBox="0 0 500 440"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="network-line"
            d="M250 117 V159 Q250 171 238 171 H137 V244 M250 117 V154 Q250 165 263 165 H363 V208 M250 117 V295 Q250 307 263 307 H365 V339"
          />
          <path
            className="signal"
            d="M250 117 V159 Q250 171 238 171 H137 V244"
          />
          <path
            className="signal second"
            d="M250 117 V154 Q250 165 263 165 H363 V208"
          />
          <path
            className="signal third"
            d="M250 117 V295 Q250 307 263 307 H365 V339"
          />
          <circle cx="250" cy="144" r="3" fill="#4D7CFF" />
          <path
            d="M40 373 H127 M40 380 H92 M418 91 H462 M441 98 H462"
            stroke="rgba(243,245,247,.15)"
            fill="none"
          />
        </svg>
        <div className="diagram-root">
          <Threshold className="diagram-threshold" />
          <span className="mono">BASEMENT PROTOCOL</span>
        </div>
        <div className="diagram-node node-one">
          <div>
            <span className="mono">01 / FOR ENTERPRISES</span>Native AI systems
          </div>
          <Blocks />
        </div>
        <div className="diagram-node node-three">
          <div>
            <span className="mono">02 / FOR TEAMS</span>Intelligence tools
          </div>
          <ChartNoAxesCombined />
        </div>
        <div className="diagram-node node-two">
          <div>
            <span className="mono">03 / FOR INDIVIDUALS</span>AI workflows
          </div>
          <Layers3 />
        </div>
      </div>
      <div className="diagram-caption mono">
        <i />
        THREE WAYS FORWARD. ONE PROTOCOL.
        {!reduce && (
          <button
            className="diagram-pause"
            onClick={() => setPaused((p) => !p)}
            aria-label={
              paused ? 'Play system animation' : 'Pause system animation'
            }
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        )}
      </div>
    </figure>
  );
}
