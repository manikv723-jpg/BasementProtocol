# Basement Protocol website

Editable source for [basementprotocol.com](https://basementprotocol.com). Built with Next.js 16.3.4, React 19, TypeScript, Tailwind CSS 4 and Motion. It runs independently of ChatGPT Sites.

This repository contains the marketing website and its checkout backend. The separately installed `npx 4ruple` sales application and license-issuing service are separate codebases.

## Run on your laptop

Use Node.js **22.22.3 or a newer compatible release** and npm.

```sh
git clone https://github.com/manikv723-jpg/BasementProtocol.git
cd BasementProtocol/website
npm ci
cp .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). If that port is busy, run `npm run dev -- --port 3001`.

The pages run without payment credentials. To test checkout, add your own **test** Razorpay key pair to the ignored `.env.local`. Do not copy live keys onto a shared development machine. Without keys, the checkout explains that payment is unavailable. Local submissions and checkout records are stored privately under `data/`, which is excluded from Git.

## Where to make changes

| Change | File |
| --- | --- |
| Homepage | `components/basement/site.tsx` |
| 4ruple page and offer layout | `components/basement/fouruple.tsx` |
| 4ruple FAQ copy | `lib/fouruple-content.ts` |
| Product screenshots | `public/4ruple/` |
| Screenshot presentation | `components/basement/product-showcase.tsx` |
| Enterprise services | `components/basement/enterprise.tsx` |
| Indian SME page | `components/basement/smes.tsx` |
| Dipstick and individual templates | `components/basement/products.tsx` |
| Navigation and footer | `components/basement/frame.tsx` |
| Company details, pricing constants and Calendly | `lib/business.ts` |
| Regional pricing | `lib/pricing.ts`, `lib/pricing-server.ts` |
| Main and product styles | `app/globals.css`, `app/fouruple.css` |
| Checkout dialog | `components/basement/checkout.tsx` |
| Server order creation and signature verification | `lib/razorpay.ts` |
| Private submission/payment storage | `lib/lead-store.ts` |
| Page titles, metadata and structured data | `app/`, `lib/seo.tsx`, `lib/landing-schema.tsx` |

Current offer: **₹9,999 in India / US$100 elsewhere**, paid once for a **lifetime license on 1 device**, with deployment-engineer setup on the customer's laptop. The buyer uses their own paid Claude subscription. Windows compatibility is checked with the engineer; do not present it as fully validated.

Pricing uses Vercel's visitor-country header on production. For a local international preview, set `FOURUPLE_PREVIEW_COUNTRY=US` in `.env.local` and restart. The local default is India. These are fixed regional prices, not currency conversion.

## Environment variables

Start from `.env.example`. **No real credentials are included.**

| Variable | Purpose |
| --- | --- |
| `RAZORPAY_KEY_ID` | Server-side Razorpay key ID; only this public ID is supplied to Checkout |
| `RAZORPAY_KEY_SECRET` | Server-only API secret; never prefix with `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_CHECKOUT_PROVIDER` | `razorpay` for Standard Checkout |
| `RAZORPAY_ALLOW_TEST_MODE` | Keep `false` for real sales; `true` explicitly allows labelled test checkout on Vercel Production |
| `BLOB_READ_WRITE_TOKEN` | Required private Vercel Blob storage token, configured in Vercel |
| `FOURUPLE_LICENSE_API` | Optional server endpoint used by license-management actions |
| `FOURUPLE_DEMO_ISSUE_URL` | Local demo issuer only, ignored in production |
| `FOURUPLE_PREVIEW_COUNTRY` | Local regional-price preview only |

Save production values in the existing Vercel project's Environment Variables, select Production, and redeploy. Use a matching key ID and secret generated together. The owner confirmed checkout working after saving the live credentials on 16 September 2026; this handoff did not complete a live payment.

## Razorpay checkout

1. Open `/4ruple`, click **Get started**, enter an email, then click **Pay**.
2. The server creates an order at `POST /api/create-order`, validates the regional price, and saves the order privately before returning its ID.
3. Razorpay Standard Checkout opens. The success callback sends the three payment fields to `POST /api/verify-payment`.
4. The server verifies HMAC-SHA256 against the original stored order and saves an idempotent signature-verification record.

Test locally with Razorpay sandbox payment methods. Verify cancellation, failure and successful signature verification. Never use a real card to test a live payment unless you intend to make the purchase.

**Fulfillment boundary:** a valid signature is not proof of capture. Automatic license issuance and license emails are not implemented by this website's verification endpoint. Capture confirmation, one-device license issuance, email delivery and refund handling belong to the separate license service and still require an independently verified operational workflow. Do not infer fulfillment from a working payment modal.

## Check changes

```sh
npm run lint
npm run test:payments
npm run build
npm run typecheck
```

The payment tests use mocks: no real credentials, network calls or charges. Building may need internet access to download fonts. `npm start` serves the production build.

Optional submission tests: run `TEST_ORIGIN=http://localhost:3000 node scripts/test-api.mjs` **against an isolated local test instance only**. They write test records and exercise rate limiting.

## Save changes to GitHub

```sh
git switch -c update-website
# Edit the files and run the checks above.
git add .
git diff --cached
git commit -m "Update website copy and layout"
git push -u origin update-website
```

Open a pull request into `main` on GitHub. You can also edit a file using GitHub's pencil button and create a branch/pull request there. Never commit `.env`, `.env.local`, `.vercel`, `data/`, or API keys.

## Deploy with the existing Vercel project

The live project is **basement-protocol**. Its credentials, private Blob store and custom domains remain configured in Vercel; they are not stored in this repository.

For automatic deploys after merging:

1. Open the existing Vercel project and use its **Connect Git** control to select `manikv723-jpg/BasementProtocol`.
2. Set **Root Directory** to `website`, framework to Next.js, and production branch to `main`.
3. Retain the existing Production environment variables, private Blob connection, and `basementprotocol.com` / `www.basementprotocol.com` domains.
4. Redeploy and verify the homepage, `/4ruple`, and checkout. Future merges to `main` can then deploy automatically.

GitHub publishing alone does not connect Vercel. Do not create a second hosting project or change GoDaddy DNS for this source handoff.

Alternatively deploy manually from `website/` with the Vercel CLI, linking to the existing project first:

```sh
npx vercel link
npx vercel --prod
```

## Private records and existing documentation

Production records are in the **private** Vercel Blob store. No public submission or payment listing exists. Use Vercel Storage to retrieve records. `scripts/cleanup-limits.mjs` defaults to a dry run for expired rate-limit records.

The `docs/` folder contains design and checkout history. Historical entries may describe superseded deployments; this README describes the current source. Confirm the bracketed legal/business placeholders in `lib/business.ts` with the business owner before relying on those details.
