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
    name: "Music-Player",
    description:
      "MERN music streaming app with Clerk auth, Redux player state, admin CRUD, Cloudinary uploads, and MongoDB aggregation feeds.",
    url: "https://github.com/yashdark01/Music-Player",
    language: "JavaScript",
    topics: ["MERN", "Clerk", "Redux", "MongoDB", "ShadCN"],
  },
  {
    name: "sns-website",
    description:
      "Social platform with scroll-triggered animations and Framer Motion — responsive UI with +30% engagement patterns.",
    url: "https://github.com/yashdark01/sns-website",
    live: "https://sns-website-nine.vercel.app/",
    language: "TypeScript",
    topics: ["React", "Framer Motion", "Tailwind CSS"],
  },
];

/** Repo names fetched for activity strip via /api/github */
export const trackedRepos = ["Krashaq-Ai", "Music-Player", "sns-website", "rentbuddy"] as const;
