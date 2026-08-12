export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  live?: string;
  language: string;
  topics: string[];
  ciBadge?: string;
}

export const githubProfile = {
  url: "https://github.com/yashdark01",
  username: "yashdark01",
  contributionGraphUrl:
    "https://github.com/users/yashdark01/contributions?from=2025-08-01&to=2026-08-13",
  highlights: [
    { label: "Flagship repo", value: "Krashaq-Ai" },
    { label: "Quality gate", value: "CI — lint, test, build on push" },
    { label: "Live demo", value: "krashaq-agritech.vercel.app" },
  ],
} as const;

export const pinnedRepos: PinnedRepo[] = [
  {
    name: "Krashaq-Ai",
    description:
      "Multilingual AI smart farming platform — crop advisory, weather alerts, supplier subscriptions, and live production demo.",
    url: "https://github.com/yashdark01/Krashaq-Ai",
    live: "https://krashaq-agritech.vercel.app",
    language: "TypeScript",
    topics: ["Next.js", "LangGraph", "RAG", "MongoDB"],
    ciBadge:
      "https://github.com/yashdark01/Krashaq-Ai/actions/workflows/ci.yml/badge.svg",
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

/** Repo names fetched for activity strip via /api/github */
export const trackedRepos = ["Krashaq-Ai", "spotify", "sns", "rentbuddy"] as const;
