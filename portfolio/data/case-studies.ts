import { archflowProject, musicPlayerProject, Project, projects } from "./projects";

export interface CaseStudySection {
  title: string;
  content: string;
  bullets?: string[];
  diagram?: string;
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
          "Krashaq AI is a production smart farming platform with three role-based experiences: farmers get multilingual AI chat and weather tools; suppliers manage farmers, subscriptions, and alerts; admins onboard suppliers, run the alert scheduler, and view usage analytics. Live at krashaq-agritech.vercel.app with an open-source repo.",
      },
      {
        title: "B2B2C subscription model",
        content:
          "Krashaq is licensed B2B2C — not a standalone chatbot. Admins onboard suppliers and set license tiers; suppliers sell farmer subscriptions; farmers get gated access to chat, weather, and alerts based on active subscription status.",
        bullets: [
          "Admin → supplier license → farmer subscription (trial/expiry states visible before chat access)",
          "Supplier dashboard: farmer roster, subscription management, proactive crop/weather alerts",
          "Farmer dashboard: multilingual AI chat, weather tools, in-app notifications",
        ],
        diagram: `Admin (platform ops)
    │  onboard suppliers · set license tiers
    ▼
Supplier (ag-input company)
    │  sell farmer subscriptions · send alerts
    ▼
Farmer (end user)
    └── gated access → AI chat · weather · notifications`,
      },
      {
        title: "Results",
        content:
          "Shipped a live production deployment with measurable engineering output — not just a demo wrapper around an LLM API.",
        bullets: [
          "53 Jest tests — auth middleware, RAG scoring, agent graph routing, supplier API contracts",
          "90+ Next.js API routes — chat, auth, supplier/admin dashboards, cron alerts, LLM sessions",
          "KB corpus: 4 markdown docs → 8 chunks after ingestion (npm run kb:ingest)",
          "Default LLM: Groq · Llama 3.3 70B — configurable fallback chain (OpenAI, Gemini, Anthropic)",
          "3 languages — Hindi, Hinglish, and English crop advisory",
          "Live demo: krashaq-agritech.vercel.app · Repo: github.com/yashdark01/Krashaq-Ai",
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
          "Everything runs in one repo (Krashaq-Ai) with src/app for pages and 90+ API routes, src/lib/server for MongoDB, JWT auth, LLM, RAG, and services. The legacy Python FastAPI backend was archived and removed — recoverable via git tag legacy/python-backend-v1.",
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
    timeline:
      "Apr 2025 – Present · Founding Engineer · Full Stack Developer · Horizon17 Technology and Sustainability Pvt. Ltd.",
    showTechnicalDetails: true,
    sections: [
      {
        title: "Where I work",
        content:
          "I'm a Founding Engineer and Full Stack Developer at Horizon17 Technology and Sustainability Pvt. Ltd. — the tech company behind our sustainability products. EcoMS (EcoMedia Solutions) is our business company offering end-to-end sustainability services to brands, agencies, and enterprises. Ecometer is EcoMS's patent-filed product platform.",
        bullets: [
          "Horizon17 Technology and Sustainability Pvt. Ltd. — horizon17ww.com — technology & sustainability innovation (AI-CEA, blockchain CCE, IoT)",
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
          "As Founding Engineer and Full Stack Developer at Horizon17, I build core product features on Ecometer — the platform EcoMS delivers to enterprise clients. I can't share internal architecture diagrams or proprietary business logic, but here's the type of engineering work I own day-to-day:",
        bullets: [
          "Frontend architecture — chart-heavy sustainability dashboards in Next.js with SSR, dynamic data fetching, and compliance-ready export flows",
          "Backend services — event-driven microservices with NATS messaging, Docker-based deployments, and MinIO/S3 object storage for audit-ready documents",
          "Performance — query tuning and caching on dashboard routes where chart render time directly affects analyst workflows",
          "Trade-off conversations — I can walk through specific decisions in an interview even when implementation details stay under NDA",
        ],
      },
      {
        title: "Results",
        content:
          "Ecometer is in active production across enterprise sustainability workflows. Public proof points from EcoMS marketing and published case studies:",
        bullets: [
          "10+ published enterprise campaigns and events — Amazon, Tata Motors, HDFC, Nykaa, Nivea, Wonder Cement, and others",
          "5 channel types measured — OOH, DOOH, print, digital, and experiential activations",
          "Patent-filed platform serving 12+ industries from manufacturing to financial services",
          "Platform: ecomsww.com/ecometer-the-carbon-economy-for-advertising",
        ],
      },
    ],
    challenges: [
      "Building chart modules that stay responsive when analysts filter across campaign types with very different data shapes — OOH billboards vs digital impressions vs on-ground events",
      "Designing cache invalidation for compliance-sensitive metrics — stale sustainability data is worse than a slow load",
      "Shipping dashboard features under NDA while still being able to explain engineering trade-offs to hiring teams",
    ],
    learnings: [
      "Audit-readiness is a product constraint, not a reporting afterthought — export flows and data lineage matter as much as the charts",
      "Activity-based carbon measurement (localized emission factors) requires UX that makes assumptions visible to non-technical stakeholders",
      "Event-driven microservices pay off when campaign types share reporting standards but have distinct ingestion paths",
    ],
    technicalSections: [
      {
        title: "Platform architecture (abstract)",
        content:
          "Ecometer runs as an event-driven platform — campaign and event data flows through microservices that compute environmental metrics, generate compliance outputs, and serve interactive dashboards. Specific service boundaries and schemas are confidential; this describes the shape without revealing proprietary internals.",
        bullets: [
          "Event-driven microservices communicating over NATS — decoupled ingestion, calculation, and reporting paths",
          "Next.js frontend with SSR for chart-heavy dashboard routes and selective lazy loading per module",
          "MinIO/S3 object storage for audit-ready document exports and compliance artifacts",
          "Docker-based deployments with CI/CD pipelines across the service mesh",
        ],
      },
      {
        title: "Frontend — dashboards & exports",
        content:
          "My primary ownership is the analyst-facing UI — sustainability dashboards that load heavy charts, campaign filters, and environmental reporting panels teams open daily.",
        bullets: [
          "Server-side rendering + code splitting per dashboard module — avoids one monolithic bundle for chart-heavy views",
          "Dynamic data fetching patterns tuned for filter-heavy analyst workflows",
          "Compliance-ready export flows — BRSR-aligned outputs that stand up to audit scrutiny, even when generation takes longer",
          "Core Web Vitals and chart render time as the optimization targets, not vanity bundle size",
        ],
      },
      {
        title: "Backend & data flow",
        content:
          "Backend work spans metric computation services, reporting pipelines, and the messaging layer that connects campaign ingestion to dashboard updates.",
        bullets: [
          "REST APIs across Node.js / Express.js microservices — specific endpoints and schemas are confidential",
          "NATS messaging for event propagation between ingestion, calculation, and reporting services",
          "Query tuning on hot metric paths — measurable chart render improvements guided optimization decisions",
          "Write-through cache invalidation for compliance-sensitive data — correctness over hit rate",
        ],
      },
      {
        title: "Technical decisions",
        content:
          "Every major choice balances enterprise compliance requirements with the speed analysts need in daily workflows.",
        bullets: [
          "Unified platform over point solutions — one measure-through-report system instead of disconnected spreadsheets",
          "Audit-ready reporting over quick exports — BRSR-aligned outputs even when generation takes longer",
          "Modular campaign types under shared reporting standards — OOH, digital, print, experiential flexibility without losing comparability",
          "SSR for dashboard routes over pure client rendering — faster first meaningful paint for chart-heavy views",
        ],
      },
    ],
    technicalChallenges: [
      "Keeping dashboard modules performant when each campaign type (OOH, DOOH, print, digital, experiential) has distinct data inputs and chart requirements",
      "Balancing cache hit rates against compliance correctness — sustainability metrics cannot go stale silently",
      "Coordinating frontend export flows with backend reporting services without exposing proprietary calculation logic",
    ],
    technicalLearnings: [
      "In compliance-heavy domains, cache invalidation strategy is a product decision — not just an infrastructure detail",
      "Chart-heavy enterprise dashboards need module-level code splitting, not page-level lazy loading alone",
      "Abstract architecture descriptions in portfolios still land when they're specific about trade-offs, even under NDA",
    ],
  },
  {
    ...projects.find((p) => p.id === "rent-buddy")!,
    caseStudyTitle:
      "Shipping a live furnishing rental marketplace during internship",
    timeline: "Jan — Dec 2024 · WebIntegratorz internship",
    sections: [
      {
        title: "Context",
        content:
          "During my internship at WebIntegratorz, I worked on client deliverables for Rentbuddy Furnishing Solutions — a furnishing rental business where consumers browse products by city and category, place orders, and receive tracked doorstep delivery. Rent Buddy is the live consumer platform at rentbuddy.in.",
      },
      {
        title: "My contribution",
        content:
          "I was one of the full-stack developers on the WebIntegratorz delivery team — not the sole builder, but I owned significant feature work on Rent Buddy from API through UI:",
        bullets: [
          "Built and maintained JWT-secured Express.js REST endpoints for listings, categories, and user sessions",
          "Implemented responsive React flows for city/category browse, search, and product discovery",
          "Optimized hot API paths — contributed to ~30% faster response times on key listing endpoints",
          "Shipped and supported the production deployment at rentbuddy.in under client sprint deadlines",
        ],
      },
      {
        title: "Technical decision",
        content:
          "We chose JWT session auth over OAuth because the client's existing infra and timeline didn't need social login — email/password with role-aware middleware was enough for v1, and it kept the auth surface area small for a rental marketplace MVP.",
      },
      {
        title: "Results",
        content:
          "Rent Buddy remains live in production — a concrete proof point for internship-era delivery under client constraints.",
        bullets: [
          "Live: rentbuddy.in/home — furnishing rental marketplace for Rentbuddy Furnishing Solutions",
          "Repo: github.com/yashdark01/rentbuddy",
          "Outcome: production platform still serving customers; complements my current founding-engineer work on Ecometer",
        ],
      },
    ],
    challenges: [
      "Balancing client feature requests with maintainable code under tight sprint deadlines",
      "Designing category and search UX that works on mobile-first traffic without over-engineering v1",
      "Tuning listing API queries without access to a dedicated performance team",
    ],
    learnings: [
      "Production internship work teaches deployment and client communication — not just coding",
      "JWT + RBAC patterns learned here carried directly into Krashaq's multi-role auth design",
    ],
  },
  {
    ...musicPlayerProject,
    caseStudyTitle: "Full-stack music streaming with Clerk auth and admin CRUD",
    timeline: "Mar 2025 · Personal project",
    sections: [
      {
        title: "Context",
        content:
          "Built with React, Node.js, Express.js, and MongoDB — plus modern UI (ShadCN), OAuth auth, state management, and audio streaming patterns — open source at github.com/yashdark01/Music-Player.",
      },
      {
        title: "What I built",
        content:
          "A streaming-style music platform with Clerk sign-in, discovery feeds, album playback, friends sidebar, and an admin dashboard for catalog management.",
        bullets: [
          "Clerk OAuth with protected API routes and automatic session token refresh",
          "Redux Toolkit for player state, queue, next/previous, and route-safe playback",
          "MongoDB aggregation ($sample) for Featured, Made for You, and Trending sections",
          "Admin upload/delete for songs and albums via Cloudinary + email-gated routes",
        ],
      },
      {
        title: "Technical decisions",
        content:
          "Focused on patterns recruiters recognize from consumer streaming products.",
        bullets: [
          "Clerk over custom JWT — faster auth delivery with admin email gating built in",
          "Server-side aggregation vs shipping full song lists to the client",
          "Separate client/ and server/ packages with env-based API URL and CORS config",
          "Supertest integration tests for public health check and auth-protected routes",
        ],
      },
      {
        title: "Results",
        content:
          "Production-ready codebase demonstrating end-to-end ownership: API design, database modeling, OAuth integration, admin CRUD, frontend UX, and test coverage on core flows.",
      },
    ],
    challenges: [
      "Fixing global auth middleware that blocked public health checks and caused 401s on browse routes",
      "Keeping audio playback stable across route changes without duplicate player logic fighting the same element",
    ],
    learnings: [
      "Audio apps are state-management problems disguised as UI projects",
      "Third-party auth (Clerk) saves weeks — invest time in route guards and admin gates instead",
    ],
  },
  {
    ...archflowProject,
    caseStudyTitle: "Building an in-browser system design canvas",
    timeline: "2025 – 2026 · Active side project",
    sections: [
      {
        title: "Why I'm building this",
        content:
          "System design interviews and architecture reviews deserve better than one-size-fits-all whiteboard tools. Archflow is my side project to combine drag-drop canvas UX, software-specific node types, and optional AI-assisted diagram generation — all in the browser without installing Excalidraw plugins or fighting generic diagram editors.",
      },
      {
        title: "What exists today",
        content:
          "The repo is active on GitHub with ongoing commits. Core focus areas: canvas rendering, node/edge state, connection routing, and export. A public hosted demo is intentionally deferred until the editor feels stable enough to share — the portfolio shows a preview placeholder until then.",
        bullets: [
          "Drag-drop architecture nodes with labeled connections",
          "In-browser canvas — no desktop install for v1",
          "AI-assisted suggestions planned as an optional layer on top of a usable manual editor",
          "Open source: github.com/yashdark01/archflow",
        ],
      },
      {
        title: "What ships next",
        content:
          "Before a public demo URL goes live: polish snap/grid behavior, PNG + JSON export, and a small template library (microservices, event-driven, RAG pipeline) so diagrams are useful out of the box.",
        bullets: [
          "Canvas UX stable on mobile-width viewports",
          "Export/share flow for interview prep and README embeds",
          "Optional AI layer — must not block core canvas when API is unavailable",
        ],
      },
    ],
    challenges: [
      "Building responsive canvas interactions without fighting the browser's default touch/scroll behavior",
      "Keeping the data model simple enough for export while supporting arbitrary node types",
    ],
    learnings: [
      "Side projects need a visible 'building' state — honest placeholders beat silent empty cards",
      "Canvas tools are state-management products; rendering is the easy part",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.id);
}
