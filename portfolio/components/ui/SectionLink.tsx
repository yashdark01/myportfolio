"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, MouseEventHandler, ReactNode } from "react";
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
  onMouseMove?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  ariaCurrent?: "page" | "location";
}

export default function SectionLink({
  sectionId,
  children,
  className = "",
  onClick,
  onMouseMove,
  onMouseLeave,
  ariaCurrent,
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
    <Link
      href={homeSectionHref(sectionId)}
      onClick={handleClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-current={ariaCurrent}
      className={className}
    >
      {children}
    </Link>
  );
}
