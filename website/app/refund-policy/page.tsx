/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
import { LegalPage } from '@/components/basement/legal';
import {
  CONTACT_EMAIL,
  REFUND_PROCESSING_DAYS,
  REFUND_WINDOW_DAYS,
} from '@/lib/business';
import { JsonLd, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Refund policy',
  description: `Full refund on a 4ruple.ai license within ${REFUND_WINDOW_DAYS} days of purchase if the key has not been activated on more than one device.`,
  path: '/refund-policy',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Refund policy', path: '/refund-policy' },
        ])}
      />
      <LegalPage
        crumb="Refund policy"
        eyebrow="LEGAL"
        title="Refund policy"
        intro={`If 4ruple.ai isn’t right for you, you can get a full refund of the amount you paid in your original payment currency within ${REFUND_WINDOW_DAYS} days.`}
        sections={[
          {
            id: 'eligible',
            title: 'Who can get a refund',
            body: (
              <>
                <p>You get a full refund if both of these are true:</p>
                <ul>
                  <li>
                    you ask within {REFUND_WINDOW_DAYS} days of the purchase
                    date on your receipt;
                  </li>
                  <li>
                    your license key has not been activated on more than one
                    device.
                  </li>
                </ul>
                <p>
                  Trying it on one laptop and deciding it isn’t for you is exactly
                  what this is for. You don’t need to give a reason.
                </p>
              </>
            ),
          },
          {
            id: 'how',
            title: 'How to ask',
            body: (
              <p>
                Reply to the email that delivered your license key, or write to{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the
                email address you bought with, and include your order or
                transaction reference.
              </p>
            ),
          },
          {
            id: 'what-happens',
            title: 'What happens next',
            body: (
              <>
                <p>
                  We confirm your request by email and refund the full amount to
                  your original payment method. Refunds usually reach you within{' '}
                  {REFUND_PROCESSING_DAYS} working days, depending on your bank.
                </p>
                <p>
                  <strong>A refund deactivates your license key.</strong> The
                  app stops working on every device that used it. Your data in
                  ~/.4ruple stays on your computer.
                </p>
              </>
            ),
          },
          {
            id: 'not-covered',
            title: 'When we can’t refund',
            body: (
              <p>
                After {REFUND_WINDOW_DAYS} days, or once a key has been
                activated on more than one device, a license can’t be refunded,
                except for a duplicate or mistaken charge or where the law
                requires it. Consulting and build engagements follow the refund
                terms in their own proposal or agreement. See also our{' '}
                <a href="/terms">terms</a>.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
