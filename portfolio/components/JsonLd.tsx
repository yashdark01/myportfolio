import { site } from "@/data/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Founding Engineer · Full Stack Developer",
    description: site.tagline,
    email: site.email,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yashpatidar.vercel.app",
    sameAs: [site.links.linkedin, site.links.github],
    worksFor: {
      "@type": "Organization",
      name: "Horizon17 Technology and Sustainability Pvt. Ltd.",
      url: "https://www.horizon17ww.com/",
    },
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
      "System Design",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
