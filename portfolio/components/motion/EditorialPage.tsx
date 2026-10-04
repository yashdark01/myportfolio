"use client";

import { ReactNode, useRef } from "react";
import { useGsap } from "@/lib/useGsap";

interface EditorialPageProps {
  children: ReactNode;
  label: string;
  className?: string;
}

export default function EditorialPage({
  children,
  label,
  className = "",
}: EditorialPageProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGsap(scope, (gsap) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .fromTo(
        "[data-page-intro] > *",
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.075 },
        0.05,
      )
      .fromTo(
        ".editorial-page-marker",
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.9 },
        0.2,
      );

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
      gsap.fromTo(
        Array.from(group.children),
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.085,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: group,
            start: "top 86%",
            once: true,
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element, index) => {
      gsap.fromTo(
        element,
        { yPercent: index % 2 ? -8 : 8 },
        {
          yPercent: index % 2 ? 12 : -12,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    });
  });

  return (
    <div ref={scope} className={`editorial-page relative isolate overflow-hidden ${className}`}>
      <div className="editorial-page-grid" aria-hidden />
      <div className="editorial-page-orb editorial-page-orb-a" data-parallax aria-hidden />
      <div className="editorial-page-orb editorial-page-orb-b" data-parallax aria-hidden />
      <div className="editorial-page-marker" aria-hidden>
        <span>{label}</span>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
