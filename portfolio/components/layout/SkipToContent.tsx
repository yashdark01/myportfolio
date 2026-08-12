import SectionLink from "@/components/ui/SectionLink";

export default function SkipToContent() {
  return (
    <SectionLink
      sectionId="hero"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
    >
      Skip to content
    </SectionLink>
  );
}
