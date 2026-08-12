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
    name: "Krashaq-Ai",
    description:
      "Multilingual AI smart farming platform — crop advisory, weather alerts, supplier subscriptions, and live production demo.",
    url: "https://github.com/yashdark01/Krashaq-Ai",
    live: "https://krashaq-agritech.vercel.app",
    language: "TypeScript",
    topics: ["Next.js", "LangGraph", "RAG", "MongoDB"],
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
  {
    name: "sns",
    description:
      "Social platform with scroll-triggered animations and Framer Motion — responsive UI with +30% engagement patterns.",
    url: "https://github.com/yashdark01/sns",
    live: "https://sns-cyan.vercel.app",
    language: "TypeScript",
    topics: ["React", "Framer Motion", "Tailwind CSS"],
  },
];
