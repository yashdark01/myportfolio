"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PreviewImage {
  src: string;
  alt: string;
  caption: string;
}

interface PreviewVideo {
  src: string;
  poster?: string;
  caption: string;
  domain?: string;
}

interface ProjectPreviewGalleryProps {
  images?: PreviewImage[];
  video?: PreviewVideo;
  defaultDomain?: string;
}

function BrowserChrome({ domain }: { domain: string }) {
  return (
    <div className="border-b border-white/5 bg-background/80 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-2 truncate font-mono text-[10px] text-text-muted">
          {domain}
        </span>
      </div>
    </div>
  );
}

export default function ProjectPreviewGallery({
  images = [],
  video,
  defaultDomain = "app.example.com",
}: ProjectPreviewGalleryProps) {
  const [videoAvailable, setVideoAvailable] = useState(false);

  useEffect(() => {
    if (!video?.src) return;
    fetch(video.src, { method: "HEAD" })
      .then((res) => setVideoAvailable(res.ok))
      .catch(() => setVideoAvailable(false));
  }, [video?.src]);

  const hasImages = images.length > 0;
  const hasVideo = video && videoAvailable;

  if (!hasImages && !hasVideo) return null;

  return (
    <section className="mt-10">
      <h3 className="section-label mb-2">Product preview</h3>
      <p className="mb-6 text-sm text-text-muted">
        {hasVideo
          ? "Screenshots and walkthrough from live deployments."
          : "Screenshots from live deployments and public marketing pages."}
      </p>

      {hasVideo && (
        <figure className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-surface">
          <BrowserChrome domain={video.domain ?? defaultDomain} />
          <div className="relative aspect-video bg-background">
            <video
              className="h-full w-full object-cover object-top"
              controls
              playsInline
              preload="metadata"
              poster={video.poster}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          </div>
          <figcaption className="px-4 py-3 text-xs text-text-muted">
            {video.caption}
          </figcaption>
        </figure>
      )}

      {hasImages && (
        <div className="grid gap-6 md:grid-cols-2">
          {images.map((image) => (
            <figure
              key={image.src}
              className="overflow-hidden rounded-xl border border-white/10 bg-surface"
            >
              <BrowserChrome domain={defaultDomain} />
              <div className="relative aspect-[16/10] bg-background">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption className="px-4 py-3 text-xs text-text-muted">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
