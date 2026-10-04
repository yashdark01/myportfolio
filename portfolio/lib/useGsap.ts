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

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;
        const gsap = gsapModule.gsap;
        gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);
        context = gsap.context(() => setup(gsap), scope);
      },
    );

    return () => {
      cancelled = true;
      context?.revert();
    };
    // The caller controls recreation explicitly through `dependencies`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
