'use client'

import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: '𝙶' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: '𝚲' },
    { label: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
    { label: 'Email', href: 'mailto:contact@example.com', icon: '✉' },
  ]

  return (
    <footer className="relative bg-surface border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">Yash Patidar</h3>
            <p className="text-foreground-secondary text-sm">
              Full Stack Developer crafting modern, animated web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '#' },
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground-secondary hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-secondary hover:bg-primary/20 hover:text-primary transition-all duration-300 text-foreground-secondary"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/10 pt-8">
          <p className="text-center text-foreground-secondary text-sm">
            © {currentYear} Yash Patidar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
