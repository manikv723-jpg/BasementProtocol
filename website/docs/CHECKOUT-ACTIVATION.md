# Razorpay checkout activation

The buy button now defaults to Razorpay and never falls back to Calendly. The separate Book a meeting button still uses Calendly. The dialog checks `/api/checkout-status` before accepting payment details.

## Production setup
In Vercel project basement-protocol, set these server-only Production variables:
- RAZORPAY_KEY_ID: the Live Mode key ID from Razorpay.
- RAZORPAY_KEY_SECRET: its secret.
- BLOB_READ_WRITE_TOKEN: existing private storage connection; already configured.

Razorpay is now the default; NEXT_PUBLIC_CHECKOUT_PROVIDER can optionally be razorpay. Redeploy after changing variables. Never prefix the secret with NEXT_PUBLIC_. Test keys require the explicit server-only RAZORPAY_ALLOW_TEST_MODE=true opt-in in Vercel production. The page and payment dialog visibly label the checkout as a test; no real money is charged and no license is issued.

The September 16 audit found only private Blob storage configured in production. The owner subsequently requested activation using the supplied test credentials. They are stored as sensitive Vercel server variables; public test checkout is explicitly enabled. Razorpay requires Live Mode keys to collect money: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/

## Verification
- 29 payment/configuration/region tests passed.
- Lint, TypeScript and production build passed.
- A real Razorpay test order for INR 9999 opened the Standard Checkout modal locally. No payment was made.
- A production build with credentials explicitly blank opened the unavailable dialog, with no email collection or Calendly redirect.

## Remaining operational work
After live credentials are supplied, verify provider authentication, allowed international currencies/payment methods and capture settings in Razorpay. Existing server signature verification saves authenticated payment responses privately; it does not certify capture or automatically issue and email a license. License fulfillment is separate and still needs an operational workflow. Do not treat signature verification as fulfillment.

## Current test deployment
The existing Next.js / TypeScript integration was reused; Razorpay SDK 2.9.8 was already installed. `.env` is excluded from git and deployment uploads, with owner-only file permissions. Only the public key ID is returned by the order endpoint; the secret remains server-side. Existing private Blob storage stores orders and signature verification records; no new database tables were created.

Test at /4ruple: Get started → enter a test email → Pay → Razorpay test modal. Use Razorpay sandbox methods only. Local testing: npm run dev -- --port 3006, then open http://localhost:3006/4ruple. Run npm run test:payments for validation, error, signature, regional price and configuration tests.

To collect real payments later: replace the server keys with Live Mode keys, set RAZORPAY_ALLOW_TEST_MODE=false and redeploy. Review capture and license fulfillment before real sales.

## Latest deployment verification
The public page shows the test-mode notice and opens the checkout dialog. Creating an order returned Razorpay HTTP 401. A direct read-only request to Razorpay with the exact user-supplied key pair also returned 401; the local environment values were confirmed to match the supplied pair without revealing them. No payment was made. A fresh valid test key pair is required to complete the deployed transaction test. The earlier local modal test preceded this latest credential failure and is not evidence that the current credentials work.

## Replacement credentials accepted
The owner supplied a different test key pair in a screenshot. After visually correcting one OCR-confused character, a direct authenticated Razorpay API request returned HTTP 200. The validated pair replaced the old local and sensitive Vercel credentials. No secret was added to application source or browser code. Public checkout remains explicitly labelled test mode.

The replacement-key deployment was verified on basementprotocol.com/4ruple: entering a fictional test email and clicking Pay created an order and opened Razorpay Standard Checkout showing INR 9,999 and the provider Test Mode ribbon. The old 401 error is resolved. No payment was completed or license issued.

## Live credential update — 16 September 2026
The owner subsequently changed the production credentials. Public checkout status now reports test_mode=false, which reflects the configured key prefix rather than successful provider authentication. After the owner confirmed updating both production variables again, deployment dpl_Hw2AfVHoJWE6sUh9R8rmx8yuDwDG completed successfully. A fresh INR 9999 create-order request still returned HTTP 401 (provider authentication failed). No payment was made. The newer production credentials were preserved; the older local test pair was not uploaded.

The checkout description now displays the test-license warning only in test mode. TypeScript and the production build passed, and the corrected live description was verified in the public browser. Authentication remains unresolved and requires a valid, matching provider key pair or investigation by Razorpay. Earlier successful test-mode verification does not establish live-mode readiness.

## Owner confirmation — 16 September 2026
The owner reported checkout working after saving the live key in Vercel. This supersedes the earlier authentication failure report. No live payment or automatic license delivery was independently verified during the GitHub handoff. Production credentials remain in Vercel and are not included in this repository.
