import {
  archflowProject,
  krashaqAgentHarnessProject,
  krashaqAwsInfraProject,
  krashaqContextKbProject,
  musicPlayerProject,
  Project,
  projects,
} from "./projects";

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
      "Architecting a production AI agritech platform — 9 microservices, multi-agent harness, and event-driven intelligence",
    timeline: "2025 – 2026 · Sole Architect & Full-Stack Engineer",
    showTechnicalDetails: true,
    sections: [
      {
        title: "The problem at scale",
        content:
          "Smallholder farmers in India face a triple gap: no timely expert crop advice in their language, no access to real-time market and weather data, and no platform connecting them to ag-input suppliers at scale. Existing solutions are either generic chatbots with no domain depth or monolithic apps that cannot evolve independently. Building Krashaq AI meant solving a real product problem — B2B2C subscription access, multilingual advisory, proactive hazard alerts — while designing infrastructure that could scale across 9 independent microservices with durable execution guarantees.",
      },
      {
        title: "Two-layer microservice architecture",
        content:
          "The system splits cleanly into two layers: UAIP (Universal Agent Intelligence Platform) owns reusable AI execution machinery — the agent runtime, knowledge service, model gateway, and API gateway. Krashaq owns agricultural domain knowledge — identity, farms, markets, alerts, and weather. Cross-layer integration is strictly HTTP/events; no shared databases or source imports between layers.",
        bullets: [
          "UAIP layer: uaip-agent-runtime (LangGraph harness :3101), uaip-knowledge-service (Qdrant + BM25 RAG :3102), uaip-api-gateway (service proxy)",
          "Krashaq layer: auth-service (identity + farms :3109), data-service (APMC mandi + calculators :3112), alerts-service (hazard detection + delivery :3113), weather-service (forecasts + IMD alerts), gateway (:3120 public + private proxy)",
          "Private gateway :3120 enforces that domain services are unreachable from the public internet; all AI tool calls route through internal VPC paths",
          "Event-driven boundaries: weather warnings enter via POST /v1/internal/weather-warning; hazard evaluation triggers spatial H3 farm matching across distributed BullMQ workers",
        ],
        diagram: `<svg viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-xs font-mono">
  <rect width="800" height="240" rx="10" fill="#090d16" stroke="#1e293b" stroke-width="1"/>
  
  <rect x="25" y="20" width="750" height="90" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="40" y="42" fill="#60a5fa" font-weight="bold" font-size="11">UAIP REUSABLE LAYER (Platform Machinery)</text>
  <text x="40" y="62" fill="#93c5fd" font-size="10">• uaip-agent-runtime :3101 (LangGraph StateGraph · 26 Tools · BudgetBroker · HITL Approval)</text>
  <text x="40" y="80" fill="#93c5fd" font-size="10">• uaip-knowledge-service :3102 (Qdrant 768-dim · BM25 Lexical · RRF Fusion · MinIO/S3 OCR)</text>
  <text x="40" y="98" fill="#34d399" font-size="9.5">520 Tests Passing Across UAIP Services · Zero Domain Couplings</text>
  
  <path d="M400 110 L400 130" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="3,3"/>
  
  <rect x="25" y="130" width="750" height="90" rx="8" fill="#0f172a" stroke="#8b5cf6" stroke-width="1.2"/>
  <text x="40" y="152" fill="#c084fc" font-weight="bold" font-size="11">KRASHAQ DOMAIN SERVICES (Agricultural Logic)</text>
  <text x="40" y="172" fill="#ddd6fe" font-size="10">• krashaq-auth :3109 (PostGIS Farms · H3 Hex Bins) · krashaq-data :3112 (Mandi Quotes · NPK Math)</text>
  <text x="40" y="190" fill="#ddd6fe" font-size="10">• krashaq-alerts :3113 (Hazard Detection · Outbox Pattern) · krashaq-weather (IMD Warnings)</text>
  <text x="40" y="208" fill="#34d399" font-size="9.5">120+ Tests Passing · Isolated PostgreSQL Schemas (kq_auth, kq_market, kq_alerts)</text>
</svg>`,
      },
      {
        title: "What each service owns",
        content:
          "Each service has a single domain responsibility, isolated PostgreSQL schema, and its own migration path. None of them share a database with another service — coordination happens through typed HTTP calls via the private gateway.",
        bullets: [
          "krashaq-auth-service: JWT sessions, bcrypt passwords, farm CRUD with PostGIS polygon validation, Uber H3 hexagonal binning for spatial farm matching, crop phenology stages, AI context provision — 28 tests",
          "krashaq-data-service: APMC mandi spot quotes, 30-day price history, government scheme reference records, deterministic NPK/soil-pH/yield calculators — 35 tests, PostgreSQL kq_market + kq_domain_data + MongoDB Atlas",
          "krashaq-alerts-service: frost/pest/rain hazard rules, BullMQ distributed scheduler with SELECT FOR UPDATE SKIP LOCKED, PostgreSQL outbox pattern for multi-channel delivery (in-app, SMS, WhatsApp, Web Push) — 36 tests",
          "uaip-knowledge-service: PDF/DOCX ingestion, token-aware chunking (512 tokens, 64 overlap), Qdrant 768-dim embeddings, BM25 lexical index, RRF hybrid retrieval — 271 tests",
          "uaip-agent-runtime: LangGraph StateGraph, 26 registered tools, 7 skills, 10 prompt templates, multi-provider model gateway, PostgreSQL checkpoints, durable action journal — 249 tests",
        ],
      },
      {
        title: "The B2B2C product model",
        content:
          "Krashaq is licensed B2B2C — admins onboard ag-input suppliers; suppliers manage farmer subscriptions; farmers get gated access to AI advisory, weather tools, market prices, and proactive hazard alerts based on their active subscription tier.",
        bullets: [
          "Admin → onboard suppliers, set license tiers, manage platform operations and usage analytics",
          "Supplier → farmer roster management, subscription gating, proactive crop/weather alert creation",
          "Farmer → multilingual AI chat (Hindi/Hinglish/English), farm-aware weather, APMC market prices, in-app alert notifications",
          "Every API route enforces role-based access; the agent runtime filters tool discovery by authenticated caller scopes before graph execution",
        ],
      },
      {
        title: "Production results",
        content:
          "A live, tested, multi-service platform with measurable engineering rigor across all services.",
        bullets: [
          "630+ passing tests across 9 services (249 runtime · 271 knowledge · 36 alerts · 35 data · 28 auth · 21 weather)",
          "26 governed agent tools registered with typed input/output schemas — weather, APMC markets, NPK calculators, RAG retrieval, task lifecycle, farm CRUD",
          "Phases 0 and 1 complete: unified Krashaq AI profile, authorized capability contracts, durable action journal wired for ordered sequential approvals",
          "Live demo: krashaq-agritech.vercel.app · Repo: github.com/yashdark01/Krashaq-Ai",
          "3 languages — Hindi, Hinglish, and English crop advisory across all 26 tools",
        ],
      },
    ],
    challenges: [
      "Designing the two-layer service boundary so UAIP infrastructure stays genuinely reusable while Krashaq domain rules stay testable in isolation",
      "Building the durable action journal — HITL approval must bind to exact payload hashes, survive process crashes, and expire cleanly without silent mutation",
      "Tuning hybrid RAG (RRF + BM25 + Qdrant) for short Hindi/Hinglish crop queries against a specialized agricultural corpus",
    ],
    learnings: [
      "A two-layer microservice split forces you to define your integration contracts early — that clarity pays dividends in testability and independent deployability",
      "Durable execution is not about queues alone — idempotency keys, action receipts, and lease fencing are what make consequential AI actions safe",
      "Hybrid retrieval quality comes from the fusion and re-ranking design; the embedding model alone does not solve domain-specific retrieval problems",
    ],
    technicalSections: [
      {
        title: "LangGraph multi-agent harness",
        content:
          "The agent runtime runs a LangGraph StateGraph with explicit nodes for every phase of execution. The model proposes what to do; the harness controls what may run and records what actually happened. Budget caps, lease fencing, and output validation are enforced by the harness — not left to prompt instructions.",
        bullets: [
          "Graph nodes: Admit → Context → Understand → Discover → Plan → Dispatch → Policy → Execute → Observe → Synthesize → Verify → Finalize",
          "26 tools registered with defineTool() — each gets input schema, output schema, requiredScopes, sideEffect, approvalPolicy, timeoutMs, and retryPolicy",
          "BudgetBroker guards every model/tool/research step: token cap, dollar cap, step cap, no-progress detection, finalization reserve",
          "Multi-provider model gateway: OpenAI, Anthropic, Gemini, Groq, xAI, Ollama — aliased as 'general', 'fast', 'reasoning' with tested fallback chains",
          "Capability discovery filters tools by authenticated caller scopes before graph execution — model never sees unauthorized tool schemas",
          "Multi-agent design: supervisor + bounded specialists (farm/crop, weather/timing, research/data) with typed SpecialistTask/SpecialistResult contracts and delegation depth 1",
        ],
      },
      {
        title: "Durable action journal & HITL approval",
        content:
          "Consequential actions (task creation, farm edits, notification delivery) pass through a durable action journal persisted in PostgreSQL kq_runtime. Every approval binds to an exact canonical payload hash — payload or precondition changes require a new preview. Actions survive process crashes via worker lease fencing.",
        bullets: [
          "Action lifecycle: proposed → awaiting_approval → approved → executing → committed | failed | outcome_unknown",
          "Approval binds to: tenant + actor + run + action ID + tool version + canonical payload hash + resource version preconditions + policy version + expiry",
          "Worker lease system: stable process-unique worker ID, renewable leases, owner-fenced terminal writes, periodic expired-run reconciliation",
          "PostgreSQL kq_runtime migrations 012–014: worker_id/lease_expires_at columns, action_journal table, ordering/dependency columns",
          "10 runtime persistence tests pass against disposable PostgreSQL 17 including task, notification, and versioned farm-update paths",
          "Idempotency enforced by owning services (auth, alerts, data) — runtime reconciles ambiguous write outcomes with outcome_unknown rather than blindly retrying",
        ],
      },
      {
        title: "Hybrid RAG knowledge pipeline",
        content:
          "The knowledge service runs a full hybrid retrieval pipeline — not a thin Qdrant wrapper. Agricultural PDFs and DOCX manuals are parsed, section-extracted, token-chunked, and embedded into Qdrant. At query time, dense cosine and sparse BM25 results are fused via RRF, then diversity-re-ranked with a threshold guard.",
        bullets: [
          "Ingestion: PDF/DOCX → section/table extractor → token-aware chunker (512 tokens, 64-token overlap) → batch embeddings via agent-runtime :3101 → Qdrant upsert (kb_krashaq_agriculture, 768-dim)",
          "PostgreSQL kq_knowledge stores document metadata, versions, ACL filters; kq_ingestion tracks job status and OCR confidence",
          "Hybrid retrieval: Qdrant dense cosine search + BM25 lexical keyword search → Reciprocal Rank Fusion → diversity re-ranking + threshold guard → evidence excerpts with page citations",
          "ACL filtering at retrieval time — tenant/document permissions enforced before results reach the agent",
          "MinIO/S3 for presigned upload URLs (PDF manuals), diagnostic crop photographs for multi-modal disease diagnosis",
          "271 tests covering ingestion, chunker accuracy, hybrid retrieval correctness, RRF fusion behavior, and storage/presigned URL flows",
        ],
      },
      {
        title: "Event-driven alert delivery",
        content:
          "The alerts service correlates micro-climate forecasts with crop phenology to detect hazards (frost, pest spore risk, excessive rain) and delivers timely advisories through a resilient notification outbox. Distributed lease locks prevent duplicate evaluation across replicas.",
        bullets: [
          "Hazard rules: frost detection (dew point + temperature thresholds), leaf wetness index (VPD + precipitation), excessive rain (daily accumulation against crop stage tolerance)",
          "Spatial farm matching: IMD weather warning arrives → H3 cell decode → PostgreSQL /v1/internal/farms/match → returns farmer IDs within affected hex bins",
          "BullMQ workers with SELECT FOR UPDATE SKIP LOCKED — prevents two replicas from evaluating the same farm simultaneously",
          "PostgreSQL outbox pattern (kq_notifications): notification record inserted in the same transaction as the alert; outbox worker retries delivery on channel failure",
          "Multi-channel delivery pipeline: in-app → SMS → WhatsApp → Web Push; each channel has independent delivery receipt tracking",
          "36 tests including scheduler lease behavior, hazard rule evaluation, outbox delivery guarantees, and notification persistence",
        ],
      },
      {
        title: "Identity, geospatial, and AI context",
        content:
          "The auth service is the authoritative source for farm facts — not chat memory. PostGIS polygon validation and Uber H3 hexagonal binning enable accurate spatial matching for weather warnings. The AI context API provides pre-assembled farm/crop context to the agent runtime without exposing raw database queries.",
        bullets: [
          "JWT stateless sessions: access token (short-lived) + refresh token; double-submit CSRF cookies; bcrypt with timing-attack mitigation; Redis-backed rate limiting",
          "Farm CRUD: PostGIS polygon validation (WKT/GeoJSON), GPS coordinate bounds checking, farm boundary integrity enforcement",
          "Uber H3 hexagonal binning: farms indexed at H3 resolution for efficient spatial overlap with weather warning cells",
          "Crop phenology: planted crop cycle records with growth stage tracking (emergence, vegetative, flowering, maturity, harvest) — stage informs hazard rule thresholds",
          "GET /v1/actors/:actorId/ai-context: pre-assembled verified farm + crop context for agent runtime; private endpoint via gateway :3120",
          "28 tests including migration-path coverage, versioned farm-update service, PostGIS geometry persistence, and cross-tenant isolation",
        ],
      },
      {
        title: "Context engineering & memory",
        content:
          "The agent runtime maintains four distinct context stores with strict separation. Context assembly follows a priority order that reserves token budget for model output and future observations. Farm/crop context is fetched live from the authoritative auth service — not read from chat memory.",
        bullets: [
          "4 stores: Conversation (turns, attachments, summaries), Run State (plan, tool observations, pending actions, budgets), User Memory (confirmed preferences, explicitly retained facts), Product Records (farms, crops, tasks, alerts from owning services)",
          "Context assembly priority: platform policy → user objective → confirmed resource selection → unresolved constraints → active plan → selected skill → recent turns → current tool observations → supporting evidence → relevant memories",
          "Rolling summaries preserve source turn IDs, timestamps, unanswered questions, active farm/crop references, numeric assumptions, and pending approvals",
          "Token budget reserves space for model output and future observations before context assembly; budget broker tracks cross-step accumulation including vision, embedding, and research costs",
          "Chat statement 'I planted soybean yesterday' is a candidate fact with provenance — it does not silently update the authoritative crop record; the agent offers a concrete update",
          "PostgreSQL LangGraph checkpoints (kq_runtime) + episodic memory store; conversation threads survive process restarts and support SSE cursor-based reconnect",
        ],
      },
      {
        title: "Architecture decisions",
        content:
          "Every architectural choice was driven by reliability, testability, and the reality that applied AI products need durable infrastructure — not just capable prompts.",
        bullets: [
          "Two-layer split over monolith: UAIP infrastructure reusable across future domains; Krashaq domain rules independently testable and deployable",
          "PostgreSQL checkpoints over in-memory state: agent runs survive crashes; 14 migrations establish full durable execution lifecycle",
          "Qdrant + BM25 hybrid RAG over pure vector search: RRF fusion outperforms cosine-only search on short Hindi/Hinglish queries against specialized agricultural corpus",
          "SELECT FOR UPDATE SKIP LOCKED over naive cron: prevents duplicate hazard evaluation in multi-replica deployments; lease TTL recovery handles worker crashes without manual intervention",
          "HITL approval with payload hash binding over trust-on-first-approval: consequential actions cannot be silently re-executed with changed payloads or expired preconditions",
          "Tool scope filtering at discovery over capability grants at execution: model never receives unauthorized tool schemas; authorization is enforced twice (discovery + execution)",
        ],
      },
    ],
    technicalChallenges: [
      "Designing worker lease fencing so a crashed replica's in-flight action journal entries are correctly reconciled by a new worker without blindly retrying committed writes",
      "Achieving RRF-quality retrieval on short Hindi/Hinglish crop queries against a specialized agricultural corpus with limited training examples in Qdrant",
      "Preventing the LangGraph harness from treating tool result text as instructions — evidence boundary enforcement at every retrieval, research, and tool output path",
      "Building the two-layer service split without over-engineering — keeping UAIP genuinely reusable while Krashaq domain boundaries stay testable and deployable independently",
    ],
    technicalLearnings: [
      "Lease fencing + idempotency keys are what make consequential AI actions safe — queues alone do not prevent duplicate committed writes under crash/retry",
      "Hybrid retrieval quality is a system property of the fusion + re-ranking pipeline, not just the embedding model — BM25 is essential for short domain-specific queries",
      "The harness vs. model distinction matters for safety: budgets, scopes, output validation, and action receipts belong in the harness; prompts describe intent, not enforcement",
      "Building a two-layer split forces early clarity on integration contracts — that investment pays off in independent testability and deployment across the full service mesh",
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
  // ─── New Deep-Dive Case Studies ───────────────────────────────────────────
  {
    ...krashaqAwsInfraProject,
    caseStudyTitle:
      "Designing production AWS infrastructure for a 9-service AI agritech platform",
    timeline: "2025 – 2026 · Infrastructure Design",
    showTechnicalDetails: true,
    sections: [
      {
        title: "The infrastructure challenge",
        content:
          "A 9-service microservice platform creates specific AWS infrastructure challenges: services have different scaling profiles (the agent runtime scales on LLM request volume; the alerts service scales on cron cadence; the knowledge service scales on ingestion jobs), different database technologies (PostgreSQL, MongoDB Atlas, Qdrant, Redis), and different network isolation requirements (the private gateway must be unreachable from the internet).",
      },
      {
        title: "VPC and network topology",
        content:
          "The network is split into public and private subnets across two availability zones. Only the ALB and CloudFront sit in public subnets. All microservices run in private subnets with no direct internet exposure. NAT Gateway provides outbound internet for external API calls (LLM providers, weather APIs, APMC data feeds).",
        bullets: [
          "Public subnets (2 AZs): ALB, NAT Gateway — no compute beyond the load balancer",
          "Private subnets (2 AZs): ECS Fargate tasks for all 9 services, RDS Aurora clusters, ElastiCache Redis",
          "VPC endpoints: S3 Gateway endpoint (no NAT charges for S3 traffic), Secrets Manager Interface endpoint (no public internet for secret retrieval)",
          "Security groups: each service has its own SG; krashaq-gateway private listener only accepts connections from agent-runtime SG; database SGs only accept connections from their owning service SG",
          "The private gateway :3120 listener is bound to an internal ALB target group — no public DNS record, no internet-facing target",
        ],
        diagram: `<svg viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-xs font-mono">
  <rect width="800" height="240" rx="10" fill="#090d16" stroke="#1e293b" stroke-width="1"/>
  
  <rect x="30" y="25" width="350" height="90" rx="6" fill="#0f172a" stroke="#ff9900" stroke-width="1.2"/>
  <text x="45" y="48" fill="#fde68a" font-weight="bold" font-size="11">Availability Zone A (Public Subnet)</text>
  <text x="45" y="68" fill="#94a3b8" font-size="9.5">• ALB Ingress Node (443 / 80)</text>
  <text x="45" y="85" fill="#94a3b8" font-size="9.5">• NAT Gateway (Egress to LLM APIs)</text>
  <text x="45" y="102" fill="#34d399" font-size="9">Elastic IP · Zero Compute</text>
  
  <rect x="420" y="25" width="350" height="90" rx="6" fill="#0f172a" stroke="#ff9900" stroke-width="1.2"/>
  <text x="435" y="48" fill="#fde68a" font-weight="bold" font-size="11">Availability Zone B (Public Subnet)</text>
  <text x="435" y="68" fill="#94a3b8" font-size="9.5">• ALB Standby Node (Redundant)</text>
  <text x="435" y="85" fill="#94a3b8" font-size="9.5">• Redundant NAT Gateway</text>
  <text x="435" y="102" fill="#34d399" font-size="9">Dual-AZ High Availability</text>
  
  <rect x="30" y="130" width="350" height="90" rx="6" fill="#0b1120" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="45" y="153" fill="#93c5fd" font-weight="bold" font-size="11">Private Subnet A (No Direct Internet)</text>
  <text x="45" y="173" fill="#94a3b8" font-size="9.5">• ECS Fargate Tasks (9 Microservices)</text>
  <text x="45" y="190" fill="#94a3b8" font-size="9.5">• Aurora PostgreSQL Primary Node</text>
  <text x="45" y="207" fill="#60a5fa" font-size="9">Internal SG Isolation Only</text>
  
  <rect x="420" y="130" width="350" height="90" rx="6" fill="#0b1120" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="435" y="153" fill="#93c5fd" font-weight="bold" font-size="11">Private Subnet B (Failover)</text>
  <text x="435" y="173" fill="#94a3b8" font-size="9.5">• Replicated Fargate Tasks</text>
  <text x="435" y="190" fill="#94a3b8" font-size="9.5">• Aurora Aurora Read/Failover Replica</text>
  <text x="435" y="207" fill="#60a5fa" font-size="9">Cross-AZ Auto-Healing</text>
</svg>`,
      },
      {
        title: "Database isolation strategy",
        content:
          "Each service gets schema-level isolation on shared Aurora clusters rather than a per-service RDS instance. This reduces cost while maintaining data isolation: each service's IAM role grants access only to its PostgreSQL schema via search_path, and no service can query another service's tables.",
        bullets: [
          "Aurora Cluster A (kq_runtime schema): uaip-agent-runtime checkpoints, action journal, worker leases, run events",
          "Aurora Cluster A (kq_knowledge, kq_ingestion schemas): uaip-knowledge-service document metadata, ingestion job status",
          "Aurora Cluster B (kq_auth, kq_farmer schemas): krashaq-auth-service identity, farms with PostGIS extension, crop records",
          "Aurora Cluster B (kq_market, kq_domain_data schemas): krashaq-data-service APMC quotes, reference records",
          "Aurora Cluster B (kq_alerts, kq_notifications schemas): krashaq-alerts-service hazard alerts, notification outbox",
          "MongoDB Atlas: krashaq-data-service price history collection (Atlas handles ops; no self-managed MongoDB EC2)",
          "Qdrant Cloud: uaip-knowledge-service vector index (managed; kb_krashaq_agriculture collection, 768-dim)",
          "ElastiCache Redis: krashaq-alerts-service BullMQ worker queues; uaip-agent-runtime optional session cache",
        ],
      },
      {
        title: "EventBridge for weather warning fanout",
        content:
          "The weather service receives IMD weather warnings via webhook. Instead of directly calling the alerts service (tight coupling), it publishes to an EventBridge custom event bus. The alerts service subscribes and triggers spatial farm matching. SQS DLQ captures delivery failures for manual review.",
        bullets: [
          "Weather service publishes: event bus 'krashaq.weather', detail-type 'weather.warning.received', detail contains H3 cells + hazard metadata",
          "EventBridge rule: pattern-match on detail-type → target SQS queue consumed by alerts-service BullMQ worker",
          "SQS provides buffering if alerts-service is temporarily unavailable; BullMQ retry handles transient processing failures",
          "Dead Letter Queue: events that fail after configured retry attempts land in DLQ with full event payload for manual review",
          "Audit trail: EventBridge CloudTrail logs + CloudWatch Metrics on MatchedEvents/FailedInvocations per rule",
          "Alternative paths: direct API call still available via POST /v1/internal/weather-warning for synchronous triggering in development",
        ],
      },
      {
        title: "SSE streaming and ALB configuration",
        content:
          "The agent runtime streams responses via Server-Sent Events. ALB requires specific configuration to support SSE correctly — idle timeout must exceed the longest expected agent run, and HTTP/1.1 must be used on the backend connection (SSE doesn't work over HTTP/2 multiplexed streams from ALB to target).",
        bullets: [
          "ALB idle timeout: set to 300 seconds (5 minutes); default 60s causes SSE disconnects on long-running compound agent tasks",
          "Target group: HTTP/1.1 protocol, deregistration delay 30s (agent runs are short enough that draining is fast)",
          "Sticky sessions NOT used — agent state lives in PostgreSQL checkpoints, not in-process memory; any replica can resume an interrupted run",
          "CloudFront: used only for static assets (krashaq-web JS/CSS/images); SSE streaming bypasses CloudFront (no caching for streaming responses)",
          "X-Ray tracing: ALB → ECS task → downstream service calls traced end-to-end; SSE segment stays open until terminal event",
          "API Gateway explicitly excluded: 29-second hard timeout breaks agent runs that require multi-tool orchestration; ALB has no such limit",
        ],
      },
      {
        title: "Secrets and IAM design",
        content:
          "Every secret — LLM API keys, database credentials, JWT signing keys — lives in Secrets Manager. ECS task IAM roles use Secrets Manager GetSecretValue and nothing else. No secrets in environment variables at task definition time; they're fetched at container startup via the ECS secrets injection mechanism.",
        bullets: [
          "Task IAM roles: each service has its own role with least-privilege policies — agent-runtime role cannot access krashaq-auth-service secrets or S3 buckets owned by knowledge-service",
          "Secrets Manager rotation: database credentials rotate automatically; LLM API keys rotated manually on schedule",
          "ECS secrets injection: task definition references secret ARNs; ECS fetches and injects as environment variables at startup — no secrets in container images or task definition plaintext",
          "VPC endpoint for Secrets Manager: secret retrieval stays inside the VPC; no public internet exposure for credential fetch",
          "KMS: custom KMS key for Aurora encryption at rest; separate key for S3 server-side encryption",
          "IAM condition keys: RDS IAM authentication where supported; Secrets Manager resource policies restrict access to specific task role ARNs",
        ],
      },
      {
        title: "Observability stack",
        content:
          "CloudWatch + X-Ray provides end-to-end observability across all 9 services. Structured JSON logs from every service feed CloudWatch Insights queries. X-Ray traces the full SSE streaming path from ALB through agent runtime through every tool call to downstream services.",
        bullets: [
          "Structured logging: every service emits JSON with service name, trace ID, request ID, tenant ID, duration, and error classification",
          "CloudWatch Alarms: ECS CPU/memory utilization, ALB 5xx error rate, RDS connection count, Redis memory, SQS DLQ depth, EventBridge failed invocations",
          "X-Ray segments: ALB → gateway → agent-runtime → tool calls → knowledge-service / auth-service / data-service — full distributed trace per agent run",
          "Container Insights: ECS cluster-level metrics (task count, CPU/memory per service) without custom metric agents",
          "RDS Performance Insights: slow query identification for kq_runtime checkpoint writes and kq_knowledge hybrid retrieval queries",
          "SNS + PagerDuty integration: CloudWatch Alarms → SNS → PagerDuty for on-call alerting on p95 latency breach and error rate spikes",
        ],
      },
    ],
    challenges: [
      "ALB idle timeout for SSE: the 60-second default disconnects in-progress agent runs; tuning to 300s requires load testing to confirm no resource leak on abandoned connections",
      "Aurora search_path isolation: verifying that a misconfigured connection string cannot accidentally access another service's schema requires explicit integration tests with wrong-schema credentials",
      "EventBridge fanout ordering: weather warning fanout must not trigger duplicate hazard evaluation if the same warning arrives twice; BullMQ deduplication key prevents this but requires explicit test coverage",
    ],
    learnings: [
      "ALB is the right choice over API Gateway for SSE streaming — the 29-second API Gateway timeout is a hard blocker for multi-tool agent orchestration",
      "Schema isolation on shared Aurora clusters is a practical cost/isolation trade-off — IAM role boundaries + search_path provide equivalent isolation to separate instances at a fraction of the cost",
      "EventBridge decoupling pays off for weather warning fanout — the alerts service can be down for a maintenance window without dropping warnings if SQS provides the buffer",
    ],
  },
  {
    ...krashaqAgentHarnessProject,
    caseStudyTitle:
      "Building a production multi-agent harness with 26 governed tools, durable HITL approval, and enforced budget control",
    timeline: "2025 – 2026 · Phase 0–2 Complete",
    showTechnicalDetails: true,
    sections: [
      {
        title: "Why a harness, not just a framework",
        content:
          "LangGraph and other agent frameworks give you the state machine. The harness is the application-controlled layer around the model: it owns authentication, run state, tool authorization, budget enforcement, retry policy, HITL approval, artifact management, and finalization. The model proposes; the harness decides what may run and records what actually happened.",
      },
      {
        title: "The 26-tool registry",
        content:
          "Every tool is registered with a typed contract — not just a name and description. Registration enforces that every tool has an input schema, output schema, required scopes, side effect classification, approval policy, timeout, and retry policy. The model never receives a tool schema for a tool the caller isn't authorized to use.",
        bullets: [
          "Tools by domain: weather.getForecast/getHistorical/getAlerts/getAgriculture · market.latest/compare · calculator.unit/fertilizer/soil-ph/yield · crop.guidance.search/list · scheme.search · knowledge.search · farm.getContext · task.create · notification.send · web.search · vision.analyzeCrop · memory tools",
          "defineTool() validates each registration: parseMethod() applies POST default, enforces URL format, requires outputSchema — registration fails if contract is incomplete",
          "Capability discovery: discoverCapabilities() filters the 26-tool registry by tenant configuration, user role, resource ACLs, connector health, and objective relevance before graph execution",
          "Scope filtering: every tool has requiredScopes; authenticated caller's scope set is checked at discovery time; filtered catalog never includes unauthorized tool schemas",
          "Output validation: all 26 tools have outputSchema; tool executor validates response against schema before returning to graph — malformed external service responses are caught before model sees them",
        ],
      },
      {
        title: "Multi-provider model gateway",
        content:
          "The model gateway provides a provider-neutral abstraction over 6 LLM providers. Logical aliases ('general', 'fast', 'reasoning') decouple the graph from concrete model IDs. Fallback chains are tested, not assumed — a provider outage triggers the configured fallback within the same budget.",
        bullets: [
          "Providers: OpenAI · Anthropic · Google Gemini · Groq · xAI · Ollama (local)",
          "Aliases: 'general' (strong instruction following, tool calls), 'fast' (low-latency routing/classification), 'reasoning' (complex multi-step planning)",
          "Fallback chain: primary provider timeout or rate limit → compatible fallback within budget; streaming fallback cannot concatenate a second answer after partial output",
          "Provider adapter features: tool-call types, token-cost estimation, configurable fallback chains, vision capabilities, structured output / JSON schema mode",
          "Circuit breaker: failure count accumulates; circuit opens at 3 failures; half-open recovery probe before full re-enable",
          "Token pricing: each provider adapter tracks input/output token costs; BudgetBroker accumulates against dollar cap per run",
        ],
      },
      {
        title: "HITL approval and durable action journal",
        content:
          "Consequential actions (task creation, farm edits, notification delivery) pause the graph and emit an approval_required event. The UI presents an exact-payload preview card. Approval binds to a canonical payload hash — any change to the payload or preconditions requires a new preview and new approval.",
        bullets: [
          "Action lifecycle: proposed → awaiting_approval → approved → executing → committed | failed | outcome_unknown",
          "Canonical payload hash: tenant + actor + run + action ID + tool version + payload hash + resource version preconditions + policy version + expiry",
          "Worker lease fencing: stable process-unique worker ID; terminal writes require current unexpired owner; late previous worker cannot commit new state after lease expires",
          "Resume continuation: POST /v1/runs/:id/resume validates identity, payload hash, and current preconditions before re-acquiring lease and continuing",
          "Idempotency: owning services (auth, alerts, data) enforce idempotency keys; outcome_unknown recorded on timeout — runtime reconciles via receipt lookup rather than blindly retrying",
          "10 persistence cases pass against disposable PostgreSQL 17: task persistence, notification persistence, versioned farm-update, cross-tenant denial, lease renewal, and expired-run reconciliation",
        ],
      },
      {
        title: "BudgetBroker enforcement",
        content:
          "The BudgetBroker guards every model call, tool execution, vision analysis, and research step. Budget is not advisory — exceeding the cap stops the graph with a partial outcome and uses the finalization reserve to explain what completed and what didn't.",
        bullets: [
          "Per-mode budgets: Direct (2 model turns, 0 tools, 15s), Standard (8 turns, 12 tools, 90s), Complex (16 turns, 24 tools, 3 children, 180s), Background (24 turns, 40 tools, 3 children, 5min)",
          "Costs tracked: model input/output tokens by provider pricing, vision analysis, embedding calls, research fetch operations, sandbox execution (reserved)",
          "Admission: admitted runs receive dollar cap; BudgetBroker.admit() reserves the budget before graph execution begins",
          "No-progress detection: repeated identical tool arguments or unchanged evidence sets trigger no-progress termination rather than infinite loops",
          "Child budget isolation: multi-agent specialists receive a strict subset of parent budget; parent reserves before dispatch, reconciles actual usage, cancels redundant work",
          "Finalization reserve: budget broker always preserves enough tokens for final synthesis, verification, and persistence regardless of how much the tool loop consumed",
        ],
      },
      {
        title: "Skills and prompt engineering",
        content:
          "A skill is a reusable procedure — prerequisites, evidence requirements, tool sequence, verification rules, and stopping conditions. A prompt controls model behavior at a specific graph node. These are separate concepts in code and documentation; conflating them causes brittle agent behavior.",
        bullets: [
          "7 registered skills: general-assistant, crop-advisory, crop-health, weather-advisor, irrigation-advisor, farm-planner, knowledge-qa",
          "Skill enforcement: selected skill's allowed tool/intent set is checked per subtask; requiredContext paths validated before tool call; missing farm context returns context_required without calling the tool",
          "10 prompt templates: system · conversation_contextualizer · semantic_router · direct · crag_grader · vision_diagnosis · grounded_draft · safety_critic · revision · task_understanding",
          "Prompt layer order: platform rules → product behavior → selected skill instructions → current task and context → untrusted evidence (web/tool output never interpolated into trusted layers)",
          "Catalog content hashing: catalog hash includes domains, profiles, prompts, skill procedures, and complete tool definitions — approval resume rejects a changed catalog before reacquiring the lease",
          "Prompt release discipline: every version has an owner, content hash, input variables, output contract, and relevant evaluation cases — ratings generate review candidates; measured improvements drive releases",
        ],
      },
      {
        title: "Multi-agent supervisor/specialist design",
        content:
          "For complex compound queries (farm + weather + market + scheme all at once), the harness can delegate independent subtasks to bounded specialists. Specialists share the model gateway but receive only necessary context and a strict subset of parent permissions.",
        bullets: [
          "Supervisor owns user objective and final synthesis; specialists cannot directly commit consequential actions or message the user",
          "3 initial specialists: agricultural knowledge, weather/timing, research/data analysis — market and scheme specialists added when sources are reliable",
          "Delegation contract: SpecialistTask carries objective, completionCriteria, inputRefs, permittedResourceIds, allowedCapabilities, deadlineAt, tokenReservation, costReservationUsd, maxToolCalls, delegationDepth",
          "SpecialistResult carries status (completed/partial/blocked/failed/cancelled), findings with evidenceIds, missingInputs, conflicts, proposedActions, and usage",
          "Constraints: max 3 concurrent children, delegation depth 1, children don't spawn grandchildren; parent reserves budget before dispatch",
          "Simple queries (weather lookup, greeting, unit conversion) skip multi-agent path entirely — single-agent path has lower overhead and is easier to debug",
        ],
      },
    ],
    challenges: [
      "Preventing the model from treating tool result text as instructions — evidence boundary enforcement at every retrieval, research, and tool output path requires explicit harness-level validation, not prompt reminders",
      "Making the durable action journal work correctly under multi-replica crash scenarios — the lease fencing + owner-fencing implementation required careful testing against disposable PostgreSQL with deliberate crash injection",
      "Designing the BudgetBroker so partial completions produce useful results — a compound query that times out after 3 of 4 subtasks must explain exactly which outcome is missing, not silently truncate",
    ],
    learnings: [
      "The harness vs. model distinction is the fundamental safety property — authorization, budget caps, output schemas, and action receipts enforced in code cannot be overridden by adversarial tool output",
      "Capability discovery before graph execution is more important than execution-time authorization alone — the model shouldn't even see unauthorized tool schemas",
      "Durable HITL approval requires payload hash binding — approve-on-first-request is not safe if the payload can change between approval and execution",
    ],
  },
  {
    ...krashaqContextKbProject,
    caseStudyTitle:
      "Designing a 4-store context system and hybrid RAG pipeline for agricultural AI queries in Hindi, Hinglish, and English",
    timeline: "2025 – 2026 · Knowledge Service + Context Engineering",
    showTechnicalDetails: true,
    sections: [
      {
        title: "The retrieval problem in agricultural AI",
        content:
          "Agricultural knowledge retrieval has properties that break standard RAG pipelines. Farmers mix Hindi, Hinglish, and English in the same sentence. Crop names have multiple regional spellings. Chemical formulations appear in tables with precise units. A question about 'soybean yellowing in July' requires filtering by crop (soybean), symptom (yellowing), season (kharif), and geography (Maharashtra or Madhya Pradesh) — not just semantic similarity to the query.",
      },
      {
        title: "Hybrid retrieval: why RRF beats pure vector search",
        content:
          "Reciprocal Rank Fusion combines dense cosine similarity (Qdrant) and sparse lexical search (BM25) into a single ranked list. Dense search captures semantic meaning even with spelling variations; BM25 captures exact crop names, chemical formulations, and technical terms that embeddings can miss on short queries.",
        bullets: [
          "Qdrant dense search: 768-dim cosine similarity on kb_krashaq_agriculture collection; captures semantic equivalence across spelling variants",
          "BM25 lexical search: TF-IDF-style scoring over chunk text and metadata fields; critical for short 3–5 word queries where dense embeddings underperform",
          "RRF fusion formula: score = Σ 1/(k + rank_i) for each candidate across both ranked lists; k=60 standard constant; produces merged ranked list stable to outlier positions",
          "Diversity re-ranking: MMR (Maximal Marginal Relevance) variant reduces near-duplicate chunks in top-10 results; category boost elevates crop-specific docs for crop queries",
          "Threshold guard: minimum relevance score required for inclusion; prevents low-quality peripheral results from polluting evidence set",
          "ACL filter: tenant ID + document permissions checked before RRF; unauthorized documents never appear in merged results even if they rank highly",
        ],
      },
      {
        title: "Document ingestion pipeline",
        content:
          "Agricultural PDFs are dense with tables, diagrams, and mixed-script text. The ingestion pipeline handles format-specific extraction challenges before chunking and embedding.",
        bullets: [
          "Presigned upload: POST /v1/documents/uploads generates MinIO/S3 presigned URL; client uploads directly; complete webhook triggers background processing",
          "Parser: section extractor handles PDF paragraph boundaries; table extractor preserves row/column structure as markdown; OCR confidence tracked per page for handwritten/low-quality scans",
          "Token-aware chunking: 512-token target with 64-token overlap; chunk boundaries align with sentence endings; tables kept as atomic chunks regardless of token length",
          "Embedding: batched calls to uaip-agent-runtime :3101 /v1/models/embed; 768-dim vectors; batch size configurable to stay within provider rate limits",
          "Qdrant upsert: vectors indexed in kb_krashaq_agriculture collection; payload includes chunk ID, document ID, section path, page range, crop tags, season, geography, and language",
          "PostgreSQL kq_knowledge: document metadata, version history, ACL rules, parent section references; kq_ingestion: job status, OCR confidence per page, chunk count",
        ],
      },
      {
        title: "4-store context architecture",
        content:
          "Context for the agent is assembled from 4 stores with strict separation. This prevents common agent bugs: chat statements silently updating authoritative records, memory leaking between tenants, or run state bleeding into the next conversation.",
        bullets: [
          "Store 1 — Conversation: user/assistant turns, attachments, questions, rolling summaries. User-visible history with deletion controls. Summaries preserve source turn IDs, timestamps, unanswered questions, farm/crop references, numeric assumptions, and pending approvals.",
          "Store 2 — Run State: active plan, tool observations, pending actions, budget ledger, worker lease state. Durable execution data in PostgreSQL kq_runtime; bounded retention; encrypted sensitive fields.",
          "Store 3 — User Memory: confirmed preferences and explicitly retained personal facts (e.g., 'farmer prefers Urea over MOP for this crop'). Namespaced, editable, expiring where appropriate, and deletable. Chat statement 'I planted soybean yesterday' is a candidate fact — it does not silently update the authoritative crop record.",
          "Store 4 — Product Records: farms, crop cycles, reports, tasks, alerts. Owning service is authoritative; fetched with current permissions at context assembly time. Farm context comes from GET /v1/actors/:actorId/ai-context on auth-service, not from chat memory.",
        ],
      },
      {
        title: "Context assembly and token budgeting",
        content:
          "Context assembly follows a strict priority order. Token budget is reserved before assembly — model output and future tool observation slots are allocated first, then remaining tokens distributed across context layers.",
        bullets: [
          "Priority order: platform policy → user objective + selected resources → unresolved constraints → active plan + selected skill → recent relevant turns + attachments → current tool observations → supporting evidence excerpts → relevant user memories",
          "Token reservation: budget broker reserves output tokens + observation buffer before assembly; context layers fill remaining budget from highest priority down",
          "Relevance selection: for long histories, relevant turns and memory records are selected by semantic similarity to current objective — not just the last N turns or first N bytes",
          "Rolling summaries: summaries preserve source turn IDs and timestamps; unanswered questions, active farm/crop references, numeric assumptions, and pending approvals are never summarized away",
          "Attachment handling: document/image attachments referenced by ID and presigned URL; full content not inlined into context unless the tool specifically retrieves it — prevents context pollution by large files",
          "Cross-domain isolation: memory namespaces are not silently merged when a user switches between chat contexts; explicit authorized namespace mapping required for any unification",
        ],
      },
      {
        title: "Diagnostic image handling and multi-modal RAG",
        content:
          "Crop disease diagnosis requires multi-modal context: the farmer's photograph plus retrieved knowledge base excerpts from similar disease patterns. The knowledge service handles both the image storage path and the text retrieval path.",
        bullets: [
          "POST /v1/diagnostic-images: upload leaf photograph for crop diagnosis; stored in MinIO/S3 with presigned download URL valid for 24 hours",
          "Vision analysis: image URL passed to vision-capable model via agent-runtime; crop-health skill enforces image quality assessment before diagnosis",
          "Parallel retrieval: while vision model analyzes image, knowledge.search retrieves documents matching symptom description + crop + growth stage",
          "Evidence fusion: vision analysis findings and RAG excerpts merged as separate evidence items with distinct source types; synthesizer presents both with appropriate confidence labels",
          "Uncertainty enforcement: crop-health skill procedure requires explicit differential causes, image quality limitations, and targeted clarification questions before any treatment recommendation",
          "OCR for soil reports: PDF soil lab reports processed through ingestion pipeline with OCR confidence tracking; unreadable lab values surface as clarification requests rather than assumptions",
        ],
      },
    ],
    challenges: [
      "Preserving table structure during chunking — agricultural PDFs have fertilizer recommendation tables where a row split across two chunks loses the dose-crop-stage relationship and produces misleading retrieval results",
      "Calibrating RRF parameters (k constant, BM25 field weights, diversity MMR lambda) for agricultural Hindi/Hinglish queries — required systematic evaluation against real farmer questions, not just engineering intuition",
      "Preventing chat-stated facts from polluting authoritative product records — the 4-store separation is architecturally correct but requires explicit code paths for every update route to enforce the boundary",
    ],
    learnings: [
      "BM25 is essential alongside vector search for short domain-specific queries — dense embeddings underperform on 3–5 word Hindi/Hinglish crop queries; RRF fusion recovers significant retrieval quality",
      "Token-aware chunking with table integrity preservation is not optional for technical agricultural documents — fixed-character splits produce misleading chunks from fertilizer recommendation tables",
      "The 4-store context separation prevents the most common agent reliability bug — chat statements silently modifying authoritative records — but requires explicit enforcement in every code path, not just architectural documentation",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.id);
}
