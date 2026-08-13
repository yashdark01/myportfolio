"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode } from "react";
import {
  cleanHomeUrl,
  homeSectionHref,
  scrollToHomeSection,
} from "@/lib/sections";
import {
  isBodyScrollLocked,
  releaseScrollLockForNavigation,
} from "@/lib/useScrollLock";

interface SectionLinkProps {
  sectionId: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default function SectionLink({
  sectionId,
  children,
  className = "",
  onClick,
}: SectionLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      onClick?.(event);

      const wasLocked =
        releaseScrollLockForNavigation() || isBodyScrollLocked();

      const scrollToSection = () => {
        if (scrollToHomeSection(sectionId)) {
          cleanHomeUrl();
        }
      };

      if (wasLocked) {
        requestAnimationFrame(() => {
          requestAnimationFrame(scrollToSection);
        });
      } else {
        scrollToSection();
      }
      return;
    }

    onClick?.(event);
  };

  return (
    <Link href={homeSectionHref(sectionId)} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
