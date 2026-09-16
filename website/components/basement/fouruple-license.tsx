/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
'use client';
// After-purchase pages for 4ruple: /4ruple/thanks and /4ruple/manage.
import {
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import { ArrowRight, Laptop, Loader2 } from 'lucide-react';
import { SiteFrame } from './frame';
import { Reveal } from './previews';
import { CopyButton } from './fouruple';
import { Input } from '@/components/ui/input';
import {
  CONTACT_EMAIL,
  BOOKING_URL,
  LICENSE_DEVICES,
  LICENSE_DEVICE_LABEL,
  PRICE_LABEL,
  PRODUCT_NAME,
  RESPONSE_DAYS,
} from '@/lib/business';
import {
  IS_DEMO_CHECKOUT,
  PURCHASE_STORAGE_KEY,
  parsePurchase,
} from '@/lib/checkout';
import { FOURUPLE_MANAGE_PATH } from '@/lib/fouruple-content';

function FlowHero({
  crumb,
  eyebrow,
  title,
  children,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="legal-hero fr-flow-hero">
      <Reveal>
        <a className="landing-crumb mono" href="/4ruple">
          4RUPLE.AI <ArrowRight size={12} /> {crumb.toUpperCase()}
        </a>
        <div className="eyebrow">
          <i className="dot" />
          {eyebrow}
        </div>
        <h1>{title}</h1>
        <p>{children}</p>
      </Reveal>
    </section>
  );
}

const noSubscribe = () => () => {};
function readStoredPurchase() {
  try {
    return sessionStorage.getItem(PURCHASE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function FourupleThanks() {
  const raw = useSyncExternalStore(noSubscribe, readStoredPurchase, () => null);
  const purchase = useMemo(() => parsePurchase(raw), [raw]);
  const email = purchase?.email;
  return (
    <SiteFrame>
      <FlowHero crumb="Thank you" eyebrow="PAYMENT RECEIVED" title="You’re in.">
        {email ? (
          <>
            Your license key is on its way to <strong>{email}</strong>. Our deployment engineer will help get {PRODUCT_NAME} running on your laptop.
          </>
        ) : (
          <>
            Your license key is on its way to the email you used at checkout.
            Our deployment engineer will help get {PRODUCT_NAME} running on your laptop.
          </>
        )}
      </FlowHero>
      <div className="fr-after">
        <div className="fr-engineer-booking">
          <h2>We’ll take care of the setup.</h2>
          <p>Your lifetime purchase includes installation and configuration with our deployment engineer.
            Book a meeting so we can get your laptop, Claude Code and Gmail ready together.</p>
          <a className="btn btn-primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book your setup meeting</a>
        </div>
        <ol className="fr-setup">
          <li>
            <span className="mono">01</span>
            <div>
              <h2>Install Claude Code and sign in</h2>
              <p>
                {PRODUCT_NAME} writes your emails and decks with Claude Code on
                your laptop with your own paid Claude subscription. Usage counts toward that plan’s limits. Our engineer helps you install it and sign in.
              </p>
              <p><code>npm install -g @anthropic-ai/claude-code</code><br /><code>claude auth login</code></p>
            </div>
          </li>
          <li>
            <span className="mono">02</span>
            <div>
              <h2>Run 4ruple</h2>
              <p>
                You need Node.js 22 or later and Google Chrome. The command
                checks your laptop and opens {PRODUCT_NAME} at http://localhost:4600. Keep Terminal open while you work; Ctrl+C stops the app. Run the same command next time, or npx 4ruple@latest to update.
              </p>
              <div className="fr-command fr-command-inline">
                <div className="fr-command-body">
                  <code>
                    <span>$</span>npx 4ruple
                  </code>
                  <CopyButton text="npx 4ruple" what="the command npx 4ruple" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <span className="mono">03</span>
            <div>
              <h2>Paste your key</h2>
              <p>
                Copy the key from your email and paste it when {PRODUCT_NAME}{' '}
                asks. One key works on {LICENSE_DEVICE_LABEL}.
              </p>
            </div>
          </li>
        </ol>
        <div className="fr-after-side">
          {IS_DEMO_CHECKOUT && purchase?.key && (
            <EmailPreview email={purchase.email} licenseKey={purchase.key} />
          )}
          <div className="fr-help">
            <div>
              <span className="mono">MOVING TO A NEW LAPTOP?</span>
              <p>
                See where your key is active and free a seat.{' '}
                <a href={FOURUPLE_MANAGE_PATH}>Manage your license</a>
              </p>
            </div>
            <div>
              <span className="mono">DIDN’T GET THE EMAIL?</span>
              <p>
                Check your spam folder, then write to{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the
                address you bought with. We reply within {RESPONSE_DAYS} working
                days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}

function EmailPreview({
  email,
  licenseKey,
}: {
  email: string;
  licenseKey: string;
}) {
  return (
    <section className="fr-email" aria-labelledby="email-preview-title">
      <div className="fr-email-label">
        <span className="mono" id="email-preview-title">
          EMAIL PREVIEW
        </span>
        <span className="fr-email-demo">Demo only</span>
      </div>
      <dl className="fr-email-head">
        <div>
          <dt>From</dt>
          <dd>{PRODUCT_NAME} &lt;{CONTACT_EMAIL}&gt;</dd>
        </div>
        <div>
          <dt>To</dt>
          <dd>{email}</dd>
        </div>
        <div>
          <dt>Subject</dt>
          <dd>Your {PRODUCT_NAME} license key</dd>
        </div>
      </dl>
      <div className="fr-email-body">
        <p>Thanks for buying {PRODUCT_NAME}. Here is your license key:</p>
        <div className="fr-key">
          <code data-license-key={licenseKey}>{licenseKey}</code>
          <CopyButton text={licenseKey} what="your license key" />
        </div>
        <p>
          Run <code>npx 4ruple</code> on your laptop and paste the key when it
          asks. It works on {LICENSE_DEVICE_LABEL}. To move it, run{' '}
          <code>npx 4ruple deactivate</code> on the old laptop or free a seat on
          the manage page.
        </p>
        <p className="fr-email-receipt">
          Receipt: {PRODUCT_NAME} license, {LICENSE_DEVICE_LABEL},{' '}
          {PRICE_LABEL} one-time.
        </p>
      </div>
      <p className="fr-email-foot">
        This is what the email says. The demo checkout sends nothing.
      </p>
    </section>
  );
}

type Device = {
  id: string;
  name: string;
  platform: string;
  lastSeen: string | null;
};
type License = { key: string; hint: string; devices: Device[]; maxDevices: number };
type LicenseReply = {
  ok?: boolean;
  error?: string;
  hint?: string;
  devices?: Device[];
  maxDevices?: number;
};

const OFFLINE = 'We couldn’t reach the license service. Check your connection and try again.';

type LicenseResult =
  | { ok: false; error: string }
  | { ok: true; data: LicenseReply; checkedAt: number };

async function licenseRequest(
  body: Record<string, string>,
): Promise<LicenseResult> {
  try {
    const response = await fetch('/api/4ruple/license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const raw: unknown = await response.json().catch(() => null);
    const data = (raw && typeof raw === 'object' ? raw : {}) as LicenseReply;
    if (!response.ok || data.ok !== true)
      return { ok: false, error: data.error || OFFLINE };
    // Timestamped here, not during render, so "last used" stays stable between renders.
    return { ok: true, data, checkedAt: Date.now() };
  } catch {
    return { ok: false, error: OFFLINE };
  }
}

function systemName(platform: string) {
  if (platform.startsWith('darwin')) return 'Mac';
  if (platform.startsWith('win')) return 'Windows';
  if (platform.startsWith('linux')) return 'Linux';
  return 'Unknown system';
}

const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
function lastUsed(iso: string | null, now: number) {
  const time = iso ? Date.parse(iso) : NaN;
  if (Number.isNaN(time)) return 'Not used yet';
  const seconds = Math.round((time - now) / 1000);
  if (Math.abs(seconds) < 60) return 'Last used just now';
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  const [unit, size] = units.find(([, s]) => Math.abs(seconds) >= s)!;
  return `Last used ${relative.format(Math.round(seconds / size), unit)}`;
}

export function FourupleManage() {
  const [keyInput, setKeyInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [license, setLicense] = useState<License | null>(null);
  const [checkedAt, setCheckedAt] = useState(0);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [freeing, setFreeing] = useState<string | null>(null);
  const [notice, setNotice] = useState('');

  async function lookUp(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const key = keyInput.trim();
    setNotice('');
    setConfirming(null);
    if (!key) {
      setError('Paste your license key first.');
      setLicense(null);
      return;
    }
    setLoading(true);
    setError('');
    const result = await licenseRequest({ action: 'devices', key });
    setLoading(false);
    if (!result.ok) {
      setLicense(null);
      setError(result.error);
      return;
    }
    setCheckedAt(result.checkedAt);
    setLicense({
      key,
      hint: result.data.hint || '',
      devices: result.data.devices || [],
      maxDevices: result.data.maxDevices || LICENSE_DEVICES,
    });
  }

  async function free(device: Device) {
    if (!license || freeing) return;
    setFreeing(device.id);
    setError('');
    setNotice('');
    const result = await licenseRequest({
      action: 'deactivate',
      key: license.key,
      deviceId: device.id,
    });
    setFreeing(null);
    setConfirming(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setCheckedAt(result.checkedAt);
    setLicense({
      ...license,
      devices: result.data.devices || [],
      maxDevices: result.data.maxDevices || license.maxDevices,
    });
    setNotice(
      `${device.name} is off your license. Paste your key on the new laptop to use that seat.`,
    );
  }

  const used = license?.devices.length ?? 0;
  return (
    <SiteFrame>
      <FlowHero
        crumb="Manage license"
        eyebrow="YOUR LICENSE"
        title="Manage your license."
      >
        Enter your license key to see which devices it’s active on, and free a
        seat when you move to a new laptop. No account needed.
      </FlowHero>
      <div className="fr-manage">
        <div className="fr-manage-main">
          <form className="fr-key-form" onSubmit={lookUp} noValidate>
            <label htmlFor="license-key">License key</label>
            <div className="fr-key-row">
              <Input
                id="license-key"
                name="key"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                maxLength={64}
                placeholder="4R-XXXXX-XXXXX-XXXXX-XXXXX"
                value={keyInput}
                aria-invalid={error && !license ? true : undefined}
                aria-describedby="license-key-help"
                onChange={(e) => setKeyInput(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Looking up…' : 'Look up'}
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </div>
            <p className="fr-key-help" id="license-key-help">
              Forgot your key? Reply to your purchase email and we’ll send it
              again.
            </p>
          </form>

          {error && (
            <p className="form-message fr-manage-message" role="alert">
              {error}
            </p>
          )}
          <p className="sr-only" aria-live="polite">
            {notice}
          </p>

          {license && (
            <section className="fr-devices" aria-labelledby="devices-title">
              <div className="fr-devices-head">
                <h2 id="devices-title">
                  {used} of {license.maxDevices} devices in use
                </h2>
                {license.hint && (
                  <span className="mono">KEY ENDING {license.hint}</span>
                )}
              </div>
              {notice && <p className="fr-devices-notice">{notice}</p>}
              {used === 0 ? (
                <p className="fr-devices-empty">
                  No devices yet. Run <code>npx 4ruple</code> and paste your key.
                </p>
              ) : (
                <ul>
                  {license.devices.map((device) => (
                    <li key={device.id}>
                      <Laptop size={20} aria-hidden="true" />
                      <div className="fr-device-text">
                        <strong>{device.name}</strong>
                        <span>
                          {systemName(device.platform)} ·{' '}
                          {lastUsed(device.lastSeen, checkedAt)}
                        </span>
                      </div>
                      {confirming === device.id ? (
                        <div className="fr-device-confirm">
                          <span>4ruple stops working on it.</span>
                          <button
                            type="button"
                            className="btn btn-primary"
                            disabled={freeing !== null}
                            onClick={() => free(device)}
                          >
                            {freeing === device.id ? 'Freeing…' : 'Free it'}
                          </button>
                          <button
                            type="button"
                            className="btn"
                            disabled={freeing !== null}
                            onClick={() => setConfirming(null)}
                          >
                            Keep
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn fr-free"
                          onClick={() => {
                            setNotice('');
                            setConfirming(device.id);
                          }}
                          aria-label={`Free the seat used by ${device.name}`}
                        >
                          Free this seat
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
        <aside className="fr-help" aria-label="Help with your license">
          <div>
            <span className="mono">MOVING TO A NEW LAPTOP</span>
            <p>
              Free the old laptop’s seat here, or run{' '}
              <code>npx 4ruple deactivate</code> on it. Then paste your key on
              the new one.
            </p>
          </div>
          <div>
            <span className="mono">FORGOT YOUR KEY?</span>
            <p>
              Reply to your purchase email, or write to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the
              address you bought with.
            </p>
          </div>
          <div>
            <span className="mono">WHAT WE CAN SEE</span>
            <p>
              This page shows each device’s name, system and when it last
              checked in. Your leads, emails and decks are not uploaded to us.
            </p>
          </div>
        </aside>
      </div>
    </SiteFrame>
  );
}
