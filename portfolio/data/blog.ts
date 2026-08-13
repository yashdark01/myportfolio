export interface BlogCodeBlock {
  language: string;
  code: string;
}

export interface BlogPostSection {
  title: string;
  content: string;
  bullets?: string[];
  code?: BlogCodeBlock[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  sections: BlogPostSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-krashaq-llm-pipeline",
    title: "Building Krashaq AI: Multilingual Crop Intelligence at Scale",
    excerpt:
      "How I designed an AI farming platform with multilingual advisory, knowledge-base retrieval, supplier licensing, and proactive crop alerts.",
    date: "2026-04-12",
    tags: ["AI", "LangGraph", "RAG", "Next.js"],
    sections: [
      {
        title: "The problem",
        content:
          "Farmers in India need crop advice in Hindi, Hinglish, and English — on mobile, with low bandwidth. Ag-input suppliers need to license access and manage subscriptions at scale. A generic ChatGPT wrapper breaks down quickly: retrieval quality collapses on Roman-script Hinglish, latency spikes on slow networks, and there is no product loop beyond a chat box.",
        bullets: [
          "Example query: \"gehu mein peela rang kyun aa raha hai?\" — mixes Hindi morphology with English crop terms",
          "Pure vector search misses chunks that use formal agronomy vocabulary (\"Triticum aestivum\", \"nitrogen deficiency\")",
          "Suppliers need B2B2C licensing — farmers linked to a supplier must see trial/expiry before chat access",
        ],
      },
      {
        title: "Architecture overview",
        content:
          "Krashaq is a Next.js 16 monolith deployed on Vercel (Mumbai region). All backend logic lives in App Router API routes — 90+ endpoints covering chat, auth, supplier/admin dashboards, cron alerts, and LLM session management. Chat flows through a LangGraph StateGraph agent that routes to weather, irrigation, and knowledge-base tools. Retrieved context injects as system messages before the LLM invoke. Groq (Llama 3.3 70B) is the default provider; a configurable fallback chain covers OpenAI, Gemini, and Anthropic when a provider is down or rate-limited.",
        bullets: [
          "MongoDB Atlas for users, kb_chunks, subscriptions, chat sessions, notifications",
          "Hybrid RAG: keyword + vector over kb_chunks with RRF fusion and MMR re-ranking",
          "Request-scoped RAG cache — agent turns that hit retrieval twice reuse the same result set",
          "53 Jest tests — auth middleware, RAG scoring, agent graph routing, supplier API contracts",
        ],
      },
      {
        title: "Hybrid RAG for Hindi and Hinglish",
        content:
          "Retrieval lives in src/lib/server/rag/ — vectors co-located with app data in MongoDB, not a separate Pinecone index. Documents in content/kb/ ingest via npm run kb:ingest (4 markdown docs → 8 chunks in the demo seed). Search runs two legs: a BM25-style keyword scorer for short Roman-script queries, and a cosine-similarity vector leg on stored embeddings. Results merge via reciprocal rank fusion (RRF, k=60), then MMR re-ranking removes near-duplicate chunks and a category boost elevates crop-specific docs when detectCrop() finds a crop mention.",
        code: [
          {
            language: "TypeScript · reciprocal rank fusion (src/lib/server/rag/scoring.ts)",
            code: `export function reciprocalRankFusion<T extends { id: string }>(
  lists: Array<Array<T & { score: number }>>,
  k = 60,
  limit = 5
): Array<T & { score: number }> {
  const fused = new Map<string, T & { score: number }>();

  for (const list of lists) {
    list.forEach((item, rank) => {
      const rrf = 1 / (k + rank + 1);
      const existing = fused.get(item.id);
      if (existing) existing.score += rrf;
      else fused.set(item.id, { ...item, score: rrf });
    });
  }

  return [...fused.values()].sort((a, b) => b.score - a.score).slice(0, limit);
}`,
          },
        ],
        bullets: [
          "\"gehu mein peela rang\" → keyword leg matches wheat / yellowing / nitrogen deficiency chunks",
          "\"soybean ke keede\" → category boost pulls pest-management docs ahead of generic irrigation",
          "No third-party vector DB — fewer dependencies, one deploy target on Vercel",
        ],
      },
      {
        title: "Agent graph walkthrough",
        content:
          "The LangGraph StateGraph in src/lib/server/agents/graph.ts defines explicit nodes instead of a single-shot prompt. classifyRoute() sends simple weather or irrigation queries down a fast path; crop questions route through RAG injection before the agent node runs. Tool calls dedupe via toolCallKey(name, args) so the same KB search never fires twice in one request. The synthesizer streams over SSE at /api/chat/stream with per-chunk tool status events; the UI deduplicates tool chips and citation sources.",
        code: [
          {
            language: "TypeScript · LangGraph node wiring (simplified)",
            code: `const graph = new StateGraph(KrashaqStateAnnotation)
  .addNode("prepare", prepareNode)   // detect language, crop, location
  .addNode("fast", fastNode)         // weather / irrigation without full RAG
  .addNode("rag", ragNode)           // retrieve KB context
  .addNode("injectKb", injectKbNode) // inject citations as system messages
  .addNode("agent", agentNode)       // LLM with tool binding
  .addNode("tools", toolNode)        // execute weather, irrigation, KB search
  .addEdge(START, "prepare")
  .addConditionalEdges("prepare", routeByIntent)
  .addEdge("injectKb", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent")
  .compile();`,
          },
        ],
      },
      {
        title: "Request-scoped RAG cache",
        content:
          "Multi-step agent flows often call retrieval more than once per user message — the router checks KB, then the agent re-confirms. Without caching, that doubles MongoDB queries and embedding work. Krashaq uses a Map keyed by query hash, scoped to the request lifecycle, so duplicate tool invocations reuse the same ranked chunk list. This was one of the highest-impact optimizations after consolidating from the split Python backend.",
        code: [
          {
            language: "TypeScript · request-scoped cache pattern",
            code: `// Map lives on the request context — not global Redis
const ragCache = new Map<string, RankedChunk[]>();

function cacheKey(query: string, filters: KbFilters): string {
  return createHash("sha256").update(JSON.stringify({ query, filters })).digest("hex");
}

async function retrieveWithCache(query: string, filters: KbFilters) {
  const key = cacheKey(query, filters);
  const hit = ragCache.get(key);
  if (hit) return hit;

  const results = await hybridSearch(query, filters);
  ragCache.set(key, results);
  return results;
}`,
          },
        ],
      },
      {
        title: "Streaming chat and tool transparency",
        content:
          "Farmers on 2G need to see progress — a blank screen while the agent runs three tools feels broken. POST /api/chat/stream returns Server-Sent Events: tool_start, tool_end, citation, and token chunks. The client renders tool chips as they arrive and collapses duplicate citations before the final answer streams. Groq streams tokens quickly on the happy path; fallback providers kick in transparently when resolveLLM() detects a failure.",
      },
      {
        title: "Key trade-off: monolith vs microservices",
        content:
          "The project started as split Next.js + FastAPI repos with Ollama, Twilio WhatsApp, and Redis. I consolidated into one codebase because Vercel serverless + MongoDB Atlas covers the production path — fewer deploys, shared TypeScript types, and JWT auth without cross-service tokens. The legacy Python backend is recoverable via git tag legacy/python-backend-v1. WhatsApp/SMS alert delivery is deferred; in-app notifications ship first via hourly Vercel cron at /api/cron/alerts.",
      },
      {
        title: "B2B2C subscription gating",
        content:
          "Krashaq is a licensed platform, not a public chatbot. Admins onboard suppliers and set license tiers. Suppliers sell farmer subscriptions; farmers see trial/expiry states before chat access. JWT access (30m) + refresh (7d) tokens with role guards on every protected route. This forced early data-boundary clarity: farmers own their sessions, suppliers see roster analytics, admins see platform-wide usage.",
      },
      {
        title: "Testing what actually breaks",
        content:
          "53 Jest tests in __tests__/ cover the paths that fail silently in LLM apps: auth middleware rejecting wrong roles, RRF scoring order, agent router sending crop queries through RAG, supplier API contracts. CI runs lint + test + build on every push. I would add golden-set regression tests for Hinglish queries next — the highest-risk area as the KB grows beyond 4 documents.",
        bullets: [
          "npm run test — ts-jest with mocks for MongoDB and LLM providers",
          "npm run db:reset — seeds admin, supplier, farmer demo users + KB corpus",
          "GitHub Actions ci.yml on push; deploy-vercel.yml on workflow_dispatch",
        ],
      },
      {
        title: "What I'd do differently",
        content:
          "Retrieval caching and tool deduplication matter as much as model choice — I would instrument RAG cache hit rates and tool-call counts from day one. I would also add structured eval tests for Hinglish queries before expanding the KB, and port WhatsApp webhooks only after in-app alert delivery semantics are stable.",
        bullets: [
          "LangGraph Mongo checkpointer for durable multi-turn sessions",
          "Per-provider latency histograms to tune the Groq default vs fallback chain",
          "Golden-set eval: 20 Hinglish crop queries with expected KB doc IDs",
        ],
      },
      {
        title: "Links",
        content:
          "Live demo at krashaq-agritech.vercel.app, full case study with engineering deep dive at yashpatidar.vercel.app/work/krashaq, and open-source repo at github.com/yashdark01/Krashaq-Ai. Companion post on B2B2C subscription gating below.",
      },
    ],
  },
  {
    slug: "b2b2c-subscription-gating-nextjs",
    title: "Building B2B2C Subscription Gating in Next.js",
    excerpt:
      "How Krashaq models admin → supplier → farmer licensing with JWT roles, subscription state, and gated route access.",
    date: "2026-05-02",
    tags: ["Next.js", "Auth", "B2B2C", "Product"],
    sections: [
      {
        title: "Why gating belongs in the product layer",
        content:
          "Krashaq sells through ag-input suppliers — each supplier licenses farmer seats. That means auth is not binary (logged in / out). A farmer can be authenticated but blocked because their subscription expired, or because their supplier's license ran out. The UI must show why access failed, not a generic 403.",
      },
      {
        title: "Data model",
        content:
          "Three roles in the users collection: admin, supplier, farmer. Suppliers hold license records (tier, expiry, seat count). Farmers link to a supplier via farmer_subscriptions with status trial | active | expired. Chat, weather, and alert routes check both JWT role and subscription status before invoking the agent.",
        bullets: [
          "admin → creates supplier licenses via /api/admin/licenses",
          "supplier → assigns farmer subscriptions via /api/supplier/subscriptions",
          "farmer → chat gated on active subscription + valid supplier license chain",
        ],
      },
      {
        title: "Route guard pattern",
        content:
          "API routes use a shared requireRole() middleware and a separate assertFarmerAccess() that walks the subscription chain. The frontend mirrors this — dashboard nav items hide when subscription status is expired, and the chat page shows a renewal prompt instead of an empty input.",
        code: [
          {
            language: "TypeScript · farmer chat gate (simplified)",
            code: `export async function assertFarmerAccess(userId: string) {
  const sub = await db.farmerSubscriptions.findOne({ farmer_id: userId });
  if (!sub || sub.status !== "active") {
    throw new ApiError(403, "Subscription inactive — contact your supplier");
  }

  const license = await db.supplierLicenses.findOne({ supplier_id: sub.supplier_id });
  if (!license || license.expires_at < new Date()) {
    throw new ApiError(403, "Supplier license expired");
  }

  return { subscription: sub, license };
}`,
          },
        ],
      },
      {
        title: "What I'd improve",
        content:
          "Add explicit trial countdown in the farmer UI before expiry, and supplier-facing alerts when they are near seat limits. Audit logs for admin license changes would help enterprise sales conversations.",
      },
    ],
  },
  {
    slug: "esg-dashboard-performance",
    title: "Performance Patterns for Enterprise Sustainability Dashboards",
    excerpt:
      "Lessons from building chart-heavy, compliance-sensitive dashboards on a production sustainability platform.",
    date: "2025-11-08",
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
          "Performance wins came from specific, measurable frontend and backend changes — not vague 'optimisation'. Details are from my professional work on Ecometer; specific platform internals are confidential.",
        bullets: [
          "SSR on chart-heavy dashboard routes — first meaningful paint before client-side chart libraries hydrate",
          "Code splitting per dashboard module (campaign filters, reporting panels, export flows) instead of one monolithic bundle",
          "Write-through cache invalidation on compliance-sensitive metric queries — stale BRSR data is worse than a cache miss",
          "Backend query tuning on hot paths that feed chart render endpoints — improvements measured on repeat analyst workflows, not synthetic lab scores alone",
        ],
      },
      {
        title: "Caching with compliance in mind",
        content:
          "ESG and BRSR reporting data has audit implications. We invalidated cache on write rather than chasing hit rate. For export flows that generate compliance PDFs, correctness and freshness beat aggressive TTLs — analysts need to trust that exported numbers match what's in the database right now.",
      },
      {
        title: "Takeaway",
        content:
          "Always tie performance work to a technique and a workflow outcome: which route got SSR, which module was split, which cache policy changed. In compliance-heavy domains, document why you chose invalidation over TTL — that reasoning is as important as the speed gain.",
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

export { getReadTime } from "@/lib/blog";
