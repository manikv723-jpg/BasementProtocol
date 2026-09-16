export type AssistantName = 'ChatGPT' | 'Claude' | 'Perplexity' | 'Gemini';
export const COMPANY_PROMPT =
  'Explain Basement Protocol using only these supplied facts: Basement Protocol builds AI systems for work. Its enterprise offering is native AI: custom agents, workflows and interfaces built around business needs. Selected engagements include a lead generation system for a London-headquartered solar company expanding into a new geography; the client then requested an SEO agent and a creative workflow agent. Other completed builds are lead generation for a real estate business and a dealer dashboard for a franchise. Client identities, commercial results and detailed product capabilities are not disclosed. A dedicated Indian SME practice focuses on practical systems for enquiries, quotations, order handoffs and owner visibility. These are example workflows to scope with a business, not fixed product promises. Second, tools for companies: 4ruple.ai is available now, an outreach and lightweight sales CRM workspace that runs on the buyer\'s laptop; it finds people at target companies, writes each a personal email, two follow-ups and a 4-page deck with the buyer\'s own Claude Code sign-in, and sends from their Gmail only after approval. It is a one-time lifetime license for 1 device: ₹9,999 in India or US$100 internationally. A deployment engineer installs and configures it on the buyer’s laptop. It runs locally with npx 4ruple and uses the buyer’s own paid Claude subscription. Workspace storage is local; Claude, Gmail and connected lead providers process data for their services. Visitors can book a meeting to see it before buying. Dipstick is a coming-soon D2C Intelligence Platform for benchmarking commerce, advertising, websites and social. Its demo replays stored runs, not live data. Third, individual AI workflows: Marketing and Corporate are both coming soon. Marketing connects brand context, a 30-day content calendar, copy, creatives and team review; further Corporate features are not announced. Summarise who each offering is for. Do not invent results, clients, pricing or launch dates.';

const assistants: Record<AssistantName, string> = {
  ChatGPT: 'https://chatgpt.com/',
  Claude: 'https://claude.ai/new',
  Perplexity: 'https://www.perplexity.ai/search',
  Gemini: 'https://gemini.google.com/app',
};
export function assistantUrl(name: AssistantName) {
  return `${assistants[name]}?q=${encodeURIComponent(COMPANY_PROMPT)}`;
}
