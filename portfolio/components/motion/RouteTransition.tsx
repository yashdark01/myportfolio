"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.main
        id="main-content"
        tabIndex={-1}
        key={pathname}
        className="relative max-w-full overflow-x-hidden outline-none"
        initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <m.div
          className="route-transition-curtain"
          aria-hidden
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
        />
        {children}
      </m.main>
    </AnimatePresence>
  );
}
