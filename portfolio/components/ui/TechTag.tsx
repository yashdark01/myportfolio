import TechIcon from "@/components/ui/TechIcon";
import Tag from "@/components/ui/Tag";
import { resolveTechIcon } from "@/lib/tech-icons";

interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  const icon = resolveTechIcon(label);

  if (!icon) {
    return <Tag>{label}</Tag>;
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-surface-elevated px-2.5 py-1 font-mono text-xs text-text-muted">
      <TechIcon icon={icon} />
      <span>{label}</span>
    </span>
  );
}
