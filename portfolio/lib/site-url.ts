export const DEFAULT_SITE_URL = "https://yashpatidar.vercel.app";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}

/** About section and Open Graph */
export const profileImagePath = "/myprofile.webp";

/** Navbar avatar — 128×128 WebP */
export const profileNavImagePath = "/myprofile-nav.webp";

/** Favicon, manifest, apple touch icon */
export const profileIconPath = "/myprofile-icon.webp";

export function getProfileImageUrl() {
  return `${getSiteUrl()}${profileImagePath}`;
}
