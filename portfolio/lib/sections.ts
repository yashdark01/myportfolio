/** Homepage section ids used for in-page navigation */
export const homeSectionIds = [
  "hero",
  "process",
  "work",
  "github",
  "writing",
  "journey",
  "about",
  "open-to",
  "contact",
] as const;

export type HomeSectionId = (typeof homeSectionIds)[number];

export function scrollToHomeSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

/** Remove hash from the address bar while keeping the user at the current scroll position. */
export function cleanHomeUrl() {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  if (window.location.hash) {
    window.history.replaceState(null, "", path);
  }
}

export function homeSectionHref(id: string) {
  return id === "hero" ? "/" : `/#${id}`;
}
