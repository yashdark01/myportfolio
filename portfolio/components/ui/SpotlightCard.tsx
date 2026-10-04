"use client";

// Interaction pattern adapted for this design system from React Bits SpotlightCard:
// https://reactbits.dev/components/spotlight-card

import { CSSProperties, MouseEvent, ReactNode } from "react";
import { m } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SpotlightCard({ children, className = "", delay = 0 }: SpotlightCardProps) {
  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
      onMouseMove={handlePointerMove}
      className={`spotlight-card ${className}`}
      style={{ "--spotlight-x": "50%", "--spotlight-y": "50%" } as CSSProperties}
    >
      {children}
    </m.div>
  );
}
