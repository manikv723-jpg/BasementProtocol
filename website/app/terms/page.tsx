/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
import { LegalPage } from '@/components/basement/legal';
import {
  CONTACT_EMAIL,
  ENTITY_TYPE,
  GOVERNING_LAW,
  JURISDICTION_CITY,
  LEGAL_NAME,
  LICENSE_DEVICE_LABEL,
  REGIONAL_PRICE_LABEL,
  PRICE_TAX_NOTE,
  REFUND_WINDOW_DAYS,
  REGISTERED_ADDRESS,
} from '@/lib/business';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms of service',
  description:
    'The terms for using the Basement Protocol website, our AI consulting services and the 4ruple.ai software license.',
  path: '/terms',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms of service', path: '/terms' },
        ])}
      />
      <LegalPage
        crumb="Terms"
        eyebrow="LEGAL"
        title="Terms of service"
        intro={`These terms cover this website, our AI consulting and build services, and the 4ruple.ai software license. By using the site or buying a license, you agree to them.`}
        sections={[
          {
            id: 'who-we-are',
            title: 'Who we are',
            body: (
              <p>
                {LEGAL_NAME} ({ENTITY_TYPE}) is an AI consulting and build studio
                based in India. Our registered address is {REGISTERED_ADDRESS}.
                You can reach us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. In these
                terms, “we” and “us” mean {LEGAL_NAME}, and “you” means the
                person or business using the site or the software.
              </p>
            ),
          },
          {
            id: 'services',
            title: 'Consulting and build services',
            body: (
              <p>
                Custom AI agents, workflows and dashboards are scoped with each
                client. The scope, price, timeline and ownership of the work
                for an engagement are set out in a written proposal or
                agreement, and that document governs the engagement if it
                differs from these terms.
              </p>
            ),
          },
          {
            id: 'license',
            title: 'The 4ruple.ai license',
            body: (
              <>
                <p>
                  4ruple.ai is software you install and run on your own
                  computer. A lifetime license costs {REGIONAL_PRICE_LABEL} as a one-time
                  payment, with no recurring 4ruple license fee. Engineer-led installation and configuration are included.
                  Your paid Claude subscription and any lead-provider credits are purchased separately. {PRICE_TAX_NOTE}. When you buy, you get:
                </p>
                <ul>
                  <li>
                    a license key, emailed to you after payment, that you can
                    activate on up to {LICENSE_DEVICE_LABEL} at a time;
                  </li>
                  <li>
                    updates within version 0.x at no extra cost. A later major
                    version may be sold separately;
                  </li>
                  <li>
                    the right to use the software for your own business or
                    personal outreach.
                  </li>
                </ul>
                <p>
                  You may not share, resell or publish your key, or copy,
                  modify, reverse engineer or redistribute the software, except
                  where the law allows it. We own the software; you are buying a
                  license to use it, not the software itself.
                </p>
              </>
            ),
          },
          {
            id: 'your-responsibilities',
            title: 'How you use it',
            body: (
              <>
                <p>
                  4ruple writes emails and decks, but you decide what gets sent.
                  An email only goes out after you approve it. You are
                  responsible for:
                </p>
                <ul>
                  <li>
                    checking every email and deck before you approve it, because
                    AI-written text can contain mistakes;
                  </li>
                  <li>
                    following the laws that apply to your outreach, including
                    anti-spam and data protection laws where your recipients
                    live, and honouring requests to stop;
                  </li>
                  <li>
                    having the right to use any lead data you import, and
                    following the terms of Google (Gmail), Anthropic (Claude and
                    Claude Code), Apollo, Prospeo, Hunter or any other service
                    you connect;
                  </li>
                  <li>keeping your API keys, app password and license key safe.</li>
                </ul>
              </>
            ),
          },
          {
            id: 'third-parties',
            title: 'Other services',
            body: (
              <p>
                4ruple works with services we don’t run: your Claude Code
                sign-in, your Gmail account and any lead provider you choose.
                Their availability, pricing, limits and terms are set by those
                companies. 4ruple.ai is not affiliated with or endorsed by
                Anthropic, Google, Apollo, Prospeo or Hunter.
              </p>
            ),
          },
          {
            id: 'payments-refunds',
            title: 'Payments and refunds',
            body: (
              <p>
                Payments are processed by our payment partner; we never see or
                store your card details. You can ask for a refund within{' '}
                {REFUND_WINDOW_DAYS} days of purchase as described in our{' '}
                <a href="/refund-policy">refund policy</a>. A refund deactivates
                the key.
              </p>
            ),
          },
          {
            id: 'warranty',
            title: 'No guarantees',
            body: (
              <p>
                The software is provided as it is. Our deployment engineer checks
                your laptop’s compatibility before setup. The complete Windows
                and Linux workflows have not yet been validated. We don’t promise any particular
                number of replies, meetings or sales, or that the software will
                be free of errors or work with every account or service. We
                will fix problems we can reproduce on a reasonable-effort basis.
              </p>
            ),
          },
          {
            id: 'liability',
            title: 'Limit of liability',
            body: (
              <p>
                To the extent the law allows, we are not liable for indirect or
                consequential losses, such as lost profits, lost data or harm to
                your sender reputation. Our total liability for any claim about
                the software is limited to the amount you paid for your license.
                For services, it is limited to the fees paid under that
                engagement in the 12 months before the claim.
              </p>
            ),
          },
          {
            id: 'termination',
            title: 'Ending a license',
            body: (
              <p>
                If you break these terms, for example by sharing your key or
                using the software to send unlawful email, we may deactivate
                your license without a refund. You can stop using the software
                at any time.
              </p>
            ),
          },
          {
            id: 'changes-law',
            title: 'Changes and governing law',
            body: (
              <>
                <p>
                  We may update these terms. The date at the top of this page
                  shows the latest version, and changes don’t apply
                  retroactively to a license you already bought.
                </p>
                <p>
                  These terms are governed by the laws of {GOVERNING_LAW}. The
                  courts at {JURISDICTION_CITY} have jurisdiction over any
                  dispute. Please write to{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> first;
                  most issues are solved faster by email.
                </p>
              </>
            ),
          },
        ]}
      />
    </>
  );
}
