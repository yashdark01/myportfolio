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
    title: "Founding Engineer · Full Stack Developer",
    organization:
      "Horizon17 Technology and Sustainability Pvt. Ltd. · Gurgaon",
    description:
      "Founding engineer building Ecometer — EcoMS's sustainability intelligence platform for campaign and event carbon measurement, BRSR-aligned reporting, and interactive dashboards. Work spans microservices, CI/CD, Docker, Nginx, NATS, and S3/MinIO object storage.",
    badge: "Founding Engineer · Ecometer",
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
