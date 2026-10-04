"use client";

import React from "react";

interface DiagramRendererProps {
  diagram?: string;
  className?: string;
}

export default function DiagramRenderer({
  diagram,
  className = "mt-4 overflow-x-auto rounded-xl border border-white/10 bg-surface/90 p-4 shadow-inner",
}: DiagramRendererProps) {
  if (!diagram) return null;

  const trimmed = diagram.trim();
  const isSvg = trimmed.startsWith("<svg") || trimmed.includes("<svg");

  if (isSvg) {
    return (
      <div className="group relative mt-4">
        <div className="mb-1.5 flex items-center justify-end gap-1 text-[11px] font-mono tracking-tight text-text-muted/60 sm:hidden">
          <span>Pan diagram</span>
          <span>↔</span>
        </div>
        <div
          className={`editorial-diagram ${className} touch-pan-x`}
          data-reveal
          dangerouslySetInnerHTML={{ __html: trimmed }}
        />
      </div>
    );
  }

  return (
    <pre className="editorial-code-block mt-4 overflow-x-auto rounded-xl border border-white/5 bg-surface p-5 font-mono text-xs leading-relaxed text-text-muted" data-reveal>
      {diagram}
    </pre>
  );
}
