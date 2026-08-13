import { personas, site } from "@/data/site";

export const heroHighlights = {
  title: ["Founding Engineer", "Horizon17"],
  institution: ["IIIT Nagpur"],
  product: ["Horizon17"],
  ai: ["RAG", "LangGraph"],
} as const;

export const heroLinkedTerms = {
  Horizon17: site.links.horizon17,
} as const;

export const defaultPersonaTagline = personas.product.tagline;
