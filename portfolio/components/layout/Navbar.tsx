"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/data/site";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!isMenuOpen) {
        setIsVisible(currentY < lastScrollY.current || currentY < 80);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const sections = ["hero", ...navItems.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`glass-nav fixed top-0 z-50 w-full transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight text-text-primary"
        >
          {site.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm transition-colors duration-200 ${
                activeSection === item.id
                  ? "text-accent"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href={site.resumeUrl} variant="secondary" external>
            Resume ↗
          </Button>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-text-primary transition-all duration-300 ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-text-primary transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-text-primary transition-all duration-300 ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/98 transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-medium text-text-primary"
          >
            {item.label}
          </a>
        ))}
        <Button
          href={site.resumeUrl}
          variant="secondary"
          external
          className="mt-4"
        >
          Resume ↗
        </Button>
      </div>
    </header>
  );
}
