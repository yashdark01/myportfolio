"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SectionLink from "@/components/ui/SectionLink";
import { navItems, site } from "@/data/site";
import { useScrollLock } from "@/lib/useScrollLock";
import { trackEvent } from "@/lib/analytics";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  useScrollLock(open);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => setMounted(true), []);
  useEffect(() => close(), [pathname, close]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-42% 0px -52%" },
    );
    ["hero", ...navItems.map((item) => item.id)].forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus(), 180);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const menu = mounted
    ? createPortal(
        <AnimatePresence>
          {open && (
            <m.nav
              ref={panelRef}
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ clipPath: "circle(0% at calc(100% - 4.5rem) 4.5rem)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 4.5rem) 4.5rem)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 4.5rem) 4.5rem)" }}
              transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
              className="editorial-menu fixed inset-0 z-[90] flex min-h-[100svh] flex-col overflow-y-auto"
            >
              <div className="pointer-events-none absolute -right-[12vw] -top-[20vw] h-[55vw] w-[55vw] min-h-96 min-w-96 rounded-full border border-accent/15" aria-hidden />
              <div className="site-shell flex flex-1 flex-col pb-8 pt-28 sm:pt-32">
                <p className="section-label mb-6 text-accent">Navigate / Explore</p>
                <div className="grid flex-1 content-center gap-x-10 py-4 md:grid-cols-2">
                  {navItems.map((item, index) => (
                    <m.div
                      key={item.id}
                      initial={{ opacity: 0, y: 45 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 + index * 0.055, duration: 0.55 }}
                      className="border-b border-white/10"
                    >
                      <SectionLink sectionId={item.id} onClick={close} ariaCurrent={activeSection === item.id ? "location" : undefined} className="menu-editorial-link group flex items-center justify-between py-2.5 sm:py-3">
                        <span className="flex items-baseline gap-3 sm:gap-5">
                          <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                          <span className="menu-editorial-text">{item.label}</span>
                        </span>
                        <span className={`h-2 w-2 rounded-full transition-all ${activeSection === item.id ? "bg-accent shadow-[0_0_0_7px_rgba(16,185,129,.1)]" : "bg-white/15 group-hover:bg-accent"}`} />
                      </SectionLink>
                    </m.div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 text-sm text-text-muted sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="section-label mb-2">Start a conversation</p>
                    <a href={site.links.email} className="text-lg text-text-primary underline decoration-white/20 underline-offset-8 hover:decoration-accent sm:text-xl">{site.email}</a>
                  </div>
                  <div className="flex flex-wrap gap-5">
                    <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                    <a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                    <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("resume_download", { source: "menu" })}>Resume ↗</a>
                  </div>
                </div>
              </div>
            </m.nav>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top)]">
        <div className="site-shell flex items-center justify-between py-4 sm:py-6">
          <SectionLink sectionId="hero" onClick={close} className="pointer-events-auto group flex items-center gap-3 text-sm font-semibold tracking-tight text-text-primary">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-background/80 font-mono text-xs backdrop-blur-xl transition-colors group-hover:border-accent group-hover:text-accent">YP</span>
            <span className="hidden sm:block">Yash Patidar</span>
          </SectionLink>
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            data-cursor={open ? "CLOSE" : "MENU"}
            onClick={() => setOpen((value) => !value)}
            className="menu-orb pointer-events-auto relative z-[110] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#f4f2ed] text-[#111] shadow-xl shadow-black/20 transition-transform hover:scale-105 sm:h-16 sm:w-16"
          >
            <span className="sr-only">Menu</span>
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </header>
      {menu}
    </>
  );
}
