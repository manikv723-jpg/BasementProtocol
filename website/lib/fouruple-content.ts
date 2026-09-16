// Copy for /4ruple that the page and its JSON-LD both read, so the FAQ schema
// always matches what visitors see. Keep every claim true to the shipped app.
import {
  LICENSE_DEVICE_LABEL,
  REGIONAL_PRICE_LABEL,
  BOOKING_URL,
  PRODUCT_NAME,
  REFUND_WINDOW_DAYS,
} from './business';

export const FOURUPLE_PATH = '/4ruple';
export const FOURUPLE_MANAGE_PATH = '/4ruple/manage';
export const FOURUPLE_TITLE = `${PRODUCT_NAME}: Crack 4x revenue`;
export const FOURUPLE_DESCRIPTION = `A single-person sales team + 4RUPLE. Find people, personalise outreach and manage your sales pipeline on your laptop. Lifetime license for ${LICENSE_DEVICE_LABEL}, ${REGIONAL_PRICE_LABEL}. Engineer-led setup included. Use your own paid Claude subscription.`;

export type FourupleFaq = { q: string; a: string; link?: [label: string, href: string] };

export const fourupleFaqs: FourupleFaq[] = [
  {
    q: 'Is this Instantly plus a CRM?',
    a: 'Think of it as outreach and a lightweight sales CRM in one local workspace, with your business context powering AI-written emails and decks. Track people, outreach stages and replies, then send approved sequences from your Gmail. It is not a feature-for-feature replacement for Instantly or Pipedrive: enterprise CRM features, email warmup and large multi-inbox campaigns are different workflows. Book a meeting to check the fit.',
  },
  {
    q: 'Does everything run offline?',
    a: 'No. The app and its stored workspace run on your laptop, but Claude processes context remotely to generate emails and decks. Gmail handles sending, connected lead providers handle searches, and activation contacts our license service. These features need internet access. Local storage does not mean that no data ever leaves your device.',
  },
  {
    q: 'Can I see it before buying?',
    a: 'Book a meeting. We’ll walk you through 4ruple, discuss your outreach workflow and explain how our deployment engineer sets it up on your laptop.',
    link: ['Book a meeting', BOOKING_URL],
  },
  {
    q: 'Is this a subscription?',
    a: `No. It is a one-time purchase for a lifetime license: ${REGIONAL_PRICE_LABEL}, for ${LICENSE_DEVICE_LABEL}. Engineer-led installation and setup are included. Your own Claude subscription and optional lead-provider credits are separate.`,
  },
  {
    q: 'Do I have to install it myself?',
    a: 'Our deployment engineer installs and configures it for you on your laptop and walks you through your first workflow. The app runs locally with npx 4ruple; our engineer handles the installation for you.',
  },
  {
    q: 'Can I use my own Claude subscription?',
    a: 'Yes. Sign in to Claude Code with your own paid Claude subscription. No separate AI API key is needed. Claude processes your prompts remotely; generated emails and decks are saved on your laptop and count toward your Claude plan’s limits. There is no per-email AI fee from us. Apollo, Prospeo or Hunter keys are optional for finding people; you can upload a CSV instead.',
  },
  {
    q: 'Where is my data?',
    a: 'Your workspace is stored on your laptop in ~/.4ruple; we do not host a copy of your leads, drafts or decks. Claude, Gmail and connected lead providers receive the data needed for their respective services. License checks send our license service your key, a hashed device id, your computer’s name, operating system and app version. Protect your laptop and keep your own backups.',
  },
  {
    q: 'How many devices can I use?',
    a: `One device at a time. To move your license to another laptop, run npx 4ruple deactivate on the old one, or enter your key on the manage page and free that seat. No account needed.`,
    link: ['Manage your license', FOURUPLE_MANAGE_PATH],
  },
  {
    q: 'Will it send emails without me?',
    a: 'No. An email is only sent after you approve it on the Review screen. Preview mode sends everything to your own inbox first, so you see exactly what each person will get.',
  },
  {
    q: 'Can I get a refund?',
    a: `Yes, within ${REFUND_WINDOW_DAYS} days of purchase if your key has not been activated on more than one device. Reply to your purchase email to ask. A refund deactivates the key.`,
    link: ['Read the refund policy', '/refund-policy'],
  },
  {
    q: 'Does it work on Windows?',
    a: 'Windows needs a different setup for Claude Code and browser tools. Our deployment engineer will check your laptop and confirm compatibility before purchase. The complete Windows workflow is still being validated.',
  },
];
