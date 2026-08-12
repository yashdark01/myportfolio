export const site = {
  name: "Yash Patidar",
  title: "Full Stack Engineer · AI & Enterprise Products",
  tagline: "I ship products end-to-end — enterprise dashboards to RAG-based AI assistants.",
  institution: "IIIT Nagpur · B.Tech CSE",
  status: "Open to opportunities",
  recentlyShipped: "Krashaq · AI Smart Farming",
  email: "yashpatidar9691@gmail.com",
  phone: "+91 7987386670",
  resumeUrl: "/Yash-Patidar-CV.pdf",
  links: {
    linkedin: "https://linkedin.com/in/yash-patidar-97a8861b3",
    github: "https://github.com/yashdark01",
    email: "mailto:yashpatidar9691@gmail.com",
  },
  heroStats: [
    { value: "40%", label: "faster page loads" },
    { value: "45%", label: "backend perf gain" },
    { value: "60%", label: "faster report drafting" },
    { value: "4+", label: "production apps" },
  ],
  aiHeroStats: [
    { value: "3", label: "languages supported" },
    { value: "RAG", label: "document querying" },
    { value: "LLM", label: "local + cloud fallback" },
    { value: "60%", label: "faster content drafting" },
  ],
  openTo: {
    roles: [
      "Full Stack Engineer",
      "Frontend Engineer (React/Next.js)",
      "AI/ML Engineer (Applied LLM)",
    ],
    stage: "Product companies · Series A–D · Enterprise SaaS",
    location: "Remote · Gurgaon/Delhi NCR · Open to relocation",
    available: "Immediately · B.Tech CSE, IIIT Nagpur (Jun 2025)",
  },
} as const;

export type Persona = "product" | "ai";

export const navItems = [
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Understand the problem first",
    description:
      "Before writing code, I map user flows, constraints, and success metrics — especially for enterprise dashboards where performance and clarity matter.",
  },
  {
    number: "02",
    title: "Ship the thinnest end-to-end slice",
    description:
      "One working loop: auth → API → UI → deploy. No orphaned backend branches or UI mockups that never connect.",
  },
  {
    number: "03",
    title: "Measure, then optimize",
    description:
      "SSR, code splitting, Redis caching, query tuning — I optimize with Core Web Vitals and API latency numbers, not guesses.",
  },
  {
    number: "04",
    title: "Finish with proof",
    description:
      "Every project here has a live URL or GitHub repo. I don't list ideas — I list shipped work.",
  },
] as const;

export const expertiseGroups = [
  {
    title: "Frontend & Product",
    subtitle: "High-performance UIs",
    tags: [
      "Next.js SSR/SSG",
      "Code Splitting",
      "Tailwind CSS",
      "ShadCN UI",
      "Framer Motion",
      "Core Web Vitals",
    ],
  },
  {
    title: "Backend & Systems",
    subtitle: "Scalable services",
    tags: [
      "Node.js",
      "FastAPI",
      "REST Microservices",
      "Redis Caching",
      "JWT / RBAC",
      "PostgreSQL / MongoDB",
    ],
  },
  {
    title: "AI & LLM",
    subtitle: "Intelligent features",
    tags: [
      "LangChain",
      "LangGraph",
      "RAG Pipelines",
      "Vector Search",
      "Prompt Engineering",
      "HITL Workflows",
    ],
  },
] as const;
