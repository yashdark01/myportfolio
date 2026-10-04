export type ProjectCategory = "fullstack" | "ai" | "enterprise";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  featured: boolean;
  builtAt?: string;
  metrics: ProjectMetric[];
  problem: string;
  role: string;
  outcome: string;
  tradeoffs: string[];
  architecture: string;
  stack: string[];
  github?: string;
  githubSecondary?: string;
  live?: string;
}

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai", label: "AI / LLM" },
  { id: "enterprise", label: "Enterprise" },
] as const;

/** Featured on homepage — depth over breadth */
export const projects: Project[] = [
  {
    id: "krashaq",
    title: "Krashaq AI",
    subtitle:
      "Production-grade AI agritech platform — 9-service microservice architecture, multi-agent LangGraph harness, hybrid RAG knowledge base, and event-driven alert delivery",
    category: "ai",
    featured: true,
    metrics: [
      { value: "9", label: "production microservices" },
      { value: "630+", label: "automated tests" },
      { value: "26", label: "governed agent tools" },
    ],
    problem:
      "Smallholder farmers in India need real-time multilingual crop advice, weather alerts, and APMC market intelligence — while ag-input suppliers need a scalable B2B2C platform to license farmer access. No existing solution bridges domain-specific AI reasoning with durable, event-driven backend services and a governed multi-agent harness.",
    role: "Sole architect and full-stack engineer — designed the two-layer microservice architecture (UAIP reusable AI infrastructure + Krashaq domain services), built the LangGraph multi-agent harness with 26 governed tools, hybrid RAG knowledge pipeline (Qdrant + BM25 + RRF), and event-driven alert delivery with PostgreSQL outbox pattern.",
    outcome:
      "Shipped a production multi-service platform where the LangGraph agent harness routes farmer queries through governed tools (weather, mandi markets, agronomic calculators, RAG retrieval), executes durable consequential actions with HITL approval, and delivers proactive hazard alerts via PostgreSQL-backed BullMQ workers across 630+ passing tests.",
    tradeoffs: [
      "Two-layer microservice split (UAIP infrastructure / Krashaq domain) over a monolith — reusable AI harness stays decoupled from agricultural business rules; cross-layer integration stays HTTP/events only.",
      "PostgreSQL checkpoints + durable action journal over in-memory state — agent runs survive process crashes; HITL approvals bind to exact payload hashes and expire cleanly.",
      "Qdrant + BM25 hybrid RAG over Pinecone-only — reciprocal rank fusion outperforms pure vector search on short Hindi/Hinglish crop queries; dense + sparse retrieval without a separate vector vendor.",
      "BullMQ distributed lease locks over naive cron — SELECT FOR UPDATE SKIP LOCKED prevents duplicate hazard evaluation across replicas; lease TTL recovery handles worker crashes deterministically.",
    ],
    architecture: `<svg viewBox="0 0 880 440" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-xs font-mono">
  <defs>
    <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#059669" stop-opacity="0.05"/>
    </linearGradient>
    <linearGradient id="uaipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.05"/>
    </linearGradient>
    <linearGradient id="domainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="880" height="440" rx="12" fill="#090d16" stroke="#1e293b" stroke-width="1"/>
  
  <rect x="30" y="20" width="240" height="52" rx="8" fill="url(#pGrad)" stroke="#10b981" stroke-width="1.5"/>
  <text x="150" y="42" fill="#34d399" font-weight="bold" font-size="12" text-anchor="middle">krashaq-web (React UI)</text>
  <text x="150" y="58" fill="#94a3b8" font-size="10" text-anchor="middle">SSE Streaming · Multilingual</text>
  
  <path d="M270 46 L340 46" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="305" y="40" fill="#64748b" font-size="9" text-anchor="middle">SSE :3000</text>
  
  <rect x="340" y="20" width="230" height="52" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="455" y="42" fill="#f1f5f9" font-weight="bold" font-size="12" text-anchor="middle">krashaq-gateway :3120</text>
  <text x="455" y="58" fill="#94a3b8" font-size="10" text-anchor="middle">Public Proxy &amp; Routing</text>
  
  <path d="M455 72 L455 105" stroke="#3b82f6" stroke-width="1.5"/>
  
  <rect x="30" y="105" width="820" height="145" rx="10" fill="url(#uaipGrad)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="48" y="128" fill="#60a5fa" font-weight="bold" font-size="11">LAYER 1: UAIP REUSABLE EXECUTION MACHINERY</text>
  
  <rect x="50" y="140" width="490" height="95" rx="6" fill="#0f172a" stroke="#2563eb" stroke-width="1"/>
  <text x="65" y="160" fill="#93c5fd" font-weight="bold" font-size="12">uaip-agent-runtime :3101 (LangGraph StateGraph)</text>
  <text x="65" y="178" fill="#cbd5e1" font-size="10">• 26 Governed Tools · 7 Skills · 10 Prompts · BudgetBroker (Token/Cost/Step)</text>
  <text x="65" y="194" fill="#cbd5e1" font-size="10">• Multi-Provider Gateway: OpenAI · Anthropic · Gemini · Groq · xAI · Ollama</text>
  <text x="65" y="210" fill="#cbd5e1" font-size="10">• PostgreSQL kq_runtime (Checkpoints · Action Journal · Worker Lease Fencing)</text>
  <text x="65" y="224" fill="#34d399" font-size="9">249 Tests Passing · Durable HITL Approval</text>
  
  <rect x="560" y="140" width="270" height="95" rx="6" fill="#0f172a" stroke="#2563eb" stroke-width="1"/>
  <text x="575" y="160" fill="#93c5fd" font-weight="bold" font-size="12">uaip-knowledge-service :3102</text>
  <text x="575" y="178" fill="#cbd5e1" font-size="10">• Qdrant (768-dim embeddings)</text>
  <text x="575" y="194" fill="#cbd5e1" font-size="10">• BM25 Lexical + RRF Hybrid Fusion</text>
  <text x="575" y="210" fill="#cbd5e1" font-size="10">• MinIO / S3 Document Store &amp; OCR</text>
  <text x="575" y="224" fill="#34d399" font-size="9">271 Tests Passing</text>
  
  <path d="M295 250 L295 285" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="345" y="270" fill="#a78bfa" font-size="9">Private Gateway :3120 (HTTP Only · No Shared DB)</text>
  
  <rect x="30" y="285" width="820" height="135" rx="10" fill="url(#domainGrad)" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="48" y="306" fill="#c084fc" font-weight="bold" font-size="11">LAYER 2: KRASHAQ DOMAIN MICROSERVICES</text>
  
  <rect x="45" y="315" width="185" height="90" rx="6" fill="#0f172a" stroke="#7c3aed" stroke-width="1"/>
  <text x="55" y="335" fill="#ddd6fe" font-weight="bold" font-size="11">krashaq-auth :3109</text>
  <text x="55" y="352" fill="#94a3b8" font-size="9.5">• Identity &amp; JWT Sessions</text>
  <text x="55" y="367" fill="#94a3b8" font-size="9.5">• PostGIS Farms &amp; H3 Bins</text>
  <text x="55" y="382" fill="#94a3b8" font-size="9.5">• Crop Phenology Stages</text>
  <text x="55" y="396" fill="#34d399" font-size="8.5">28 Tests Passing</text>
  
  <rect x="245" y="315" width="190" height="90" rx="6" fill="#0f172a" stroke="#7c3aed" stroke-width="1"/>
  <text x="255" y="335" fill="#ddd6fe" font-weight="bold" font-size="11">krashaq-data :3112</text>
  <text x="255" y="352" fill="#94a3b8" font-size="9.5">• APMC Mandi Spot Quotes</text>
  <text x="255" y="367" fill="#94a3b8" font-size="9.5">• 30-Day Trend Analytics</text>
  <text x="255" y="382" fill="#94a3b8" font-size="9.5">• NPK &amp; Soil pH Math</text>
  <text x="255" y="396" fill="#34d399" font-size="8.5">35 Tests Passing · MongoDB</text>
  
  <rect x="450" y="315" width="195" height="90" rx="6" fill="#0f172a" stroke="#7c3aed" stroke-width="1"/>
  <text x="460" y="335" fill="#ddd6fe" font-weight="bold" font-size="11">krashaq-alerts :3113</text>
  <text x="460" y="352" fill="#94a3b8" font-size="9.5">• Hazard Rules Engine</text>
  <text x="460" y="367" fill="#94a3b8" font-size="9.5">• BullMQ Lease Lock Worker</text>
  <text x="460" y="382" fill="#94a3b8" font-size="9.5">• PostgreSQL Outbox Deliv.</text>
  <text x="460" y="396" fill="#34d399" font-size="8.5">36 Tests Passing · Redis</text>
  
  <rect x="660" y="315" width="175" height="90" rx="6" fill="#0f172a" stroke="#7c3aed" stroke-width="1"/>
  <text x="670" y="335" fill="#ddd6fe" font-weight="bold" font-size="11">krashaq-weather</text>
  <text x="670" y="352" fill="#94a3b8" font-size="9.5">• Micro-climate Forecasts</text>
  <text x="670" y="367" fill="#94a3b8" font-size="9.5">• Official IMD Warnings</text>
  <text x="670" y="382" fill="#94a3b8" font-size="9.5">• Agronomic ET₀ &amp; VPD</text>
  <text x="670" y="396" fill="#34d399" font-size="8.5">21 Tests Passing</text>
</svg>`,
    stack: [
      "Node.js / TypeScript",
      "LangGraph",
      "PostgreSQL / PostGIS",
      "Qdrant",
      "Redis / BullMQ",
      "MongoDB Atlas",
      "MinIO / S3",
      "Next.js 16",
      "Groq · OpenAI · Gemini · Anthropic",
    ],
    github: "https://github.com/yashdark01/Krashaq-Ai",
    live: "https://krashaq-agritech.vercel.app",
  },
  {
    id: "horizon17-esg",
    title: "Ecometer",
    subtitle:
      "Media-focused GHG accounting and AI sustainability reporting — multi-source ingestion, 20+ dashboards, editable visual reports, and enterprise deployment",
    category: "enterprise",
    featured: true,
    builtAt: "Horizon17 Technology and Sustainability Pvt. Ltd.",
    role: "Founding Engineer · Full Stack Developer — built major accounting, ingestion, visualization, reporting, access-control, and deployment workflows across the Next.js frontend and Node.js microservices. My work includes 20+ dashboards, Recharts visualizations, Google Maps location picking, RBAC, Azure OCR and Excel ingestion, AI-native report editing, automated exports, and CI/CD delivery to Docker services on AWS EC2 through ECR and Nginx.",
    metrics: [
      { value: "20+", label: "analytics dashboards" },
      { value: "7", label: "media categories" },
      { value: "10+", label: "published client campaigns" },
      { value: "Patent-filed", label: "platform · EcoMS" },
    ],
    problem:
      "Media sustainability data arrives through forms, bills, spreadsheets, campaign systems, and location-specific activity records. Teams need one controlled workflow that validates those inputs, calculates GHG emissions, explains results through dashboards, and turns the same metrics into editable framework-specific reports.",
    outcome:
      "Shipped production workflows spanning manual, Azure OCR, and Excel ingestion; automated carbon calculations; 20+ map- and chart-driven dashboards; framework-aware AI reporting; editable chart/document composition; RBAC; and DOCX, PDF, and Markdown publishing across a containerized AWS deployment.",
    tradeoffs: [
      "One canonical calculation flow across manual, OCR, and Excel inputs — users keep flexible ingestion while validation and emission logic stay consistent.",
      "Structured chart JSON rendered with Recharts over static AI-generated images — visualizations remain editable, testable, and switchable inside the report canvas.",
      "User-confirmed OCR and location inputs over silent automation — extracted bill values and Google Maps selections remain reviewable before affecting GHG calculations.",
      "Redis/BullMQ background work over long synchronous requests — AI reporting and document exports do not block normal product APIs.",
      "Docker + ECR + EC2 + Nginx with CI/CD over manual server builds — approved images move through a repeatable release path.",
    ],
    architecture: `Sustainability teams · Media and campaign operators
        ↓
Next.js application
Forms · Google Maps location picker · 20+ dashboards · Recharts · AI report editor
        ↓
Node.js service layer · RBAC · validation · workflow orchestration
        ↓
Ingestion paths
Manual forms · Azure OCR bills · Standardized Excel templates
        ↓
Canonical activity data → emission-factor calculations → GHG metrics
        ↓
Redis/BullMQ background jobs · AI reporting with LangChain/LangGraph
        ↓
MongoDB + PostgreSQL · Pinecone · Amazon S3 artifacts
        ↓
DOCX · PDF · Markdown exports

CI/CD → Docker images → Amazon ECR → AWS EC2 → Nginx

Public architecture intentionally omits proprietary formulas, schemas,
customer data, credentials, and production network details.`,
    stack: [
      "Next.js",
      "Recharts",
      "Google Maps API",
      "Node.js / Express",
      "RBAC",
      "Docker / Nginx",
      "AWS EC2 / ECR",
      "CI/CD",
      "Azure OCR",
      "Redis / BullMQ",
      "MongoDB / PostgreSQL",
      "LangChain / LangGraph",
      "Pinecone",
      "Amazon S3",
    ],
    live: "https://ecomsww.com/",
  },
  {
    id: "ecolynk",
    title: "Ecolynk",
    subtitle:
      "Enterprise ESG, materiality, supplier assessment, risk intelligence, and AI reporting platform for 14 sectors and 17 industries",
    category: "enterprise",
    featured: true,
    builtAt: "Horizon17 Technology and Sustainability Pvt. Ltd.",
    role:
      "Founding Engineer · Full Stack Developer — primary individual ownership across Supplier Assessment and Materiality Assessment, including AI topic research, large-scale stakeholder distribution, response analytics, materiality matrices, supplier risk intelligence, 20+ dashboards, maps/location workflows, RBAC, AI reporting, backend microservices, and AWS delivery.",
    metrics: [
      { value: "14", label: "business sectors" },
      { value: "17", label: "supported industries" },
      { value: "20+", label: "enterprise dashboards" },
      { value: "AI-native", label: "assessment and reporting" },
    ],
    problem:
      "Enterprise ESG teams need to collect evidence from large stakeholder and supplier populations, identify material sustainability topics, surface supplier risk, and produce disclosure-ready reports. Spreadsheets and synchronous workflows do not scale across industries, recipients, assessments, and review cycles.",
    outcome:
      "Built major workflows for a multi-industry ESG platform: AI-assisted topic recommendation, single- and double-materiality assessments, one-click questionnaire distribution through NATS and Redis/BullMQ, supplier assessment and risk intelligence, 20+ Recharts dashboards, Google Maps/location inputs, RBAC, a chat-plus-artifact AI report editor, and automated AWS container delivery.",
    tradeoffs: [
      "NATS event distribution with Redis/BullMQ workers over synchronous recipient loops — large stakeholder and supplier distributions stay responsive, trackable, and independently retryable.",
      "AI recommendations with user review over autonomous topic selection — company, sector, knowledge-base, and research context accelerate discovery without replacing ESG judgment.",
      "Raw responses separated from topic aggregation and matrix coordinates — materiality analytics can be recomputed as assessment data changes.",
      "Structured chart and matrix data rendered with Recharts over static AI images — dashboards remain interactive, testable, and filterable.",
      "Server-enforced RBAC over UI-only restrictions — protected assessment, supplier, reporting, and artifact operations remain authorized at service boundaries.",
      "CI/CD + Docker + ECR + EC2 + Nginx over manual server builds — versioned releases and predictable ingress for a multi-service platform.",
    ],
    architecture: `Enterprise ESG teams · Suppliers · Stakeholders
        ↓
Next.js application
Assessments · Google Maps/location picker · 20+ Recharts dashboards · AI report editor
        ↓
Node.js microservices · RBAC · workflow validation
        ├── Materiality and topic/question mapping
        ├── Supplier assessment and risk intelligence
        ├── Reporting and artifact workflows
        └── Assessment response collection
        ↓
Asynchronous processing
NATS event distribution · Redis/BullMQ durable jobs, retries, and workers
        ↓
MongoDB + PostgreSQL · Pinecone · LangChain/LangGraph · Amazon S3
        ↓
Materiality matrix · Supplier analytics · HTML/DOCX/PDF reports

CI/CD → Docker images → Amazon ECR → AWS EC2 → Nginx

Public architecture omits proprietary scoring, schemas, policies,
customer data, credentials, and production network configuration.`,
    stack: [
      "Next.js",
      "Recharts",
      "Google Maps API",
      "Node.js / Express",
      "RBAC",
      "NATS",
      "Docker / Nginx",
      "AWS EC2 / ECR",
      "CI/CD",
      "Redis / BullMQ",
      "MongoDB / PostgreSQL",
      "LangChain / LangGraph",
      "Pinecone",
      "Amazon S3",
    ],
    live: "https://ecomsww.com/",
  },
  {
    id: "popscan",
    title: "PopScan",
    subtitle:
      "NDA-protected enterprise AI platform for reviewing marketing proof-of-performance presentations, tracking visual issues, and managing rectification across campaign cycles",
    category: "enterprise",
    featured: true,
    builtAt: "Horizon17 · NDA-protected",
    metrics: [
      { value: "Hundreds", label: "of slides per review" },
      { value: "Live", label: "SSE processing visibility" },
      { value: "Resumable", label: "checkpointed AI jobs" },
    ],
    problem:
      "Enterprise campaign teams review presentation decks containing hundreds of site photographs. Manual inspection is slow, inconsistent, and difficult to trace across recurring campaign cycles. Reviewers need AI assistance without losing human approval, issue history, or reliable recovery when a long-running job fails.",
    role:
      "Product engineer on a two-person delivery team — co-built the full-stack product and AI document-processing workflow. I independently owned its production delivery on AWS EC2: Dockerized services, automated CI/CD, ECR image delivery, Nginx reverse proxy configuration, environment setup, and operational rollout.",
    outcome:
      "Delivered an NDA-protected workflow that turns large campaign presentations into structured, reviewable findings: asynchronous vision analysis, live progress updates, annotated outputs, human acceptance or rejection, rectification tracking, and historical issue continuity across campaign cycles.",
    tradeoffs: [
      "Asynchronous workers with Server-Sent Events over request/response processing — long-running reviews continue independently while users receive a readable, one-way progress stream.",
      "Slide-level checkpoints and idempotency over whole-deck retries — interrupted jobs resume from persisted progress without repeating completed AI work.",
      "Stable logical slide identity alongside presentation position — recurring campaign locations retain issue history even when each cycle creates a new slide instance.",
      "Human approval over fully autonomous decisions — AI findings remain reviewable and correctable before they enter the client-facing rectification workflow.",
      "EC2 + Docker + ECR + Nginx over a more complex orchestration platform — predictable deployment and operational control for a focused two-person delivery team.",
      "Automated test and deployment gates over manual server updates — Jest and React Testing Library validate application behavior before versioned images can progress through the CI/CD pipeline.",
    ],
    architecture: `Enterprise reviewers
        ↓
Next.js review workspace — secure upload · live progress · human decisions
        ↓ HTTPS + Server-Sent Events
Nginx reverse proxy on AWS EC2
        ↓
Docker services delivered through CI/CD and Amazon ECR
        ├── Node.js API — workflow orchestration · authorization · issue lifecycle
        ├── FastAPI AI service — slide batching · vision review · structured findings
        ├── Queue + persistent state — background jobs · retries · checkpoints
        └── Document worker — presentation parsing · annotation · output generation
        ↓
MongoDB — workflow and review history
AWS S3 — source and processed presentation artifacts

Public architecture intentionally abstracts confidential endpoints, schemas,
model configuration, campaign rules, and customer infrastructure.`,
    stack: [
      "Next.js",
      "FastAPI",
      "Node.js",
      "Server-Sent Events",
      "Jest / React Testing Library",
      "CI/CD",
      "Docker",
      "AWS EC2 / ECR",
      "Python",
      "Vision AI",
      "Redis / BullMQ",
      "MongoDB",
      "AWS S3",
      "Nginx",
    ],
  },
  {
    id: "rent-buddy",
    title: "Rent Buddy",
    subtitle:
      "Furniture & furnishing rental marketplace — browse by city and category, order with tracked doorstep delivery",
    category: "fullstack",
    featured: true,
    builtAt: "WebIntegratorz · Internship",
    metrics: [
      { value: "Live", label: "rentbuddy.in" },
      { value: "30%", label: "faster API responses" },
      { value: "JWT", label: "secured access" },
    ],
    problem:
      "Rentbuddy Furnishing Solutions needed a consumer-facing rental marketplace — users browse furniture and home products by city and category, place orders, and get tracked delivery. It had to ship under real client deadlines, not classroom timelines.",
    role: "Full-stack developer on the WebIntegratorz delivery team — owned Rent Buddy feature work end-to-end: JWT-secured REST APIs, listing and category flows, responsive React UI, and production deployment at rentbuddy.in.",
    outcome:
      "Rent Buddy remains live in production for Rentbuddy Furnishing Solutions — a concrete internship proof point alongside my founding-engineer work on Ecometer.",
    tradeoffs: [
      "JWT session auth over OAuth — matched client infra and sprint timeline; RBAC-ready for admin flows without third-party auth dependency.",
      "React SPA + Node API over SSR — faster client iteration for category/search UX under tight delivery deadlines.",
      "Mobile-first responsive UI over native apps — broader reach for rental customers on low-end devices.",
    ],
    architecture: `Renters (web · mobile browser)
        ↓
React.js SPA — city/category browse, search, product detail
        ↓
Express.js REST API + JWT middleware
        ↓
MongoDB (listings, users, categories, orders)
        ↓
Production deploy — rentbuddy.in`,
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    github: "https://github.com/yashdark01/rentbuddy",
    live: "https://rentbuddy.in/home",
  },
];

/** Full project data for demoted projects that still have case study pages */
export const archflowProject: Project = {
  id: "archflow",
  title: "Archflow",
  subtitle:
    "In-browser system design canvas — drag-drop nodes, connections, and AI-assisted architecture diagrams",
  category: "fullstack",
  featured: false,
  metrics: [
    { value: "Active", label: "side project" },
    { value: "Canvas", label: "in-browser editor" },
    { value: "AI", label: "diagram assist" },
  ],
  problem:
    "System design prep and architecture reviews still happen on whiteboards or generic diagram tools that don't understand software components, data flows, or interview-style constraints.",
  role: "Solo builder — designing the canvas engine, node/edge model, export flow, and AI-assisted diagram generation on top of an open-source repo.",
  outcome:
    "Active side project on GitHub: drag-drop architecture nodes, connection routing, and AI-assisted diagram generation. Public demo ships when the canvas UX is stable enough to share.",
  tradeoffs: [
    "Custom canvas over Mermaid-only — richer drag-drop and layout control for interview-style diagrams.",
    "In-browser first — no account required for v1; export/share before multi-user collaboration.",
    "AI assist as optional layer — core canvas must work without an API key before demo goes live.",
  ],
  architecture: `React UI (canvas + toolbar)
        ↓
Node/edge state (positions, connections, labels)
        ↓
Canvas renderer (drag-drop, snap, routing)
        ↓
Optional AI layer → suggested components & connections
        ↓
Export (PNG / JSON diagram)`,
  stack: ["TypeScript", "React", "Canvas", "System Design", "AI"],
  github: "https://github.com/yashdark01/archflow",
};

export const musicPlayerProject: Project = {
  id: "music-player",
  title: "Music Player",
  subtitle: "Full-stack streaming app with Clerk auth, admin CRUD, and Redux player state",
  category: "fullstack",
  featured: false,
  metrics: [
    { value: "Clerk", label: "OAuth auth" },
    { value: "Admin", label: "upload + delete" },
    { value: "Express.js", label: "REST API" },
  ],
  problem:
    "Users wanted a streaming-style music app with sign-in, discovery feeds, album playback, and an admin path to manage catalog content.",
  role: "Built the full stack — Clerk auth, Express API, MongoDB models, Redux player, ShadCN UI, and admin upload/delete via Cloudinary.",
  outcome:
    "Shipped a production-ready streaming app with protected routes, featured/trending discovery, album pages, admin dashboard, and integration tests on core API flows.",
  tradeoffs: [
    "Clerk over custom JWT — faster OAuth, session refresh, and admin email gating without building auth infra.",
    "Redux Toolkit for player queue/state vs Context — predictable next/prev and route-safe playback.",
    "Cloudinary for admin media vs local-only storage — scalable uploads with seeded static assets for demo tracks.",
  ],
  architecture: `React + ShadCN UI (client/)
        ↓
Redux Toolkit (player / playlist state)
        ↓
Express REST API (server/)
        ↓
Clerk middleware + route guards
        ↓
MongoDB (users, songs, albums) + Cloudinary uploads`,
  stack: [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Clerk",
    "Redux Toolkit",
    "Cloudinary",
    "ShadCN UI",
    "Tailwind CSS",
  ],
  github: "https://github.com/yashdark01/Music-Player",
};

export function getProjectById(id: string): Project | undefined {
  const featured = projects.find((p) => p.id === id);
  if (featured) return featured;
  if (id === archflowProject.id) return archflowProject;
  if (id === musicPlayerProject.id) return musicPlayerProject;
  if (id === "krashaq-aws-infra") return krashaqAwsInfraProject;
  if (id === "krashaq-agent-harness") return krashaqAgentHarnessProject;
  if (id === "krashaq-context-kb") return krashaqContextKbProject;
  return undefined;
}

export interface MoreProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  caseStudyPath?: string;
  previewComingSoon?: boolean;
}

export const moreProjects: MoreProject[] = [
  {
    id: "krashaq-aws-infra",
    title: "Krashaq AI — AWS Infrastructure",
    description:
      "Production AWS architecture design for a 9-service AI platform — ECS Fargate per service, Aurora PostgreSQL schema isolation, EventBridge for weather warning fanout, ALB for SSE streaming, and CloudWatch/X-Ray observability.",
    tags: ["AWS", "ECS Fargate", "Aurora PostgreSQL", "EventBridge", "CloudWatch"],
    caseStudyPath: "/work/krashaq-aws-infra",
  },
  {
    id: "krashaq-agent-harness",
    title: "Krashaq AI — Multi-Agent Harness",
    description:
      "Production LangGraph multi-agent harness — 26 governed tools, durable HITL approval with payload hash binding, BudgetBroker enforcement, multi-provider model gateway (OpenAI/Anthropic/Gemini/Groq/xAI/Ollama), and supervisor/specialist architecture.",
    tags: ["LangGraph", "Multi-Agent", "TypeScript", "PostgreSQL", "HITL"],
    caseStudyPath: "/work/krashaq-agent-harness",
  },
  {
    id: "krashaq-context-kb",
    title: "Krashaq AI — Context Engineering & Knowledge Base",
    description:
      "4-store context architecture and hybrid RAG pipeline — Qdrant 768-dim vectors + BM25 lexical search + RRF fusion, token-aware chunking (512t/64 overlap), farm-aware context assembly with priority ordering, and multi-modal crop diagnosis.",
    tags: ["Qdrant", "BM25", "RAG", "RRF", "Context Engineering"],
    caseStudyPath: "/work/krashaq-context-kb",
  },
];

/** Deep-dive case study projects */
export const krashaqAwsInfraProject: Project = {
  id: "krashaq-aws-infra",
  title: "Krashaq AI — AWS Infrastructure",
  subtitle:
    "Designing production AWS architecture for a 9-service AI platform — ECS Fargate, Aurora PostgreSQL, EventBridge, ALB, and CloudWatch observability",
  category: "enterprise",
  featured: false,
  metrics: [
    { value: "9", label: "services on ECS Fargate" },
    { value: "Multi-AZ", label: "Aurora PostgreSQL" },
    { value: "EventBridge", label: "event-driven routing" },
  ],
  problem:
    "A 9-service microservice platform with per-service PostgreSQL schemas, Redis BullMQ workers, Qdrant vector search, and SSE streaming needs AWS infrastructure that isolates services correctly, scales independently, and avoids shared-database coupling that defeats the microservice boundary.",
  role: "Sole infrastructure designer — VPC topology, ECS task definitions, RDS Aurora schema isolation strategy, EventBridge routing for weather warning fanout, S3/CloudFront for document storage, and CloudWatch/X-Ray observability across all 9 services.",
  outcome:
    "An infrastructure design where each service runs as an isolated ECS Fargate task with its own IAM role, connects to isolated PostgreSQL schemas on shared Aurora clusters (search_path isolation), uses EventBridge for cross-service event routing, and exposes a single ALB entry point with private gateway routes unreachable from the internet.",
  tradeoffs: [
    "Shared Aurora clusters with schema isolation over per-service RDS instances — reduces cost and operational overhead while maintaining data isolation via PostgreSQL search_path and IAM role boundaries.",
    "ECS Fargate over EKS — simpler operations for a small team; no cluster management; task definitions version-controlled as infrastructure code.",
    "EventBridge over direct service-to-service HTTP for async events (weather warnings, hazard evaluation triggers) — decouples producers from consumers and enables replay.",
    "ALB path-based routing over API Gateway — lower latency for SSE streaming; API Gateway has a 29-second timeout that breaks long-running agent runs.",
  ],
  architecture: `<svg viewBox="0 0 880 460" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-xs font-mono">
  <defs>
    <linearGradient id="awsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff9900" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0.04"/>
    </linearGradient>
  </defs>
  <rect width="880" height="460" rx="12" fill="#090d16" stroke="#1e293b" stroke-width="1"/>
  
  <rect x="25" y="18" width="830" height="42" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="40" y="44" fill="#f8fafc" font-weight="bold" font-size="12">INTERNET &amp; INGRESS: Route 53 DNS → CloudFront CDN (Static Assets) → Application Load Balancer (HTTPS Dual-AZ)</text>
  
  <rect x="25" y="70" width="830" height="235" rx="8" fill="url(#awsGrad)" stroke="#ff9900" stroke-width="1.5"/>
  <text x="40" y="92" fill="#fbbf24" font-weight="bold" font-size="11">VPC (10.0.0.0/16) · PRIVATE SUBNETS (AZ-a &amp; AZ-b) · ECS FARGATE CLUSTERS</text>
  
  <rect x="40" y="105" width="230" height="85" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="50" y="125" fill="#fde68a" font-weight="bold" font-size="11">krashaq-gateway :3120</text>
  <text x="50" y="142" fill="#94a3b8" font-size="9.5">• Public listener / proxy</text>
  <text x="50" y="157" fill="#94a3b8" font-size="9.5">• Private listener (Internal Only)</text>
  <text x="50" y="172" fill="#34d399" font-size="9">VPC internal security groups</text>
  
  <rect x="290" y="105" width="270" height="85" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
  <text x="300" y="125" fill="#93c5fd" font-weight="bold" font-size="11">uaip-agent-runtime :3101</text>
  <text x="300" y="142" fill="#94a3b8" font-size="9.5">• LangGraph StateGraph harness</text>
  <text x="300" y="157" fill="#94a3b8" font-size="9.5">• Multi-provider LLM gateway</text>
  <text x="300" y="172" fill="#34d399" font-size="9">Autoscaling 2–10 Fargate tasks</text>
  
  <rect x="580" y="105" width="260" height="85" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
  <text x="590" y="125" fill="#93c5fd" font-weight="bold" font-size="11">uaip-knowledge-service :3102</text>
  <text x="590" y="142" fill="#94a3b8" font-size="9.5">• Ingestion workers &amp; hybrid RAG</text>
  <text x="590" y="157" fill="#94a3b8" font-size="9.5">• Token chunker &amp; batch embedding</text>
  <text x="590" y="172" fill="#34d399" font-size="9">Qdrant Cloud + S3 integration</text>
  
  <rect x="40" y="205" width="185" height="85" rx="6" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="50" y="224" fill="#ddd6fe" font-weight="bold" font-size="10.5">krashaq-auth-service :3109</text>
  <text x="50" y="240" fill="#94a3b8" font-size="9">• Identity &amp; JWT auth</text>
  <text x="50" y="254" fill="#94a3b8" font-size="9">• PostGIS geometry &amp; H3</text>
  <text x="50" y="268" fill="#c084fc" font-size="8.5">kq_auth / kq_farmer</text>
  
  <rect x="240" y="205" width="185" height="85" rx="6" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="250" y="224" fill="#ddd6fe" font-weight="bold" font-size="10.5">krashaq-data-service :3112</text>
  <text x="250" y="240" fill="#94a3b8" font-size="9">• Mandi APMC quotes</text>
  <text x="250" y="254" fill="#94a3b8" font-size="9">• Agronomic calculators</text>
  <text x="250" y="268" fill="#c084fc" font-size="8.5">kq_market / Mongo Atlas</text>
  
  <rect x="440" y="205" width="190" height="85" rx="6" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="450" y="224" fill="#ddd6fe" font-weight="bold" font-size="10.5">krashaq-alerts-service :3113</text>
  <text x="450" y="240" fill="#94a3b8" font-size="9">• BullMQ worker fleet</text>
  <text x="450" y="254" fill="#94a3b8" font-size="9">• Outbox alert delivery</text>
  <text x="450" y="268" fill="#c084fc" font-size="8.5">kq_alerts / kq_notif</text>
  
  <rect x="645" y="205" width="195" height="85" rx="6" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="655" y="224" fill="#ddd6fe" font-weight="bold" font-size="10.5">krashaq-weather-service</text>
  <text x="655" y="240" fill="#94a3b8" font-size="9">• IMD warnings ingestion</text>
  <text x="655" y="254" fill="#94a3b8" font-size="9">• Micro-climate caching</text>
  <text x="655" y="268" fill="#c084fc" font-size="8.5">External weather feeds</text>
  
  <rect x="25" y="320" width="830" height="120" rx="8" fill="#0b1120" stroke="#334155" stroke-width="1"/>
  <text x="40" y="340" fill="#cbd5e1" font-weight="bold" font-size="11">STATEFUL &amp; EVENT INFRASTRUCTURE</text>
  
  <rect x="40" y="352" width="220" height="75" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
  <text x="50" y="370" fill="#93c5fd" font-weight="bold" font-size="10">Amazon Aurora PostgreSQL</text>
  <text x="50" y="386" fill="#94a3b8" font-size="9">Multi-AZ Cluster (kq_* schemas)</text>
  <text x="50" y="400" fill="#94a3b8" font-size="9">PostGIS Extension Enabled</text>
  <text x="50" y="414" fill="#34d399" font-size="8.5">Automated backups &amp; encryption</text>
  
  <rect x="275" y="352" width="180" height="75" rx="6" fill="#0f172a" stroke="#ef4444" stroke-width="1"/>
  <text x="285" y="370" fill="#fca5a5" font-weight="bold" font-size="10">ElastiCache Redis 7.x</text>
  <text x="285" y="386" fill="#94a3b8" font-size="9">BullMQ Queue Cluster</text>
  <text x="285" y="400" fill="#94a3b8" font-size="9">Rate Limiting &amp; Session TTL</text>
  <text x="285" y="414" fill="#34d399" font-size="8.5">Multi-AZ replication</text>
  
  <rect x="470" y="352" width="180" height="75" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="480" y="370" fill="#fde68a" font-weight="bold" font-size="10">Amazon EventBridge + SQS</text>
  <text x="480" y="386" fill="#94a3b8" font-size="9">Weather warning fanout</text>
  <text x="480" y="400" fill="#94a3b8" font-size="9">Dead Letter Queues (DLQ)</text>
  <text x="480" y="414" fill="#34d399" font-size="8.5">Decoupled async dispatch</text>
  
  <rect x="665" y="352" width="175" height="75" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="675" y="370" fill="#86efac" font-weight="bold" font-size="10">CloudWatch &amp; AWS X-Ray</text>
  <text x="675" y="386" fill="#94a3b8" font-size="9">End-to-End Tracing</text>
  <text x="675" y="400" fill="#94a3b8" font-size="9">Secrets Manager</text>
  <text x="675" y="414" fill="#34d399" font-size="8.5">Structured JSON logs</text>
</svg>`,
  stack: [
    "AWS ECS Fargate",
    "RDS Aurora PostgreSQL",
    "ElastiCache Redis",
    "Amazon S3",
    "CloudFront",
    "EventBridge",
    "SQS",
    "ALB",
    "Route53",
    "Secrets Manager",
    "CloudWatch",
    "AWS X-Ray",
  ],
};

export const krashaqAgentHarnessProject: Project = {
  id: "krashaq-agent-harness",
  title: "Krashaq AI — Multi-Agent Harness",
  subtitle:
    "Production LangGraph multi-agent harness with 26 governed tools, durable HITL approval, budget enforcement, and provider-neutral model gateway",
  category: "ai",
  featured: false,
  metrics: [
    { value: "26", label: "governed tools registered" },
    { value: "249", label: "runtime test cases" },
    { value: "7", label: "skills · 10 prompts" },
  ],
  problem:
    "Single-shot LLM prompts can't reliably handle compound farmer queries that require fetching weather, querying APMC market prices, running agronomic calculations, and searching the knowledge base — all with correct source attribution, bounded cost, and human approval before consequential actions. Production agent harnesses must enforce constraints at the infrastructure level, not the prompt level.",
  role: "Sole engineer — designed and built the LangGraph StateGraph execution engine, 26-tool registry with input/output schemas, multi-provider model gateway with fallback chains, BudgetBroker enforcement, durable HITL approval with payload hash binding, PostgreSQL checkpoint system, and the multi-agent supervisor/specialist architecture.",
  outcome:
    "A production-grade agent harness where the model proposes tool calls and the harness enforces authorization, budget, output validation, and action receipts. 249 tests pass including persistence cases against disposable PostgreSQL 17.",
  tradeoffs: [
    "LangGraph StateGraph over single-shot prompts — explicit node transitions enable deterministic enforcement of budget caps, scope filtering, and output validation at each step.",
    "Harness-level enforcement over prompt-level enforcement — budgets, tool scopes, action receipts, and output validation belong in code, not in model instructions that can be overridden by adversarial inputs.",
    "Typed ToolResult<T> with status/evidenceIds/provenance over raw text — the model cannot fabricate an action receipt; provenance fields are set by the executor, not the model.",
    "Capability discovery before graph execution over dumping all tool schemas — model receives 5–12 relevant tool definitions per request; authorization is checked again at execution time.",
  ],
  architecture: `<svg viewBox="0 0 880 430" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-xs font-mono">
  <defs>
    <linearGradient id="harnessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="880" height="430" rx="12" fill="#090d16" stroke="#1e293b" stroke-width="1"/>
  
  <rect x="25" y="20" width="830" height="40" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="440" y="44" fill="#38bdf8" font-weight="bold" font-size="12" text-anchor="middle">POST /v1/ai/run (SSE Streaming) → Admission (Auth Token · Idempotency Deduplication · Worker Lease)</text>
  
  <path d="M440 60 L440 85" stroke="#38bdf8" stroke-width="1.5"/>
  
  <rect x="40" y="85" width="380" height="48" rx="6" fill="#0f172a" stroke="#2563eb" stroke-width="1"/>
  <text x="230" y="105" fill="#93c5fd" font-weight="bold" font-size="11" text-anchor="middle">Context Assembly</text>
  <text x="230" y="121" fill="#94a3b8" font-size="9.5" text-anchor="middle">Farm PostGIS Geometry · Crop Stage · Attachments · Memories</text>
  
  <rect x="460" y="85" width="380" height="48" rx="6" fill="#0f172a" stroke="#2563eb" stroke-width="1"/>
  <text x="650" y="105" fill="#93c5fd" font-weight="bold" font-size="11" text-anchor="middle">Capability Discovery &amp; Skill Injection</text>
  <text x="650" y="121" fill="#94a3b8" font-size="9.5" text-anchor="middle">Filter 26 tools by scope → Compact 5-12 tool schemas · 7 skills</text>
  
  <path d="M440 133 L440 160" stroke="#38bdf8" stroke-width="1.5"/>
  
  <!-- LANGGRAPH STATE GRAPH -->
  <rect x="25" y="160" width="830" height="185" rx="8" fill="url(#harnessGrad)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="40" y="180" fill="#60a5fa" font-weight="bold" font-size="11">LANGGRAPH STATEGRAPH CYCLE (kq_runtime CHECKPOINTS)</text>
  
  <rect x="40" y="195" width="140" height="60" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
  <text x="110" y="218" fill="#93c5fd" font-weight="bold" font-size="11" text-anchor="middle">[Plan Node]</text>
  <text x="110" y="234" fill="#94a3b8" font-size="9" text-anchor="middle">Bounded steps &amp;</text>
  <text x="110" y="246" fill="#94a3b8" font-size="9" text-anchor="middle">completion criteria</text>
  
  <path d="M180 225 L205 225" stroke="#60a5fa" stroke-width="1.5"/>
  
  <rect x="205" y="195" width="145" height="60" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
  <text x="277" y="218" fill="#93c5fd" font-weight="bold" font-size="11" text-anchor="middle">[Dispatch &amp; Policy]</text>
  <text x="277" y="234" fill="#94a3b8" font-size="9" text-anchor="middle">Args validation &amp;</text>
  <text x="277" y="246" fill="#94a3b8" font-size="9" text-anchor="middle">BudgetBroker reserve</text>
  
  <path d="M350 225 L375 225" stroke="#60a5fa" stroke-width="1.5"/>
  
  <rect x="375" y="195" width="175" height="60" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="462" y="215" fill="#fde68a" font-weight="bold" font-size="11" text-anchor="middle">[Execute / HITL]</text>
  <text x="462" y="230" fill="#94a3b8" font-size="8.5" text-anchor="middle">Side-effect ? awaiting_approval</text>
  <text x="462" y="244" fill="#fbbf24" font-size="8.5" text-anchor="middle">Payload hash binding &amp; lease</text>
  
  <path d="M550 225 L575 225" stroke="#60a5fa" stroke-width="1.5"/>
  
  <rect x="575" y="195" width="125" height="60" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
  <text x="637" y="218" fill="#93c5fd" font-weight="bold" font-size="11" text-anchor="middle">[Observe]</text>
  <text x="637" y="234" fill="#94a3b8" font-size="9" text-anchor="middle">Typed ToolResult</text>
  <text x="637" y="246" fill="#94a3b8" font-size="9" text-anchor="middle">Evidence IDs + proof</text>
  
  <path d="M700 225 L725 225" stroke="#60a5fa" stroke-width="1.5"/>
  
  <rect x="725" y="195" width="115" height="60" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
  <text x="782" y="218" fill="#93c5fd" font-weight="bold" font-size="11" text-anchor="middle">[Verify &amp; Synthesize]</text>
  <text x="782" y="234" fill="#94a3b8" font-size="9" text-anchor="middle">Deterministic critic</text>
  <text x="782" y="246" fill="#94a3b8" font-size="9" text-anchor="middle">Grounded draft</text>
  
  <rect x="40" y="270" width="800" height="60" rx="6" fill="#0b1120" stroke="#1e293b" stroke-width="1"/>
  <text x="55" y="292" fill="#cbd5e1" font-weight="bold" font-size="10.5">BUDGET &amp; GOVERNANCE BROKER</text>
  <text x="55" y="310" fill="#94a3b8" font-size="9.5">• Hard Token / USD Dollar Caps per run</text>
  <text x="320" y="310" fill="#94a3b8" font-size="9.5">• Loop Detection (repeated tool args)</text>
  <text x="580" y="310" fill="#94a3b8" font-size="9.5">• Finalization Reserve preserved</text>
  
  <path d="M440 345 L440 365" stroke="#10b981" stroke-width="1.5"/>
  
  <!-- Finalization -->
  <rect x="25" y="365" width="830" height="50" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
  <text x="440" y="388" fill="#a7f3d0" font-weight="bold" font-size="12" text-anchor="middle">Finalization: Persist Action Journal &amp; Checkpoint → Terminal Event → SSE Token Stream with Verified Citations</text>
  <text x="440" y="403" fill="#6ee7b7" font-size="9.5" text-anchor="middle">Multi-Provider Gateway: Groq (Llama 3.3 70B) · OpenAI (GPT-4o) · Anthropic (Claude 3.5 Sonnet) · Gemini · xAI · Ollama</text>
</svg>`,
  stack: [
    "LangGraph",
    "TypeScript / Node.js",
    "PostgreSQL",
    "OpenAI",
    "Anthropic",
    "Gemini",
    "Groq",
    "Redis",
    "Jest",
  ],
};

export const krashaqContextKbProject: Project = {
  id: "krashaq-context-kb",
  title: "Krashaq AI — Context Engineering & Knowledge Base",
  subtitle:
    "Hybrid RAG knowledge pipeline — Qdrant + BM25 + RRF fusion, token-aware chunking, and 4-store context architecture for agricultural AI",
  category: "ai",
  featured: false,
  metrics: [
    { value: "768-dim", label: "Qdrant embeddings" },
    { value: "RRF", label: "hybrid retrieval fusion" },
    { value: "271", label: "knowledge service tests" },
  ],
  problem:
    "Agricultural AI queries in Hindi/Hinglish/English require domain-specific retrieval that pure vector search fails at. Short 3–5 word crop queries need BM25 for exact term matching. Farm context must come from the authoritative auth service, not chat memory that can go stale.",
  role: "Sole engineer — hybrid RAG pipeline (Qdrant + BM25 + RRF + diversity re-ranking), token-aware chunking, 4-store context architecture, context assembly priority ordering, rolling conversation summarization, and farm/crop AI context API.",
  outcome:
    "Knowledge service with 271 tests covering ingestion, chunker accuracy, RRF fusion, ACL filtering, and storage flows. Hybrid retrieval measurably outperforms pure vector search on short Hindi/Hinglish agricultural queries.",
  tradeoffs: [
    "Qdrant + BM25 hybrid RAG over pure vector search — RRF captures lexical matches that dense embeddings miss.",
    "PostgreSQL metadata + Qdrant vectors over single vector DB — ACLs, version history, and ingestion jobs stay relational.",
    "Token-aware chunking over character splits — preserves semantic units in agricultural tables and formulae.",
    "4-store context separation — prevents chat statements from silently updating authoritative farm records.",
  ],
  architecture: `<svg viewBox="0 0 880 440" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto text-xs font-mono">
  <defs>
    <linearGradient id="ragGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#059669" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="880" height="440" rx="12" fill="#090d16" stroke="#1e293b" stroke-width="1"/>
  
  <!-- LEFT: INGESTION PIPELINE -->
  <rect x="25" y="20" width="400" height="200" rx="8" fill="url(#ragGrad)" stroke="#10b981" stroke-width="1.5"/>
  <text x="40" y="42" fill="#34d399" font-weight="bold" font-size="11">1. INGESTION PIPELINE (uaip-knowledge-service :3102)</text>
  
  <rect x="40" y="55" width="370" height="35" rx="5" fill="#0f172a" stroke="#059669" stroke-width="1"/>
  <text x="55" y="77" fill="#cbd5e1" font-size="10">PDF / DOCX Uploads → MinIO / S3 Presigned URLs</text>
  
  <rect x="40" y="98" width="370" height="35" rx="5" fill="#0f172a" stroke="#059669" stroke-width="1"/>
  <text x="55" y="120" fill="#cbd5e1" font-size="10">Section &amp; Table Extractor (Preserve atomic tables &amp; OCR)</text>
  
  <rect x="40" y="141" width="370" height="35" rx="5" fill="#0f172a" stroke="#059669" stroke-width="1"/>
  <text x="55" y="163" fill="#cbd5e1" font-size="10">Token Chunker: 512 tokens · 64 overlap · sentence aligned</text>
  
  <rect x="40" y="184" width="370" height="28" rx="5" fill="#0f172a" stroke="#059669" stroke-width="1"/>
  <text x="55" y="202" fill="#86efac" font-size="9.5">Batch Embeddings (768-dim) → Qdrant Upsert (kb_krashaq)</text>
  
  <!-- RIGHT: HYBRID RETRIEVAL PIPELINE -->
  <rect x="455" y="20" width="400" height="200" rx="8" fill="url(#ragGrad)" stroke="#10b981" stroke-width="1.5"/>
  <text x="470" y="42" fill="#34d399" font-weight="bold" font-size="11">2. HYBRID RETRIEVAL &amp; RRF FUSION</text>
  
  <rect x="470" y="55" width="175" height="42" rx="5" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="480" y="73" fill="#86efac" font-weight="bold" font-size="10">Qdrant Dense</text>
  <text x="480" y="87" fill="#94a3b8" font-size="8.5">768-dim cosine similarity</text>
  
  <rect x="665" y="55" width="175" height="42" rx="5" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="675" y="73" fill="#86efac" font-weight="bold" font-size="10">BM25 Lexical</text>
  <text x="675" y="87" fill="#94a3b8" font-size="8.5">Keyword &amp; crop taxonomy</text>
  
  <rect x="470" y="105" width="370" height="35" rx="5" fill="#042f2e" stroke="#14b8a6" stroke-width="1"/>
  <text x="485" y="127" fill="#5eead4" font-weight="bold" font-size="10">Reciprocal Rank Fusion (RRF: k=60)</text>
  
  <rect x="470" y="148" width="370" height="32" rx="5" fill="#0f172a" stroke="#059669" stroke-width="1"/>
  <text x="485" y="169" fill="#cbd5e1" font-size="9.5">MMR Diversity Re-ranking + Threshold Guard (Score &gt; 0.65)</text>
  
  <rect x="470" y="188" width="370" height="24" rx="5" fill="#0f172a" stroke="#059669" stroke-width="1"/>
  <text x="485" y="204" fill="#34d399" font-size="9">Evidence Excerpts with Immutable Version/Page Citations</text>
  
  <!-- BOTTOM: 4-STORE CONTEXT ARCHITECTURE -->
  <rect x="25" y="235" width="830" height="185" rx="8" fill="#0b1120" stroke="#334155" stroke-width="1"/>
  <text x="40" y="258" fill="#93c5fd" font-weight="bold" font-size="11">3. FOUR-STORE CONTEXT &amp; MEMORY ENGINEERING ARCHITECTURE</text>
  
  <rect x="40" y="272" width="185" height="75" rx="6" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
  <text x="50" y="292" fill="#93c5fd" font-weight="bold" font-size="10">1. Conversation Store</text>
  <text x="50" y="308" fill="#94a3b8" font-size="8.5">• Turns &amp; attachments</text>
  <text x="50" y="322" fill="#94a3b8" font-size="8.5">• Rolling summaries with turn IDs</text>
  <text x="50" y="336" fill="#34d399" font-size="8">User-visible &amp; deletable</text>
  
  <rect x="240" y="272" width="185" height="75" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="250" y="292" fill="#fde68a" font-weight="bold" font-size="10">2. Run State Store</text>
  <text x="250" y="308" fill="#94a3b8" font-size="8.5">• Active plan &amp; tool receipts</text>
  <text x="250" y="322" fill="#94a3b8" font-size="8.5">• Budget ledger &amp; worker lease</text>
  <text x="250" y="336" fill="#fbbf24" font-size="8">kq_runtime PostgreSQL</text>
  
  <rect x="440" y="272" width="190" height="75" rx="6" fill="#0f172a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="450" y="292" fill="#ddd6fe" font-weight="bold" font-size="10">3. User Memory Store</text>
  <text x="450" y="308" fill="#94a3b8" font-size="8.5">• Confirmed farmer preferences</text>
  <text x="450" y="322" fill="#94a3b8" font-size="8.5">• Namespaced &amp; expiring facts</text>
  <text x="450" y="336" fill="#c084fc" font-size="8">Explicit candidate verification</text>
  
  <rect x="645" y="272" width="195" height="75" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="655" y="292" fill="#86efac" font-weight="bold" font-size="10">4. Product Records</text>
  <text x="655" y="308" fill="#94a3b8" font-size="8.5">• PostGIS farms &amp; crop stages</text>
  <text x="655" y="322" fill="#94a3b8" font-size="8.5">• Authoritative domain API fetch</text>
  <text x="655" y="336" fill="#34d399" font-size="8">Owning services authoritative</text>
  
  <rect x="40" y="358" width="800" height="48" rx="6" fill="#022c22" stroke="#059669" stroke-width="1"/>
  <text x="55" y="378" fill="#6ee7b7" font-weight="bold" font-size="10">Context Assembly Priority Order:</text>
  <text x="55" y="394" fill="#a7f3d0" font-size="9">1. Policy → 2. Objective/Resources → 3. Constraints → 4. Plan/Skill → 5. Recent Turns → 6. Tool Observations → 7. Evidence Excerpts → 8. User Memories</text>
</svg>`,
  stack: [
    "Qdrant",
    "BM25",
    "PostgreSQL",
    "MinIO / S3",
    "Node.js / TypeScript",
    "LangGraph",
    "Jest",
  ],
};
