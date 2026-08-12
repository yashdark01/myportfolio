import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

const variants = {
  default: "border border-white/10 bg-white/5 text-text-primary",
  accent: "border border-accent/20 bg-accent-muted text-accent",
  muted: "border border-white/5 bg-surface-elevated text-text-muted",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
