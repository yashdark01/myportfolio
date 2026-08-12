import { track } from "@vercel/analytics";

export type AnalyticsEvent =
  | "resume_download"
  | "email_copy"
  | "project_expand"
  | "project_link_click"
  | "recruiter_mode_open"
  | "contact_email_click"
  | "social_link_click"
  | "leetcode_click";

export function trackEvent(
  name: AnalyticsEvent,
  data?: Record<string, string | number | boolean>
) {
  try {
    track(name, data);
  } catch {
    // Analytics unavailable outside Vercel / during local dev
  }
}
