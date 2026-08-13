export interface PinnedRepo {
  name: string;
  /** Optional friendly label for the UI (defaults to `name`) */
  displayName?: string;
  description: string;
  url: string;
  live?: string;
  language: string;
  topics: string[];
  ciBadge?: string;
  /** e.g. "ongoing" — shown as a status pill on the repo card */
  status?: "ongoing";
}

export const githubProfile = {
  url: "https://github.com/yashdark01",
  username: "yashdark01",
  /** Paste this into github.com → Settings → Profile → Bio */
  bio: "Founding Engineer @Horizon17 · Full Stack + AI/LLM · Building Krashaq AI (multilingual RAG farming platform) and Ecometer (enterprise sustainability) · Next.js · LangGraph · MongoDB",
  highlights: [
    { label: "Flagship repo", value: "Krashaq-Ai" },
    { label: "Quality gate", value: "CI — lint, test, build on push" },
    { label: "Live demo", value: "krashaq-agritech.vercel.app" },
  ],
} as const;

export const pinnedRepos: PinnedRepo[] = [
  {
    name: "Krashaq-Ai",
    displayName: "Krashaq AI",
    description:
      "Multilingual AI smart farming platform — crop advisory, weather alerts, supplier subscriptions, and live production demo.",
    url: "https://github.com/yashdark01/Krashaq-Ai",
    live: "https://krashaq-agritech.vercel.app",
    language: "TypeScript",
    topics: ["Next.js", "LangGraph", "RAG", "MongoDB"],
    ciBadge:
      "https://github.com/yashdark01/Krashaq-Ai/actions/workflows/ci.yml/badge.svg",
    status: "ongoing",
  },
  {
    name: "archflow",
    displayName: "Archflow",
    description:
      "In-browser canvas to design and share system architectures — drag-drop nodes, connections, and AI-assisted diagram generation. Active side project; demo coming soon.",
    url: "https://github.com/yashdark01/archflow",
    language: "TypeScript",
    topics: ["System Design", "Canvas", "React", "AI"],
    status: "ongoing",
  },
  {
    name: "Music-Player",
    displayName: "Music Player",
    description:
      "MERN music streaming app with Clerk auth, Redux player state, admin CRUD, Cloudinary uploads, and MongoDB aggregation feeds.",
    url: "https://github.com/yashdark01/Music-Player",
    language: "JavaScript",
    topics: ["MERN", "Clerk", "Redux", "MongoDB", "ShadCN"],
  },
  {
    name: "rentbuddy",
    displayName: "Rent Buddy",
    description:
      "Production rental platform — JWT-secured React + Node.js app with live client deployment at rentbuddy.in.",
    url: "https://github.com/yashdark01/rentbuddy",
    live: "https://rentbuddy.in/home",
    language: "JavaScript",
    topics: ["React", "Node.js", "MongoDB", "JWT"],
  },
];

/** Repo names fetched for activity strip via /api/github */
export const trackedRepos = ["Krashaq-Ai", "archflow", "Music-Player", "rentbuddy"] as const;
