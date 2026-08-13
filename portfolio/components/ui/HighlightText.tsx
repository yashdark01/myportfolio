function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightText({
  text,
  terms,
  className = "",
}: {
  text: string;
  terms: readonly string[];
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
      {parts.map((part, index) =>
        termSet.has(part) ? (
          <span key={`${part}-${index}`} className="text-accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
}
