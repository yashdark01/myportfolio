import { Project, projects } from "./projects";

export interface CaseStudySection {
  title: string;
  content: string;
  bullets?: string[];
}

export interface CaseStudy extends Project {
  caseStudyTitle: string;
  timeline: string;
  sections: CaseStudySection[];
  challenges: string[];
  learnings: string[];
  /** When true, renders a separate "Technical deep dive" block below the case study */
  showTechnicalDetails?: boolean;
  technicalSections?: CaseStudySection[];
  technicalChallenges?: string[];
  technicalLearnings?: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    ...projects[0],
    caseStudyTitle:
      "Bringing expert crop intelligence to farmers who need it most",
    timeline: "2025 – 2026 · Solo full-stack project",
    showTechnicalDetails: true,
    sections: [
      {
        title: "Context",
        content:
          "Smallholder farmers in India often lack timely access to agronomists. Advice must work in Hindi, Hinglish, and English — over low-bandwidth connections and mobile-first UIs. Ag-input suppliers also need a way to license platform access and manage farmer subscriptions, not just a standalone chatbot.",
      },
      {
        title: "What I built",
        content:
          "Krashaq AI is a production smart farming platform with three role-based experiences: farmers get multilingual AI chat and weather tools; suppliers manage farmers, subscriptions, and alerts; admins onboard suppliers, run the alert scheduler, and view usage analytics.",
        bullets: [
          "Multilingual AI crop advisory for farmers in Hindi, Hinglish, and English",
          "Live weather and irrigation guidance tied to local conditions",
          "Supplier-managed farmer subscriptions and licensing tiers",
          "Proactive crop and weather alerts delivered in-app",
          "Admin dashboard for supplier onboarding and platform operations",
          "Live demo with open-source repository",
        ],
      },
      {
        title: "Results",
        content:
          "Shipped a live production deployment with multilingual AI chat, real weather integration, supplier analytics, and a working subscription flow from admin through supplier to farmer.",
        bullets: [
          "Live demo: krashaq-agritech.vercel.app",
          "Repo: github.com/yashdark01/Krashaq-Ai",
          "Full technical deep dive below — architecture, RAG, agent graph, and API surface",
        ],
      },
    ],
    challenges: [
      "Designing for farmers on low-bandwidth mobile connections across three languages",
      "Building a subscription model that works for suppliers licensing access to many farmers",
      "Delivering timely crop alerts without relying on SMS or WhatsApp in v1",
    ],
    learnings: [
      "Applied AI products need a clear product loop — not just a chat interface",
      "Role-based access (farmer, supplier, admin) forces early clarity on who owns what data",
      "Shipping a live demo with real weather and auth builds more credibility than mockups alone",
    ],
    technicalSections: [
      {
        title: "AI & retrieval architecture",
        content:
          "The chat pipeline is not a thin wrapper around an LLM API. User messages flow through a LangGraph agent that decides which tools to invoke, injects retrieved KB context as system messages, and streams responses back to the UI with deduplicated tool chips and citations.",
        bullets: [
          "Default provider: Groq (fast inference); fallback chain configurable across OpenAI, Gemini, Anthropic, and others",
          "KB corpus lives in content/kb/ — ingested via npm run kb:ingest into MongoDB with chunked embeddings",
          "Hybrid search combines BM25-style keyword scoring with vector similarity, fused via reciprocal rank fusion",
          "MMR re-ranking reduces redundant chunks; category boost prioritizes crop-specific docs for crop queries",
          "Streaming chat UI (/api/chat/stream) with real-time tool status and citation deduplication",
        ],
      },
      {
        title: "Platform & data model",
        content:
          "Everything runs in one repo (Krashaq-Ai) with src/app for pages and API routes, src/lib/server for MongoDB, JWT auth, LLM, RAG, and services. The legacy Python FastAPI backend was archived and removed — recoverable via git tag legacy/python-backend-v1.",
        bullets: [
          "MongoDB Atlas: users, refresh_tokens, chat_sessions, kb_chunks, supplier licenses, farmer subscriptions, farmer_alerts, notifications",
          "JWT access (30m) + refresh (7d) tokens via jose; bcrypt password hashes; role-based route guards",
          "Demo seed (npm run db:reset): 3 users, supplier license, farmer subscription, chat sessions, 4 KB docs (8 chunks)",
          "Manual Vercel deploy — root directory empty, Mumbai region (bom1), CRON_SECRET for /api/cron/alerts",
          "Optional Upstash Redis for session/cache; WeatherAPI.com for live weather and irrigation recommendations",
        ],
      },
      {
        title: "Agent graph & tool orchestration",
        content:
          "The LangGraph StateGraph in src/lib/server/agents/graph.ts defines explicit nodes for routing, tool execution, and response synthesis. The router inspects user intent and selects from weather lookup, irrigation calculation, and KB search tools — with deduplication so the same tool or KB query never fires twice in one request.",
        bullets: [
          "Graph nodes: router → tool_executor → synthesizer → stream output",
          "Tools registered in src/lib/server/agents/tools/ — each returns structured context injected as system messages",
          "resolveLLM() in src/lib/server/llm/ picks provider from UI selection with automatic fallback chain on failure",
          "processChat() and /api/chat/stream handle SSE streaming with per-chunk tool status events",
          "Chat UI deduplicates tool chips and citation sources so multi-step agent runs don't clutter the interface",
        ],
      },
      {
        title: "Hybrid RAG pipeline",
        content:
          "Retrieval lives in src/lib/server/rag/ — not a third-party vector DB. Documents in content/kb/ are chunked and embedded into MongoDB kb_chunks, then searched with a hybrid pipeline that outperforms pure vector search on short Hindi/Hinglish crop queries.",
        bullets: [
          "Ingestion: npm run kb:ingest reads markdown, chunks, embeds, and upserts into kb_chunks collection",
          "Keyword leg: BM25-style scoring over chunk text and metadata fields",
          "Vector leg: cosine similarity on stored embeddings",
          "Fusion: reciprocal rank fusion (RRF) merges both ranked lists into a single candidate set",
          "Re-ranking: MMR reduces near-duplicate chunks; category boost elevates crop-specific docs for crop queries",
          "Request-scoped cache (Map keyed by query hash) — agent turns that hit retrieval twice reuse the same result set",
        ],
      },
      {
        title: "API surface & auth",
        content:
          "All backend logic is native Next.js API routes under src/app/api/. JWT auth uses jose for access (30m) and refresh (7d) tokens; bcrypt for password hashes. Role guards enforce farmer, supplier, and admin boundaries on every protected route.",
        bullets: [
          "Chat: POST /api/chat, POST /api/chat/stream",
          "Auth: POST /api/auth/login, /api/auth/signup, /api/auth/refresh",
          "Supplier: /api/supplier/farmers, /api/supplier/subscriptions, /api/supplier/alerts",
          "Admin: /api/admin/suppliers, /api/admin/licenses, /api/admin/scheduler",
          "Cron: POST /api/cron/alerts (Vercel cron, CRON_SECRET header) — hourly alert delivery",
          "Scripts: db:reset, kb:ingest, alerts:run, qa:roles, qa:suppliers",
        ],
      },
      {
        title: "Testing & deployment",
        content:
          "53 Jest tests in __tests__/ cover auth middleware, RAG scoring, agent graph routing, and supplier API contracts. CI runs lint + test + build on every push. Production deploys manually via Vercel (root directory empty, bom1 region).",
        bullets: [
          "npm run test — Jest with ts-jest, mocks for MongoDB and LLM providers",
          "npm run build — Next.js production build validates all API route types",
          "GitHub Actions: ci.yml on push; deploy-vercel.yml on workflow_dispatch only",
          "Demo seed: npm run db:reset creates admin@krashaq.dev, supplier@krashaq.dev, farmer@krashaq.dev + KB corpus",
        ],
      },
      {
        title: "Technical decisions",
        content:
          "Every major choice was driven by deploy simplicity, latency, and the reality of building applied LLM products — not resume-driven microservices.",
        bullets: [
          "Monolith over split repos → one Vercel deploy, shared types, no cross-service auth complexity",
          "MongoDB hybrid RAG over Pinecone → vectors co-located with app data, fewer external dependencies",
          "Groq + multi-provider fallback → speed for happy path, reliability when a provider is down or rate-limited",
          "In-app alerts before WhatsApp/SMS → validate the cron + notification loop without Twilio integration cost",
          "LangGraph over single-shot prompts → explicit tool routing and observable agent steps for debugging",
        ],
      },
    ],
    technicalChallenges: [
      "Consolidating a split Next.js + Python backend into one monolith without losing API parity",
      "Preventing duplicate KB fetches and tool invocations in multi-step LangGraph agent flows",
      "Tuning hybrid search (RRF + MMR + category boost) for Hindi/Hinglish crop queries with a small KB corpus",
      "Designing B2B2C subscription gating so farmers linked to a supplier see clear trial/expiry states",
      "Working within Vercel serverless limits for streaming chat and hourly cron alert delivery",
    ],
    technicalLearnings: [
      "Request-scoped RAG cache is essential when agents call retrieval multiple times per turn",
      "Monolith consolidation cut deploy complexity dramatically vs coordinating Python + Node services",
      "Applied LLM products need explicit fallback chains — one provider is never enough in production",
      "Ship the in-app notification loop before external channels; it forces you to design delivery semantics early",
      "Hybrid retrieval quality comes from fusion + re-ranking design, not just embedding model choice",
    ],
  },
  {
    ...projects[1],
    caseStudyTitle:
      "Embedding sustainability intelligence into every stage of campaign and event execution",
    timeline: "Apr 2025 – Present · Full Stack Developer · Horizon17 Technology",
    showTechnicalDetails: false,
    sections: [
      {
        title: "Where I work",
        content:
          "I'm a Full Stack Developer at Horizon17 Technology — the tech company behind our sustainability products. EcoMS (EcoMedia Solutions) is our business company offering end-to-end sustainability services to brands, agencies, and enterprises. Ecometer is EcoMS's patent-filed product platform.",
        bullets: [
          "Horizon17 Technology — horizon17ww.com — technology & sustainability innovation (AI-CEA, blockchain CCE, IoT)",
          "EcoMS — ecomsww.com — business company: consulting, ESG reporting, carbon offsetting, and platform delivery",
          "Ecometer — our product: sustainability intelligence for campaigns and events",
        ],
      },
      {
        title: "The product — Ecometer",
        content:
          "Ecometer gives brands, agencies, and event organizers one unified system to measure, manage, and report environmental performance across OOH, DOOH, print, digital, and experiential campaigns — from media planning through post-campaign recovery, without compromising creativity or speed.",
        bullets: [
          "Measure — real-time carbon footprint across all major campaign and event channels",
          "Manage — data-driven insights to optimize materials, media choices, and execution",
          "Circularity — accountability for materials beyond campaign closure; recycling and reuse built in",
          "Report — BRSR- and ESG-aligned reporting designed to stand up to audit scrutiny",
          "Visualise — interactive dashboards that translate complex sustainability data into actionable insights",
        ],
      },
      {
        title: "Industries & clients",
        content:
          "The platform serves manufacturing, chemicals, oil & gas, renewable energy, pharmaceuticals, financial services, power, mining, infrastructure, media & communications, and hospitality. Published case studies include large-scale corporate events and campaigns for leading brands.",
        bullets: [
          "Events: Tata Motors ABRM 2025, Amazon Water Dialogues 2025, Amazon Prime Day 2025, Regional AI Impact Summit 2025, Global Energy Leaders' Summit (GELS) 2025 with Government of Odisha",
          "Campaigns: Wonder Cement OOH, HDFC Mutual Fund, Nykaa Pink Friday Sale, Nivea Soft OOH, Toyota HyRyder OOH, Meta WhatsApp OOH",
          "Services: sustainability audits, ESG reporting, carbon offsetting & management, ESG communication",
        ],
      },
      {
        title: "My role",
        content:
          "As Full Stack Developer at Horizon17 Technology, I build features on Ecometer — the product our business company EcoMS delivers to clients. Implementation details are confidential; this case study covers publicly available product and company context only.",
      },
      {
        title: "Results",
        content:
          "Ecometer is in active production use across enterprise sustainability workflows. Detailed engineering metrics and architecture are not disclosed publicly.",
        bullets: [
          "Platform: ecomsww.com/ecometer-the-carbon-economy-for-advertising",
          "Company: horizon17ww.com",
          "EcoMS: ecomsww.com",
        ],
      },
    ],
    challenges: [
      "Designing intuitive sustainability UX across very different campaign types — OOH, digital, print, and experiential each have distinct data inputs",
      "Balancing speed of campaign execution with rigorous environmental measurement requirements",
      "Communicating complex carbon data to non-technical brand and agency stakeholders",
    ],
    learnings: [
      "Sustainability software must earn trust — transparency and audit-readiness are product features, not afterthoughts",
      "Enterprise platforms succeed when measurement embeds into existing workflows rather than adding separate reporting steps",
      "Working on production sustainability tools deepened my understanding of compliance-driven product design",
    ],
  },
  {
    ...projects[2],
    caseStudyTitle: "Full-stack music streaming with production-grade patterns",
    timeline: "Mar 2025 · Personal project",
    sections: [
      {
        title: "Context",
        content:
          "Built to demonstrate full MERN proficiency with modern UI (ShadCN), state management, and audio streaming patterns used in real consumer apps.",
      },
      {
        title: "What I built",
        content:
          "A Spotify-style streaming platform with authentication, playlists, search, recommendations, and audio playback controls.",
        bullets: [
          "JWT-secured auth with protected routes and user sessions",
          "Redux Toolkit for player state, queue, and playlist management",
          "MongoDB aggregation pipelines for recommendations and trending songs",
          "Audio caching layer → ~25% faster repeat load times",
        ],
      },
      {
        title: "Technical decisions",
        content:
          "Focused on patterns recruiters recognize from consumer streaming products.",
        bullets: [
          "Redux Toolkit over Context — predictable state for complex player flows",
          "Server-side aggregation vs shipping full song lists to client",
          "ShadCN + Tailwind for accessible, consistent UI components",
        ],
      },
      {
        title: "Results",
        content:
          "Production-ready codebase demonstrating end-to-end ownership: API design, database modeling, frontend UX, and auth — the baseline product companies expect from SDE-1 candidates.",
      },
    ],
    challenges: [
      "Managing audio state across route changes without playback glitches",
      "Designing MongoDB schemas that support both playlists and recommendation queries",
    ],
    learnings: [
      "Audio apps are state-management problems disguised as UI projects",
      "Aggregation pipelines are underrated — they reduce frontend complexity significantly",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.id);
}
