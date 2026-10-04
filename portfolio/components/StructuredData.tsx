interface StructuredDataProps {
  data: Record<string, unknown>;
}

/** Render trusted, server-created schema.org data without leaving a literal tag boundary. */
export default function StructuredData({ data }: StructuredDataProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
