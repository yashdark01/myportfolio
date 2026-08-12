"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode } from "react";
import {
  cleanHomeUrl,
  homeSectionHref,
  scrollToHomeSection,
} from "@/lib/sections";

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
    onClick?.(event);

    if (pathname === "/") {
      event.preventDefault();
      if (scrollToHomeSection(sectionId)) {
        cleanHomeUrl();
      }
    }
  };

  return (
    <Link href={homeSectionHref(sectionId)} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
