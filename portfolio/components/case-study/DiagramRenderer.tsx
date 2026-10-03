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
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  return (
    <pre className="mt-4 overflow-x-auto rounded-xl border border-white/5 bg-surface p-5 font-mono text-xs leading-relaxed text-text-muted">
      {diagram}
    </pre>
  );
}

