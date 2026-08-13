"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import type { PreviewMediaItem, PreviewMediaStatus } from "@/types/preview-media";

interface MediaFrameProps {
  item: PreviewMediaItem;
  domain?: string;
  variant?: "hero" | "gallery";
  className?: string;
}

function BrowserChrome({
  domain,
  variant,
}: {
  domain: string;
  variant: "hero" | "gallery";
}) {
  const dotSize = variant === "hero" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <div className="relative border-b border-white/[0.06] bg-[#161616] px-3.5 py-2.5 sm:px-4 sm:py-3">
      <div className="flex items-center">
        <div
          className="flex shrink-0 items-center gap-1.5 sm:gap-2"
          aria-hidden
        >
          <span
            className={`${dotSize} rounded-full bg-[#FF5F57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]`}
          />
          <span
            className={`${dotSize} rounded-full bg-[#FFBD2E] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]`}
          />
          <span
            className={`${dotSize} rounded-full bg-[#28CA42] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]`}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 flex justify-center px-14 sm:px-20">
          <div className="flex max-w-[min(100%,18rem)] items-center justify-center truncate rounded-md border border-white/[0.06] bg-[#0a0a0a]/90 px-3 py-1 font-mono text-[10px] text-text-muted/90 sm:max-w-xs sm:text-[11px]">
            {domain}
          </div>
        </div>
      </div>
    </div>
  );
}

function overlayCopy(status: PreviewMediaStatus, label: string) {
  if (status === "restricted") {
    return {
      badge: "Preview restricted",
      title: label,
      hint: "Public-safe overview — NDA applies to internal UI",
    };
  }
  return {
    badge: "Preview coming soon",
    title: label,
    hint: "Recording from live deployment when ready",
  };
}

async function assetExists(src: string) {
  try {
    const res = await fetch(src, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export default function MediaFrame({
  item,
  domain = "app.example.com",
  variant = "gallery",
  className = "",
}: MediaFrameProps) {
  const [assetReady, setAssetReady] = useState(false);

  const shouldCheckAsset =
    item.status === "ready" && Boolean(item.src || item.poster);

  useEffect(() => {
    if (!shouldCheckAsset) {
      setAssetReady(false);
      return;
    }

    const src =
      item.type === "video" ? item.src! : item.src!;
    let cancelled = false;

    assetExists(src).then((ok) => {
      if (!cancelled) setAssetReady(ok);
    });

    return () => {
      cancelled = true;
    };
  }, [shouldCheckAsset, item.src, item.type]);

  const showMedia =
    item.status === "ready" &&
    assetReady &&
    (item.type === "video" ? item.src : item.src);

  const showPlaceholder = !showMedia;
  const overlay = overlayCopy(
    showPlaceholder && item.status === "ready" ? "coming-soon" : item.status,
    item.comingSoonLabel ?? item.alt,
  );

  const aspectClass =
    item.type === "video"
      ? "aspect-video"
      : variant === "hero"
        ? "h-52 w-full sm:h-64 md:h-72 lg:h-80"
        : "aspect-[16/10]";

  const mediaBg =
    item.objectFit === "contain" ? "bg-[#050505]" : "bg-background";

  return (
    <figure
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.85)] ${variant === "hero" ? "rounded-lg border-white/[0.08]" : ""} ${className}`}
    >
      <BrowserChrome domain={item.domain ?? domain} variant={variant} />

      <div className={`relative ${mediaBg} ${aspectClass}`}>
        {showMedia && item.type === "video" && item.src && (
          <video
            className="h-full w-full object-cover object-top"
            controls
            playsInline
            preload="metadata"
            poster={item.poster}
          >
            <source src={item.src} type="video/mp4" />
          </video>
        )}

        {showMedia && item.type !== "video" && item.src && (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className={
              item.objectFit === "contain"
                ? "object-contain object-center p-2"
                : variant === "hero"
                  ? "object-cover object-center"
                  : "object-cover object-top"
            }
            priority={variant === "hero"}
            sizes={
              variant === "hero"
                ? "(max-width: 768px) 100vw, 640px"
                : "(max-width: 768px) 100vw, 50vw"
            }
          />
        )}

        {showPlaceholder && (
          <>
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_55%)]"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_50%,rgba(16,185,129,0.06)_100%)]"
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="max-w-xs rounded-xl border border-white/10 bg-background/80 px-5 py-4 text-center backdrop-blur-sm">
                <Badge
                  variant={item.status === "restricted" ? "muted" : "accent"}
                  className="mb-3"
                >
                  {overlay.badge}
                </Badge>
                <p className="text-sm font-medium text-text-primary">
                  {overlay.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">
                  {overlay.hint}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {variant !== "hero" && (
        <figcaption className="px-4 py-3 text-xs leading-relaxed text-text-muted">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}
