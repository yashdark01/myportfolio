import type { SimpleIcon } from "simple-icons";

interface TechIconProps {
  icon: SimpleIcon;
  className?: string;
  /** Use official brand color (default) or inherit currentColor */
  variant?: "brand" | "mono";
}

export default function TechIcon({
  icon,
  className = "h-3.5 w-3.5 shrink-0",
  variant = "brand",
}: TechIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      fill={variant === "brand" ? `#${icon.hex}` : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}
