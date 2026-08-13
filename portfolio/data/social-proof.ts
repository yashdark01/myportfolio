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
    "Enterprise brands whose sustainability campaigns and events run on Ecometer — part of the EcoMS ecosystem. Published case studies cover large-scale corporate events and OOH campaigns.",
  linkedInLabel: "View my LinkedIn profile",
  linkedInHref: "https://linkedin.com/in/yash-patidar-97a8861b3",
  linkedInSummary:
    "Skills endorsements, internship delivery history, and founding-engineer context on Ecometer — all on my LinkedIn profile.",
} as const;
