export type ProjectCategory = "fullstack" | "ai" | "enterprise";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  featured: boolean;
  metrics: ProjectMetric[];
  problem: string;
  role: string;
  outcome: string;
  stack: string[];
  github?: string;
  live?: string;
}

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai", label: "AI / LLM" },
  { id: "enterprise", label: "Enterprise" },
] as const;

export const projects: Project[] = [
  {
    id: "krashaq",
    title: "Krashaq",
    subtitle: "AI Smart Farming Assistant",
    category: "ai",
    featured: true,
    metrics: [
      { value: "3", label: "languages" },
      { value: "Live", label: "weather data" },
      { value: "Redis", label: "multi-tenant cache" },
    ],
    problem:
      "Farmers need real-time, multilingual crop advice but lack access to expert agronomists and timely irrigation guidance.",
    role: "Solo full-stack — designed the API, LLM pipeline, WhatsApp integration, and smart irrigation engine.",
    outcome:
      "Built a full-stack assistant with Ollama (local LLM) + Gemini fallback for Hindi/Hinglish/English, two-way WhatsApp via Twilio, and proactive crop alerts powered by WeatherAPI and APScheduler.",
    stack: [
      "FastAPI",
      "Next.js",
      "MongoDB",
      "LangChain",
      "Ollama",
      "Redis",
      "Twilio",
    ],
    github: "https://github.com/yashdark01",
  },
  {
    id: "horizon17-esg",
    title: "Enterprise ESG Platform",
    subtitle: "Sustainability Analytics Dashboard",
    category: "enterprise",
    featured: true,
    metrics: [
      { value: "40%", label: "faster loads" },
      { value: "45%", label: "backend gain" },
      { value: "RAG", label: "AI assistant" },
    ],
    problem:
      "Enterprise teams needed faster ESG dashboards and an AI-powered way to query sustainability documents and draft reports.",
    role: "Full Stack Developer at Horizon17 — architected frontend performance, RAG pipeline, and backend microservices.",
    outcome:
      "Delivered 40% faster page loads via SSR and code splitting, 45% backend performance via Redis caching, and a Notion-style AI editor that cut report drafting time by 60%.",
    stack: [
      "React.js",
      "Next.js",
      "Node.js",
      "Redis",
      "LangChain",
      "LangGraph",
      "GitHub Actions",
    ],
  },
  {
    id: "music-player",
    title: "Music Player",
    subtitle: "Spotify Clone",
    category: "fullstack",
    featured: true,
    metrics: [
      { value: "25%", label: "faster loads" },
      { value: "JWT", label: "secured auth" },
      { value: "MERN", label: "full stack" },
    ],
    problem:
      "Users wanted a full-featured music streaming experience with playlists, search, and personalized recommendations.",
    role: "Built the entire MERN stack application — auth, audio streaming, playlist management, and UI.",
    outcome:
      "Delivered a production-ready streaming platform with MongoDB aggregation pipelines, audio caching, and Redux Toolkit state management.",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "ShadCN UI",
      "Tailwind CSS",
    ],
    github: "https://github.com/yashdark01/spotify.git",
  },
];

export interface MoreProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}

export const moreProjects: MoreProject[] = [
  {
    id: "sns",
    title: "SNS Website",
    description:
      "Social platform with scroll-triggered animations and +30% engagement via Framer Motion and Intersection Observer.",
    tags: ["React.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/yashdark01/sns-website",
    live: "https://sns-website-nine.vercel.app/",
  },
  {
    id: "rent-buddy",
    title: "Rent Buddy & Client Apps",
    description:
      "4+ production-ready web applications built during internship — responsive UIs with JWT-secured access.",
    tags: ["React.js", "Node.js", "MongoDB"],
  },
  {
    id: "course-enrollment",
    title: "Course Enrollment System",
    description:
      "Full-stack enrollment platform with admin panel, JWT auth, and role-based access control.",
    tags: ["React.js", "Node.js", "MongoDB", "JWT"],
    github: "https://github.com/yashdark01/project-1",
    live: "https://project-1-two-gamma.vercel.app/",
  },
];
