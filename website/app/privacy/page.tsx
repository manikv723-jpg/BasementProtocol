/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
import { LegalPage } from '@/components/basement/legal';
import {
  CONTACT_EMAIL,
  GRIEVANCE_OFFICER_EMAIL,
  GRIEVANCE_OFFICER_NAME,
  LEGAL_NAME,
  PAYMENT_PROVIDER,
  REGISTERED_ADDRESS,
  RESPONSE_DAYS,
} from '@/lib/business';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy policy',
  description:
    'What the Basement Protocol website collects, how 4ruple.ai keeps your data on your own laptop, and how to reach our grievance officer.',
  path: '/privacy',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy policy', path: '/privacy' },
        ])}
      />
      <LegalPage
        crumb="Privacy"
        eyebrow="LEGAL"
        title="Privacy policy"
        intro="We collect as little as we can. This page lists what the website stores, what happens when you buy 4ruple.ai, and what the app itself sends."
        sections={[
          {
            id: 'who',
            title: 'Who is responsible',
            body: (
              <p>
                {LEGAL_NAME}, {REGISTERED_ADDRESS}, is responsible for the
                personal data described here. Questions go to{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            ),
          },
          {
            id: 'website',
            title: 'What the website collects',
            body: (
              <>
                <ul>
                  <li>
                    <strong>Regional pricing:</strong> our hosting provider estimates your country from your IP address
                    to show prices in INR for India and USD elsewhere. We do not request precise location permission.
                  </li>
                  <li>
                    <strong>Waitlist sign-ups:</strong> your email address and
                    the product you chose, so we can tell you when it is ready.
                  </li>
                  <li>
                    <strong>Project enquiries:</strong> your name, email,
                    company and the project description you write, so we can
                    reply.
                  </li>
                  <li>
                    <strong>Spam protection:</strong> short-lived, hashed
                    request identifiers used to limit repeated submissions.
                  </li>
                </ul>
                <p>
                  Submissions are stored in a private Vercel Blob store that
                  only we can access. The site is hosted on Vercel. We don’t
                  set advertising cookies, and we don’t sell or rent your
                  information.
                </p>
                <p>
                  The “Ask AI” links in the footer open ChatGPT, Claude,
                  Perplexity or Gemini with a prompt about us. Those services’
                  own privacy terms apply there.
                </p>
              </>
            ),
          },
          {
            id: 'purchases',
            title: 'When you buy 4ruple.ai',
            body: (
              <p>
                Payments are handled by {PAYMENT_PROVIDER}. They collect your
                payment details under their own privacy policy; we never see or
                store card numbers. We receive your name, email, the amount and
                a transaction reference, and use them to issue and email your
                license key, handle refunds and meet tax and accounting
                obligations.
              </p>
            ),
          },
          {
            id: 'app',
            title: 'What the 4ruple app does with your data',
            body: (
              <>
                <p>
                  4ruple runs on your own computer. Your firm profile, leads,
                  API keys, Gmail app password, emails and decks are saved on
                  that computer in ~/.4ruple. We don’t receive a copy.
                </p>
                <p>
                  To check your license, the app sends our license service your
                  license key, a hashed device id (a one-way fingerprint that
                  lets us count devices without learning the id itself), your
                  computer’s name, its operating system and the app version.
                  We keep this to enforce the device limit and to let you
                  remove a device.
                </p>
                <p>Everything else goes directly from your computer to services you choose:</p>
                <ul>
                  <li>
                    emails and decks are written by Claude Code under your own
                    Anthropic account, so Anthropic’s terms apply to that
                    content;
                  </li>
                  <li>
                    lead searches go to Apollo, Prospeo or Hunter with your own
                    key;
                  </li>
                  <li>emails are sent and replies checked through your Gmail.</li>
                </ul>
              </>
            ),
          },
          {
            id: 'retention',
            title: 'How long we keep it',
            body: (
              <p>
                Waitlist and enquiry details are kept until you ask us to
                remove them or they are no longer needed. Purchase and license
                records are kept for as long as your license is active and for
                the period tax law requires. Hashed spam-protection identifiers
                expire after a short window.
              </p>
            ),
          },
          {
            id: 'rights',
            title: 'Your choices',
            body: (
              <p>
                You can ask to see, correct or delete the personal data we hold
                about you, or withdraw consent to being contacted, by writing
                to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We
                handle requests in line with India’s Digital Personal Data
                Protection Act, 2023. Data kept inside the app is on your
                computer, and deleting ~/.4ruple removes it.
              </p>
            ),
          },
          {
            id: 'grievance',
            title: 'Grievance officer',
            body: (
              <p>
                {GRIEVANCE_OFFICER_NAME}
                <br />
                <a href={`mailto:${GRIEVANCE_OFFICER_EMAIL}`}>
                  {GRIEVANCE_OFFICER_EMAIL}
                </a>
                <br />
                {REGISTERED_ADDRESS}
                <br />
                We acknowledge complaints within {RESPONSE_DAYS} working days.
              </p>
            ),
          },
          {
            id: 'changes',
            title: 'Changes to this policy',
            body: (
              <p>
                If we change how we handle data, we will update this page and
                the date at the top. See also our <a href="/terms">terms</a>.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
