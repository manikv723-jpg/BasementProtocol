'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  CheckCircle2,
  Layers3,
  Pause,
  Play,
  ScanLine,
  Sparkles,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Status({
  built = false,
  available = false,
}: {
  built?: boolean;
  available?: boolean;
}) {
  return (
    <span className={available ? 'status status-available' : 'status'}>
      <i className="dot" />
      {available ? 'Available now' : built ? 'Built & delivered' : 'Coming soon'}
    </span>
  );
}
export function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return { ref, running: inView && pageVisible && !reduce, reduce };
}
const marketingSteps = ['calendar', 'content', 'creative'];
export function MarketingPreview() {
  const [step, setStep] = useState('calendar');
  const [paused, setPaused] = useState(false);
  const { ref, running, reduce } = useVisible();
  useEffect(() => {
    if (!running || paused) return;
    const timer = setInterval(
      () =>
        setStep(
          (s) =>
            marketingSteps[
              (marketingSteps.indexOf(s) + 1) % marketingSteps.length
            ],
        ),
      5500,
    );
    return () => clearInterval(timer);
  }, [running, paused]);
  const choose = (value: unknown) => {
    setStep(String(value));
    setPaused(true);
  };
  return (
    <div ref={ref} className="product-preview">
      <div className="preview-label">
        <span>FROM CONTEXT TO CONTENT</span>
        <span>ILLUSTRATIVE PREVIEW ↗</span>
      </div>
      <div className="preview-window">
        <div className="window-bar">
          <span className="window-brand">
            <Layers3 size={15} />
            Marketing workspace
          </span>
          <span className="mono">YOUR BRAND. YOUR VOICE.</span>
        </div>
        <Tabs className="preview-tabs" value={step} onValueChange={choose}>
          <TabsList aria-label="Marketing workflow preview">
            <TabsTrigger value="calendar">01 Calendar</TabsTrigger>
            <TabsTrigger value="content">02 Content</TabsTrigger>
            <TabsTrigger value="creative">03 Creative</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="calendar-top">
                Your next 30 days<span>SEPTEMBER 2026</span>
              </div>
              <div className="calendar-grid">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div className="calendar-day" key={i}>
                    {d}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i,
                    marked = [3, 7, 9, 12, 16, 19, 23, 26].includes(day);
                  if (day < 1 || day > 30)
                    return (
                      <span
                        className="calendar-cell"
                        key={day}
                        aria-hidden="true"
                      />
                    );
                  return (
                    <button
                      key={day}
                      className={`calendar-cell ${marked ? 'marked' : ''} ${day === 9 ? 'current' : ''}`}
                      onClick={() => choose('content')}
                      aria-label={`Preview September ${day} content`}
                    >
                      {String(day).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
              <div className="preview-bottom">
                <Sparkles />A content plan shaped by your brand context.
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="content">
            <motion.div
              className="draft-copy"
              initial={reduce ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="draft-top">
                <span>09 SEP / PRODUCT STORY</span>
                <span>READY TO REVIEW</span>
              </div>
              <h4>
                Good ideas deserve
                <br />a clear direction.
              </h4>
              <p>
                Meet a simpler way to plan, create and share. One idea, shaped
                for every channel. Consistently yours.
              </p>
              <div className="draft-channels">
                <span>LinkedIn</span>
                <span>Instagram</span>
                <span>X</span>
              </div>
              <div className="preview-bottom">
                <CheckCircle2 />
                Draft copy for your review
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="creative">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="creative-card">
                <strong>
                  Make
                  <br />
                  your next
                  <br />
                  move.
                </strong>
                <div className="creative-pattern" aria-hidden="true">
                  {Array.from({ length: 8 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
              </div>
              <div className="creative-note">
                <span>Your design system, applied.</span>
                <span>01 / 03</span>
              </div>
              <div className="preview-bottom">
                <CheckCircle2 />
                Creative + copy, together for review
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="preview-controls">
        <div className="preview-step">
          {marketingSteps.map((s) => (
            <i key={s} className={s === step ? 'active' : ''} />
          ))}
          <span>{marketingSteps.indexOf(step) + 1} / 3</span>
        </div>
        <button
          className="play-control"
          onClick={() => setPaused((v) => !v)}
          disabled={!!reduce}
          aria-label={
            paused ? 'Play marketing preview' : 'Pause marketing preview'
          }
        >
          {paused || reduce ? <Play /> : <Pause />}
          {reduce
            ? 'STATIC PREVIEW'
            : paused
              ? 'PLAY PREVIEW'
              : 'PAUSE PREVIEW'}
        </button>
      </div>
    </div>
  );
}
const benchmarks = {
  commerce: {
    name: 'Quick commerce',
    title: 'Shelf visibility',
    metric: 'INDEX / 100',
    values: [84, 62, 47, 35],
  },
  ads: {
    name: 'Advertising',
    title: 'Creative activity',
    metric: 'ILLUSTRATIVE INDEX',
    values: [71, 83, 54, 39],
  },
  web: {
    name: 'Website',
    title: 'Website signals',
    metric: 'ILLUSTRATIVE INDEX',
    values: [78, 59, 67, 41],
  },
  social: {
    name: 'Social',
    title: 'Content presence',
    metric: 'ILLUSTRATIVE INDEX',
    values: [89, 70, 53, 64],
  },
};
export function DipstickPreview() {
  const [tab, setTab] = useState<keyof typeof benchmarks>('commerce');
  const { ref, reduce } = useVisible();
  return (
    <div className="dipstick-preview" ref={ref}>
      <div className="preview-label">
        <span>OUTSIDE-IN BRAND INTELLIGENCE</span>
        <ScanLine />
      </div>
      <div className="preview-window">
        <div className="window-bar">
          <span className="window-brand">
            Dipstick<span>AI</span>
          </span>
          <span className="mono">BENCHMARK OVERVIEW</span>
        </div>
        <Tabs
          className="preview-tabs benchmark-tabs"
          value={tab}
          onValueChange={(v) => setTab(v as keyof typeof benchmarks)}
        >
          <TabsList aria-label="Dipstick benchmark categories">
            {Object.entries(benchmarks).map(([key, item]) => (
              <TabsTrigger key={key} value={key}>
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(benchmarks).map(([key, item]) => (
            <TabsContent key={key} value={key}>
              <div className="benchmark-title">
                {item.title}
                <small className="mono">{item.metric}</small>
              </div>
              <figure
                className="benchmark-chart"
                aria-label={`${item.title}: illustrative values for your brand and three competitors, ${item.values.join(', ')}.`}
              >
                {item.values.map((value, i) => (
                  <div className="benchmark-row" key={i}>
                    <span>
                      {['Your brand', 'Brand A', 'Brand B', 'Brand C'][i]}
                    </span>
                    <div className="benchmark-track">
                      <motion.div
                        className="benchmark-bar"
                        style={{ width: `${value}%` }}
                        initial={reduce ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: i * 0.08 }}
                      />
                    </div>
                    <span className="mono">{value}</span>
                  </div>
                ))}
              </figure>
              <div className="benchmark-foot">
                <span>One view. Your competitive landscape.</span>
                <span>ILLUSTRATIVE DATA</span>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="preview-bottom">
        <ScanLine />
        Explore the categories. See the bigger picture.
      </div>
    </div>
  );
}
