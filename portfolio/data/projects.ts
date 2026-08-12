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
    title: "Krashaq",
    subtitle:
      "Multilingual AI farming assistant with WhatsApp + local LLM fallback",
    category: "ai",
    featured: true,
    metrics: [
      { value: "3", label: "languages" },
      { value: "Live", label: "weather data" },
      { value: "Redis", label: "multi-tenant cache" },
    ],
    problem:
      "Farmers need real-time, multilingual crop advice but lack access to expert agronomists and timely irrigation guidance.",
    role: "Solo full-stack — designed the API, LLM pipeline, WhatsApp integration, and smart irrigation engine across frontend + backend repos.",
    outcome:
      "Built a full-stack assistant with Ollama (local LLM) + Gemini fallback for Hindi/Hinglish/English, two-way WhatsApp via Twilio, and proactive crop alerts powered by WeatherAPI and APScheduler.",
    tradeoffs: [
      "Ollama locally for cost + privacy; Gemini as cloud fallback when local model confidence is low.",
      "Redis for session + advisory cache instead of hitting WeatherAPI on every request.",
      "MongoDB for flexible farmer profiles vs PostgreSQL — faster iteration for multi-tenant schema changes.",
    ],
    architecture: `Farmer (Web / WhatsApp)
        ↓
Next.js Frontend ──→ FastAPI Backend ──→ Ollama (local LLM)
        ↓                    ↓
   WeatherAPI          Gemini (fallback)
        ↓                    ↓
   APScheduler         LangChain router
        ↓                    ↓
   Redis cache         MongoDB (profiles)`,
    stack: [
      "FastAPI",
      "Next.js",
      "MongoDB",
      "LangChain",
      "Ollama",
      "Redis",
      "Twilio",
    ],
    github: "https://github.com/yashdark01/krashaq-agritech",
    githubSecondary: "https://github.com/yashdark01/krashaq-backend",
    live: "https://krashaq-agritech.vercel.app",
  },
  {
    id: "horizon17-esg",
    title: "Enterprise ESG Platform",
    subtitle: "ESG dashboard with 40% faster loads + RAG document assistant",
    category: "enterprise",
    featured: true,
    builtAt: "Horizon17 Technology",
    metrics: [
      { value: "40%", label: "faster loads" },
      { value: "45%", label: "backend gain" },
      { value: "RAG", label: "AI assistant" },
    ],
    problem:
      "Enterprise teams needed faster ESG dashboards and an AI-powered way to query sustainability documents and draft reports.",
    role: "Full Stack Developer at Horizon17 — architected frontend performance, RAG pipeline, and backend microservices.",
    outcome:
      "Delivered 40% faster page loads via SSR and code splitting, 45% backend performance via Redis caching, and a Notion-style AI editor that cut report drafting time by 60%.",
    tradeoffs: [
      "SSR + code splitting over pure CSR — better LCP for dashboard-heavy pages at the cost of more complex data fetching.",
      "Redis cache for hot ESG metrics queries; invalidated on write to avoid stale sustainability data.",
      "LangGraph for multi-step RAG flows vs single-shot prompts — better accuracy for long compliance documents.",
    ],
    architecture: `Next.js Dashboard (SSR / lazy routes)
        ↓
Node.js REST microservices
        ↓
Redis cache ←→ PostgreSQL / MongoDB
        ↓
RAG Pipeline (LangChain + LangGraph)
        ↓
Vector store + document ingestion
        ↓
Notion-style AI editor (HITL review)`,
    stack: [
      "React.js",
      "Next.js",
      "Node.js",
      "Redis",
      "LangChain",
      "LangGraph",
      "GitHub Actions",
    ],
    github: "https://github.com/yashdark01/RAG-Frontend",
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
    live: "https://github.com/yashdark01/rentbuddy-website",
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
