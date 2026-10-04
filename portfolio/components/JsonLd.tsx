import { getProfileImageUrl, getSiteUrl } from "@/lib/site-url";
import { site } from "@/data/site";
import StructuredData from "@/components/StructuredData";

export default function JsonLd() {
  const siteUrl = getSiteUrl();
  const profileImageUrl = getProfileImageUrl();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.name,
    givenName: "Yash",
    familyName: "Patidar",
    gender: "Male",
    nationality: "Indian",
    jobTitle: "Full-Stack Engineer",
    description: site.tagline,
    email: site.email,
    telephone: site.phone,
    url: siteUrl,
    image: {
      "@type": "ImageObject",
      url: profileImageUrl,
      width: 256,
      height: 256,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Delhi NCR",
      addressLocality: "Gurgaon",
    },
    sameAs: [
      site.links.linkedin,
      site.links.github,
      site.links.leetcode,
      site.links.horizon17,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Horizon17 Technology and Sustainability Pvt. Ltd.",
      url: site.links.horizon17,
    },
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Full-Stack Engineer specializing in Applied AI",
        skills:
          "TypeScript, Next.js, Node.js, PostgreSQL, AWS, Docker, LangGraph, RAG, Qdrant, distributed systems",
        occupationLocation: {
          "@type": "Country",
          name: "India",
        },
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
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: "Bachelor's",
      name: "B.Tech Computer Science & Engineering",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "Indian Institute of Information Technology, Nagpur",
        sameAs: "https://iiitn.ac.in/",
      },
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Information Technology, Nagpur",
      sameAs: "https://iiitn.ac.in/",
    },
    subjectOf: {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: `${site.name} — Portfolio`,
      description: site.tagline,
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
      "Applied AI",
      "Agentic systems",
      "Multi-agent systems",
      "Hybrid RAG",
      "Vector databases",
      "ESG reporting",
    ],
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: `${site.name} — Full-Stack Engineer specializing in Applied AI`,
    description: site.tagline,
    dateCreated: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: "en",
    mainEntity: { "@id": `${siteUrl}/#person` },
    author: { "@id": `${siteUrl}/#person` },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    description: site.tagline,
    inLanguage: "en",
    author: { "@id": `${siteUrl}/#person` },
    publisher: { "@id": `${siteUrl}/#person` },
    copyrightYear: new Date().getFullYear(),
  };

  return (
    <>
      <StructuredData data={personSchema} />
      <StructuredData data={profilePageSchema} />
      <StructuredData data={websiteSchema} />
    </>
  );
}
