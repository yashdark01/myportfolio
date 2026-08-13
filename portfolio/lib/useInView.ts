"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseInViewOptions {
  rootMargin?: string;
  /** When false, observer is not attached (e.g. hero frames load immediately). */
  enabled?: boolean;
}

export function useInView<T extends Element = Element>({
  rootMargin = "200px",
  enabled = true,
}: UseInViewOptions = {}): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return { ref, inView };
}
