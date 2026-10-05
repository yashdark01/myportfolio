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
  updated?: string;
  tags: string[];
  sections: BlogPostSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-krashaq-llm-pipeline",
    title: "Evolving Krashaq AI into a Governed Multi-Service Platform",
    excerpt:
      "How I moved Krashaq from an early application prototype to nine services with governed LangGraph tools, hybrid retrieval, durable execution, and proactive crop alerts.",
    date: "2026-04-12",
    updated: "2026-10-04",
    tags: ["AI", "LangGraph", "RAG", "Microservices"],
    sections: [
      {
        title: "Architecture note",
        content:
          "This article was updated after a major architecture rewrite. The first Krashaq prototype validated multilingual chat, retrieval, and B2B2C access in a smaller application. The current system is a nine-service platform. The sections below describe the current architecture; the earlier version is retained only as an explicit migration lesson, not presented as the production design.",
      },
      {
        title: "The product problem",
        content:
          "Smallholder farmers need crop advice in Hindi, Hinglish, and English, plus weather, mandi prices, and proactive risk alerts. Ag-input suppliers need controlled farmer access. A generic chat wrapper cannot provide verified farm context, durable consequential actions, or reliable alerts, so the platform separates reusable AI execution from agricultural domain services.",
        bullets: [
          "Farm-aware answers use verified identity, farm geometry, crop, and growth-stage context",
          "Tool access is filtered by the authenticated caller's scopes before execution",
          "High-impact actions require human approval bound to the exact payload",
          "Weather warnings can trigger proactive alerts without waiting for a chat message",
        ],
      },
      {
        title: "Two layers, nine services",
        content:
          "I split the system into a reusable UAIP layer and a Krashaq domain layer. UAIP owns the LangGraph runtime, knowledge service, model gateway, and API gateway. Krashaq owns identity and farms, market data and calculators, alerts, weather, and the web experience. The layers communicate through typed HTTP and events; they do not import each other's source or share databases.",
        bullets: [
          "Reusable layer: agent runtime, knowledge service, model gateway, and API gateway",
          "Domain layer: auth/farms, data/markets, alerts, weather, gateway, and web client",
          "Private service paths keep domain APIs away from the public internet",
          "Independent schemas and migrations keep ownership boundaries enforceable",
        ],
      },
      {
        title: "Hybrid retrieval for short multilingual queries",
        content:
          "The knowledge service combines dense Qdrant retrieval with BM25 lexical search and reciprocal-rank fusion. Dense retrieval captures semantic similarity, while lexical search protects exact crop names, chemical terms, and Roman-script Hinglish tokens that embeddings can underweight. Documents are parsed, token-aware chunked, embedded, and stored behind one retrieval contract.",
        bullets: [
          "Qdrant stores 768-dimensional vectors; BM25 supplies the sparse retrieval leg",
          "RRF merges rankings without pretending the two score scales are directly comparable",
          "MinIO or S3 stores source artifacts while PostgreSQL tracks ingestion state and metadata",
          "The knowledge service has 271 passing tests across ingestion, retrieval, and access boundaries",
        ],
      },
      {
        title: "Governed agent execution",
        content:
          "The LangGraph runtime exposes 26 registered tools through a catalog rather than handing the model unrestricted functions. Discovery is scope-aware. A BudgetBroker limits tokens, cost, steps, and wall time. PostgreSQL checkpoints, an action journal, leases, and payload-hash-bound approvals make runs resumable and keep consequential actions auditable.",
        bullets: [
          "Read-only tools can execute directly when the caller has scope",
          "Consequential tools pause for approval and resume only if identity, payload, catalog, and preconditions still match",
          "Idempotency keys and fenced leases prevent duplicate side effects after retries",
          "The agent runtime has 249 passing tests for routing, budgets, approvals, recovery, and tool contracts",
        ],
      },
      {
        title: "Proactive alerts as an event-driven workflow",
        content:
          "Weather warnings enter through an internal service boundary, match farms through H3 spatial cells, and fan out to distributed BullMQ workers. PostgreSQL row locking prevents two workers from evaluating the same farm simultaneously. Alert and outbox records commit together so a delivery failure cannot erase the fact that a notification is owed.",
      },
      {
        title: "What changed from the prototype",
        content:
          "The earlier application proved the user loop, but its in-process boundaries could not express reusable AI infrastructure, private domain APIs, durable approvals, or independently scaled alert work. The migration introduced operational cost, so I kept the split aligned to concrete ownership and scaling differences rather than creating a service per feature.",
      },
      {
        title: "Evidence and current result",
        content:
          "The current platform has 630+ passing automated tests across nine services. The public repository and live demo are linked below, and the case study separates shipped behavior from proposed AWS infrastructure. The main remaining product risk is retrieval quality as the multilingual corpus grows, so the next evidence layer should be a versioned golden-set evaluation for Hindi and Hinglish queries.",
        bullets: [
          "Open source: github.com/yashdark01/Krashaq-Ai",
          "Live product: krashaq-agritech.vercel.app",
          "Detailed architecture and ownership: /work/krashaq",
        ],
      },
    ],
  },
  {
    slug: "b2b2c-subscription-gating-nextjs",
    title: "Designing B2B2C Access Boundaries for Krashaq",
    excerpt:
      "How Krashaq separates identity, supplier licensing, farmer access, and AI tool authorization across service boundaries.",
    date: "2026-05-02",
    updated: "2026-10-04",
    tags: ["Auth", "B2B2C", "Microservices", "Product"],
    sections: [
      {
        title: "Authentication is not authorization",
        content:
          "Krashaq uses a B2B2C model: administrators onboard suppliers, suppliers manage farmer access, and farmers use advisory, weather, market, and alert features. A valid session proves identity, but access also depends on role, supplier relationship, subscription state, and the scope required by the requested operation.",
      },
      {
        title: "Keep identity authoritative",
        content:
          "The auth service owns users, sessions, farms, supplier-to-farmer relationships, and verified farm context. Other services consume typed identity claims and private context APIs instead of copying authorization tables or trusting values supplied by the browser.",
        bullets: [
          "Public requests enter through the gateway and carry short-lived identity claims",
          "Role checks happen at service boundaries, not only in navigation components",
          "Farm and crop facts come from the authoritative service rather than chat memory",
          "Private context endpoints expose only the minimum fields required by the caller",
        ],
      },
      {
        title: "Authorize tool discovery before execution",
        content:
          "The agent runtime filters its 26-tool catalog by caller scope before the model can choose a tool. This is safer than showing every tool and rejecting only at execution time. Tool handlers still re-check authorization because catalog filtering improves least privilege but does not replace enforcement.",
        bullets: [
          "Farmer scopes expose advisory, weather, market, and owned-farm operations",
          "Supplier scopes expose roster and permitted alert workflows",
          "Administrative operations remain isolated from farmer and supplier sessions",
          "Consequential actions add payload-bound human approval on top of role checks",
        ],
      },
      {
        title: "Make denial states useful",
        content:
          "The UI mirrors access state so a farmer sees whether access is missing, expired, or awaiting supplier action instead of receiving a generic failure. The server remains authoritative: hiding a control improves usability, while the gateway and owning service enforce the actual boundary.",
      },
      {
        title: "What I would add next",
        content:
          "The next layer is better operator evidence: explicit trial countdowns, supplier seat-limit alerts, and an immutable audit trail for license changes. Those features do not change the core model, but they make access decisions easier to explain during support, compliance review, and enterprise onboarding.",
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
          "Performance wins came from specific, measurable frontend and backend changes — not vague 'optimisation'. Details are from my professional work on EcoMeter; specific platform internals are confidential.",
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
  {
    slug: "hybrid-rag-chunking-for-multilingual-queries",
    title: "Hybrid RAG Chunking for Short, Multilingual Queries",
    excerpt:
      "Why Krashaq combines token-aware chunks, dense Qdrant retrieval, BM25, and reciprocal-rank fusion instead of trusting embeddings alone.",
    date: "2026-10-05",
    tags: ["RAG", "Qdrant", "BM25", "Evaluation"],
    sections: [
      {
        title: "The retrieval failure to design for",
        content:
          "Agriculture questions are often short, specific, and mixed-language: a crop name in Hindi or Roman-script Hinglish next to a chemical term or a disease symptom. A dense vector search is useful for semantic similarity, but it can soften exactly the token that makes the answer safe. The retrieval design therefore needs both semantic and lexical signals.",
      },
      {
        title: "One ingestion contract, two retrieval legs",
        content:
          "In Krashaq, source documents are parsed, token-aware chunked, embedded, and stored with their source metadata. Qdrant supplies dense retrieval while BM25 supplies the lexical leg. Reciprocal-rank fusion combines rank positions rather than treating incomparable score scales as if they were the same measurement.",
        bullets: [
          "Chunk boundaries preserve headings and nearby context instead of cutting a procedure mid-step.",
          "Source artifacts live in MinIO or S3; PostgreSQL tracks ingestion state and metadata.",
          "The application asks one knowledge-service contract for candidates, rather than duplicating retrieval logic across agents.",
          "Access rules apply before retrieved content is returned to an agent run.",
        ],
      },
      {
        title: "What I would measure next",
        content:
          "A hybrid pipeline is not automatically better because it has more components. The next proof layer is a versioned Hindi, Hinglish, and English golden set with expected documents, grounded answer checks, and regression thresholds. That would turn retrieval quality from an architecture claim into a repeatable engineering signal.",
      },
    ],
  },
  {
    slug: "events-versus-queues-in-product-systems",
    title: "Events, Queues, and the Boundary Between Them",
    excerpt:
      "A practical distinction from Krashaq: use domain events to decouple a fact, and worker queues to execute a unit of work reliably.",
    date: "2026-10-05",
    tags: ["Event-Driven", "PostgreSQL", "BullMQ", "System Design"],
    sections: [
      {
        title: "They solve different problems",
        content:
          "A queue says that a worker must perform work. An event says that something happened and other parts of the system may care. Treating them as interchangeable blurs ownership and makes retries difficult to reason about. In Krashaq, weather warnings are domain facts; farm-level evaluation and notification delivery are worker jobs.",
      },
      {
        title: "Keep the delivery obligation durable",
        content:
          "The alert workflow records the domain change and its outbox entry together in PostgreSQL. A publisher can retry delivery without losing the obligation, while row locking protects a farm from duplicate concurrent evaluation. The key objective is not fashionable asynchronous architecture; it is a system that can explain what is still owed after a failure.",
        bullets: [
          "A weather warning becomes a durable input to the alert flow.",
          "H3 spatial cells narrow the farms that need evaluation.",
          "BullMQ workers distribute evaluation and delivery work.",
          "Idempotency and row locks protect retries from creating duplicate effects.",
        ],
      },
      {
        title: "The trade-off",
        content:
          "Async flows add observability, ordering, and recovery work. I use them when the producer should not own the consumer's timing or availability—not merely to make a diagram look more scalable. For a request that must respond immediately, a typed synchronous service boundary remains clearer.",
      },
    ],
  },
  {
    slug: "human-approval-for-agent-actions",
    title: "Human Approval Is a Contract, Not a Button",
    excerpt:
      "How payload-bound approval, budgets, and testable tool contracts make consequential AI-agent actions safer to resume.",
    date: "2026-10-05",
    tags: ["LangGraph", "AI Agents", "HITL", "Testing"],
    sections: [
      {
        title: "The unsafe shortcut",
        content:
          "A confirmation modal alone does not make an agent action safe. Between an approval screen and a resumed run, the caller, requested payload, available tools, or preconditions may have changed. The approval must describe the exact action it authorizes, and the runtime must verify that description before side effects occur.",
      },
      {
        title: "Bound the approval to the run",
        content:
          "Krashaq records checkpoints and an action journal in PostgreSQL. Consequential tools pause for human approval, then resume only when the identity, payload hash, tool catalog, and preconditions still match. Fenced leases and idempotency keys prevent a retry from turning one intended action into several effects.",
        bullets: [
          "Tool discovery is scope-aware before the model selects a tool.",
          "Handlers re-check authorization at execution time.",
          "A BudgetBroker limits steps, token use, cost, and wall time.",
          "Tests cover routing, authorization, approval, recovery, and tool contracts—not only happy-path chat output.",
        ],
      },
      {
        title: "Why this is a testing story",
        content:
          "Agent behavior is variable; system guarantees should not be. The valuable tests assert deterministic boundaries around the model: who can invoke a tool, what payload is approved, which effects are idempotent, and how a run recovers. That is why the platform's automated suite is presented as engineering evidence, not as a quality claim without scope.",
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
