"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navItems, site } from "@/data/site";
import { profileNavImagePath } from "@/lib/site-url";
import Button from "@/components/ui/Button";
import SectionLink from "@/components/ui/SectionLink";
import { useScrollLock } from "@/lib/useScrollLock";
import { trackEvent } from "@/lib/analytics";

const menuVariants = {
  closed: { opacity: 0, x: "100%" },
  open: { opacity: 1, x: 0 },
};

const itemVariants = {
  closed: { opacity: 0, x: 16 },
  open: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 + index * 0.04, duration: 0.25 },
  }),
};

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useScrollLock(isMenuOpen);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", isMenuOpen);
    return () => {
      document.body.classList.remove("mobile-nav-open");
    };
  }, [isMenuOpen]);

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
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const id = window.setTimeout(() => {
      menuPanelRef.current
        ?.querySelector<HTMLElement>("a[href]")
        ?.focus();
    }, 80);

    return () => window.clearTimeout(id);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuPanelRef.current) return;

      const focusable = menuPanelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [closeMenu]);

  const toggleMenu = () => {
    setIsMenuOpen((open) => {
      const next = !open;
      if (next) setIsVisible(true);
      return next;
    });
  };

  const mobileMenu = mounted
    ? createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <m.button
                type="button"
                aria-label="Close menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden"
                onClick={closeMenu}
              />

              <m.nav
                ref={menuPanelRef}
                id="mobile-nav-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    closeMenu();
                    menuButtonRef.current?.focus();
                  }
                }}
                className="fixed bottom-0 right-0 top-[calc(3.75rem+env(safe-area-inset-top))] z-[70] flex w-[min(100vw,20rem)] flex-col border-l border-white/10 bg-surface shadow-2xl md:hidden"
                style={{
                  paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
                }}
              >
                <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <m.div
                        key={item.id}
                        custom={index}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <SectionLink
                          sectionId={item.id}
                          onClick={closeMenu}
                          className={`flex min-h-12 items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                            isActive
                              ? "bg-accent/10 text-accent"
                              : "text-text-primary hover:bg-white/5"
                          }`}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          )}
                        </SectionLink>
                      </m.div>
                    );
                  })}
                </div>

                <div className="border-t border-white/5 px-5 pt-4">
                  <Button
                    href={site.resumeUrl}
                    variant="secondary"
                    external
                    className="w-full justify-center"
                    onClick={() => {
                      trackEvent("resume_download", { source: "mobile_nav" });
                      closeMenu();
                    }}
                  >
                    Resume ↗
                  </Button>
                </div>
              </m.nav>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <>
      <header
        className={`glass-nav fixed top-0 w-full transition-transform duration-300 ${
          isMenuOpen ? "z-[80]" : "z-50"
        } ${isVisible || isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4"
          aria-label="Main navigation"
        >
          <SectionLink
            sectionId="hero"
            onClick={closeMenu}
            className="flex min-h-10 items-center gap-2.5 pr-3 text-sm font-semibold tracking-tight text-text-primary sm:text-base"
          >
            <Image
              src={profileNavImagePath}
              alt=""
              width={32}
              height={32}
              sizes="32px"
              quality={75}
              className="h-8 w-8 shrink-0 rounded-full border border-white/10 bg-surface object-cover object-top"
              priority
            />
            <span className="truncate">{site.name}</span>
          </SectionLink>

          <div className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navItems.map((item) => (
              <SectionLink
                key={item.id}
                sectionId={item.id}
                className={`text-sm transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-accent"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {item.label}
              </SectionLink>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              href={site.resumeUrl}
              variant="secondary"
              external
              onClick={() =>
                trackEvent("resume_download", { source: "navbar" })
              }
            >
              Resume ↗
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-white/5 md:hidden"
            onClick={toggleMenu}
          >
            <span className="sr-only">Menu</span>
            <div className="relative h-3.5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-text-primary transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-[6px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-0.5 w-5 bg-text-primary transition-all duration-300 ease-out ${
                  isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-text-primary transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-[6px] -rotate-45" : "top-[12px]"
                }`}
              />
            </div>
          </button>
        </nav>
      </header>
      {mobileMenu}
    </>
  );
}
