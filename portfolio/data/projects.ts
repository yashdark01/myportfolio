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
      { value: "Live", label: "production demo" },
      { value: "3", label: "languages" },
      { value: "Multi-role", label: "farmer · supplier · admin" },
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
    role: "Founding Engineer · Full Stack Developer — building Ecometer, the sustainability intelligence product delivered by EcoMS.",
    metrics: [
      { value: "Scope 1–3", label: "carbon accounting" },
      { value: "BRSR", label: "audit-ready reporting" },
      { value: "Enterprise", label: "production platform" },
    ],
    problem:
      "Brands, agencies, and event organizers need to embed sustainability into OOH, DOOH, print, digital, and experiential work — from planning through post-campaign recovery — with credible, audit-ready ESG reporting aligned to BRSR standards.",
    outcome:
      "Contributing to a patent-filed platform in production — helping brands and agencies measure and report campaign environmental impact through the EcoMS ecosystem.",
    tradeoffs: [
      "Unified platform over point solutions — one system for measure-through-report instead of disconnected spreadsheets and tools.",
      "Audit-ready reporting over quick exports — BRSR-aligned outputs that stand up to scrutiny, even when generation takes longer.",
      "Modular campaign types (OOH, events, digital) under shared reporting standards — flexibility without losing comparability.",
    ],
    architecture: `Brands · Agencies · Event Organizers
        ↓
Ecometer Platform (EcoMS)
  ├── Measure — real-time carbon across OOH, DOOH, print, digital, experiential
  ├── Manage — optimize materials, media choices, and execution
  ├── Circularity — post-campaign recovery, recycling, and reuse
  ├── Report — BRSR- and ESG-aligned, audit-ready outputs
  └── Visualise — interactive sustainability dashboards
        ↓
Horizon17 Technology — AI · IoT · blockchain sustainability infrastructure
        ↓
Scope 1, 2 & 3 emissions · SDG-aligned assessments`,
    stack: [],
    live: "https://ecomsww.com/",
  },
  {
    id: "rent-buddy",
    title: "Rent Buddy",
    subtitle:
      "Production rental platform — live client deployment from internship delivery",
    category: "fullstack",
    featured: true,
    builtAt: "WebIntegratorz · Internship",
    metrics: [
      { value: "Live", label: "rentbuddy.in" },
      { value: "4+", label: "production apps shipped" },
      { value: "JWT", label: "secured access" },
    ],
    problem:
      "Property rental workflows need responsive, production-grade web apps with secure authentication — built and maintained under real client deadlines, not classroom timelines.",
    role: "Full-stack developer during internship — built and shipped production web applications including Rent Buddy, with JWT-secured APIs, responsive UI, and client-facing deployments.",
    outcome:
      "Delivered Rent Buddy as a live production platform at rentbuddy.in, alongside 3+ additional client apps — demonstrating end-to-end delivery under internship constraints.",
    tradeoffs: [
      "React + Node monorepo patterns over separate repos — faster iteration for client sprints.",
      "JWT session auth over OAuth — matched client infra and timeline; RBAC-ready for admin flows.",
      "Mobile-first responsive UI over native apps — broader reach for rental users on low-end devices.",
    ],
    architecture: `Users (renters · owners · admins)
        ↓
React.js SPA — responsive, mobile-first
        ↓
Node.js REST API + JWT middleware
        ↓
MongoDB (listings, users, bookings)
        ↓
Production deploy — rentbuddy.in`,
    stack: ["React.js", "Node.js", "MongoDB", "JWT", "Tailwind CSS"],
    github: "https://github.com/yashdark01/rentbuddy",
    live: "https://rentbuddy.in/home",
  },
];

/** Full project data for demoted projects that still have case study pages */
export const musicPlayerProject: Project = {
  id: "music-player",
  title: "Music Player",
  subtitle: "Full-stack streaming app with Clerk auth, admin CRUD, and Redux player state",
  category: "fullstack",
  featured: false,
  metrics: [
    { value: "Clerk", label: "OAuth auth" },
    { value: "Admin", label: "upload + delete" },
    { value: "MERN", label: "full stack" },
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
}

export const moreProjects: MoreProject[] = [
  {
    id: "music-player",
    title: "Music Player",
    description:
      "Streaming MERN app — Clerk OAuth, Redux player queue, MongoDB discovery feeds, and admin upload/delete via Cloudinary.",
    tags: ["MERN", "Clerk", "Redux"],
    github: "https://github.com/yashdark01/Music-Player",
    caseStudyPath: "/work/music-player",
  },
  {
    id: "sns",
    title: "SNS Website",
    description:
      "SAP digital transformation landing page — AOS scroll animations, responsive Tailwind UI, and smooth section navigation.",
    tags: ["React.js", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/yashdark01/sns-website",
    live: "https://sns-website-nine.vercel.app/",
  },
  {
    id: "course-enrollment",
    title: "Course Enrollment System",
    description:
      "Full-stack enrollment platform with admin panel, JWT auth, and role-based access control.",
    tags: ["React.js", "Node.js", "MongoDB", "JWT"],
    github: "https://github.com/yashdark01/project-1",
    live: "https://project-1-two-gamma.vercel.app/",
  },
];
