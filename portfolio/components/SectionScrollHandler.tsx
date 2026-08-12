"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cleanHomeUrl, scrollToHomeSection } from "@/lib/sections";

/**
 * On the homepage, scroll to a section when the URL contains a hash (e.g. /#journey),
 * then clean the URL so the address bar shows yashpatidar.vercel.app/ without "#".
 */
export default function SectionScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const handleHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      requestAnimationFrame(() => {
        if (scrollToHomeSection(id)) {
          cleanHomeUrl();
        }
      });
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [pathname]);

  return null;
}
