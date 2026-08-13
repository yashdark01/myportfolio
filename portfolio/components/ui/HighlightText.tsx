function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightText({
  text,
  terms,
  linkedTerms = {},
  className = "",
}: {
  text: string;
  terms: readonly string[];
  linkedTerms?: Record<string, string>;
  className?: string;
}) {
  if (terms.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const pattern = terms
    .slice()
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");

  const termSet = new Set(terms.map(String));
  const parts = text.split(new RegExp(`(${pattern})`, "g"));

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!termSet.has(part)) {
          return part;
        }

        const href = linkedTerms[part];
        if (href) {
          return (
            <a
              key={`${part}-${index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-colors hover:text-accent-hover"
            >
              {part} ↗
            </a>
          );
        }

        return (
          <span key={`${part}-${index}`} className="text-accent">
            {part}
          </span>
        );
      })}
    </span>
  );
}
