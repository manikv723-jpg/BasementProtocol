// Copy for the keyword landing pages. Facts only: no invented results, prices,
// timelines or clients. The FAQ text doubles as FAQPage structured data.
import type { Faq } from './seo';

export type LandingSection = {
  eyebrow: string;
  title: string;
  lead: string;
  items: [title: string, desc: string][];
};
export type LandingContent = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  serviceType?: string;
  crumb: string;
  kicker: string;
  title: string;
  accent: string;
  intro: string;
  sections: LandingSection[];
  faqTitle: string;
  faqs: Faq[];
  related: [label: string, href: string, desc: string][];
};

export const aiConsulting: LandingContent = {
  path: '/ai-consulting',
  metaTitle: 'AI Consulting Company in India',
  metaDescription:
    'AI consulting in India that ends in a working system. Basement Protocol scopes your business problem, then builds the AI agents, automation and dashboards.',
  serviceType: 'AI consulting',
  crumb: 'AI consulting',
  kicker: 'AI CONSULTING, BUILT IN INDIA',
  title: 'AI consulting that ends in',
  accent: 'a working system.',
  intro:
    'Basement Protocol is an AI consulting company based in India. We start with one business problem, agree what a useful outcome looks like, then design and build the AI agents, workflows and interfaces your team will actually use. Not a strategy deck that sits in a drawer.',
  sections: [
    {
      eyebrow: 'WHAT AI CONSULTING MEANS HERE',
      title: 'Advice is the first step, not the product.',
      lead: 'Most AI consulting stops at a recommendation. Ours continues into the build, so the answer to “what should we do with AI?” is a system your team runs.',
      items: [
        [
          'Understand the work',
          'Map the business goal, how the work happens today and where AI could genuinely help.',
        ],
        [
          'Define one use case',
          'Agree the first workflow, the inputs it needs and what a useful output looks like.',
        ],
        [
          'Build the system',
          'Develop the agents, automations and interfaces around that agreed scope.',
        ],
        [
          'Refine in context',
          'Review the system with the people using it and decide what improves next.',
        ],
      ],
    },
    {
      eyebrow: 'WHAT WE BUILD',
      title: 'Three kinds of AI systems.',
      lead: 'Engagements usually start with the part of the business that most needs to work better.',
      items: [
        [
          'Revenue systems',
          'Lead generation systems, SEO agents and market-entry workflows connected to a commercial goal.',
        ],
        [
          'Operating interfaces',
          'Role-specific dashboards and workspaces, such as a dealer dashboard built for a franchise.',
        ],
        [
          'Creative workflows',
          'Agents that turn brand context and briefs into creative output, with people reviewing before anything ships.',
        ],
      ],
    },
    {
      eyebrow: 'WHO WE WORK WITH',
      title: 'From Indian SMEs to a London HQ.',
      lead: 'Client identities stay confidential. The problems we solve don’t have to.',
      items: [
        [
          'Indian SMEs',
          'Trading businesses, service firms and dealer networks that run on enquiries, quotations, orders and follow-ups.',
        ],
        [
          'Growing companies',
          'Businesses that need a lead system, a search presence or a creative pipeline that doesn’t depend on one person.',
        ],
        [
          'Companies entering new markets',
          'Like the London-headquartered solar company that brought us in to build a lead system for its expansion into a new geography.',
        ],
      ],
    },
  ],
  faqTitle: 'AI consulting, answered.',
  faqs: [
    {
      q: 'What does an AI consulting company do?',
      a: 'An AI consulting company helps a business decide where AI is useful and how to put it to work. At Basement Protocol that means scoping a specific business problem and then building the system: custom AI agents, workflow automation or a dashboard, with people kept in control of decisions.',
    },
    {
      q: 'Is Basement Protocol an AI consulting company or an AI development company?',
      a: 'Both. We consult to define the right first use case, then we build it. Our delivered work includes a lead generation system plus SEO and creative workflow agents for a solar company, a lead generation system for a real estate business and a dealer dashboard for a franchise.',
    },
    {
      q: 'Do you offer AI consulting for small businesses in India?',
      a: 'Yes. We have a dedicated practice for Indian SMEs focused on practical systems for enquiries, quotations, order handoffs and owner visibility. You can start with one recurring workflow.',
    },
    {
      q: 'Do we need to know which AI tool to use before we talk?',
      a: 'No. Start with the business problem and how the work happens today. Choosing the models and tools is part of our job.',
    },
    {
      q: 'How much does AI consulting cost?',
      a: 'It depends on scope. The workflow, the interfaces and the integrations determine the work involved, so we don’t sell fixed packages. A 30-minute meeting is enough to discuss your needs and a suitable proposal.',
    },
    {
      q: 'Do you work with companies outside India?',
      a: 'Yes. We’re based in India and work with international clients, including a solar energy company headquartered in London.',
    },
    {
      q: 'What happens to our data?',
      a: 'Our standard mutual NDA commits us not to use client data to train AI models and covers data protection under India’s DPDP Act 2023 and the GDPR. Data access and integrations are agreed before we build.',
    },
  ],
  related: [
    [
      'AI agent development',
      '/ai-agent-development',
      'Custom agents for lead generation, search, creative work and quotations.',
    ],
    [
      'AI lead generation',
      '/ai-lead-generation',
      'The system we’ve built for solar and real estate businesses.',
    ],
    [
      'AI for Indian SMEs',
      '/smes',
      'Practical systems for enquiries, quotations and follow-ups.',
    ],
  ],
};

export const aiAgentDevelopment: LandingContent = {
  path: '/ai-agent-development',
  metaTitle: 'Custom AI Agent Development Company in India',
  metaDescription:
    'Custom AI agent development in India. Lead generation agents, SEO agents, creative workflow agents and quotation workflows, with human review built in.',
  serviceType: 'AI agent development',
  crumb: 'AI agent development',
  kicker: 'CUSTOM AI AGENTS',
  title: 'AI agents built around',
  accent: 'the way your business works.',
  intro:
    'A generic chatbot answers questions. A custom AI agent does a specific job inside your business: finds leads, drafts quotations, briefs creative work, keeps search content moving. Basement Protocol designs and builds those agents in India for SMEs and enterprises, with your team approving what matters.',
  sections: [
    {
      eyebrow: 'AGENTS WE BUILD',
      title: 'Agents with a job description.',
      lead: 'Each agent starts from a business outcome, not from a model.',
      items: [
        [
          'Lead generation agents',
          'Find and organise prospects for a defined market. Delivered for a solar company entering a new geography and for a real estate business.',
        ],
        [
          'SEO agents',
          'Keep search content and optimisation moving toward a commercial goal. Delivered as a follow-on request from our solar client.',
        ],
        [
          'Creative workflow agents',
          'Turn brand context and briefs into creative output for review. Delivered for the same solar engagement.',
        ],
        [
          'Enquiry and quotation agents',
          'Organise an incoming enquiry, assign an owner, draft the quotation and surface the follow-up. An example system for Indian SMEs, scoped per business.',
        ],
      ],
    },
    {
      eyebrow: 'HOW AN AGENT GETS BUILT',
      title: 'From brief to working agent.',
      lead: 'Human decisions stay in the workflow at every stage.',
      items: [
        [
          'Business context',
          'Capture what the agent needs to know: your offer, your customers, your rules.',
        ],
        [
          'A defined job',
          'Agree the inputs, the output and what counts as a good result.',
        ],
        [
          'Team review',
          'Build in review steps so people approve messages, prices and commitments.',
        ],
        [
          'Next action',
          'Connect the output to what your team does next, in the tools or interface they use.',
        ],
      ],
    },
  ],
  faqTitle: 'AI agents, answered.',
  faqs: [
    {
      q: 'What is a custom AI agent?',
      a: 'A custom AI agent is software that uses AI models to carry out a defined business task, such as generating leads, drafting a quotation or preparing a creative brief, using your business context and rules. Unlike a general chatbot, it’s built for one job and connected to your workflow.',
    },
    {
      q: 'How is a custom AI agent different from using ChatGPT?',
      a: 'ChatGPT is a general assistant that someone has to prompt every time. A custom agent carries your business context, follows a defined process, produces a consistent output and hands it to the right person for review.',
    },
    {
      q: 'What kinds of AI agents has Basement Protocol built?',
      a: 'Lead generation systems for a London-headquartered solar company and for a real estate business, plus an SEO agent and a creative workflow agent for the solar company. Client identities and commercial results are confidential.',
    },
    {
      q: 'Will AI agents replace our team?',
      a: 'No. We design agents to prepare, organise and draft, while your team keeps approvals, pricing and business decisions.',
    },
    {
      q: 'Can an AI agent work with WhatsApp and spreadsheets?',
      a: 'They can be the starting point. We look at how the work moves between your tools and agree what can be connected based on the access and permissions available. Specific integrations are part of the scope.',
    },
    {
      q: 'How much does AI agent development cost?',
      a: 'It depends on the job the agent does, the integrations it needs and the interface around it. Book a 30-minute meeting to scope it.',
    },
  ],
  related: [
    [
      'AI consulting',
      '/ai-consulting',
      'Not sure which agent comes first? Start with the business problem.',
    ],
    [
      'AI lead generation',
      '/ai-lead-generation',
      'The agent most of our engagements start with.',
    ],
    [
      'Enterprise case studies',
      '/enterprise#work',
      'Solar, real estate and franchise engagements.',
    ],
  ],
};

export const aiLeadGeneration: LandingContent = {
  path: '/ai-lead-generation',
  metaTitle: 'AI Lead Generation Systems for Businesses',
  metaDescription:
    'Basement Protocol builds AI lead generation systems. Delivered for a London-headquartered solar company entering a new market and for a real estate business.',
  serviceType: 'AI lead generation',
  crumb: 'AI lead generation',
  kicker: 'REVENUE SYSTEMS',
  title: 'An AI lead generation system',
  accent: 'for your next market.',
  intro:
    'Lead generation is where most of our engagements start. Basement Protocol builds AI lead generation systems that find, organise and route prospects, so your team spends its time on conversations, not lists. We’ve delivered them for a solar company entering a new geography and for a real estate business.',
  sections: [
    {
      eyebrow: 'WHERE WE’VE BUILT IT',
      title: 'Two industries. One starting point.',
      lead: 'Client identities, lead volumes and conversion results remain confidential.',
      items: [
        [
          'Solar energy, London HQ',
          'A lead system to support expansion into a new geography. The client then asked for an SEO agent and a creative workflow agent.',
        ],
        [
          'Real estate',
          'A dedicated lead generation system built for the business.',
        ],
      ],
    },
    {
      eyebrow: 'HOW THE SYSTEM WORKS',
      title: 'Context in. Clear next actions out.',
      lead: 'An illustrative flow. The final system is scoped around your business.',
      items: [
        [
          'Business context',
          'Your offer, your target market and what counts as a good lead.',
        ],
        [
          'Lead generation',
          'The system finds and organises prospects against that definition.',
        ],
        [
          'Team review',
          'Your team checks leads and messaging before any outreach.',
        ],
        ['Next action', 'Every lead gets a clear owner and a follow-up.'],
      ],
    },
    {
      eyebrow: 'WHAT OFTEN COMES NEXT',
      title: 'Lead generation is rarely the last system.',
      lead: 'Once leads flow, the next bottleneck shows up.',
      items: [
        [
          'SEO agents',
          'Build a search presence in the market you’re entering.',
        ],
        [
          'Creative workflow agents',
          'Produce the creative your campaigns need from your brand context.',
        ],
        [
          'Sales follow-up workflows',
          'Make sure every enquiry gets a quotation and a next step.',
        ],
      ],
    },
  ],
  faqTitle: 'AI lead generation, answered.',
  faqs: [
    {
      q: 'What is an AI lead generation system?',
      a: 'An AI lead generation system uses AI to find, organise and prioritise potential customers against a definition your business agrees, then routes them to your team with a clear next action. People stay in charge of outreach decisions.',
    },
    {
      q: 'Which industries has Basement Protocol built lead generation systems for?',
      a: 'Solar energy, for a company headquartered in London that was expanding into a new market, and real estate. Each system starts from the client’s business context, so the approach isn’t limited to those industries.',
    },
    {
      q: 'Can AI lead generation help us enter a new market?',
      a: 'That’s how our solar engagement started: a lead system for a new geography, which later grew into SEO and creative workflow agents for the same market.',
    },
    {
      q: 'What results have your lead generation systems produced?',
      a: 'Commercial performance figures are confidential to our clients and haven’t been disclosed. We’re happy to walk through how the systems work in a meeting.',
    },
  ],
  related: [
    [
      'AI agent development',
      '/ai-agent-development',
      'SEO, creative and quotation agents that build on a lead system.',
    ],
    [
      'The solar engagement',
      '/enterprise#solar',
      'How one lead system grew into a wider AI brief.',
    ],
    [
      'AI consulting',
      '/ai-consulting',
      'Start from the business problem instead of the tool.',
    ],
  ],
};

export const about: LandingContent = {
  path: '/about',
  metaTitle: 'About Us',
  metaDescription:
    'Basement Protocol is an AI consulting and build studio based in India, built in 2026. We build AI systems for businesses, companies and individuals.',
  crumb: 'About',
  kicker: 'ABOUT BASEMENT PROTOCOL',
  title: 'Better systems',
  accent: 'for the way you work.',
  intro:
    'Basement Protocol is an AI consulting and build studio based in India, built in 2026. We build native AI systems for businesses, intelligence tools for companies and AI workflows for individuals.',
  sections: [
    {
      eyebrow: 'WHAT WE DO',
      title: 'Three ways to make work work better.',
      lead: 'One protocol: understand the problem, build the right system, put it to work.',
      items: [
        [
          'Native AI for businesses',
          'Custom AI agents, workflows and interfaces for enterprises and Indian SMEs, from lead generation to dealer dashboards.',
        ],
        [
          'Intelligence for companies',
          '4ruple.ai, our sales outreach app that runs on your laptop, and Dipstick, our upcoming D2C intelligence platform for benchmarking brands across quick commerce, advertising, websites and social.',
        ],
        [
          'Workflows for individuals',
          'Marketing and Corporate, upcoming AI workflows designed around the work people actually do.',
        ],
      ],
    },
    {
      eyebrow: 'HOW WE WORK',
      title: 'The work comes first.',
      lead: 'A clear business brief comes before a model, a tool or an interface.',
      items: [
        [
          'Problem before tools',
          'We start from how the work happens today, not from the latest model.',
        ],
        [
          'People in control',
          'Approvals, pricing and business decisions stay with your team.',
        ],
        [
          'Confidential by default',
          'Client identities stay confidential, and our standard NDA bars training AI models on client data.',
        ],
      ],
    },
  ],
  faqTitle: 'About us, answered.',
  faqs: [
    {
      q: 'What is Basement Protocol?',
      a: 'Basement Protocol is an AI consulting and build studio. It designs and builds custom AI agents, workflow automation and business dashboards for enterprises and Indian SMEs, and is developing Dipstick, a D2C intelligence platform.',
    },
    {
      q: 'Where is Basement Protocol based?',
      a: 'India. We work with clients in India and internationally.',
    },
    {
      q: 'When was Basement Protocol built?',
      a: 'Basement Protocol was built in 2026.',
    },
    {
      q: 'How do I contact Basement Protocol?',
      a: 'Book a 30-minute meeting at calendly.com/team-manikai/30min to talk about the work you want to improve.',
    },
  ],
  related: [
    [
      'AI consulting',
      '/ai-consulting',
      'How an engagement starts and what it ends in.',
    ],
    [
      'Enterprise case studies',
      '/enterprise#work',
      'Solar, real estate and franchise engagements.',
    ],
    [
      'AI for Indian SMEs',
      '/smes',
      'Practical systems for enquiries, quotations and follow-ups.',
    ],
  ],
};
