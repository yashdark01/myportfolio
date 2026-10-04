/** Public client names from EcoMS case studies (ecomsww.com/case-studies) */
export const ecometerEcosystemClients = [
  "Amazon",
  "Tata Motors",
  "HDFC",
  "Nivea",
  "Wonder Cement",
  "Nykaa",
] as const;

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  linkedIn?: string;
}

/**
 * Add real quotes here once you have permission.
 * Example:
 * { quote: "...", name: "...", title: "...", company: "Horizon17" }
 */
export const testimonials: Testimonial[] = [];

export const socialProof = {
  headline: "Public production evidence",
  ecosystem:
    "EcoMS publicly documents sustainability campaigns and events for these organizations. I contribute engineering to the Ecometer platform; these names are platform-level evidence, not a claim that I personally owned each client relationship or campaign.",
  linkedInLabel: "View my LinkedIn profile",
  linkedInHref: "https://linkedin.com/in/yash-patidar-97a8861b3",
  linkedInSummary:
    "Role history, skills endorsements, and professional context for my work at Horizon17 and WebIntegratorz.",
} as const;
