"use client";

import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FacebookIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.015 8h5V23h-5V8zm7.985 0h4.78v2.05h.068c.665-1.26 2.29-2.587 4.712-2.587 5.04 0 5.972 3.318 5.972 7.63V23h-5v-7.09c0-1.692-.03-3.875-2.36-3.875-2.365 0-2.725 1.844-2.725 3.75V23h-5V8z" />
  </svg>
);

const GithubIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Car Segments", href: "/cars" },
      { label: "Compare Fuels", href: "/compare" },
      { label: "Parts Visualizer", href: "/parts" },
      { label: "Brands", href: "/#brands" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/about#faq" },
      { label: "Privacy", href: "/about#privacy" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/1Ahu5eDfoy/?mibextid=wwXIfr", icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/mohamed.wheeb.22/", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-wahib-77b341260", icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/alarab22", icon: GithubIcon },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(2,1fr)_1.4fr]">
          {/* Brand + newsletter */}
          <div>
            <p className="font-display text-xl uppercase tracking-wider text-ink">
              Auto<span className="text-gradient">Vault</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-muted">
              The modern automotive encyclopedia. Segments, specs, parts and
              fuel intelligence — engineered for enthusiasts.
            </p>
            <form
              className="mt-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                htmlFor="newsletter"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-muted"
              >
                Stay in the driver&apos;s seat
              </label>
              <div className="flex overflow-hidden rounded-full border border-line bg-surface-raised focus-within:ring-2 focus-within:ring-primary/50">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-muted"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex items-center gap-1 bg-gradient-to-r from-primary to-primary-soft px-4 text-white transition-all hover:brightness-110 active:scale-95"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact + socials */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink">
              Get in touch
            </h3>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-primary" /> +1 (555) 010-2026
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-primary" /> hello@autovault.dev
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="text-primary" /> Detroit, MI, USA
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    "border border-line bg-surface-raised text-ink-muted",
                    "transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary",
                  )}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="text-sm text-ink-muted">
            &copy; {new Date().getFullYear()} Mohamed Wahib. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-ink-muted">
            Made with <Heart size={14} className="fill-primary text-primary" /> in
            <span className="text-ink">every garage</span>
          </p>
        </div>
      </div>
    </footer>
  );
}