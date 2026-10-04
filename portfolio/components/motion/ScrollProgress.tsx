"use client";

import { useRef } from "react";
import { useGsap } from "@/lib/useGsap";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGsap(bar, (gsap) => {
    if (!bar.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      },
    );
  });

  return <div ref={bar} className="scroll-progress" aria-hidden />;
}
