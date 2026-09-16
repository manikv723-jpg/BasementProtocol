/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a verified Vinext production RSC router failure. */
import { SiteFrame } from '@/components/basement/frame';
import { LegalHero } from '@/components/basement/legal';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GRIEVANCE_OFFICER_EMAIL,
  GRIEVANCE_OFFICER_NAME,
  LEGAL_NAME,
  REGISTERED_ADDRESS,
  RESPONSE_DAYS,
} from '@/lib/business';
import {
  BOOKING_URL,
  JsonLd,
  SITE_URL,
  breadcrumbSchema,
  pageMetadata,
} from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description: `Contact ${LEGAL_NAME} about AI consulting, a 4ruple.ai license, support or refunds.`,
  path: '/contact',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: `${SITE_URL}/contact`,
            about: { '@id': `${SITE_URL}/#organization` },
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
      <SiteFrame>
        <LegalHero
          crumb="Contact"
          eyebrow="CONTACT"
          title="Talk to us."
          intro={`Questions about a project, a 4ruple.ai license, support or a refund. We reply within ${RESPONSE_DAYS} working days.`}
          updated={false}
        />
        <div className="contact-body">
          <div className="legal-details">
            <div>
              <span className="mono">EMAIL</span>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <small>Support, licenses, refunds and general questions.</small>
            </div>
            <div>
              <span className="mono">BOOK A MEETING</span>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                30 minutes on Calendly
              </a>
              <small>For consulting and custom AI agent projects.</small>
            </div>
            <div>
              <span className="mono">PHONE</span>
              <p>{CONTACT_PHONE}</p>
            </div>
            <div>
              <span className="mono">REGISTERED ADDRESS</span>
              <p>
                {LEGAL_NAME}
                <br />
                {REGISTERED_ADDRESS}
              </p>
            </div>
            <div>
              <span className="mono">GRIEVANCE OFFICER</span>
              <p>{GRIEVANCE_OFFICER_NAME}</p>
              <a href={`mailto:${GRIEVANCE_OFFICER_EMAIL}`}>
                {GRIEVANCE_OFFICER_EMAIL}
              </a>
            </div>
            <div>
              <span className="mono">BOUGHT 4RUPLE.AI?</span>
              <p>Reply to your purchase email.</p>
              <small>
                It carries your order details, so we can help faster. See the{' '}
                <a href="/refund-policy">refund policy</a>.
              </small>
            </div>
          </div>
        </div>
      </SiteFrame>
    </>
  );
}
