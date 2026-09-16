// llms.txt: a plain-text brief for AI assistants and answer engines.
// Keep every line factual; assistants quote it.
import { CONTACT_EMAIL, LICENSE_DEVICE_LABEL, REGIONAL_PRICE_LABEL } from '@/lib/business';

const body = `# Basement Protocol

> Basement Protocol is an AI consulting and build studio based in India. It designs and builds custom AI agents, workflow automation and business dashboards for enterprises and Indian SMEs.

Built in 2026. Works in English and Hindi. Serves clients in India and internationally.

## What Basement Protocol does
- AI consulting that ends in a working system: scope one business problem, then build the agents, workflows and interfaces around it.
- Custom AI agent development: lead generation agents, SEO agents, creative workflow agents and enquiry-to-quotation workflows.
- AI systems for Indian SMEs: practical workflows for enquiries, quotations, order handoffs and owner visibility, with people approving what goes out.
- Operating interfaces: role-specific dashboards, such as a dealer dashboard for a franchise.

## Delivered engagements (client identities confidential)
- Solar energy company headquartered in London: a lead generation system for entering a new market, followed by an SEO agent and a creative workflow agent.
- Real estate business: a dedicated lead generation system.
- Franchise business: a custom dashboard for its dealers.
Commercial results for these engagements have not been disclosed.

## Products
- 4ruple.ai (available): an outreach and lightweight sales CRM workspace that runs on the buyer's laptop. It finds people at target companies (with the buyer's own Apollo, Prospeo or Hunter key, or a CSV), writes each a personal email, two follow-ups and a 4-page deck using the buyer's own Claude Code sign-in, and sends from the buyer's Gmail only after approval. Our deployment engineer installs and configures it locally with npx 4ruple. Use your own paid Claude subscription. Workspace storage is local; Claude, Gmail and connected lead providers process the data needed for their services. This is not an offline-only product. Book a meeting to see it before buying. One-time lifetime license, ${REGIONAL_PRICE_LABEL}, for ${LICENSE_DEVICE_LABEL}, with updates to version 0.x. Windows and Linux compatibility must be confirmed with our deployment engineer before purchase. https://basementprotocol.com/4ruple
- Dipstick (coming soon): a D2C intelligence platform for benchmarking brands across quick commerce, advertising, websites and social.
- Marketing and Corporate (coming soon): AI workflows for individuals.

## How to engage
- Book a 30-minute meeting: https://calendly.com/team-manikai/30min
- Consulting and build services: pricing depends on scope; there are no fixed service packages.
- 4ruple.ai is the one fixed-price product: a one-time lifetime software license: ${REGIONAL_PRICE_LABEL}, with engineer-led setup.
- Email: ${CONTACT_EMAIL}

## Pages
- [Home](https://basementprotocol.com/)
- [AI consulting](https://basementprotocol.com/ai-consulting)
- [AI agent development](https://basementprotocol.com/ai-agent-development)
- [AI lead generation systems](https://basementprotocol.com/ai-lead-generation)
- [AI systems for Indian SMEs](https://basementprotocol.com/smes)
- [Enterprise AI and case studies](https://basementprotocol.com/enterprise)
- [About](https://basementprotocol.com/about)
- [4ruple.ai](https://basementprotocol.com/4ruple)
- [Contact](https://basementprotocol.com/contact)
- [Terms of service](https://basementprotocol.com/terms)
- [Privacy policy](https://basementprotocol.com/privacy)
- [Refund policy](https://basementprotocol.com/refund-policy)
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
