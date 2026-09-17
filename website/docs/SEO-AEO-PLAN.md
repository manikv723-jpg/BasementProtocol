# Getting found on Google and in AI answers

Written 17 September 2026, from live checks, not from general SEO advice. Every claim here was verified on the day; where it wasn't, it says so.

## Where we actually stand

- **The domain is effectively not in any index.** A `site:basementprotocol.com` search returns only an unrelated US podcast, Basement Protocol Productions. Nothing was ever submitted: there is no Search Console verification on the site.
- **Technical SEO is not the blocker.** Pages are indexable with canonicals, the sitemap lists 12 URLs, robots.txt allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Bingbot, and llms.txt exists and is accurate.
- **No page targets the phrases buyers use.** `/smes` targets "AI Automation for SMEs in India" and `/ai-consulting` targets "AI Consulting Company in India". The phrase "consulting for SME" appears zero times on either.
- **Nothing links to us.** No directory, listicle, news mention or profile anywhere.

## Why assistants name other firms and not us

Asked for an end-to-end AI implementation partner for an Indian SME, ChatGPT named ZenxAI, ZeroOne D.O.T.S AI, Lecxe, NVSX Labs, Saksham Labs and SenseGrid AI.

- **Every specific it quoted is published verbatim on those companies' own sites.** ZenxAI states "₹8,000 a month", Zoho, Tally, Shopify and Razorpay, GST-invoice-friendly workflows, Hindi-first, a 14-day deploy and a Noida address. NVSX Labs states WhatsApp receptionists, "Hindi, Hinglish, Marathi, Tamil, Telugu", Tally XML and Zoho Books, "₹15K to ₹35K a month per location plus ₹50K setup", and a Baner, Pune address. SenseGrid states Kochi, "12+ Indian Languages", Tally and WhatsApp ordering.
- **None of them are on Clutch or GoodFirms.** The two leading "top AI automation agencies India 2026" listicles name TCS, Infosys, Haptik and LeewayHertz, not any of the six.
- **Lecxe is the exception, and the cheapest lesson.** One PRNewswire release on 8 September 2026, syndicated to Tribune India, LatestLY and Punjab Kesari. Nine days later it is being recommended. PRNewswire India pricing is quote-only and unverified.
- **llms.txt does nothing.** Neither ZenxAI nor NVSX Labs has one, and both get named. Ours is accurate, so leave it, but do not invest further in it.
- **What is actually documented:** OpenAI publishes only that OAI-SearchBot surfaces sites in ChatGPT search, and that blocking it removes you from those answers. No provider documents ranking logic. That ChatGPT Search leans on Bing's index is widely reported but never confirmed by OpenAI.

The plain version: be in the index, and publish the specific fact the question asks for. We currently publish neither.

One more thing worth knowing: the six named firms included "ZeroOne D.O.T.S AI", which could not be found to exist at all. Assistants invent vendors when the retrievable set is thin. That is the opportunity.

## What the competition actually publishes

This is the bar to clear, quoted from their own pages on 17 Sep 2026.

- **ZenxAI** (zenxai.in): "₹8,000 a month". Zoho, Tally, Shopify, Razorpay and Google. "GST-invoice-friendly workflows". Hindi-first. Noida, Sector 3, F-7. "14 days", stated six times. "Team trained in 30 minutes". "300 follow-up and reminder calls a day". And a guardrail sentence: "Our bots say 'I'll check with the team' instead of inventing answers". No named clients anywhere.
- **NVSX Labs** (labs.nvsx.in): a full price list. WhatsApp Receptionist "₹15K to ₹35K a month per location plus ₹50K setup". Voice Agent "₹25K to ₹50K a month plus ₹6 to ₹12 a minute". Document processing, AI SDR and custom agents each priced. Tally XML and Zoho Books named by API. Languages listed individually. A street address in Baner, Pune.
- **SenseGrid AI** (sensegridai.com): Kochi. "12+ Indian Languages". Tally, UPI, COD, WhatsApp. Governance language: DPDP and TRAI aware, ISO 42001 aligned, actions "logged and auditable", human approval gates. No pricing at all, and it still gets named.
- **Lecxe**: thin site, one PR release, recommended nine days later.

Note what none of them have: a named client, a case study with numbers, or a directory profile. Specificity about the service beats proof of results for this particular question.

## The five decisions that unblock everything

Step 1 below cannot happen until the owner commits to these in public. Defaults are benchmarked against what the named competitors publish, so they are defensible starting points, not invented claims. Only publish what we will actually honour.

1. **A starting price.** ZenxAI publishes "₹8,000 a month" and NVSX "₹15K to ₹35K a month per location plus ₹50K setup". A first engagement price, or even a "from" figure with what it covers, makes the page quotable. Not publishing a number is the single reason an assistant cannot name us in a price-aware answer.
2. **A city.** Every competitor names one, down to the street in two cases. Even "Delhi NCR" or "Bengaluru" is enough. This is also the one honest way to compete on "near me" and India-qualified phrases.
3. **Named integrations we can genuinely deliver.** Candidates: WhatsApp Business API, Tally, Zoho, Razorpay, Shopify, Google Sheets, email. Only list what we have actually built against, because the first sales call will test it.
4. **Languages.** English and Hindi are already in our schema. Competitors list five or more. Confirm what we can truly support in a delivered system.
5. **A delivery timeline.** ZenxAI repeats "14 days" six times, which is why it gets quoted. A first working process in N weeks, stated plainly, with what N covers.

Everything else in this document is either free and mechanical, or worthless without these.

## What to do, in order

1. **Put hard specifics on the money pages.** Free, one day of work, and the only change that separates us from the six. It needs the owner to publicly commit to: a starting rupee price, a named city, named integrations (Tally, GST, Razorpay, WhatsApp Business API, Zoho), the languages we support, and a delivery timeline. Everything below is close to worthless without this.
2. **Get into Bing's index.** Verify at bing.com/webmasters (owner does the DNS or meta check; the metadata hook is already in `app/layout.tsx`, set `BING_SITE_VERIFICATION`). All 12 URLs were submitted to IndexNow on 17 Sep 2026 and accepted. Google ignores IndexNow, so Search Console is a separate job.
3. **Verify Search Console** with whichever Google account will own this long term, then submit the sitemap. Set `GOOGLE_SITE_VERIFICATION` in Vercel.
4. **Add `sameAs` and a city to the Organization schema** once the profiles in step 5 exist. Documented disambiguation signal, though Google guarantees nothing.
5. **Free directory profiles that AI crawlers can read:** designrush.com/submit/agency (needs a phone number), topdevelopers.co Basic, crunchbase.com/add-new, F6S. Each needs entity name, registration and a verifiable address.
6. **LinkedIn company page.** Free, worth it for the brand search result, but its robots.txt blocks GPTBot, ClaudeBot and PerplexityBot, so it will not feed AI answers. Ignore anyone selling LinkedIn as an AI-visibility play.
7. **Later, once named case studies exist:** GoodFirms has a four-step review and a stated 23% acceptance rate. Clutch gates visibility behind a 24-month qualifying-review window; note `clutch.co/get-listed` is a live 404, use clutch.co/advertise. The Manifest mirrors Clutch automatically, so it needs no submission and no budget.

## Deploying this, and what to do straight after

1. Review the new page at `/ai-consulting-for-smes` and the rewritten `/smes`. They publish how we work, so they are business claims, not just marketing copy.
2. Fill in the five decisions above, because the page currently answers "how much does it cost" with "scoped per project" and "how long does it take" with "agreed in writing after scoping". Both are honest and both are exactly what stops an assistant quoting us.
3. Deploy: `vercel --prod` from the site folder. Checks that passed before deploying on 17 Sep 2026: typecheck, lint, production build, and page captures at 1440 and 390.
4. Resubmit to IndexNow afterwards, including the new URL, so Bing and the ChatGPT-facing index see it:
   ```sh
   curl -X POST https://api.indexnow.org/indexnow -H "Content-Type: application/json" \
     -d '{"host":"basementprotocol.com","key":"c12b7e3bbce67815b94729dc9b4a1a0e",
          "keyLocation":"https://basementprotocol.com/c12b7e3bbce67815b94729dc9b4a1a0e.txt",
          "urlList":["https://basementprotocol.com/ai-consulting-for-smes","https://basementprotocol.com/smes"]}'
   ```
5. Verify Search Console, set `GOOGLE_SITE_VERIFICATION` in Vercel, redeploy, then submit the sitemap. Same for Bing with `BING_SITE_VERIFICATION`.
6. Check back in two weeks: search `site:basementprotocol.com` and ask ChatGPT the original question. If the pages are indexed but still not quoted, the missing piece is the specifics in the five decisions, not more pages.

## Not worth money right now

GoodFirms Pro ($588/yr), TopDevelopers Premium ($399/mo), DesignRush premium (from $200/mo), Clutch Verified and sponsorships (figures secondary and unverified), IndiaMART Maximiser and TrustSEAL, Justdial paid tiers, AI-visibility monitoring SaaS, and defensive domain buys. All of them convert on reviews and case studies we do not have yet.

## Two things that cannot be fixed by effort

- **Google Business Profile is likely ineligible.** Google requires a location customers can visit or travel to. A laptop-only studio does not qualify, and 2026 video verification asks for live footage showing the business operating.
- **The brand name collision is not winnable head-on.** Knowledge panels and site names are auto-generated and cannot be requested, and Wikidata would reject us on notability. Target qualified phrases such as "Basement Protocol AI India" instead.

## The honest timeline

Ranking for a competitive informational phrase like "AI consulting for SMEs" takes months, published content and links. Being named in AI answers can move faster, because assistants repeat specific facts they can retrieve, which is exactly what step 1 fixes. Nobody can promise either.
