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
      "In-browser canvas to design, visualize, and share system architectures — drag-drop nodes, connections, AI assistance, and diagram-as-code.",
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
export const trackedRepos = ["Krashaq-Ai", "archflow", "Music-Player", "sns-website", "rentbuddy"] as const;
