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
    title: "Building Krashaq: A Multilingual LLM Pipeline for Farmers",
    excerpt:
      "How I designed Ollama + Gemini fallback, WhatsApp integration, and Redis caching for a production AI farming assistant.",
    date: "2026-04-12",
    readTime: "6 min read",
    tags: ["AI", "LangChain", "FastAPI", "Next.js"],
    sections: [
      {
        title: "The problem",
        content:
          "Farmers in India need crop advice in Hindi, Hinglish, and English — often over WhatsApp, not a desktop browser. A generic ChatGPT wrapper doesn't work: latency, cost, and language mixing all break the experience.",
      },
      {
        title: "Architecture overview",
        content:
          "Krashaq splits into a Next.js frontend, FastAPI backend, and optional WhatsApp channel via Twilio webhooks. The LLM layer uses LangChain for intent routing — crop advisory, weather, irrigation — before hitting the model.",
        bullets: [
          "Ollama runs locally for high-volume, low-cost inference",
          "Gemini activates when local confidence scores fall below threshold",
          "WeatherAPI + APScheduler drive proactive irrigation alerts",
          "Redis caches weather responses and hot advisory paths",
        ],
      },
      {
        title: "Key trade-off: local LLM vs cloud",
        content:
          "Cloud-only would be simpler to ship but expensive at scale and useless offline. Local-only fails on edge cases in Hinglish. The fallback pattern adds complexity but mirrors how production AI products actually ship.",
      },
      {
        title: "What I'd do differently",
        content:
          "Ship the WhatsApp loop on day one — it forced mobile-first UX decisions early. I'd also add structured evaluation tests for Hinglish queries before expanding language support.",
        bullets: [
          "Add golden-set regression tests for LLM routing",
          "Instrument cache hit rates from the start",
          "Document API contracts before splitting microservices",
        ],
      },
      {
        title: "Links",
        content:
          "Live demo, case study, and repos are linked below. If you're building applied LLM products and want to compare notes — reach out.",
      },
    ],
  },
  {
    slug: "esg-dashboard-performance",
    title: "How I Cut ESG Dashboard Load Times by 40%",
    excerpt:
      "SSR, code splitting, and Redis caching patterns that measurably improved Core Web Vitals on an enterprise sustainability platform.",
    date: "2025-11-08",
    readTime: "5 min read",
    tags: ["Next.js", "Performance", "Redis", "Enterprise"],
    sections: [
      {
        title: "Starting point",
        content:
          "Enterprise ESG dashboards load heavy charts, filters, and document panels. Users open the same views daily — slow LCP directly impacts daily workflow, not just first impressions.",
      },
      {
        title: "What moved the needle",
        content:
          "Performance wins came from specific, measurable changes — not vague 'optimization'.",
        bullets: [
          "SSR + selective lazy loading for chart-heavy routes",
          "Code splitting per dashboard module instead of one bundle",
          "Redis cache for hot ESG metric queries with write-through invalidation",
          "Query tuning on Node.js microservices — 45% API latency reduction",
        ],
      },
      {
        title: "Caching with compliance in mind",
        content:
          "ESG data has compliance implications. We invalidated cache on write rather than chasing hit rate. Stale sustainability metrics are worse than a cache miss.",
      },
      {
        title: "Takeaway for interviews",
        content:
          "Always tie performance work to a metric and technique. 'I made it faster' loses to 'SSR + route-level splitting cut LCP 40% on dashboard entry'.",
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
