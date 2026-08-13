import { site, socialLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/5 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))] md:pb-8"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="mt-1 font-mono text-xs text-text-muted">
            Built with Next.js · Tailwind CSS
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            Resume ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
