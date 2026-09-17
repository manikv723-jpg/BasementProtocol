// Copy for /ai-consulting-for-smes, the long-form buyer guide.
// Facts only: no invented clients, results, prices or durations. Named tools are
// described as candidates a scope usually touches, never as delivered integrations.
// The FAQ text below doubles as FAQPage structured data, so it must stay in sync
// with what components/basement/sme-guide.tsx renders.
import type { Faq } from './seo';

export type Pair = [title: string, desc: string];

// The visible /smes FAQ. Rendered by components/basement/smes.tsx and emitted as
// FAQPage structured data by app/smes/page.tsx, so both read the same words.
export const smeFaqs: Faq[] = [
  {
    q: 'Can we start small?',
    a: 'Yes. Start with one recurring workflow. We can use the first conversation to understand the problem and discuss a focused scope.',
  },
  {
    q: 'We use WhatsApp and spreadsheets. Is that a starting point?',
    a: 'Yes. Show us how the work moves between them. Business messaging on WhatsApp runs through the WhatsApp Business API under Meta’s template and opt-in rules, and a Google Sheet your team already trusts is often the fastest shared list to build on. Specific integrations are confirmed against your own accounts during scoping.',
  },
  {
    q: 'Can you connect to Tally, Zoho, Razorpay or Shopify?',
    a: 'Those are the usual candidates in a scope, alongside WhatsApp, Google Sheets and a shared email inbox. Accounting data generally moves through an export or an official connector rather than direct writes. What is possible depends on what each tool allows and the access you can give, so it is agreed before anything is promised.',
  },
  {
    q: 'What does a first engagement cover?',
    a: 'One process. The workflow, the integrations it needs, the interface your team uses, the points where a person approves what goes out, and training at handover. Delivery runs in four stages: scope, build, pilot on that one process, then handover and training.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends on how many tools the scope touches and how quickly access and answers come from your side, so we agree the duration in writing at the end of scoping rather than publishing a fixed one. Limiting the first engagement to one process keeps it reviewable.',
  },
  {
    q: 'Does our team need to learn AI first?',
    a: 'You can begin with your knowledge of the business. The conversation starts with the process your team already understands and the work you want to improve.',
  },
  {
    q: 'Will the system message our customers on its own?',
    a: 'Not unless you decide it should. Quotations, prices, delivery promises and customer messages are drafted by the system and released by a person on your team.',
  },
  {
    q: 'How much will it cost?',
    a: 'Scope comes first. There is no rate card and no fixed service packages: the workflow, interfaces and integrations determine the work involved, so each engagement is quoted per project after the first conversation. Book a meeting so we can discuss your needs and a suitable proposal.',
  },
];

export const smeGuide = {
  path: '/ai-consulting-for-smes',
  metaTitle: 'AI Consulting for SMEs in India',
  metaDescription:
    'AI consulting for SMEs in India: where small businesses lose time, what a working system connects to, how a build runs, what it costs and what to ask any partner.',
  serviceType: 'AI consulting and implementation for small and medium enterprises',
  crumb: 'AI consulting for SMEs',
  kicker: 'AI CONSULTING FOR SMEs, BUILT IN INDIA',
  title: 'AI consulting for an SME,',
  accent: 'end to end.',
  intro:
    'Most AI advice aimed at small and medium businesses stops at possibility. This page is the other half. What AI consulting for an SME actually involves, the four processes where Indian SMEs lose the most time, what a working system connects to, how a build runs, what drives the cost, and the questions worth asking any implementation partner, including this one.',

  meaning: {
    eyebrow: 'WHAT IT ACTUALLY MEANS',
    title: 'One process, scoped and built.',
    paragraphs: [
      'For an SME, AI consulting is not a research exercise. It is the work of picking one process that already costs your team hours every week, agreeing what a good outcome looks like, and then building software that handles the repetitive part while your people keep the decisions. The consulting and the building belong in the same engagement. Split them and you pay twice for a recommendation that rarely survives contact with your actual data.',
      'The unit of work is a process, not a department. A business with fifteen people does not need an AI strategy. It needs the enquiry that arrives on WhatsApp at 9pm to still have an owner and a drafted reply the next morning. That is a scope you can finish, review and judge.',
    ],
    notTitle: 'And what it is not',
    not: [
      [
        'A chatbot on the website',
        'A widget that answers frequently asked questions does not touch the work that costs your team its evenings.',
      ],
      [
        'Another tool subscription',
        'Software your team has to remember to open is a licence, not a system. It gets abandoned around week six.',
      ],
      [
        'A model trained on your business',
        'Useful systems combine existing models with your context, your rules and your data access. Training a model is rarely the right answer at SME scale.',
      ],
      [
        'Automation without approval',
        'Anything that can quote a price, promise a date or message a customer needs a person releasing it.',
      ],
    ] as Pair[],
  },

  lost: {
    eyebrow: 'WHERE THE TIME GOES',
    title: 'Four places an Indian SME loses time today.',
    lead: 'Almost every first engagement sits in one of these four. Ordinary, repetitive and expensive, which is exactly why they are worth building around.',
    items: [
      [
        'Enquiries',
        'An enquiry arrives on WhatsApp, a phone call, a website form or an email to a shared inbox. Four channels, four ways to lose it. At the end of the week nobody can say how many came in, who answered which, or which ones went quiet. The first system most SMEs need is not clever. It is one list with an owner against every row.',
      ],
      [
        'Quotations',
        'The rate list is in one spreadsheet, last month’s quotation is in somebody’s sent folder, and the discount that was approved verbally is in nobody’s. Preparing a quotation becomes a search task before it becomes a pricing decision. Pulling the right items, rates and terms into a draft is the part software can do. Approving the number stays with your team.',
      ],
      [
        'Order handoffs',
        'Sales knows what was promised. Operations needs the specification, the delivery date and the payment terms. The gap between them is usually a phone call to the owner. A handoff that turns a confirmed order into a checklist with named responsibilities removes that call, and removes the argument three weeks later about what was actually agreed.',
      ],
      [
        'Follow-ups and owner visibility',
        'Follow-ups depend on somebody remembering. Visibility depends on the owner asking. Both scale badly. The fix is not a dashboard for its own sake. It is making the next action on every open item visible in one place, so that “where are we?” becomes something you read instead of something you ask three people.',
      ],
    ] as Pair[],
  },

  system: {
    eyebrow: 'WHAT A WORKING SYSTEM LOOKS LIKE',
    title: 'Plumbing, plus judgement.',
    paragraphs: [
      'A system that works for an SME is mostly plumbing plus judgement. The plumbing moves information out of the places it gets stuck. The judgement stays with your team.',
      'In practice that means connecting to the tools your business already runs on rather than replacing them. Most Indian SMEs are on some combination of WhatsApp, a Tally or Zoho ledger, Google Sheets, a shared email inbox and a payment link. A system worth building reads from and writes to those, because one that asks your team to work somewhere new gets quietly abandoned.',
      'What is possible depends on what each tool allows and the access you can give. Business messaging on WhatsApp runs through the WhatsApp Business API under Meta’s template and opt-in rules, not through somebody’s personal handset. Accounting data usually moves through an export or an official connector. Every integration is confirmed against your own accounts during scoping, before anything is promised.',
    ],
    listTitle: 'The tools a scope usually touches',
    listNote:
      'Candidates, not a fixed stack. Which of these a build connects to is agreed with you, based on the access available in your accounts.',
    items: [
      [
        'WhatsApp Business API',
        'Business messaging under Meta’s template, opt-in and messaging-window rules. Not a personal number, and not an unofficial automation that works until the number is banned.',
      ],
      [
        'Tally or Zoho',
        'Where the ledger, the item master and often the rate list already live. Usually read through an export or an official connector rather than written to directly.',
      ],
      [
        'Google Sheets',
        'The real system of record in more SMEs than anyone admits. Often the fastest place to keep a shared list your team already trusts.',
      ],
      [
        'A shared email inbox',
        'A shared inbox is a queue whether or not it is treated as one. Giving every message an owner and a next action is often the first useful change.',
      ],
      [
        'Razorpay',
        'Payment links and payment status, so a quotation, an invoice and a paid order are one record instead of three.',
      ],
      [
        'Shopify',
        'For SMEs selling online, the order and customer data a follow-up workflow or an operations handoff can be built on.',
      ],
    ] as Pair[],
  },

  delivery: {
    eyebrow: 'HOW A BUILD RUNS',
    title: 'Four stages, in this order.',
    lead: 'We do not publish fixed durations. How long a build takes depends on how many tools the scope touches and how fast access and answers arrive, so the duration is agreed in writing at the end of stage one.',
    steps: [
      [
        'Scope',
        'Walk through the process as it actually happens, with the person who does it. Agree the first workflow, the inputs, what a good output looks like, which tools get connected and who approves what. This stage ends with a written scope, a quote and a duration you can hold us to.',
      ],
      [
        'Build',
        'Develop the workflow, the interface and the integrations named in the scope. You see it in progress rather than at the end, because the fastest way to get a process wrong is to have it described once and then disappear for a month.',
      ],
      [
        'Pilot on one process',
        'Run it live on the single process it was built for, with your team using it and approving what goes out. A pilot on one real process tells you more than any demo, because it runs into your actual data, your actual exceptions and your actual week.',
      ],
      [
        'Handover and training',
        'Train the people who use it, hand over the accounts, credentials and documentation, and agree what happens when something breaks or a model changes. You should end this stage able to run the system without us.',
      ],
    ] as Pair[],
  },

  questions: {
    eyebrow: 'HOW TO CHOOSE A PARTNER',
    title: 'Questions to ask any implementation partner, including us.',
    lead: 'You are buying something you cannot fully inspect. These are the questions that separate a partner from a vendor. Ask them of us too, and hold the answers against what you get.',
    items: [
      [
        'Who owns the workflow after handover?',
        'Ask whether you receive the accounts, the credentials, the configuration and the documentation, or whether the system only runs while the invoices do. Our position: you own what we build for you, and handover includes what you need to run it.',
      ],
      [
        'Where does our data sit, and who can read it?',
        'Ask which services process what, where each piece is stored, and which of your own staff can see it. Our standard mutual NDA commits us not to use client data to train AI models.',
      ],
      [
        'How does this stand up under the DPDP Act?',
        'India’s Digital Personal Data Protection Act 2023 applies to the customer data these systems touch. Ask what personal data the system holds, why it holds it, and how it gets deleted. Our NDA covers data protection under the DPDP Act 2023 and the GDPR.',
      ],
      [
        'Is the WhatsApp side policy compliant?',
        'Ask whether business messaging runs through the WhatsApp Business API with approved templates and recorded opt-in, or through an unofficial workaround on a personal phone. The second option works right up until the number stops working.',
      ],
      [
        'What happens when the model changes?',
        'Models get deprecated and their behaviour shifts. Ask what the partner does when that happens, whether the system is built so a model can be swapped without a rewrite, and who pays for that work.',
      ],
      [
        'What does the first engagement actually include?',
        'Ask for it in writing: the one process, the integrations, the interface, the approval points, the training and the duration. If it cannot be written down before the build, it will not be agreed on after it.',
      ],
      [
        'How do we export and leave?',
        'Ask how your data comes out, in what format, and what you keep if you stop working with the partner. A partner who cannot answer this in a sentence is selling lock-in.',
      ],
    ] as Pair[],
  },

  cost: {
    eyebrow: 'WHAT IT COSTS',
    title: 'Scoped per project, quoted after the conversation.',
    paragraphs: [
      'We do not publish a rate card for consulting and build work, and we would rather say that plainly than advertise a number we would revise in the first meeting. There are no fixed service packages. Each engagement is scoped and quoted per project, after the scoping conversation rather than before it.',
    ],
    driversTitle: 'What moves the number',
    drivers: [
      [
        'How many processes',
        'One workflow costs less than four. Most first engagements are deliberately one.',
      ],
      [
        'How many tools get connected',
        'Every integration carries its own access, approvals and failure handling.',
      ],
      [
        'Whether an interface is needed',
        'A shared list is a smaller build than a role-specific dashboard for a dealer network.',
      ],
      [
        'How much review the workflow needs',
        'More approval points is usually the right call, and usually more work to build.',
      ],
      [
        'Whose data, and how messy',
        'Clean structured data moves faster than a decade of spreadsheets, PDFs and chat threads.',
      ],
    ] as Pair[],
    closingParagraph:
      'One thing on this site does carry a fixed price: 4ruple.ai, our outreach and lightweight sales CRM that runs on your own laptop. That is a software licence, not a consulting engagement. Everything else here is quoted per project.',
  },

  notFor: {
    eyebrow: 'HONEST DISQUALIFIERS',
    title: 'Who this is not for.',
    lead: 'It is cheaper for both of us to find this out now than in week three.',
    items: [
      [
        'Businesses that want the tool, not the outcome',
        'If the brief is “we want to use AI”, there is nothing to scope. Bring a process that annoys you instead.',
      ],
      [
        'Anyone who needs a fully autonomous system',
        'We build systems where people approve prices, promises and anything a customer receives. If the point is removing the human, we are the wrong studio.',
      ],
      [
        'Teams with nobody to own it',
        'Somebody on your side has to answer questions during the build and use the system after handover. Without that person, nothing survives the pilot.',
      ],
      [
        'Buyers who need a published price before a conversation',
        'Scope comes first here. If a fixed rate card is a procurement requirement, that is a fair reason to work with someone else.',
      ],
      [
        'A process nobody has agreed on',
        'If two people in the business describe the same workflow differently, settle that first. Software will only make the disagreement happen faster.',
      ],
    ] as Pair[],
  },

  faqTitle: 'AI consulting for SMEs, answered.',
  faqs: [
    {
      q: 'What is AI consulting for an SME?',
      a: 'AI consulting for an SME is choosing one process that costs the business time, agreeing what a good outcome looks like, and then building software that handles the repetitive part while your team keeps the decisions. For a small business it should end in a working system rather than a strategy document. At Basement Protocol the consulting and the build are one engagement.',
    },
    {
      q: 'Can a small business with 10 to 50 people actually use AI?',
      a: 'Yes, and often more easily than a large one, because there is less to coordinate. The practical starting point is a single recurring process such as enquiries, quotations or order handoffs. One person on your side who knows that process well is enough to scope it. You do not need a data team, a technical lead or an existing AI budget.',
    },
    {
      q: 'How long does an AI implementation take for an SME?',
      a: 'It depends on how many tools the scope touches and how quickly access and answers come from your side, so we agree the duration in writing at the end of scoping rather than quoting one before it. A first engagement is deliberately limited to one process, which keeps it to something you can review and judge instead of an open-ended programme.',
    },
    {
      q: 'How much does AI consulting cost in India?',
      a: 'Basement Protocol does not publish a rate card and has no fixed service packages. Each engagement is scoped and quoted per project after the first conversation. The number moves with how many processes are in scope, how many tools get connected, whether a custom interface is needed, and how clean your existing data is. Book a meeting and we will scope it.',
    },
    {
      q: 'Do you integrate with WhatsApp, Tally and Google Sheets?',
      a: 'Those are the tools most Indian SMEs actually run on, so they are the usual candidates in a scope. Business messaging on WhatsApp runs through the WhatsApp Business API under Meta’s template and opt-in rules. Accounting data usually moves through an export or an official connector. What is possible is confirmed against your own accounts during scoping, before anything is promised.',
    },
    {
      q: 'Will an AI system message our customers automatically?',
      a: 'Not unless you decide it should. Approval is built into the workflow, so quotations, prices, delivery promises and customer messages are drafted by the system and released by a person. For an SME, the cost of one wrong automated message to a customer is larger than the time saved by removing the review step.',
    },
    {
      q: 'Who owns the system after it is built?',
      a: 'You do. Handover includes the accounts, the credentials and the documentation needed to run the system, plus training for the people who use it. You should finish an engagement able to operate what was built without us. Ask any implementation partner this question before signing, because the answer is not the same everywhere.',
    },
    {
      q: 'Is this compliant with India’s DPDP Act?',
      a: 'Data protection is part of the scope rather than an afterthought. Our standard mutual NDA commits us not to use client data to train AI models, and covers data protection under India’s Digital Personal Data Protection Act 2023 and the GDPR. What personal data a system holds, and why, is agreed with you before it is built.',
    },
    {
      q: 'We already tried an AI tool and nobody used it. What is different?',
      a: 'That is common, and it is usually a scoping problem rather than a technology one. Tools that sit outside the daily workflow get abandoned. A system that reads from and writes to the places where the work already happens does not depend on anyone remembering to open it. Bring the tool that failed to the first conversation.',
    },
    {
      q: 'Do you work with SMEs outside India?',
      a: 'Yes. Basement Protocol is based in India and works with clients internationally, including a solar energy company headquartered in London. The SME practice is built around Indian business tools and regulation, but scoping one process and building around it is not country specific.',
    },
  ] as Faq[],

  related: [
    [
      'AI for Indian SMEs',
      '/smes',
      'The three example systems: enquiries and follow-ups, order handoffs, owner visibility.',
    ],
    [
      'AI consulting',
      '/ai-consulting',
      'The same practice across enterprises and growing companies, not only SMEs.',
    ],
    [
      '4ruple.ai',
      '/4ruple',
      'Our one fixed-price product: outreach and a lightweight sales CRM on your own laptop.',
    ],
  ] as [label: string, href: string, desc: string][],
};
