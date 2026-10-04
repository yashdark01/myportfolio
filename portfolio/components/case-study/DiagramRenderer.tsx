"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DiagramRendererProps {
  diagram?: string;
  className?: string;
  title?: string;
}

function FullscreenModal({
  diagram,
  title,
  onClose,
}: {
  diagram: string;
  title?: string;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs font-mono text-text-muted/70 uppercase tracking-widest">
          {title ?? "Architecture Diagram"}
        </span>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-sm text-text-muted transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close fullscreen"
        >
          ✕
        </button>
      </div>

      {/* Diagram — scrollable, centered */}
      <div
        className="flex flex-1 overflow-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="m-auto min-w-[640px] rounded-xl border border-white/10 bg-[#090d16] p-6 shadow-2xl"
          dangerouslySetInnerHTML={{ __html: diagram }}
        />
      </div>

      <p className="shrink-0 pb-3 text-center text-[11px] text-text-muted/50">
        Click outside or press <kbd className="rounded border border-white/10 px-1">Esc</kbd> to close
      </p>
    </div>,
    document.body
  );
}

export default function DiagramRenderer({
  diagram,
  className = "mt-4 overflow-x-auto rounded-xl border border-white/10 bg-surface/90 p-4 shadow-inner",
  title,
}: DiagramRendererProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!diagram) return null;

  const trimmed = diagram.trim();
  const isSvg = trimmed.startsWith("<svg") || trimmed.includes("<svg");

  if (isSvg) {
    return (
      <>
        <div className="group relative mt-4">
          {/* Mobile pan hint */}
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-tight text-text-muted/50 sm:hidden">
              ↔ Pan diagram
            </span>
            <span className="flex-1" />
            {/* Expand button */}
            <button
              onClick={() => setFullscreen(true)}
              title="Expand diagram"
              className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-text-muted/70 transition-colors hover:bg-white/10 hover:text-accent"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M1 4V1H4M8 1H11V4M11 8V11H8M4 11H1V8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Expand
            </button>
          </div>

          <div
            ref={containerRef}
            className={`editorial-diagram ${className} touch-pan-x`}
            data-reveal
            dangerouslySetInnerHTML={{ __html: trimmed }}
          />
        </div>

        {mounted && fullscreen && (
          <FullscreenModal
            diagram={trimmed}
            title={title}
            onClose={() => setFullscreen(false)}
          />
        )}
      </>
    );
  }

  // ASCII / text fallback
  return (
    <pre
      className="editorial-code-block mt-4 overflow-x-auto rounded-xl border border-white/5 bg-surface p-5 font-mono text-xs leading-relaxed text-text-muted"
      data-reveal
    >
      {diagram}
    </pre>
  );
}
