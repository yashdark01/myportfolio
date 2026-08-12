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
      "Contributed to a patent-filed platform trusted by leading brands and enterprises — improving dashboard performance and accelerating sustainability report workflows for analyst teams.",
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
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
    ],
    live: "https://ecomsww.com/",
  },
  {
    id: "music-player",
    title: "Music Player",
    subtitle: "Full-stack streaming app with JWT auth + audio caching (−25% load)",
    category: "fullstack",
    featured: true,
    metrics: [
      { value: "25%", label: "faster loads" },
      { value: "JWT", label: "secured auth" },
      { value: "MERN", label: "full stack" },
    ],
    problem:
      "Users wanted a full-featured music streaming experience with playlists, search, and personalized recommendations.",
    role: "Built the entire MERN stack application — auth, audio streaming, playlist management, and UI.",
    outcome:
      "Delivered a production-ready streaming platform with MongoDB aggregation pipelines, audio caching, and Redux Toolkit state management.",
    tradeoffs: [
      "Redux Toolkit for predictable audio + playlist state vs Context — easier debugging for complex player flows.",
      "MongoDB aggregation for recommendations instead of client-side filtering — reduced payload size by ~25%.",
      "JWT + httpOnly-style session pattern for auth; RBAC-ready structure for future admin roles.",
    ],
    architecture: `React + ShadCN UI
        ↓
Redux Toolkit (player / playlist state)
        ↓
Express.js REST API
        ↓
JWT auth middleware
        ↓
MongoDB (users, songs, playlists)`,
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "ShadCN UI",
      "Tailwind CSS",
    ],
    github: "https://github.com/yashdark01/spotify",
  },
];

export interface MoreProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}

export const moreProjects: MoreProject[] = [
  {
    id: "sns",
    title: "SNS Website",
    description:
      "Social platform with scroll-triggered animations and +30% engagement via Framer Motion and Intersection Observer.",
    tags: ["React.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/yashdark01/sns",
    live: "https://sns-cyan.vercel.app",
  },
  {
    id: "rent-buddy",
    title: "Rent Buddy & Client Apps",
    description:
      "4+ production-ready web applications built during internship — responsive UIs with JWT-secured access.",
    tags: ["React.js", "Node.js", "MongoDB"],
    github: "https://github.com/yashdark01/rentbuddy",
    live: "https://rentbuddy.in/home",
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
