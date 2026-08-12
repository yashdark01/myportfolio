export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  live?: string;
  language: string;
  topics: string[];
}

export const pinnedRepos: PinnedRepo[] = [
  {
    name: "krashaq-agritech",
    description:
      "Full-stack AI farming platform — Next.js frontend with multilingual LLM assistant and live deployment.",
    url: "https://github.com/yashdark01/krashaq-agritech",
    live: "https://krashaq-agritech.vercel.app",
    language: "TypeScript",
    topics: ["Next.js", "AI", "FastAPI", "LangChain"],
  },
  {
    name: "krashaq-backend",
    description:
      "FastAPI backend with Ollama + Gemini fallback, Twilio WhatsApp webhooks, and Redis-cached multi-tenant APIs.",
    url: "https://github.com/yashdark01/krashaq-backend",
    language: "Python",
    topics: ["FastAPI", "LangChain", "Redis", "Twilio"],
  },
  {
    name: "RAG-Frontend",
    description:
      "RAG-powered document querying UI — vector search interface for enterprise sustainability document workflows.",
    url: "https://github.com/yashdark01/RAG-Frontend",
    language: "TypeScript",
    topics: ["React", "RAG", "LangChain", "Vector Search"],
  },
  {
    name: "spotify",
    description:
      "MERN music streaming app with JWT auth, Redux Toolkit state, ShadCN UI, and MongoDB aggregation pipelines.",
    url: "https://github.com/yashdark01/spotify",
    language: "JavaScript",
    topics: ["MERN", "Redux", "MongoDB", "ShadCN"],
  },
];
