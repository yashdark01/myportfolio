"use client";

import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { processSteps } from "@/data/site";
import { useGsap } from "@/lib/useGsap";

const terminalLines = [
  { symbol: "❯", text: "architect ./krashaq --production", tone: "command" },
  { symbol: "⟡", text: "Mapping farmer, platform and network constraints", tone: "active" },
  { symbol: "✓", text: "Hindi / Hinglish flows designed for low bandwidth", tone: "success" },
  { symbol: "⟡", text: "Building governed agent infrastructure", tone: "active" },
  { symbol: "✓", text: "9 microservices connected through HTTP + events", tone: "success" },
  { symbol: "✓", text: "26 tools · LangGraph · Qdrant + BM25 hybrid RAG", tone: "success" },
  { symbol: "⟡", text: "Running verification suite", tone: "active" },
  { symbol: "✓", text: "630+ automated tests passing", tone: "success" },
  { symbol: "✓", text: "PostgreSQL outbox + durable HITL approval verified", tone: "success" },
  { symbol: "⟡", text: "Deploying production services", tone: "active" },
  { symbol: "✓", text: "Live system healthy · streaming responses ready", tone: "success" },
  { symbol: "❯", text: "_", tone: "command" },
] as const;

const stageNames = ["Discover", "Connect", "Measure", "Prove"];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGsap(sectionRef, (gsap) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".terminal-line", {
      opacity: 0,
      y: 8,
      duration: 0.32,
      stagger: 0.1,
      ease: "power2.out",
      immediateRender: false,
      scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
    });
    gsap.from(".process-stage", {
      opacity: 0.55,
      x: 20,
      stagger: 0.12,
      duration: 0.55,
      immediateRender: false,
      scrollTrigger: { trigger: ".process-stages", start: "top 72%", once: true },
    });
  });

  return (
    <SectionWrapper id="process" label="02 / Build protocol" title="Proof appears while the system is built." className="process-terminal-section overflow-hidden">
      <div ref={sectionRef} className="grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-10">
        <div className="terminal-shell overflow-hidden rounded-[1.25rem] border border-white/12 bg-[#070908] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[.025] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <p className="font-mono text-[10px] tracking-[0.12em] text-text-muted">YASH@PORTFOLIO — ~/SYSTEMS/KRASHAQ</p>
            <span className="font-mono text-[10px] text-accent">LIVE</span>
          </div>
          <div className="min-h-[32rem] p-5 font-mono text-xs leading-6 sm:p-7 sm:text-[13px] sm:leading-7">
            <p className="mb-6 text-text-muted">AI agent <span className="text-white">~/krashaq</span></p>
            <div className="space-y-1.5">
              {terminalLines.map((line, index) => (
                <p key={`${line.text}-${index}`} className={`terminal-line terminal-${line.tone} flex gap-3`}>
                  <span className="w-3 shrink-0 text-center">{line.symbol}</span>
                  <span>{line.text}</span>
                </p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-2 border-t border-white/8 pt-5">
              <div><p className="text-lg font-semibold text-white">630+</p><p className="text-[9px] uppercase tracking-wider text-text-muted">Tests</p></div>
              <div><p className="text-lg font-semibold text-white">26</p><p className="text-[9px] uppercase tracking-wider text-text-muted">Tools</p></div>
              <div><p className="text-lg font-semibold text-accent">Healthy</p><p className="text-[9px] uppercase tracking-wider text-text-muted">Production</p></div>
            </div>
          </div>
        </div>

        <div className="process-stages flex flex-col justify-between border-y border-white/10">
          {processSteps.map((step, index) => (
            <article key={step.number} className="process-stage group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-6 last:border-b-0 sm:p-6">
              <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{stageNames[index]}</p>
                <h3 className="text-lg font-semibold tracking-tight transition-transform group-hover:translate-x-1">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
