export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  badge?: string;
}

export const timeline: TimelineEntry[] = [
  {
    id: "horizon17",
    period: "Apr 2025 — Present",
    title: "Full Stack Developer",
    organization: "Horizon17 Technology · Gurgaon",
    description:
      "Architecting enterprise ESG platforms with React/Next.js, building RAG-based AI assistants, and optimizing backend performance with Redis and CI/CD pipelines.",
    badge: "40% faster loads · RAG AI shipped",
  },
  {
    id: "webintegratorz",
    period: "Jan — Dec 2024",
    title: "Full Stack Developer Intern",
    organization: "WebIntegratorz Technologies · Indore",
    description:
      "Developed 4+ production web applications with React, Node.js, and MongoDB. Implemented JWT/RBAC security and reduced API response times by 30%.",
    badge: "4+ production apps",
  },
  {
    id: "iiit",
    period: "Dec 2021 — Jun 2025",
    title: "B.Tech Computer Science Engineering",
    organization: "Indian Institute of Information Technology, Nagpur",
    description:
      "Focused on full-stack development, system design, data structures, and building production-grade web applications.",
  },
];
