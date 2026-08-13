import type { PreviewMediaItem } from "@/types/preview-media";

export const previewMediaByProject: Record<string, PreviewMediaItem[]> = {
  krashaq: [
    {
      id: "dashboard",
      type: "image",
      src: "/projects/krashaq/dashboard.png",
      alt: "Krashaq AI farmer dashboard with weather, crops, and AI chat entry points",
      caption: "Farmer dashboard — weather, crops, and AI chat entry points",
      domain: "krashaq-agritech.vercel.app",
      status: "ready",
      comingSoonLabel: "Farmer dashboard",
    },
    {
      id: "chat",
      type: "image",
      src: "/projects/krashaq/chat.png",
      alt: "Krashaq AI multilingual crop advisory chat in Hindi and English",
      caption: "Multilingual AI chat — Hindi, Hinglish, and English crop advisory",
      domain: "krashaq-agritech.vercel.app",
      status: "coming-soon",
      comingSoonLabel: "Multilingual chat UI",
    },
    {
      id: "walkthrough",
      type: "video",
      src: "/projects/krashaq/walkthrough.mp4",
      poster: "/projects/krashaq/walkthrough-poster.jpg",
      alt: "Krashaq AI product walkthrough from live deployment",
      caption: "Product walkthrough — live demo recording",
      domain: "krashaq-agritech.vercel.app",
      status: "coming-soon",
      comingSoonLabel: "Product walkthrough video",
    },
    {
      id: "b2b2c-flow",
      type: "diagram",
      src: "/projects/krashaq/b2b2c-flow.png",
      alt: "Krashaq B2B2C subscription flow from admin to supplier to farmer",
      caption: "B2B2C licensing — admin → supplier → farmer subscription flow",
      status: "coming-soon",
      comingSoonLabel: "B2B2C flow diagram",
    },
  ],
  "horizon17-esg": [
    {
      id: "overview",
      type: "image",
      src: "/projects/ecometer/overview.png",
      alt: "Ecometer platform page on ecomsww.com — sustainability intelligence for modern marketing",
      caption:
        "Live EcoMS platform page — sustainability intelligence for modern marketing",
      domain: "ecomsww.com/ecometer",
      status: "ready",
      objectFit: "cover",
    },
    {
      id: "platform-info",
      type: "image",
      src: "/projects/ecometer/platform-info.png",
      alt: "Ecometer one platform section on ecomsww.com — end-to-end accountability for brands and agencies",
      caption:
        "One platform, end-to-end accountability — impressions to measured impact",
      domain: "ecomsww.com/ecometer",
      status: "ready",
      objectFit: "cover",
    },
    {
      id: "case-studies",
      type: "image",
      src: "/projects/ecometer/case-studies.png",
      alt: "EcoMS case studies page on ecomsww.com — Amazon, Tata Motors, HDFC, and enterprise campaigns",
      caption:
        "Published EcoMS client campaigns — Amazon, Tata Motors, HDFC, and others",
      domain: "ecomsww.com/case-studies",
      status: "ready",
      objectFit: "cover",
    },
  ],
  "rent-buddy": [
    {
      id: "home",
      type: "image",
      src: "/projects/rent-buddy/home.png",
      alt: "Rent Buddy furnishing rental marketplace homepage",
      caption: "Browse by city and category — rentbuddy.in",
      domain: "rentbuddy.in",
      status: "coming-soon",
      comingSoonLabel: "Marketplace homepage",
    },
    {
      id: "listing",
      type: "image",
      src: "/projects/rent-buddy/listing.png",
      alt: "Rent Buddy product listing and order flow",
      caption: "Listing detail and tracked doorstep delivery flow",
      domain: "rentbuddy.in",
      status: "coming-soon",
      comingSoonLabel: "Listing & order flow",
    },
  ],
  archflow: [
    {
      id: "canvas",
      type: "image",
      src: "/projects/archflow/canvas.png",
      alt: "Archflow in-browser system design canvas with nodes and connections",
      caption: "System design canvas — drag-drop nodes, connections, and export",
      status: "coming-soon",
      comingSoonLabel: "Canvas editor preview",
    },
  ],
  "music-player": [
    {
      id: "player",
      type: "image",
      src: "/projects/music-player/player.png",
      alt: "Music Player streaming UI with album playback and discovery feeds",
      caption: "Streaming UI — discovery feeds, album playback, and admin CRUD",
      status: "coming-soon",
      comingSoonLabel: "Player UI preview",
    },
  ],
};

export function getPreviewMedia(projectId: string): PreviewMediaItem[] {
  return previewMediaByProject[projectId] ?? [];
}

/** Best single frame for homepage hero — may differ from gallery order */
const heroMediaPreference: Record<string, string> = {
  "horizon17-esg": "overview",
  krashaq: "dashboard",
};

export function getHeroPreviewMedia(
  projectId: string,
): PreviewMediaItem | undefined {
  const items = getPreviewMedia(projectId);
  const preferredId = heroMediaPreference[projectId];
  if (preferredId) {
    return items.find((item) => item.id === preferredId) ?? items[0];
  }
  return items[0];
}

export function getDefaultMediaDomain(projectId: string): string {
  switch (projectId) {
    case "horizon17-esg":
      return "ecomsww.com/ecometer";
    case "rent-buddy":
      return "rentbuddy.in";
    case "archflow":
      return "archflow · side project";
    case "music-player":
      return "music-player.local";
    case "krashaq":
    default:
      return "krashaq-agritech.vercel.app";
  }
}