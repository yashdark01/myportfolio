import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-text-muted md:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="font-mono text-xs">Built with Next.js · Tailwind CSS</p>
      </div>
    </footer>
  );
}
