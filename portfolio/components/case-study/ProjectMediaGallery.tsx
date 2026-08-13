"use client";

import { ReactNode } from "react";
import MediaFrame from "@/components/ui/MediaFrame";
import type { PreviewMediaItem } from "@/types/preview-media";

interface ProjectMediaGalleryProps {
  items: PreviewMediaItem[];
  defaultDomain?: string;
  intro?: ReactNode;
}

const defaultIntro = (
  <>
    Screenshots and walkthroughs from live deployments. Placeholders show
    what&apos;s coming — swap in assets under{" "}
    <span className="font-mono text-text-primary">public/projects/</span> when
    ready.
  </>
);

export default function ProjectMediaGallery({
  items,
  defaultDomain = "app.example.com",
  intro = defaultIntro,
}: ProjectMediaGalleryProps) {
  if (items.length === 0) return null;

  const [heroItem, ...galleryItems] = items;

  return (
    <section className="mt-10">
      <h3 className="section-label mb-2">Product preview</h3>
      <p className="mb-6 text-sm leading-relaxed text-text-muted">{intro}</p>

      {heroItem && (
        <div className={galleryItems.length > 0 ? "mb-6" : ""}>
          <MediaFrame item={heroItem} domain={defaultDomain} variant="gallery" />
        </div>
      )}

      {galleryItems.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {galleryItems.map((item) => (
            <MediaFrame
              key={item.id}
              item={item}
              domain={item.domain ?? defaultDomain}
              variant="gallery"
            />
          ))}
        </div>
      )}
    </section>
  );
}
