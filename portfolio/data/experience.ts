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
    title: "Founding Engineer · Applied AI Engineer · Full Stack Developer",
    organization:
      "Horizon17 Technology and Sustainability Pvt. Ltd. · Gurgaon",
    description:
      "Founding engineer building EcoMeter and Ecolynk — EcoMS platforms for campaign and event carbon measurement, enterprise ESG assessments, materiality, supplier intelligence, AI reporting, and 20+ interactive dashboards. Work spans Next.js, Node.js/Express.js microservices, NATS, Redis/BullMQ, RBAC, CI/CD, Docker, Nginx, AWS ECR/EC2, and S3/MinIO object storage.",
    badge: "Founding Engineer · Applied AI",
  },
  {
    id: "webintegratorz",
    period: "Jan — Dec 2024",
    title: "Full Stack Developer Intern",
    organization: "WebIntegratorz Technologies · Indore",
    description:
      "Delivered multiple production web applications with React, Node.js, Express.js, and MongoDB — including Rent Buddy (live at rentbuddy.in). Implemented JWT/RBAC security and reduced API response times by 30%.",
    badge: "Rent Buddy · live",
  },
  {
    id: "iiit",
    period: "Dec 2021 — Jun 2025",
    title: "B.Tech Computer Science Engineering",
    organization: "Indian Institute of Information Technology, Nagpur",
    description:
      "Built a strong foundation in core computer science: C++, Java and object-oriented programming, data structures and algorithms, computer networks, operating systems, database management systems, software engineering, computer architecture, theory of computation, compiler design, and distributed systems.",
  },
];
