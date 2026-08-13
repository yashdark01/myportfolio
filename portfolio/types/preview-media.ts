export type PreviewMediaStatus = "ready" | "coming-soon" | "restricted";

export type PreviewMediaType = "image" | "video" | "diagram";

export interface PreviewMediaItem {
  id: string;
  type: PreviewMediaType;
  src?: string;
  poster?: string;
  alt: string;
  caption: string;
  domain?: string;
  status: PreviewMediaStatus;
  comingSoonLabel?: string;
  /** Default cover — use contain for tall marketing/UI screenshots */
  objectFit?: "cover" | "contain";
}
