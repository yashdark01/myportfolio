export const site = {
  name: "Yash Patidar",
  title: "Full-Stack Engineer specializing in Applied AI · Founding Engineer at Horizon17",
  tagline:
    "Full-stack engineer specializing in applied AI systems. Founding Engineer at Horizon17, building production AI and enterprise sustainability products end-to-end.",
  institution: "IIIT Nagpur · B.Tech CSE",
  yearsExperience: "2+ years of experience",
  status: "Open to opportunities",
  recentlyShipped: "Krashaq AI · Smart Farming Platform",
  email: "yashpatidar9691@gmail.com",
  phone: "+91 7987386670",
  resumeUrl:
    "https://drive.google.com/file/d/1VbUkoZU12HkipJVHGZUfof5RjUdynIO8/view?usp=sharing",
  /** Set to true when you want LeetCode visible (recommended: 150+ Medium) */
  showLeetCode: false,
  links: {
    horizon17: "https://www.horizon17ww.com/",
    linkedin: "https://linkedin.com/in/yash-patidar-97a8861b3",
    github: "https://github.com/yashdark01",
    leetcode: "https://leetcode.com/u/yashdark_01/",
    email: "mailto:yashpatidar9691@gmail.com",
  },
  heroStats: [
    { value: "EcoMeter", label: "enterprise product · EcoMS" },
    { value: "20+", label: "analytics dashboards" },
    { value: "7", label: "media categories" },
    { value: "AI", label: "editable reporting workflows" },
  ],
  aiHeroStats: [
    { value: "Live", label: "Krashaq AI demo" },
    { value: "9", label: "microservices" },
    { value: "630+", label: "automated tests" },
    { value: "26", label: "governed agent tools" },
  ],
  featuredProject: {
    id: "krashaq",
    title: "Krashaq AI",
    badge: "Featured project · Personal",
    headline:
      "Production-grade AI agritech platform — 9 microservices, multi-agent harness, hybrid RAG, live demo",
    outcome:
      "Solo architect: two-layer platform with LangGraph agent harness, 26 tools, Qdrant/BM25 RAG, and PostgreSQL outbox alerts.",
    live: "https://krashaq-agritech.vercel.app",
    github: "https://github.com/yashdark01/Krashaq-Ai",
    caseStudyPath: "/work/krashaq",
    showTechnicalDeepDive: true,
  },
  coding: {
    leetcode: {
      url: "https://leetcode.com/u/yashdark_01/",
      label: "LeetCode",
      note: "DSA prep — problem solving for product company interviews",
    },
  },
  openTo: {
    roles: [
      "Applied AI Engineer",
      "AI Full Stack Developer",
      "Full Stack Engineer",
      "Backend Engineer",
      "Frontend Engineer (React/Next.js)",
    ],
    stage: "Product companies · Series A–D · Enterprise SaaS",
    location:
      "Remote-first · Gurgaon/Delhi NCR · Open to Bengaluru, Mumbai, Pune",
    available: "Immediately · B.Tech CSE, IIIT Nagpur (Jun 2025)",
  },
} as const;

export type Persona = "product" | "ai";

export interface FeaturedProjectConfig {
  id: string;
  title: string;
  badge: string;
  headline: string;
  outcome: string;
  live?: string;
  github?: string;
  caseStudyPath: string;
  showTechnicalDeepDive?: boolean;
}

export const personas: Record<
  Persona,
  {
    tagline: string;
    workIntro: string;
    featuredProject: FeaturedProjectConfig;
    projectOrder: readonly string[];
    expertiseOrder: readonly string[];
  }
> = {
  product: {
    tagline:
      "Full-stack engineer specializing in applied AI systems. As a Founding Engineer at Horizon17, I build production products end-to-end — from microservice backends to chart-heavy enterprise dashboards.",
    workIntro:
      "Enterprise product work first — applied AI with a live demo and production internship delivery below.",
    featuredProject: {
      id: "horizon17-esg",
      title: "EcoMeter",
      badge: "Featured project · Horizon17",
      headline:
        "Media-focused GHG accounting and AI sustainability reporting across 20+ dashboards",
      outcome:
        "Founding engineer across ingestion, calculations, Recharts dashboards, Google Maps, RBAC, AI report editing, exports, and AWS container delivery.",
      live: "https://ecomsww.com/ecometer-the-carbon-economy-for-advertising",
      caseStudyPath: "/work/horizon17-esg",
      showTechnicalDeepDive: true,
    },
    projectOrder: ["horizon17-esg", "ecolynk", "popscan", "krashaq", "rent-buddy"],
    expertiseOrder: [
      "Frontend & Product",
      "Backend & Systems",
      "Platform & DevOps",
      "AI & LLM",
    ],
  },
  ai: {
    tagline:
      "I build applied AI products end-to-end — RAG pipelines, LangGraph agents, streaming chat — with live demos and open-source code.",
    workIntro:
      "Applied AI with a live demo first — enterprise platform work and production internship delivery below.",
    featuredProject: {
      id: "krashaq",
      title: "Krashaq AI",
      badge: "Featured project · Personal",
      headline:
        "Production AI agritech platform — 9 microservices, multi-agent harness, hybrid RAG, live demo",
      outcome:
        "Solo architect: two-layer platform with LangGraph agent harness, 26 tools, Qdrant/BM25 RAG, and event-driven alerts.",
      live: "https://krashaq-agritech.vercel.app",
      github: "https://github.com/yashdark01/Krashaq-Ai",
      caseStudyPath: "/work/krashaq",
      showTechnicalDeepDive: true,
    },
    projectOrder: ["krashaq", "popscan", "ecolynk", "horizon17-esg", "rent-buddy"],
    expertiseOrder: [
      "AI & LLM",
      "Backend & Systems",
      "Frontend & Product",
      "Platform & DevOps",
    ],
  },
};

const baseSocialLinks = [
  { id: "github", label: "GitHub", href: site.links.github },
  { id: "linkedin", label: "LinkedIn", href: site.links.linkedin },
] as const;

const leetcodeLink = {
  id: "leetcode",
  label: "LeetCode",
  href: site.links.leetcode,
} as const;

export const socialLinks = site.showLeetCode
  ? [...baseSocialLinks, leetcodeLink]
  : [...baseSocialLinks];

export const navItems = [
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "social-proof", label: "Proof" },
  { id: "github", label: "GitHub" },
  { id: "writing", label: "Writing" },
  { id: "journey", label: "Journey" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Understand the problem first",
    description:
      "Before writing code, I map user flows, constraints, and success metrics — for Krashaq that meant designing for Hindi/Hinglish farmers on 2G before touching the LLM API.",
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
      "On EcoMeter's chart-heavy dashboards, per-module code splitting and query tuning improved repeat-load behavior on filter-heavy views. On Rent Buddy I reduced hot listing API response times by ~30%. On Krashaq, 630+ automated tests now cover the nine-service platform before new agent complexity ships.",
  },
  {
    number: "04",
    title: "Finish with proof",
    description:
      "Featured projects ship with live demos or open-source repos. When work is under NDA, I show architecture and trade-offs instead of a public URL.",
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
      "Express.js",
      "FastAPI",
      "Microservices",
      "REST APIs",
      "Redis Caching",
      "JWT / OAuth 2.0",
      "RBAC Security",
      "PostgreSQL / MongoDB",
      "System Design",
    ],
  },
  {
    title: "Platform & DevOps",
    subtitle: "Deploy, infra & events",
    tags: [
      "Docker",
      "CI/CD",
      "Nginx",
      "NATS",
      "Kafka",
      "Event-driven",
      "S3 / MinIO",
      "AWS EC2 / Lambda",
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

export function getExpertiseForPersona(persona: Persona) {
  const order = personas[persona].expertiseOrder;
  return order
    .map((title) => expertiseGroups.find((group) => group.title === title))
    .filter((group): group is (typeof expertiseGroups)[number] => group != null);
}

export const recruiterSnapshot = {
  headline: "Full-Stack Engineer · Applied AI systems · Founding Engineer at Horizon17 · 2+ yrs",
  summary:
    "Full-stack engineer specializing in applied AI systems, currently a Founding Engineer at Horizon17 Technology and Sustainability Pvt. Ltd. I build EcoMeter and Ecolynk across ESG analytics, assessments, supplier intelligence, JWT/OAuth authentication, and AI reporting. I also independently architected Krashaq AI with LangGraph agents, governed tools, hybrid RAG, streaming, and a live demo.",
  highlights: [
    "Current role · Founding Engineer at Horizon17 (Apr 2025 – Present)",
    "Professional contribution · EcoMeter + Ecolynk product engineering",
    "Independent ownership · Krashaq AI, open-source with a live demo",
    "Platform · microservices, Docker, CI/CD, NATS, Nginx, S3/MinIO",
  ],
  topStack: [
    "Next.js",
    "React",
    "Node.js",
    "Express.js",
    "JWT / OAuth",
    "Microservices",
    "Docker",
    "CI/CD",
    "LangGraph",
    "MongoDB",
    "System Design",
  ],
};
