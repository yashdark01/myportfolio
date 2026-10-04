"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Badge from "@/components/ui/Badge";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { timeline } from "@/data/experience";
import { useGsap } from "@/lib/useGsap";

const WorkstationScene = dynamic(() => import("@/components/three/WorkstationScene"), {
  ssr: false,
  loading: () => <div className="journey-workstation-fallback" aria-hidden />,
});

export default function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [showWorkstation, setShowWorkstation] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => setShowWorkstation(desktop.matches && !connection?.saveData);

    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, []);

  useGsap(
    timelineRef,
    (gsap) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".journey-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 65%",
            end: "bottom 68%",
            scrub: 0.6,
          },
        },
      );
      gsap.fromTo(
        ".journey-entry",
        { opacity: 0.62, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.18,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 68%",
            end: "bottom 72%",
            scrub: 0.45,
          },
        },
      );
    },
  );

  return (
    <SectionWrapper id="journey" label="06 / Timeline" title="Built through real constraints.">
      <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-20">
        <div ref={timelineRef} className="relative">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-[11px]">
            <div className="journey-progress h-full w-px origin-top bg-gradient-to-b from-accent via-cyan-400 to-transparent" />
          </div>

          <div className="space-y-12">
            {timeline.map((entry, index) => (
              <div
                key={entry.id}
                className="journey-entry group relative pl-8 opacity-70 md:pl-10"
              >
                <div className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background shadow-[0_0_0_0_rgba(16,185,129,0)] transition-shadow group-hover:shadow-[0_0_0_8px_rgba(16,185,129,.08)] md:h-[23px] md:w-[23px]" />

                <p className="font-mono text-xs text-accent">0{index + 1} — {entry.period}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{entry.title}</h3>
                <p className="text-sm text-text-muted">{entry.organization}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
                  {entry.description}
                </p>
                {entry.badge && (
                  <Badge variant="accent" className="mt-3">
                    {entry.badge}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <figure className="journey-workstation-stage sticky top-24 hidden h-[clamp(31rem,58vw,42rem)] overflow-hidden rounded-2xl border border-white/[0.07] lg:block">
          <div className="journey-workstation-grid absolute inset-0" aria-hidden />
          {showWorkstation ? <WorkstationScene /> : <div className="journey-workstation-fallback" aria-hidden />}
        </figure>
      </div>
    </SectionWrapper>
  );
}
