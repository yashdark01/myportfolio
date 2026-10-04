import { getProfileImageUrl, getSiteUrl } from "@/lib/site-url";
import { site } from "@/data/site";
import StructuredData from "@/components/StructuredData";

export default function JsonLd() {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Full-Stack Engineer",
    description: site.tagline,
    email: site.email,
    url: siteUrl,
    image: getProfileImageUrl(),
    sameAs: [site.links.linkedin, site.links.github],
    worksFor: {
      "@type": "Organization",
      name: "Horizon17 Technology and Sustainability Pvt. Ltd.",
      url: site.links.horizon17,
    },
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Full-Stack Engineer",
        skills: "Applied AI, TypeScript, Next.js, Node.js, PostgreSQL, distributed systems",
      },
      {
        "@type": "Role",
        roleName: "Founding Engineer",
        startDate: "2025-04",
        worksFor: {
          "@type": "Organization",
          name: "Horizon17 Technology and Sustainability Pvt. Ltd.",
          url: site.links.horizon17,
        },
      },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Information Technology, Nagpur",
    },
    knowsAbout: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Retrieval-Augmented Generation",
      "Qdrant",
      "PostgreSQL",
      "Redis",
      "NATS",
      "Docker",
      "Amazon Web Services",
      "TypeScript",
      "System Design",
    ],
  };

  return <StructuredData data={schema} />;
}
