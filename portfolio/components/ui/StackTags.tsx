import TechTag from "@/components/ui/TechTag";
import { expandStackItems } from "@/lib/tech-icons";

interface StackTagsProps {
  items: readonly string[];
  className?: string;
}

export default function StackTags({ items, className = "" }: StackTagsProps) {
  const labels = expandStackItems(items);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {labels.map((label, index) => (
        <TechTag key={`${label}-${index}`} label={label} />
      ))}
    </div>
  );
}
