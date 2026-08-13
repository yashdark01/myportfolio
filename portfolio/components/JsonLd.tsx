import { getProfileImageUrl, getSiteUrl } from "@/lib/site-url";
import { site } from "@/data/site";

export default function JsonLd() {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Founding Engineer · Full Stack Developer",
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
