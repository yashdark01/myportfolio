export const site = {
  name: "Yash Patidar",
  title: "Founding Engineer · Full Stack Developer · Horizon17",
  tagline:
    "Founding Engineer at Horizon17 — building production AI systems and enterprise sustainability platforms end-to-end.",
  institution: "IIIT Nagpur · B.Tech CSE",
  status: "Open to opportunities",
  recentlyShipped: "Krashaq AI · Smart Farming Platform",
  email: "yashpatidar9691@gmail.com",
  phone: "+91 7987386670",
  resumeUrl: "/Yash-Patidar-CV.pdf",
  /** Set to true when you want LeetCode visible (recommended: 150+ Medium) */
  showLeetCode: false,
  links: {
    linkedin: "https://linkedin.com/in/yash-patidar-97a8861b3",
    github: "https://github.com/yashdark01",
    leetcode: "https://leetcode.com/u/yashdark_01/",
    email: "mailto:yashpatidar9691@gmail.com",
  },
  heroStats: [
    { value: "Ecometer", label: "enterprise product · EcoMS" },
    { value: "BRSR", label: "audit-ready reporting" },
    { value: "Scope 1–3", label: "carbon accounting" },
    { value: "10+", label: "published client campaigns" },
  ],
  aiHeroStats: [
    { value: "Live", label: "Krashaq AI demo" },
    { value: "53", label: "automated tests" },
    { value: "RAG", label: "hybrid retrieval pipeline" },
    { value: "3", label: "languages supported" },
  ],
  featuredProject: {
    id: "krashaq",
    title: "Krashaq AI",
    badge: "Featured project · Personal",
    headline:
      "Multilingual AI farming platform — live demo, open-source repo, full case study",
    outcome:
      "Solo-built production app: AI crop advisory, supplier subscriptions, weather tools, and proactive alerts.",
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
      "Full Stack Engineer",
      "Frontend Engineer (React/Next.js)",
      "Applied AI / LLM Engineer",
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
      "Founding Engineer at Horizon17. I build production-grade full-stack systems — from microservice backends to chart-heavy enterprise dashboards.",
    workIntro:
      "Enterprise product work first — applied AI with a live demo and production internship delivery below.",
    featuredProject: {
      id: "horizon17-esg",
      title: "Ecometer",
      badge: "Featured project · Horizon17",
      headline:
        "Enterprise sustainability intelligence — measure, manage, and report campaign environmental impact",
      outcome:
        "Founding engineer on EcoMS's patent-filed platform in production across enterprise brands including Amazon, Tata Motors, and HDFC.",
      live: "https://ecomsww.com/ecometer-the-carbon-economy-for-advertising",
      caseStudyPath: "/work/horizon17-esg",
      showTechnicalDeepDive: true,
    },
    projectOrder: ["horizon17-esg", "krashaq", "rent-buddy"],
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
        "Multilingual AI farming platform — live demo, open-source repo, full case study",
      outcome:
        "Solo-built production app: hybrid RAG crop advisory, LangGraph agent, supplier subscriptions, and proactive alerts.",
      live: "https://krashaq-agritech.vercel.app",
      github: "https://github.com/yashdark01/Krashaq-Ai",
      caseStudyPath: "/work/krashaq",
      showTechnicalDeepDive: true,
    },
    projectOrder: ["krashaq", "horizon17-esg", "rent-buddy"],
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
  { id: "github", label: "GitHub" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
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
      "On Ecometer's chart-heavy dashboards, per-module code splitting and query tuning cut repeat-load time on filter-heavy views — numbers guided the decision, not intuition. Same discipline on Krashaq: Core Web Vitals and streaming chat latency before adding complexity.",
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
      "FastAPI",
      "Microservices",
      "REST APIs",
      "Redis Caching",
      "JWT / RBAC",
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
  headline: "Founding Engineer · Full Stack Developer · React/Next.js · IIIT Nagpur",
  summary:
    "Founding Engineer at Horizon17 Technology and Sustainability Pvt. Ltd., building Ecometer — EcoMS's sustainability intelligence platform. Shipped Krashaq AI — personal full-stack AI farming project with live demo and open-source repo. Experienced with microservices, CI/CD, Docker, and event-driven patterns (NATS, Kafka); comfortable with Nginx, S3/MinIO, and AWS EC2/Lambda fundamentals.",
  highlights: [
    "Founding Engineer · Full Stack Developer at Horizon17 (Apr 2025 – Present)",
    "Ecometer · enterprise sustainability platform (Horizon17 & EcoMS)",
    "Krashaq AI · open-source, live at krashaq-agritech.vercel.app",
    "Platform · microservices, Docker, CI/CD, NATS, Nginx, S3/MinIO",
  ],
  topStack: [
    "Next.js",
    "React",
    "Microservices",
    "Docker",
    "CI/CD",
    "LangGraph",
    "MongoDB",
    "System Design",
  ],
};
