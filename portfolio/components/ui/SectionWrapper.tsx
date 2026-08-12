"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  label,
  title,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <p className="section-label mb-3">{label}</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
