"use client";

import { motion } from "framer-motion";

interface MetricCardProps {
  value: string;
  label: string;
  index?: number;
}

export default function MetricCard({ value, label, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-surface p-4 md:p-5"
    >
      <p className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-text-muted md:text-sm">{label}</p>
    </motion.div>
  );
}
