export const site = {
  name: "Yash Patidar",
  title: "Founding Engineer · Full Stack Developer · Horizon17",
  tagline:
    "Founding engineer at Horizon17 building Ecometer for enterprise sustainability — and shipping applied AI products end-to-end, from RAG pipelines to live demos.",
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
    { value: "4+", label: "production apps shipped" },
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
    location: "Remote · Gurgaon/Delhi NCR · Open to relocation",
    available: "Immediately · B.Tech CSE, IIIT Nagpur (Jun 2025)",
  },
} as const;

export type Persona = "product" | "ai";

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
