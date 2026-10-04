"use client";

import { ReactNode, useRef } from "react";
import { useGsap } from "@/lib/useGsap";

interface SectionWrapperProps {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  label,
  title,
  children,
  className = "",
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(
    sectionRef,
    (gsap) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(
        ".section-heading-piece",
        {
          y: 34,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
  );

  return (
    <section ref={sectionRef} id={id} className={`relative py-20 sm:py-24 md:py-32 ${className}`}>
      <div className="site-shell">
        <div className="mb-12 overflow-hidden md:mb-16">
          <p className="section-heading-piece section-label mb-3">{label}</p>
          <h2 className="section-heading-piece max-w-4xl text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
