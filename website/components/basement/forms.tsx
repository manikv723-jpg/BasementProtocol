'use client';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { ArrowUpRight, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
export type Product = 'marketing' | 'corporate' | 'dipstick' | '4ruple';
const productLabels: Record<Product, string> = {
  '4ruple': '4ruple.ai',
  marketing: 'Marketing',
  corporate: 'Corporate',
  dipstick: 'Dipstick',
};
export function LeadDialog({
  kind,
  onClose,
  onPrivacy,
}: {
  kind: Product | 'project' | null;
  onClose: () => void;
  onPrivacy: () => void;
}) {
  const [product, setProduct] = useState<Product>(
    kind && kind !== 'project' ? kind : 'marketing',
  );
  const [state, setState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');
  const started = useRef(0);
  const requestId = useRef('');
  const abort = useRef<AbortController | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    started.current = Date.now();
    requestId.current = crypto.randomUUID();
    return () => {
      const controller = abort.current;
      abort.current = null;
      controller?.abort();
    };
  }, []);
  useEffect(() => {
    if (state === 'success') successRef.current?.focus();
  }, [state]);
  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'submitting') return;
    const data = new FormData(event.currentTarget);
    setState('submitting');
    setMessage('');
    const controller = new AbortController();
    abort.current = controller;
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const body = {
        email: data.get('email'),
        product,
        name: data.get('name'),
        company: data.get('company'),
        description: data.get('description'),
        website: data.get('website'),
        startedAt: started.current,
        requestId: requestId.current,
      };
      const response = await fetch(
        `/api/${kind === 'project' ? 'enquiries' : 'waitlist'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal,
        },
      );
      const raw: unknown = await response.json().catch(() => null);
      const payload = (raw && typeof raw === 'object' ? raw : {}) as {
        error?: string;
        message?: string;
        ok?: boolean;
      };
      if (!response.ok)
        throw new Error(
          payload.error || 'We couldn’t save your details. Please try again.',
        );
      if (payload.ok !== true)
        throw new Error(
          'We couldn’t confirm your submission. Please try again.',
        );
      setMessage(payload.message || 'Your details have been saved.');
      setState('success');
    } catch (error) {
      if (abort.current !== controller) return;
      setMessage(
        error instanceof Error && error.name === 'AbortError'
          ? 'The request took too long. Please try again; we won’t save a duplicate.'
          : error instanceof Error
            ? error.message
            : 'Connection failed. Please try again.',
      );
      setState('error');
    } finally {
      clearTimeout(timer);
    }
  }
  return (
    <Dialog
      open={kind !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="bp-dialog">
        <DialogHeader>
          <div
            className="eyebrow"
            style={{ color: 'var(--blue)', fontSize: 10, marginBottom: 10 }}
          >
            {kind === 'project' ? 'LET’S BUILD TOGETHER' : 'BE FIRST IN LINE'}
          </div>
          <DialogTitle>
            {kind === 'project'
              ? 'What are you building?'
              : 'Your next workflow awaits.'}
          </DialogTitle>
          <DialogDescription>
            {kind === 'project'
              ? 'Tell us about your business and the work you want to improve.'
              : 'Join the waitlist. We’ll get in touch when your selected product is ready.'}
          </DialogDescription>
        </DialogHeader>
        {state === 'success' ? (
          <div className="form-success" tabIndex={-1} ref={successRef}>
            <CheckCircle2 />
            <h3>
              {kind === 'project'
                ? 'Your project is on our radar.'
                : 'You’re on the list.'}
            </h3>
            <p>{message}</p>
            <Button variant="outline" className="btn" onClick={onClose}>
              Back to the site <ArrowRight size={15} />
            </Button>
          </div>
        ) : (
          <form className="lead-form" onSubmit={submit}>
            {kind !== 'project' && (
              <div className="field">
                <label id="product-label" htmlFor="product-trigger">
                  Product interest
                </label>
                <Select
                  items={productLabels}
                  value={product}
                  onValueChange={(value) => {
                    if (value) setProduct(value as Product);
                  }}
                >
                  <SelectTrigger
                    id="product-trigger"
                    aria-labelledby="product-label"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(productLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {kind === 'project' && (
              <div className="field">
                <label htmlFor="lead-name">Your name</label>
                <Input
                  id="lead-name"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder="Your name"
                />
              </div>
            )}
            <div className="field">
              <label htmlFor="lead-email">
                {kind === 'project' ? 'Work email' : 'Email address'}
              </label>
              <Input
                type="email"
                id="lead-email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@company.com"
              />
            </div>
            {kind === 'project' && (
              <>
                <div className="field">
                  <label htmlFor="lead-company">Company</label>
                  <Input
                    id="lead-company"
                    name="company"
                    autoComplete="organization"
                    required
                    minLength={2}
                    maxLength={150}
                    placeholder="Company name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="lead-description">
                    What would you like to build?
                  </label>
                  <Textarea
                    id="lead-description"
                    name="description"
                    required
                    minLength={20}
                    maxLength={3000}
                    placeholder="A little about your challenge, your team and what a better system would do…"
                  />
                </div>
              </>
            )}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="lead-website">Leave this empty</label>
              <input
                id="lead-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            {state === 'error' && (
              <p className="form-message" role="alert">
                {message}
              </p>
            )}
            <p className="form-note">
              {kind === 'project'
                ? 'Your details are stored privately so we can respond to your project enquiry.'
                : 'Your email is stored privately for updates about this product.'}{' '}
              <button type="button" onClick={onPrivacy}>
                Data use
              </button>
            </p>
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={state === 'submitting'}
            >
              {state === 'submitting'
                ? 'Saving…'
                : kind === 'project'
                  ? 'Send project enquiry'
                  : 'Join the waitlist'}
              {state === 'submitting' ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <ArrowUpRight size={16} />
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
export function PrivacyDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="bp-dialog">
        <DialogHeader>
          <DialogTitle>Your data stays private.</DialogTitle>
          <DialogDescription>
            How Basement Protocol uses information submitted on this website.
          </DialogDescription>
        </DialogHeader>
        <div className="privacy-copy">
          <p>
            Waitlist signups store your email address and selected product so
            Basement Protocol can contact you about that product. Project
            enquiries store your name, email, company and project description so
            we can respond.
          </p>
          <p>
            Submissions are held in a private database accessible to the site
            owner. They are not displayed publicly, sold or automatically sent
            to an email or CRM service.
          </p>
          <p>
            We use short-lived, hashed request identifiers to limit automated
            spam. AI assistant links open a separate service; its own privacy
            terms apply when you submit your prompt there.
          </p>
          <p>
            When we contact you, you can reply to request removal of your
            information or to stop further contact.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
