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

/** Featured on homepage — depth over breadth (3 max) */
export const projects: Project[] = [
  {
    id: "krashaq",
    title: "Krashaq AI",
    subtitle:
      "Multilingual smart farming platform — crop advisory, weather alerts, and supplier-managed farmer access",
    category: "ai",
    featured: true,
    metrics: [
      { value: "53", label: "automated tests" },
      { value: "Groq", label: "Llama 3.3 70B default" },
      { value: "3", label: "languages supported" },
    ],
    problem:
      "Smallholder farmers need timely crop advice in Hindi, Hinglish, and English — while ag-input suppliers need a scalable way to license access and manage farmer subscriptions at scale.",
    role: "Solo full-stack — owned product design through production: AI advisory chat, knowledge-base retrieval, role-based dashboards, subscription licensing, and proactive crop alerts.",
    outcome:
      "Shipped a live platform where farmers receive multilingual crop guidance and weather-driven irrigation advice; suppliers manage subscriptions and send proactive alerts; admins oversee licensing and platform operations.",
    tradeoffs: [
      "Next.js monolith over split frontend/backend repos — one Vercel deploy, shared types, no cross-service auth.",
      "MongoDB hybrid RAG (keyword + vector in kb_chunks) over Pinecone — vectors co-located with app data, fewer dependencies.",
      "Groq default + configurable fallback chain (OpenAI, Gemini, Anthropic…) — low latency without single-vendor lock-in.",
      "In-app alerts + hourly Vercel cron before SMS/WhatsApp — validated delivery semantics before external channels.",
    ],
    architecture: `Browser (Farmer / Supplier / Admin)
        ↓
Next.js 16 Monolith — Vercel (bom1)
  ├── App Router UI + /api/* routes
  ├── LangGraph agent (tool routing, deduped KB fetch)
  ├── Hybrid RAG (RRF + MMR + category boost)
  ├── B2B2C RBAC (admin → supplier → farmer sub)
  └── Cron (/api/cron/alerts) + in-app notifications
        ↓
MongoDB Atlas (+ optional Upstash Redis)
        ↓
Groq · OpenAI · Gemini · Anthropic · WeatherAPI`,
    stack: [
      "Next.js 16",
      "TypeScript",
      "MongoDB",
      "LangGraph",
      "Groq",
      "Tailwind CSS",
      "shadcn/ui",
      "Jest",
      "Vercel",
    ],
    github: "https://github.com/yashdark01/Krashaq-Ai",
    live: "https://krashaq-agritech.vercel.app",
  },
  {
    id: "horizon17-esg",
    title: "Ecometer",
    subtitle:
      "Sustainability intelligence platform — measure, manage, and report environmental impact across campaigns and events",
    category: "enterprise",
    featured: true,
    builtAt: "Horizon17 Technology and Sustainability Pvt. Ltd.",
    role: "Founding Engineer · Full Stack Developer — I own frontend architecture on Ecometer (chart-heavy Next.js dashboards, SSR, compliance-ready export flows) and work across event-driven microservices on the backend (NATS messaging, Docker deployments, MinIO object storage).",
    metrics: [
      { value: "10+", label: "published client campaigns" },
      { value: "Patent-filed", label: "platform · EcoMS" },
      { value: "BRSR", label: "audit-ready reporting" },
    ],
    problem:
      "Brands, agencies, and event organizers need to embed sustainability into OOH, DOOH, print, digital, and experiential work — from planning through post-campaign recovery — with credible, audit-ready ESG reporting aligned to BRSR standards.",
    outcome:
      "Contributing to a patent-filed platform in production across enterprise sustainability workflows — from Amazon and Tata Motors events to OOH campaigns for HDFC, Nykaa, and Nivea.",
    tradeoffs: [
      "Unified platform over point solutions — one system for measure-through-report instead of disconnected spreadsheets and tools.",
      "Audit-ready reporting over quick exports — BRSR-aligned outputs that stand up to scrutiny, even when generation takes longer.",
      "Modular campaign types (OOH, events, digital) under shared reporting standards — flexibility without losing comparability.",
    ],
    architecture: `Brands · Agencies · Event Organizers
        ↓
Next.js dashboards (SSR, chart modules, export flows)
        ↓
Event-driven microservices (NATS messaging)
        ↓
Node.js / Express.js REST services · metric & reporting APIs
        ↓
MinIO/S3 document storage · compliance artifacts
        ↓
Ecometer Platform (EcoMS) — Measure · Manage · Circularity · Report · Visualise
        ↓
Scope 1–3 emissions · BRSR-aligned outputs · SDG assessments`,
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "Microservices",
      "NATS",
      "Docker",
      "MinIO / S3",
      "Nginx",
      "CI/CD",
    ],
    live: "https://ecomsww.com/",
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
    id: "archflow",
    title: "Archflow",
    description:
      "In-browser system design canvas — drag-drop nodes, connections, and AI-assisted architecture diagrams. Active side project; demo coming soon.",
    tags: ["System Design", "React", "Canvas"],
    github: "https://github.com/yashdark01/archflow",
    caseStudyPath: "/work/archflow",
    previewComingSoon: true,
  },
  {
    id: "music-player",
    title: "Music Player",
    description:
      "Streaming app — React, Node.js, Express.js, MongoDB, Clerk OAuth, Redux player queue, MongoDB aggregation feeds, Supertest on auth routes, and admin CRUD via Cloudinary. Full engineering case study.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Clerk", "Redux"],
    github: "https://github.com/yashdark01/Music-Player",
    caseStudyPath: "/work/music-player",
  },
];
