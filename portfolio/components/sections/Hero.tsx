import Badge from "@/components/ui/Badge";
import HighlightText from "@/components/ui/HighlightText";
import HeroClient from "@/components/sections/HeroClient";
import { personas, site } from "@/data/site";
import {
  heroHighlights,
  heroLinkedTerms,
} from "@/lib/hero-content";

export default function Hero() {
  const productTagline = (
    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted">
      <HighlightText
        text={personas.product.tagline}
        terms={heroHighlights.product}
        linkedTerms={heroLinkedTerms}
      />
    </p>
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center pt-[calc(4.5rem+env(safe-area-inset-top))]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Badge variant="accent">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {site.status}
          </Badge>
          <span className="text-sm leading-relaxed text-text-muted">
            Recently shipped:{" "}
            <a
              href="https://krashaq-agritech.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary transition-colors hover:text-accent"
            >
              {site.recentlyShipped}
            </a>
          </span>
        </div>

        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
            {site.name}
          </h1>
          <p className="mt-4 text-lg text-text-muted sm:text-xl md:text-2xl">
            <HighlightText
              text={site.title}
              terms={heroHighlights.title}
              linkedTerms={heroLinkedTerms}
            />
          </p>
          <p className="mt-2 font-mono text-sm text-text-muted">
            <HighlightText
              text={site.institution}
              terms={heroHighlights.institution}
            />
            <span className="text-text-muted"> · </span>
            <span className="text-accent/90">{site.yearsExperience}</span>
          </p>
        </div>

        <HeroClient productTagline={productTagline} />
      </div>
    </section>
  );
}
