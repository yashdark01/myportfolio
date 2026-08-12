export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  sections: { title: string; content: string; bullets?: string[] }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-krashaq-llm-pipeline",
    title: "Building Krashaq AI: Multilingual Crop Intelligence at Scale",
    excerpt:
      "How I designed an AI farming platform with multilingual advisory, knowledge-base retrieval, supplier licensing, and proactive crop alerts.",
    date: "2026-04-12",
    readTime: "7 min read",
    tags: ["AI", "LangGraph", "RAG", "Next.js"],
    sections: [
      {
        title: "The problem",
        content:
          "Farmers in India need crop advice in Hindi, Hinglish, and English — on mobile, with low bandwidth. Suppliers need to license access and manage subscriptions. A generic ChatGPT wrapper doesn't work: latency, retrieval quality, and role-based access all break the experience.",
      },
      {
        title: "Architecture overview",
        content:
          "Krashaq is a Next.js 16 monolith on Vercel. Chat flows through a LangGraph StateGraph agent that routes to weather, irrigation, and KB search tools. Retrieved context is injected before the LLM invoke; Groq is the default provider with a configurable fallback chain.",
        bullets: [
          "Hybrid RAG: keyword + vector search over MongoDB kb_chunks with RRF fusion and MMR re-ranking",
          "Request-scoped RAG cache prevents redundant retrieval in multi-tool agent turns",
          "B2B2C flow: admin → supplier license → farmer subscription with gated login",
          "Hourly Vercel cron delivers supplier-created alerts as in-app notifications",
        ],
      },
      {
        title: "Key trade-off: monolith vs microservices",
        content:
          "The project started as split Next.js + FastAPI repos with Ollama, Twilio WhatsApp, and Redis. I consolidated into one codebase because Vercel serverless + MongoDB Atlas covers the production path — fewer deploys, shared types, and simpler auth. WhatsApp/SMS alert delivery is deferred; in-app notifications ship first.",
      },
      {
        title: "What I'd do differently",
        content:
          "The agent graph taught me that retrieval caching and tool deduplication matter as much as model choice. I'd add golden-set regression tests for Hinglish queries and instrument RAG cache hit rates from day one.",
        bullets: [
          "Add structured eval tests for Hindi/Hinglish crop queries before expanding KB",
          "LangGraph Mongo checkpointer for multi-turn session persistence",
          "Port WhatsApp webhooks once in-app alert delivery semantics are stable",
        ],
      },
      {
        title: "Links",
        content:
          "Live demo, case study, and repo are linked below. If you're building applied LLM products and want to compare notes — reach out.",
      },
    ],
  },
  {
    slug: "esg-dashboard-performance",
    title: "Performance Patterns for Enterprise Sustainability Dashboards",
    excerpt:
      "Lessons from building chart-heavy, compliance-sensitive dashboards on a production sustainability platform.",
    date: "2025-11-08",
    readTime: "5 min read",
    tags: ["Next.js", "Performance", "Enterprise", "Sustainability"],
    sections: [
      {
        title: "Starting point",
        content:
          "Sustainability dashboards load heavy charts, campaign impact filters, and environmental reporting panels. Analysts open the same views daily — slow load times directly impact workflow, not just first impressions.",
      },
      {
        title: "What moved the needle",
        content:
          "Performance wins came from specific, measurable frontend and backend changes — not vague 'optimisation'. Details are from my professional work; specific platform internals are confidential.",
        bullets: [
          "Server-side rendering + selective lazy loading for chart-heavy routes",
          "Code splitting per dashboard module instead of one monolithic bundle",
          "Caching hot metric queries with write-through invalidation for compliance-sensitive data",
          "API query tuning on backend services serving sustainability metrics",
        ],
      },
      {
        title: "Caching with compliance in mind",
        content:
          "ESG and BRSR reporting data has compliance implications. We invalidated cache on write rather than chasing hit rate. Stale sustainability metrics are worse than a cache miss.",
      },
      {
        title: "Takeaway",
        content:
          "Always tie performance work to a metric and technique. In compliance-heavy domains, cache correctness matters as much as speed — stale sustainability data is worse than a cache miss.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogSlugs() {
  return blogPosts.map((post) => post.slug);
}
