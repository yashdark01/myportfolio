interface TagProps {
  children: string;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="rounded-md border border-white/5 bg-surface-elevated px-2.5 py-1 font-mono text-xs text-text-muted">
      {children}
    </span>
  );
}
