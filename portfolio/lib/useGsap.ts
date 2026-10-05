"use client";

import { DependencyList, RefObject, useEffect } from "react";

type GsapInstance = typeof import("gsap").gsap;

export function useGsap<T extends Element>(
  scope: RefObject<T | null>,
  setup: (gsap: GsapInstance) => void,
  dependencies: DependencyList = [],
) {
  useEffect(() => {
    let cancelled = false;
    let context: ReturnType<GsapInstance["context"]> | undefined;
    let refreshFrame: number | undefined;
    let refreshTimer: number | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.gsap;
        const { ScrollTrigger } = scrollTriggerModule;
        gsap.registerPlugin(ScrollTrigger);
        context = gsap.context(() => setup(gsap), scope);
        refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
      },
    );

    return () => {
      cancelled = true;
      if (refreshFrame !== undefined) window.cancelAnimationFrame(refreshFrame);
      if (refreshTimer !== undefined) window.clearTimeout(refreshTimer);
      context?.revert();
    };
    // The caller controls recreation explicitly through `dependencies`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
