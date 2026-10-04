import Link from "next/link";
import EditorialPage from "@/components/motion/EditorialPage";

export default function NotFound() {
  return (
    <EditorialPage label="Page not found">
      <div className="site-shell flex min-h-[100svh] items-center py-24">
        <div className="max-w-4xl">
          <p className="section-label text-accent">404 / Off the map</p>
          <h1 className="editorial-page-title mt-5 text-5xl font-semibold md:text-7xl">
            This route doesn’t exist.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
            The work is still here. Return to the portfolio or jump directly to
            the selected case studies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-lg border border-accent bg-accent px-5 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
            >
              Back home →
            </Link>
            <Link
              href="/#work"
              className="inline-flex min-h-11 items-center rounded-lg border border-white/10 px-5 text-sm font-medium text-text-primary transition-colors hover:border-white/20 hover:bg-white/5"
            >
              Explore work
            </Link>
          </div>
        </div>
      </div>
    </EditorialPage>
  );
}
