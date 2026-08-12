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
  headline: "Trusted in production",
  ecosystem:
    "Ecometer is part of the EcoMS sustainability ecosystem — publicly featured case studies include enterprise events and campaigns for leading brands.",
  linkedInLabel: "View my profile & recommendations on LinkedIn",
  linkedInHref: "https://linkedin.com/in/yash-patidar-97a8861b3",
  testimonialPlaceholder:
    "Requesting LinkedIn recommendations from Horizon17 and internship managers — professional endorsements appear on my profile today.",
} as const;
