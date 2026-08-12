import { Project, projects } from "./projects";

export interface CaseStudySection {
  title: string;
  content: string;
  bullets?: string[];
}

export interface CaseStudy extends Project {
  caseStudyTitle: string;
  timeline: string;
  sections: CaseStudySection[];
  challenges: string[];
  learnings: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    ...projects[0],
    caseStudyTitle: "Building a multilingual AI farming assistant for real farmers",
    timeline: "Apr 2026 · Solo full-stack project",
    sections: [
      {
        title: "Context",
        content:
          "Smallholder farmers in India often lack timely access to agronomists. Advice needs to work in Hindi, Hinglish, and English — often over low-bandwidth connections and sometimes via WhatsApp, not a web app.",
      },
      {
        title: "What I built",
        content:
          "An end-to-end platform: Next.js web app, FastAPI backend, LLM advisory pipeline, WeatherAPI-driven irrigation engine, and two-way WhatsApp via Twilio webhooks.",
        bullets: [
          "LangChain router for intent-based query handling (crop, weather, irrigation)",
          "Ollama for local inference; Gemini fallback when confidence is low",
          "Redis-cached weather + advisory responses for multi-tenant farmers",
          "APScheduler for proactive crop alerts before critical weather events",
        ],
      },
      {
        title: "Technical decisions",
        content:
          "Every major choice was driven by cost, latency, and offline/low-connectivity constraints — not resume-driven architecture.",
        bullets: [
          "Local LLM first → avoids per-query cloud cost for high-volume advisory",
          "Gemini fallback → reliability when Ollama returns low-confidence answers",
          "MongoDB → flexible schema for farmer profiles across regions/crops",
          "Microservice repos split (frontend, backend, gateway) → easier independent deploy",
        ],
      },
      {
        title: "Results",
        content:
          "Shipped a live production deployment with multilingual support and real-time weather integration. The system demonstrates applied LLM engineering — not just a chat UI wrapping an API.",
        bullets: [
          "Live demo: krashaq-agritech.vercel.app",
          "Separate frontend + backend repos with clear API boundaries",
          "WhatsApp channel for farmers who never open the web app",
        ],
      },
    ],
    challenges: [
      "Routing Hinglish queries reliably without over-triggering English-only responses",
      "Balancing WeatherAPI rate limits with real-time irrigation recommendations",
      "Designing Twilio webhook flows that feel conversational, not form-like",
    ],
    learnings: [
      "Applied LLM products need fallback paths — one model is never enough in production",
      "Cache hot advisory paths early; API costs add up fast with weather + LLM combined",
      "Ship the WhatsApp loop early — it forces you to design for terse, mobile-first UX",
    ],
  },
  {
    ...projects[1],
    caseStudyTitle: "Enterprise ESG platform — performance + RAG at scale",
    timeline: "Apr 2025 – Present · Horizon17 Technology",
    sections: [
      {
        title: "Context",
        content:
          "Horizon17 builds sustainability software for enterprise teams. Dashboards were slow, report drafting was manual, and compliance documents were too large for simple keyword search.",
      },
      {
        title: "What I built",
        content:
          "Full-stack features across the ESG platform: performance-optimized dashboards, Redis-backed microservices, and a RAG pipeline for document querying plus a Notion-style AI editor.",
        bullets: [
          "SSR + code splitting + lazy loading → 40% faster page loads (Core Web Vitals)",
          "Redis caching + query tuning → 45% backend latency reduction",
          "LangChain + LangGraph RAG pipeline for sustainability document Q&A",
          "AI editor with HITL review flow → 60% faster report drafting",
          "GitHub Actions CI/CD for automated build-and-deploy",
        ],
      },
      {
        title: "Technical decisions",
        content:
          "Enterprise ESG data has compliance implications — stale cache and hallucinated answers are both unacceptable.",
        bullets: [
          "SSR over CSR for dashboard LCP — users open heavy analytics views daily",
          "Cache invalidation on write for ESG metrics — correctness over hit rate",
          "LangGraph multi-step RAG vs single prompt — better for long PDF compliance docs",
          "Vector search + metadata filters — scope retrieval to client/document type",
        ],
      },
      {
        title: "Results",
        content:
          "Measurable improvements across frontend performance, backend throughput, and content team velocity. Work is under NDA — public repo shows the RAG frontend patterns without exposing client data.",
      },
    ],
    challenges: [
      "Large compliance PDFs breaking naive chunking strategies",
      "Balancing SSR complexity with dynamic dashboard personalization",
      "Preventing AI-generated report content from bypassing human review",
    ],
    learnings: [
      "In enterprise AI, HITL isn't optional — it's a product requirement",
      "Performance wins (40% load time) are interview gold when tied to specific techniques",
      "RAG quality comes from retrieval design, not bigger models",
    ],
  },
  {
    ...projects[2],
    caseStudyTitle: "Full-stack music streaming with production-grade patterns",
    timeline: "Mar 2025 · Personal project",
    sections: [
      {
        title: "Context",
        content:
          "Built to demonstrate full MERN proficiency with modern UI (ShadCN), state management, and audio streaming patterns used in real consumer apps.",
      },
      {
        title: "What I built",
        content:
          "A Spotify-style streaming platform with authentication, playlists, search, recommendations, and audio playback controls.",
        bullets: [
          "JWT-secured auth with protected routes and user sessions",
          "Redux Toolkit for player state, queue, and playlist management",
          "MongoDB aggregation pipelines for recommendations and trending songs",
          "Audio caching layer → ~25% faster repeat load times",
        ],
      },
      {
        title: "Technical decisions",
        content:
          "Focused on patterns recruiters recognize from consumer streaming products.",
        bullets: [
          "Redux Toolkit over Context — predictable state for complex player flows",
          "Server-side aggregation vs shipping full song lists to client",
          "ShadCN + Tailwind for accessible, consistent UI components",
        ],
      },
      {
        title: "Results",
        content:
          "Production-ready codebase demonstrating end-to-end ownership: API design, database modeling, frontend UX, and auth — the baseline product companies expect from SDE-1 candidates.",
      },
    ],
    challenges: [
      "Managing audio state across route changes without playback glitches",
      "Designing MongoDB schemas that support both playlists and recommendation queries",
    ],
    learnings: [
      "Audio apps are state-management problems disguised as UI projects",
      "Aggregation pipelines are underrated — they reduce frontend complexity significantly",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.id);
}
