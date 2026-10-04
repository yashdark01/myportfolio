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

export interface ExecutiveSummary {
  headline: string;
  points: { label: string; text: string }[];
}

export interface CaseStudy extends Project {
  caseStudyTitle: string;
  timeline: string;
  executiveSummary?: ExecutiveSummary;
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
    executiveSummary: {
      headline:
        "Engineered a production 9-microservice platform powering multilingual agronomic intelligence for Indian smallholder farmers through a governed LangGraph agent harness, hybrid RAG, and distributed event-driven alerts.",
      points: [
        {
          label: "Platform Architecture",
          text: "Two-layer boundary decoupling UAIP AI machinery from Krashaq agricultural services across 9 isolated microservices.",
        },
        {
          label: "Agent Governance",
          text: "26 tools, BudgetBroker caps, and durable HITL action journal bound to canonical payload hashes and lease fencing.",
        },
        {
          label: "Production Scale",
          text: "630+ passing tests, Qdrant + BM25 RRF hybrid retrieval, and PostGIS/H3 geospatial hazard alerts with PostgreSQL outbox.",
        },
      ],
    },
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
      {
        title: "Architectural evolution: V1 prototype monolith vs. V2 production microservices",
        content:
          "The platform evolved from an early Next.js single-service prototype into a production-grade 9-microservice architecture. Building both generations provided direct operational clarity on the limits of monolithic agent backends versus decoupled systems.",
        bullets: [
          "Architecture: 1 Next.js App (V1) → 9 Distributed Microservices across UAIP infrastructure and Krashaq domain (V2)",
          "Execution State: In-memory LangGraph state vulnerable to restarts (V1) → PostgreSQL checkpoints in kq_runtime across 14 migrations with renewable worker lease fencing (V2)",
          "Retrieval Engine: MongoDB keyword + vector chunking (V1) → Qdrant 768-dim Cloud + BM25 lexical search with Reciprocal Rank Fusion (k=60) and MMR diversity re-ranking (V2)",
          "Agent Tool Contracts: 4 basic endpoints (V1) → 26 governed tools with defineTool() validation, scope filtering, and typed ToolResult<T> output schemas (V2)",
          "Consequential Action Safety: Direct unverified LLM writes (V1) → Durable HITL action journal locked to canonical payload hashes and precondition checks (V2)",
          "Quality Verification: 53 Jest unit tests (V1) → 630+ passing tests across all 6 service test suites with PostgreSQL integration tests (V2)",
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
        title: "Production platform vs. toy wrapper: what makes this real",
        content:
          "Most LLM projects are thin API wrappers with prompt instructions attempting to enforce business rules. In Krashaq AI, all mission-critical safety, permission, budget, and transaction invariants are strictly implemented in compiled harness code — never left to vulnerable model prompts.",
        bullets: [
          "No prompt-based authorization: capabilities are filtered by caller scopes at discovery time; execution broker re-verifies scopes on every invocation",
          "Deterministic agronomic math: NPK fertilizer dosing, soil pH liming, and crop yield estimations execute via pure mathematical algorithms in krashaq-data-service — zero LLM hallucination",
          "Hardened checkpoint persistence: LangGraph StateGraph state persists transactionally to PostgreSQL kq_runtime across 14 migrations — surviving process restarts and pod crashes",
          "Cryptographic approval locking: consequential actions bind to canonical payload hashes; modifying any argument invalidates approval and forces a fresh preview card",
          "Hard resource quotas: BudgetBroker enforces strict token and dollar caps per run with an untouchable reserve for final answer synthesis and receipt emission",
        ],
      },
      {
        title: "Cross-service circuit breakers & multi-agent conflict resolution",
        content:
          "In distributed agricultural intelligence, services fail and independent specialists can propose contradictory recommendations. The platform implements explicit fault-tolerance boundaries and supervisor precedence rules.",
        bullets: [
          "Degradation over failure: if krashaq-weather-service times out, the system serves validated cached forecasts labeled with explicit observation timestamps — never synthetic hallucinations",
          "Model gateway circuit breaker: 3 consecutive provider timeouts/rate-limits trip the circuit to half-open, immediately diverting requests to configured fallbacks (Groq → OpenAI → Gemini) within the active token budget",
          "Specialist conflict arbitration: when the weather specialist forecasts an imminent thunderstorm while the agronomic specialist recommends pesticide spraying, the supervisor enforces safety precedence (hazard avoidance overrides scheduled treatments)",
          "Reconciliation of ambiguous writes: network timeouts during consequential writes enter outcome_unknown state; workers resolve receipts via idempotency keys instead of blindly retrying",
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
          "Ecometer is a media-focused GHG accounting and AI sustainability reporting platform. It turns fragmented campaign and activity data into validated emissions metrics, interactive analysis, and editable sustainability reports across seven configured media categories.",
        bullets: [
          "Capture — structured forms, OCR-assisted bills, standardized Excel imports, and map-based location inputs",
          "Calculate — normalize activity records and apply configured emission-factor logic",
          "Visualise — 20+ responsive dashboards built with editable React charting",
          "Report — AI-assisted BRSR, GRI, TCFD, and other configured framework workflows",
          "Publish — export reviewed reports as DOCX, PDF, or Markdown",
          "Govern — backend-enforced RBAC separates enterprise responsibilities and protected operations",
        ],
      },
      {
        title: "Accounting and ingestion workflow",
        content:
          "Every ingestion path feeds one validated accounting pipeline. Users can enter activity data manually, upload supporting bills for Microsoft Azure OCR, or populate a standardized Excel template for bulk import. Parsed values return to the product forms for review before calculation, so automation reduces repetitive work without silently changing accounting records.",
        bullets: [
          "Manual forms support structured activity capture across seven media categories",
          "Azure OCR extracts candidate values from bills and supporting documents",
          "Excel parsing maps standardized columns into the same logical form fields",
          "Google Maps and a location picker capture site-level location context where required",
          "Validation and normalization run before configured emission factors are applied",
          "The resulting GHG metrics power dashboards and reporting without duplicate calculation paths",
        ],
      },
      {
        title: "Twenty plus dashboards and location intelligence",
        content:
          "The analyst experience includes more than 20 dashboard views and modules for exploring media activity, calculated emissions, reporting progress, and operational context. Recharts turns API data into responsive visualizations, while Google Maps and the location picker connect relevant records to geographic context.",
        bullets: [
          "20+ dashboard views across accounting, campaign, reporting, and operational workflows",
          "Reusable Recharts components for bar, line, pie, and comparison views",
          "Filter-aware data loading for media category, campaign, time, and other product dimensions",
          "Google Maps visualization and interactive location selection",
          "Responsive layouts for dense enterprise data without reducing mobile usability",
          "Chart configuration remains separate from calculation logic and source data",
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
          "As Founding Engineer and Full Stack Developer at Horizon17, I work across Ecometer's product experience and service platform. The portfolio keeps proprietary calculation rules and production configuration abstract, but the capabilities below reflect my direct engineering contribution:",
        bullets: [
          "Built and maintained 20+ Next.js dashboard views with reusable Recharts visualizations and filter-heavy data workflows",
          "Implemented Google Maps views and an interactive location picker for geographic activity context",
          "Built Azure OCR bill ingestion and standardized Excel parsing, validation, mapping, and form population",
          "Developed the AI-native report editor: editable sections, selection-based AI changes, chart switching, and drag/reorder interactions",
          "Implemented DOCX, PDF, and Markdown export workflows for reviewed reports",
          "Worked across Node.js microservices, Redis/BullMQ jobs, MongoDB, PostgreSQL, Pinecone, LangChain/LangGraph, and S3",
          "Implemented RBAC-aware interfaces and backend permission enforcement for protected enterprise workflows",
          "Worked on Docker/Nginx services and CI/CD that publishes images to ECR and deploys them on AWS EC2",
        ],
      },
      {
        title: "Results",
        content:
          "Ecometer is in active production across enterprise sustainability workflows. Public proof points from EcoMS marketing and published case studies:",
        bullets: [
          "10+ published enterprise campaigns and events — Amazon, Tata Motors, HDFC, Nykaa, Nivea, Wonder Cement, and others",
          "7 configured media categories, including events, OOH, DOOH, television, digital, and print workflows",
          "20+ dashboard views and modules for accounting, visualization, and reporting workflows",
          "3 export formats — DOCX, PDF, and Markdown",
          "Patent-filed platform serving 12+ industries from manufacturing to financial services",
          "Platform: ecomsww.com/ecometer-the-carbon-economy-for-advertising",
        ],
      },
    ],
    challenges: [
      "Keeping 20+ dashboard views responsive when seven media categories produce different record shapes, filters, and aggregation requirements",
      "Mapping manual, OCR, Excel, and map-selected inputs into one canonical calculation flow without creating inconsistent data paths",
      "Keeping AI-generated narrative and chart specifications editable while validating structured output at the frontend boundary",
      "Enforcing RBAC consistently across navigation, frontend actions, API routes, file access, and background workflows",
      "Automating Docker deployments through ECR and EC2 without exposing production configuration or relying on manual server builds",
    ],
    learnings: [
      "A canonical validated data model is what lets forms, OCR, spreadsheets, maps, dashboards, and AI reports reuse the same accounting truth",
      "AI should produce structured chart data rather than chart images when users need to edit, test, and change visualizations",
      "Enterprise RBAC must be enforced server-side; hiding UI controls is helpful feedback, not authorization",
      "Queueing document and AI workloads protects normal API responsiveness and creates clearer retry boundaries",
      "Immutable container images and automated deployment gates make a small team more confident than rebuilding applications directly on EC2",
    ],
    technicalSections: [
      {
        title: "Platform architecture (abstract)",
        content:
          "Ecometer separates the interactive Next.js product, Node.js service layer, background processing, data stores, AI workflows, artifact storage, and AWS runtime. Specific service boundaries, formulas, schemas, and production configuration remain confidential.",
        bullets: [
          "Next.js frontend — forms, maps, 20+ dashboards, report editor, chart editing, and export UX",
          "Node.js microservices — APIs, validation, calculation orchestration, RBAC, and workflow boundaries",
          "Redis/BullMQ — document, AI reporting, and export work outside synchronous request paths",
          "MongoDB and PostgreSQL — document-oriented and relational operational data by service need",
          "LangChain/LangGraph and Pinecone — AI workflow orchestration and semantic retrieval where required",
          "Amazon S3 — uploaded documents, generated reports, and other controlled artifacts",
          "Docker + ECR + EC2 + Nginx — versioned services delivered through automated CI/CD",
        ],
      },
      {
        title: "Frontend — dashboards, charts, and maps",
        content:
          "My primary ownership includes the analyst-facing UI: more than 20 dashboard views, reusable chart modules, geographic inputs, dense filter workflows, and the interactive reporting workspace.",
        bullets: [
          "Reusable Recharts components render calculated metrics across bar, line, pie, and comparison views",
          "Google Maps presents relevant location context; the location picker captures user-confirmed coordinates",
          "Filter-aware data fetching supports media category, campaign, reporting period, and workflow-specific dimensions",
          "Module-level code splitting avoids shipping every chart and enterprise workflow in one bundle",
          "Responsive information hierarchy keeps dense dashboards usable across desktop and smaller viewports",
        ],
      },
      {
        title: "Ingestion and GHG calculation flow",
        content:
          "Manual forms, OCR results, Excel imports, and relevant location inputs converge on one validation and normalization layer before calculation. The configured carbon formulas and emission factors remain proprietary, but the public architecture shows how the product prevents ingestion method from changing accounting behavior.",
        bullets: [
          "Azure OCR proposes bill values; users review and correct them before submission",
          "Standardized Excel templates make columns and units predictable for bulk parsing",
          "Parsed spreadsheet values populate product forms instead of bypassing validation",
          "Normalized records feed configured emission-factor and aggregation logic",
          "Persisted GHG metrics are reused by dashboards and framework-specific reports",
        ],
      },
      {
        title: "AI-native reporting and chart contracts",
        content:
          "The reporting system uses sustainability metrics and a selected framework to generate narrative blocks and structured chart specifications. The frontend owns rendering and editing, so AI output stays an editable starting point rather than a locked document.",
        bullets: [
          "Framework-aware generation supports workflows such as BRSR, GRI, and TCFD",
          "AI returns machine-readable chart data and configuration rather than static chart images",
          "Recharts renders the specification and lets users change visualization type or configuration",
          "Users can manually edit, select text for AI assistance, and drag or reorder report blocks",
          "Reviewed report content exports to DOCX, PDF, and Markdown",
        ],
      },
      {
        title: "Backend, RBAC, and asynchronous work",
        content:
          "Backend services own validation, calculations, permissions, storage coordination, and long-running workflow state. Authorization is enforced at the service layer, while queues prevent document and AI tasks from blocking interactive APIs.",
        bullets: [
          "REST APIs across Node.js / Express.js microservices — specific endpoints and schemas are confidential",
          "RBAC checks protected operations on the backend; role-aware UI improves clarity without becoming the security boundary",
          "Redis/BullMQ decouples OCR, report generation, chart preparation, and document export workloads",
          "Controlled S3 access patterns avoid exposing unrestricted object-store credentials in the browser",
          "Structured AI/frontend contracts reduce fragile parsing and improve testability",
          "Query tuning and caching focus on the aggregation paths that power filter-heavy dashboards",
        ],
      },
      {
        title: "AWS deployment and automated delivery",
        content:
          "The deployment path packages services as Docker images, publishes approved versions to Amazon ECR, and runs them on AWS EC2 behind Nginx. CI/CD keeps local, validation, and production artifacts consistent while IAM controls infrastructure access.",
        bullets: [
          "Automated checks gate the container build and deployment stages",
          "Versioned images are published to Amazon ECR instead of building source directly on the host",
          "AWS EC2 runs the approved Docker services",
          "Nginx provides the reverse-proxy and service-routing boundary",
          "IAM limits infrastructure and storage access by deployment responsibility",
          "Exact workflow provider, credentials, network layout, and production commands remain confidential",
        ],
      },
      {
        title: "Technical decisions",
        content:
          "Every major choice balances enterprise compliance requirements with the speed analysts need in daily workflows.",
        bullets: [
          "Unified platform over point solutions — one measure-through-report system instead of disconnected spreadsheets",
          "One normalized calculation path over ingestion-specific logic — forms, OCR, Excel, and maps cannot silently produce different accounting behavior",
          "Structured chart JSON + Recharts over generated chart images — editable, testable, and visualization-independent",
          "Human-reviewed OCR and map selection over automatic submission — automation assists but does not silently commit accounting inputs",
          "Background jobs over synchronous AI and export requests — better API responsiveness and failure recovery",
          "Server-enforced RBAC over UI-only restrictions — authorization holds even when clients are bypassed",
          "Immutable ECR images over production host builds — repeatable CI/CD and clearer rollback boundaries",
        ],
      },
    ],
    technicalChallenges: [
      "Keeping 20+ Recharts dashboards performant when media categories have different filters, input density, and aggregation shapes",
      "Preserving one accounting contract while values arrive from manual forms, Azure OCR, Excel uploads, and location workflows",
      "Synchronizing an editable AI report canvas with structured chart data and asynchronous export generation",
      "Applying RBAC consistently across frontend affordances, APIs, job creation, file access, and generated artifacts",
      "Automating image delivery from CI/CD to ECR and EC2 while keeping Nginx routing and service recovery predictable",
    ],
    technicalLearnings: [
      "Chart-heavy enterprise products need reusable visualization contracts and module-level code splitting, not just page-level lazy loading",
      "Structured AI output is the foundation of an editable report experience; free-form model text is not enough",
      "OCR and map automation should propose reviewable inputs when those values influence regulated or auditable calculations",
      "RBAC is a cross-layer contract, not a sidebar-menu feature",
      "Versioned ECR images and automated deployment gates provide a safer operational boundary than rebuilding applications on EC2",
    ],
  },
  {
    ...projects.find((project) => project.id === "ecolynk")!,
    caseStudyTitle:
      "Building enterprise materiality, supplier assessment, risk intelligence, and AI reporting workflows at scale",
    timeline:
      "Apr 2025 – Present · Founding Engineer · Full Stack Developer · Horizon17 Technology and Sustainability Pvt. Ltd.",
    showTechnicalDetails: true,
    sections: [
      {
        title: "The product — Ecolynk",
        content:
          "Ecolynk is the broader enterprise ESG platform in the EcoMS product family. It supports 17 industries across 14 sectors and brings accounting, assessments, stakeholder engagement, supplier intelligence, target setting, disclosure, and AI reporting into one system. The public EcoMS website describes it as a unified platform for emissions, supply chains, governance, social impact, and audit-ready disclosure.",
        bullets: [
          "GHG accounting and sustainability data management",
          "Single- and double-materiality assessment workflows",
          "Supplier assessment and risk intelligence",
          "Investor reporting, ESG rating, LCA, and target-setting modules",
          "AI-native reporting with editable artifacts and multi-format export",
          "20+ dashboards across assessment, supplier, reporting, and operational workflows",
        ],
      },
      {
        title: "My ownership",
        content:
          "My deepest individual ownership is Supplier Assessment and Materiality Assessment, supported by cross-stack work on dashboards, AI reporting, access control, asynchronous processing, and deployment. I built the workflows from user interaction through backend orchestration and analytical output.",
        bullets: [
          "Built materiality topic templates, question-to-topic mapping, and single/double-materiality assessment flows",
          "Implemented AI topic recommendation using company, sector, knowledge-base, reference-report, and research context",
          "Built large-scale stakeholder and supplier questionnaire distribution using NATS and Redis/BullMQ",
          "Implemented response collection, aggregation, materiality matrices, supplier dashboards, and AI-assisted risk signals",
          "Built 20+ Recharts dashboard views and Google Maps/location-picking workflows",
          "Worked on RBAC-aware frontend experiences and backend authorization",
          "Contributed to the chat-plus-artifact AI report editor and HTML/DOCX/PDF exports",
          "Worked across CI/CD, Docker, ECR, EC2, Nginx, IAM, and supporting AWS services",
        ],
      },
      {
        title: "Materiality assessment workflow",
        content:
          "The materiality module helps organizations identify and prioritize the sustainability topics that matter to the company and its stakeholders. Users can start from reusable templates, receive context-aware AI recommendations, map questions to topics, distribute assessments, and turn collected responses into a recomputable materiality matrix.",
        bullets: [
          "Company and sector context guide topic relevance",
          "Reusable templates prevent teams from rebuilding every assessment from zero",
          "Questions remain explicitly mapped to materiality topics",
          "Single- and double-materiality workflows are supported by configuration",
          "Raw responses, topic aggregation, and visualization data remain separate",
          "Users review and finalize AI recommendations before assessment use",
        ],
      },
      {
        title: "AI topic recommendation and research",
        content:
          "The recommendation flow combines organization context with curated knowledge and research rather than relying only on generic model memory. AI proposes a draft topic set; sustainability users remain responsible for review, editing, and final approval.",
        bullets: [
          "Company profile and sector/industry context personalize the recommendation",
          "Internal knowledge supports curated ESG and competitor/reference material",
          "Research context extends evidence where the workflow requires it",
          "Pinecone-backed retrieval supplies relevant knowledge to LangChain/LangGraph workflows",
          "Recommendations remain drafts with traceable human review",
        ],
      },
      {
        title: "Supplier assessment and risk intelligence",
        content:
          "Organizations can assign questionnaires to large supplier populations, track completion, aggregate responses, and review supplier-level and portfolio-level performance. AI uses available assessment evidence to help prioritize suppliers that may require closer attention; it supports governance decisions rather than replacing them.",
        bullets: [
          "Reusable questionnaire and supplier-assignment workflows",
          "Bulk assignment and one-action distribution",
          "Response status and evidence tracking",
          "Supplier-level and portfolio-level dashboards",
          "Risk and threat signals tied back to available assessment evidence",
          "Human interpretation remains part of supplier-governance decisions",
        ],
      },
      {
        title: "Asynchronous distribution at enterprise scale",
        content:
          "Sending assessments to a large stakeholder or supplier population cannot stay inside one API request. Ecolynk validates the business action, publishes distribution events through NATS, and uses Redis/BullMQ queues so workers process recipients independently with controlled retries.",
        bullets: [
          "The initiating request stays responsive regardless of recipient count",
          "Workers consume delivery jobs at a controlled rate",
          "Failed messages are isolated from successful recipients",
          "Queue state makes pending, completed, and failed work observable",
          "NATS decouples service events while Redis/BullMQ provides durable job state, retries, and worker concurrency",
        ],
      },
      {
        title: "Twenty plus dashboards, charts, and maps",
        content:
          "More than 20 dashboards turn assessment and ESG data into actionable views across materiality, suppliers, responses, reporting, and operational workflows. Recharts provides reusable visualization components, while Google Maps and the location picker add geographic context where enterprise records require it.",
        bullets: [
          "20+ dashboard views and analytical modules",
          "Reusable Recharts components for trends, comparisons, portfolio views, and matrices",
          "Materiality-matrix visualization derived from recomputable aggregation data",
          "Google Maps visualization and interactive location selection",
          "Filter-aware API integration across organization, assessment, supplier, status, and time dimensions",
          "Responsive rendering for dense enterprise workflows",
        ],
      },
      {
        title: "AI-native reporting workspace",
        content:
          "Ecolynk's reporting experience combines a conversational interface with an artifact-style report panel. Users can create a report through chat, continue updating it with prompts, edit the artifact directly, and export the reviewed result without regenerating the whole document for every change.",
        bullets: [
          "Chat-driven report creation and iterative updates",
          "Persistent artifact state in a dedicated report panel",
          "Direct manual editing and AI-assisted changes",
          "Layout and content adjustments inside an editable canvas",
          "HTML, DOCX, and PDF export workflows",
        ],
      },
      {
        title: "RBAC and enterprise boundaries",
        content:
          "Ecolynk serves internal ESG teams, external stakeholders, and suppliers, so permissions must follow the assessment and organization context. Role-aware interfaces improve usability, while backend authorization remains the enforcement boundary for protected operations and artifacts.",
        bullets: [
          "RBAC controls protected assessment, supplier, reporting, and administration actions",
          "Recipient context remains associated with the correct organization and assessment",
          "S3 access uses controlled application paths rather than unrestricted browser credentials",
          "Microservice boundaries reduce unnecessary access across modules",
          "AWS IAM separately governs infrastructure and service access",
        ],
      },
      {
        title: "Production delivery",
        content:
          "Services are packaged as Docker images, validated through CI/CD, published to Amazon ECR, and deployed on AWS EC2 behind Nginx. The public portfolio describes responsibility boundaries while omitting confidential runner identities, network layout, credentials, and production commands.",
        bullets: [
          "CI/CD gates image creation and deployment on required validation",
          "Amazon ECR stores versioned deployable images",
          "AWS EC2 runs the approved service containers",
          "Nginx provides reverse-proxy routing and one controlled ingress",
          "IAM limits cloud access for deployment, messaging, and storage responsibilities",
          "Amazon S3, NATS messaging, and Redis/BullMQ workers remain isolated behind service boundaries",
        ],
      },
    ],
    challenges: [
      "Distributing assessments to large recipient populations without blocking user-facing APIs or losing per-recipient delivery visibility",
      "Preserving traceability from raw questionnaire responses through topic aggregation, matrix coordinates, supplier metrics, and AI insights",
      "Keeping 20+ dashboard views responsive across organization, assessment, supplier, and reporting data shapes",
      "Using AI research and recommendation to accelerate ESG work without turning model output into an unreviewed decision",
      "Applying RBAC consistently across internal users, external recipients, APIs, background jobs, and generated artifacts",
      "Operating a multi-service platform through automated ECR/EC2 delivery while keeping Nginx routing and rollback behavior predictable",
    ],
    learnings: [
      "Enterprise fan-out is a workflow problem, not an email loop; NATS and Redis/BullMQ provide the event isolation, durable processing, and visibility large distributions require",
      "Materiality analytics stay trustworthy when raw responses, topic mappings, aggregation, and matrix rendering remain distinct layers",
      "AI risk signals are most useful when they remain traceable to assessment evidence and explicitly support—not replace—human judgment",
      "RBAC must be enforced by backend services even when the frontend already hides unavailable actions",
      "Versioned container images and automated deployment gates are safer than rebuilding application code directly on EC2",
    ],
    technicalSections: [
      {
        title: "Multi-service platform architecture",
        content:
          "Next.js owns the interactive product; Node.js microservices own validation, permissions, workflow state, and module boundaries; asynchronous infrastructure owns large distributions and internal jobs; specialized stores support operational, relational, queue, semantic, and artifact workloads.",
        bullets: [
          "Next.js — assessments, dashboards, maps, materiality matrix, supplier analytics, and report editor",
          "Node.js microservices — protected APIs, workflow orchestration, response collection, and aggregation",
          "NATS — decoupled events across assessment and distribution services",
          "Redis/BullMQ — durable recipient jobs, controlled concurrency, retries, and worker-driven processing",
          "MongoDB/PostgreSQL — document-oriented and relational data by module requirement",
          "Pinecone + LangChain/LangGraph — knowledge retrieval and stateful AI workflows",
          "Amazon S3 — documents, generated reports, and controlled artifacts",
        ],
      },
      {
        title: "Assessment distribution and data model",
        content:
          "One user action creates a durable workload rather than performing downstream sends synchronously. Responses preserve assessment, recipient, question, and topic context so the same evidence can power status views, dashboards, matrices, and risk analysis.",
        bullets: [
          "Validated assessment and recipient selection precede job creation",
          "NATS and Redis/BullMQ separate distribution throughput from API latency",
          "Per-recipient work isolates failure and retry behavior",
          "Response records retain links to question and materiality topic",
          "Aggregations can be recomputed without rewriting raw responses",
        ],
      },
      {
        title: "Dashboard, map, and matrix rendering",
        content:
          "Frontend visualization components consume structured API contracts. Recharts owns interactive chart rendering; Google Maps owns geographic context and location selection; the materiality matrix consumes topic-level coordinates derived from assessment aggregation.",
        bullets: [
          "Reusable chart contracts reduce one-off visualization code across 20+ dashboards",
          "Filter state remains synchronized with the data request that produced each visualization",
          "Map selections are reviewable inputs rather than silent coordinate mutations",
          "Matrix visualization stays separate from the underlying scoring configuration",
          "Module-level loading keeps dense dashboard routes responsive",
        ],
      },
      {
        title: "RBAC and recipient isolation",
        content:
          "Application authorization is enforced by backend services and scoped to organization, role, assessment, supplier, and artifact context. External questionnaire recipients receive only the workflow context required for their assigned assessment.",
        bullets: [
          "UI capability state reflects permissions but does not replace backend checks",
          "Protected mutations validate actor and organization context",
          "Assessment links remain bound to the intended workflow and response record",
          "S3 artifacts are accessed through controlled application patterns",
          "AWS IAM separately restricts cloud infrastructure capabilities",
        ],
      },
      {
        title: "AI recommendation, risk, and reporting",
        content:
          "AI workflows use structured business context and retrieved knowledge. Topic recommendations are human-reviewed drafts, supplier risk remains decision support tied to evidence, and report updates modify persistent artifact state instead of recreating an opaque static output.",
        bullets: [
          "Company, sector, template, knowledge, and research context shape topic recommendations",
          "Supplier risk signals remain connected to assessment evidence where supported",
          "LangGraph coordinates stateful recommendation and reporting workflows",
          "The reporting agent updates an editable artifact alongside conversation",
          "HTML, DOCX, and PDF exports derive from reviewed report state",
        ],
      },
      {
        title: "CI/CD and AWS runtime",
        content:
          "The delivery path validates services, builds versioned Docker images, publishes approved artifacts to ECR, and updates EC2-hosted containers behind Nginx. The same image boundary supports repeatability and rollback without rebuilding source on the production host.",
        bullets: [
          "Required checks gate build and deployment stages",
          "Amazon ECR provides immutable versioned application images",
          "AWS EC2 hosts the approved multi-service runtime",
          "Nginx handles reverse-proxy routing",
          "IAM limits deployment and S3 access while service credentials protect NATS and Redis/BullMQ",
          "Workflow provider, secrets, exact network layout, and production commands remain confidential",
        ],
      },
    ],
    technicalChallenges: [
      "Maintaining per-recipient state across high-volume NATS events, Redis/BullMQ jobs, and independently retried workers",
      "Designing structured contracts that support dashboards, materiality matrices, supplier risk analysis, and AI reporting from shared evidence",
      "Preventing role-aware UI from becoming the only authorization layer in a multi-tenant assessment product",
      "Keeping container delivery repeatable across multiple services without leaking production configuration into the repository or portfolio",
    ],
    technicalLearnings: [
      "Fan-out systems need idempotent recipient work and observable queue state, not simply more concurrent requests",
      "Materiality and supplier intelligence become explainable when every aggregate can trace back to assessment evidence",
      "An editable AI artifact is a better enterprise reporting contract than a one-shot generated document",
      "Container versioning and server-side RBAC are operational controls, not presentation details",
    ],
  },
  {
    ...projects.find((project) => project.id === "popscan")!,
    caseStudyTitle:
      "Building a resilient AI-assisted review workflow for large campaign presentations",
    timeline:
      "Enterprise product · Two-person engineering team · Production deployment owned independently",
    showTechnicalDetails: true,
    sections: [
      {
        title: "The enterprise use case",
        content:
          "PopScan helps campaign operations teams review proof-of-performance presentations containing large volumes of installation photographs. Instead of manually inspecting every slide and managing findings in disconnected files, reviewers receive structured AI-assisted findings, annotated presentation outputs, and one place to manage decisions and rectification history.",
        bullets: [
          "Large presentation ingestion and slide-level processing",
          "AI-assisted visual quality review with structured issue regions",
          "Human acceptance or rejection before findings progress",
          "Annotated presentation generation for a reviewable final artifact",
          "Issue history and rectification state across recurring campaign cycles",
        ],
      },
      {
        title: "My contribution and ownership",
        content:
          "I built PopScan with one engineering teammate. We collaborated across the product and processing workflow; my contribution covered full-stack product work, long-running job UX, backend reliability, testing, and production delivery. I independently owned the automated AWS deployment path from validated change to container image and public ingress.",
        bullets: [
          "Co-built the Next.js application and Node.js/FastAPI processing workflow in a two-person team",
          "Implemented live processing visibility with structured Server-Sent Events",
          "Worked on checkpointed processing, retry behavior, and slide-level idempotency",
          "Built workflow surfaces for review decisions and issue lifecycle visibility",
          "Dockerized the services and independently deployed them to AWS EC2",
          "Owned Amazon ECR image delivery and Nginx reverse-proxy configuration",
          "Added CI/CD automation so tested, versioned releases deploy without manual server builds",
          "Used Jest and React Testing Library for component, interaction, and regression coverage",
        ],
      },
      {
        title: "AI-assisted document pipeline",
        content:
          "A presentation review is modeled as an asynchronous workflow rather than one long HTTP request. Slides are extracted and processed in controlled batches by background workers. The vision pipeline returns structured findings and issue regions; the document stage applies approved annotations and produces a reviewable output artifact.",
        bullets: [
          "Presentation intake persists the source artifact before background processing begins",
          "Slide work is queued and processed independently to isolate failures",
          "Vision analysis returns validated structured output rather than unfiltered model text",
          "Issue regions remain connected to their source slide for review and annotation",
          "Processed artifacts are stored separately from originals to preserve traceability",
        ],
      },
      {
        title: "Real-time progress without coupling the browser to the job",
        content:
          "Large reviews can take meaningful time, so the frontend opens a read-only Server-Sent Events stream and translates structured workflow events into a live progress experience. The browser observes the job; it does not own it. Refreshing or temporarily disconnecting does not stop AI processing.",
        bullets: [
          "Human-readable stages replace raw infrastructure logs",
          "Progress includes completed work, current stage, remaining work, and finding counts",
          "Persisted state lets the interface recover the latest progress after reconnecting",
          "SSE fits the one-way server-to-browser update pattern without WebSocket complexity",
        ],
      },
      {
        title: "Resumable processing and failure isolation",
        content:
          "The reliability model stores progress at slide level. Successful work is checkpointed continuously, so a worker restart or transient external failure resumes from incomplete work rather than restarting the entire presentation.",
        bullets: [
          "Per-slide state separates completed, pending, retryable, and failed work",
          "Idempotent consumers skip work that has already committed successfully",
          "Transient failures follow bounded retry behavior before requiring review",
          "One failed slide does not erase the successful state of the full deck",
          "Checkpoint recovery reduces repeated AI cost and shortens operational recovery",
        ],
      },
      {
        title: "Issue continuity across campaign cycles",
        content:
          "A presentation position is useful for parsing, but it is not enough for long-term history. PopScan also maintains a stable logical identity for recurring campaign locations, allowing new review instances to reference earlier findings without treating every cycle as unrelated work.",
        bullets: [
          "Cycle-specific slide instances remain linked to a stable logical slide",
          "Findings retain their source cycle and review decision",
          "Resolved issues can be recognized when they reappear",
          "Reviewers see useful history without mixing separate campaign records",
          "The model supports open, resolved, rejected, and reopened workflows at a public-safe level",
        ],
      },
      {
        title: "Production delivery",
        content:
          "I independently translated the application architecture into a repeatable AWS deployment. Services run as Docker containers on EC2, images are versioned in Amazon ECR, and Nginx provides the public HTTPS reverse-proxy boundary while supporting long-lived SSE connections.",
        bullets: [
          "Built and versioned production container images through Amazon ECR",
          "Configured EC2 runtime, environment boundaries, service startup, and restart behavior",
          "Configured Nginx routing and proxy behavior for application APIs and SSE streams",
          "Kept application services behind one controlled ingress instead of exposing container ports directly",
          "Documented deployment and rollback steps for a small engineering team",
        ],
      },
    ],
    challenges: [
      "Making a long-running AI workflow understandable without exposing internal logs or coupling completion to an open browser connection",
      "Recovering safely after partial failure without repeating successful slide analysis or corrupting the generated presentation",
      "Maintaining issue continuity across recurring campaign cycles while keeping each review instance auditable",
      "Operating several cooperating services on a focused EC2 deployment without introducing unnecessary orchestration complexity",
    ],
    learnings: [
      "For long-running AI products, progress visibility and recovery design are part of the user experience—not backend implementation details",
      "Slide-level idempotency and checkpoints are more valuable than retrying an entire job, especially when external AI calls carry time and cost",
      "Stable domain identity should be separate from file position when the same real-world entity returns across recurring documents",
      "A small team can operate reliable containerized services on EC2 when image delivery, ingress, health behavior, and rollback paths are explicit",
    ],
    technicalSections: [
      {
        title: "Asynchronous processing and observability",
        content:
          "The API creates durable work and returns control to the browser. Background workers own processing; persistent state owns progress; the SSE layer only publishes normalized updates. This separation means interface connectivity never becomes a processing dependency.",
        bullets: [
          "Next.js consumes structured progress events rather than raw worker output",
          "Node.js coordinates workflow state and the read-only event stream",
          "FastAPI-based Python services perform controlled slide and document processing",
          "Queue state and persisted checkpoints remain authoritative after reconnects",
        ],
      },
      {
        title: "Checkpoint and idempotency model",
        content:
          "Each slide is an independently identifiable processing unit. Before executing expensive work, a consumer checks its persisted state. Successful completion commits the result and checkpoint together; retries resume only incomplete work.",
        bullets: [
          "Completed slides are not reprocessed during duplicate delivery",
          "The latest committed checkpoint determines the safe resume position",
          "Failure isolation preserves successful results from the rest of the presentation",
          "Retry state stays visible to operators instead of being hidden inside worker logs",
        ],
      },
      {
        title: "Human review and issue lifecycle",
        content:
          "AI output is a proposal inside a governed workflow. A reviewer can accept, reject, or continue an issue through rectification. Stable logical slide identity provides context from earlier cycles while preserving the current cycle as a separate review record.",
        bullets: [
          "Structured findings stay linked to slide, cycle, and review state",
          "Human decisions remain separate from the original model output",
          "Historical findings provide context without automatically determining the current decision",
          "Reopened issues are modeled explicitly rather than created as unrelated duplicates",
        ],
      },
      {
        title: "NDA-safe deployment topology",
        content:
          "The public diagram describes responsibility boundaries, not the confidential production configuration. Nginx terminates the public routing boundary on EC2, Docker isolates application processes, ECR supplies versioned images, and the CI/CD pipeline automates validation and deployment while managed storage services hold application state and artifacts.",
        bullets: [
          "Public ingress → Nginx → containerized web, API, and worker responsibilities",
          "Amazon ECR provides versioned, repeatable image delivery",
          "CI/CD runs automated checks, builds images, publishes approved versions, and updates the EC2 deployment",
          "AWS S3 separates source and processed document artifacts",
          "Health, restart, logging, and rollback behavior are treated as deployment requirements",
          "Exact endpoints, policies, schemas, model settings, and customer infrastructure are intentionally omitted",
        ],
      },
      {
        title: "Testing and automated delivery",
        content:
          "Release confidence comes from testing behavior before deployment and moving the same immutable container images through the delivery path. The frontend test suite uses Jest and React Testing Library, while the CI/CD pipeline blocks deployment when required checks fail.",
        bullets: [
          "Jest covers application logic, state transitions, and failure-handling behavior",
          "React Testing Library verifies user-visible interactions and asynchronous UI states",
          "FastAPI boundaries keep AI-processing contracts explicit and independently testable",
          "Successful CI stages build versioned Docker images and publish them to Amazon ECR",
          "The deployment stage updates the EC2 services behind Nginx without rebuilding source code on the server",
          "Provider configuration, secret handling, runner identity, and production commands remain confidential",
        ],
      },
    ],
    technicalChallenges: [
      "Keeping SSE connections reliable through a reverse proxy while the underlying job remains independent and resumable",
      "Coordinating AI findings with document annotations without losing slide identity during retries",
      "Designing container startup and recovery behavior that a small team could operate confidently on EC2",
      "Automating deployments without allowing a failed test suite or incomplete image build to reach the production host",
    ],
    technicalLearnings: [
      "The most useful progress stream represents domain state, not infrastructure activity",
      "Commit boundaries must align with idempotency boundaries; otherwise a retry can duplicate AI work or annotations",
      "Deployment simplicity is earned through explicit image versioning, proxy configuration, health behavior, and rollback discipline",
      "The strongest CI/CD boundary is an immutable tested image: production should pull an approved artifact rather than rebuild application code in place",
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
    executiveSummary: {
      headline:
        "Designed an enterprise AWS infrastructure topology for 9 independent microservices with dual-AZ high availability, Aurora PostgreSQL schema isolation, EventBridge fanout, and ALB SSE streaming.",
      points: [
        {
          label: "Compute & Network",
          text: "ECS Fargate tasks across 2 availability zones in private subnets with isolated security groups and zero direct public exposure.",
        },
        {
          label: "Data & Storage",
          text: "Shared Aurora PostgreSQL clusters with schema-level search_path isolation (kq_*), ElastiCache Redis, and S3 document pipelines.",
        },
        {
          label: "Async Ingestion",
          text: "EventBridge custom bus for IMD weather warning fanout to BullMQ worker fleets with Dead Letter Queues (DLQ).",
        },
      ],
    },
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
      {
        title: "Enterprise disaster recovery & RTO / RPO metrics",
        content:
          "Production agritech infrastructure requires high availability and resilient disaster recovery strategies to ensure farmer records and autonomous tasks survive regional failures.",
        bullets: [
          "Aurora Point-In-Time Recovery (PITR): Continuous transaction log backups retain 35 days of history; enables restoration to any second with RPO < 5 minutes and RTO < 15 minutes",
          "Multi-AZ automatic failover: Aurora PostgreSQL and ElastiCache Redis operate standby replicas in secondary AZs; automated DNS switchover completes in under 30 seconds with zero manual intervention",
          "S3 versioning & lifecycle rules: Knowledge base source PDF documents, OCR records, and diagnostic plant images have S3 Object Versioning enabled with cross-region replication for disaster recovery",
          "Stateless ECS task recovery: Because execution state is fully persisted in PostgreSQL checkpoints (kq_runtime), crashed Fargate tasks are automatically replaced by ECS without losing active agent runs",
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
    executiveSummary: {
      headline:
        "Architected a robust LangGraph StateGraph harness governing 26 tools, enforcing multi-tier token and dollar cost budgets, and securing consequential actions with durable cryptographic hash approvals.",
      points: [
        {
          label: "Harness Invariants",
          text: "Permissions, scope filtering, schema validation, and receipts enforced strictly in TypeScript code rather than prompt text.",
        },
        {
          label: "Multi-Provider Gateway",
          text: "Unified gateway spanning OpenAI, Anthropic, Gemini, Groq, xAI, and Ollama with circuit breakers and fallback chains.",
        },
        {
          label: "Action Safety",
          text: "Durable HITL action journal persisted in PostgreSQL kq_runtime; approvals bind to payload hashes and worker lease fencing.",
        },
      ],
    },
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
    executiveSummary: {
      headline:
        "Designed a domain-tailored hybrid RAG pipeline (Qdrant Cloud + BM25 + Reciprocal Rank Fusion) and 4-store context architecture overcoming vocabulary sparsity in colloquial Indian agricultural queries.",
      points: [
        {
          label: "Hybrid Retrieval",
          text: "Dense 768-dim semantic search combined with sparse lexical BM25 via Reciprocal Rank Fusion (k=60) and MMR diversity re-ranking.",
        },
        {
          label: "4-Store Memory",
          text: "Strict boundary between Conversation, Run State (kq_runtime), User Memory, and Product Records prevents silent state corruption.",
        },
        {
          label: "Ingestion Pipeline",
          text: "Token-aware 512t chunking with table preservation, OCR confidence scoring, and multi-modal leaf photograph diagnostic integration.",
        },
      ],
    },
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
      {
        title: "Multilingual query expansion & regional agricultural glossary",
        content:
          "Farmers across Madhya Pradesh and Maharashtra rarely query using standardized academic terms. Queries mix Devanagari script, Latin phonetics (Hinglish), and regional dialect terms. A raw search for 'yellowing' misses regional expressions for nutrient deficiencies or viral diseases.",
        bullets: [
          "Bilingual query expansion: Input queries pass through a curated agricultural glossary mapping colloquial terms ('peela padna', 'haldi rog', 'illiyan') to canonical botanical and pest taxonomies before hybrid retrieval",
          "Script-agnostic normalization: Devanagari Hindi and phonetic Hinglish terms are canonicalized so vector and BM25 tokenizers match regional variations without discarding farmer intent",
          "Preservation of localized units: Regional area definitions (Bigha, Guntha, Acre) and weight units (Quintal, Man) are flagged during query parsing to prevent catastrophic dosage calculation errors",
        ],
      },
      {
        title: "Multi-modal vision analysis correlated with micro-climate risk",
        content:
          "Visual leaf symptoms alone can be misleading — fungal leaf spots, bacterial blight, and physiological leaf scorch often appear identical in early stages on low-resolution farmer photos.",
        bullets: [
          "Environmental correlation: The crop-health agent correlates vision diagnosis candidates with the farm's micro-climate history (leaf wetness hours, vapor pressure deficit, and recent precipitation from krashaq-weather-service)",
          "False-positive elimination: A fungal spore risk requires sustained high relative humidity and leaf wetness; if dry micro-climate conditions are verified, the agent lowers fungal diagnosis confidence and prompts for physical pest or irrigation checks",
          "Multi-modal claim lineage: The final synthesized advisory explicitly breaks down what was observed visually from the photo versus what was inferred from weather sensors and agronomic manuals",
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
