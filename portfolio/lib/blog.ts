const WORDS_PER_MINUTE = 200;

type ReadableSection = {
  content: string;
  bullets?: string[];
  code?: { code: string }[];
};

export function countWords(sections: ReadableSection[], excerpt = ""): number {
  const text = [
    excerpt,
    ...sections.flatMap((s) => [
      s.content,
      ...(s.bullets ?? []),
      ...(s.code?.map((block) => block.code) ?? []),
    ]),
  ].join(" ");

  return text.split(/\s+/).filter(Boolean).length;
}

export function formatReadTime(wordCount: number): string {
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export function getReadTime(sections: ReadableSection[], excerpt = ""): string {
  return formatReadTime(countWords(sections, excerpt));
}
