"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Menu, Search, X, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Cars", href: "/cars" },
  { label: "Compare", href: "/compare" },
  { label: "Parts", href: "/parts" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setSearchOpen(false);
    setSearchQuery("");
    router.push(q ? `/cars?search=${encodeURIComponent(q)}` : "/cars");
  };

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-surface/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center gap-3 rounded-2xl px-3 sm:px-5 transition-all duration-500",
            scrolled
              ? "mx-3 border border-line bg-surface-raised py-2.5 shadow-lg shadow-black/10 lg:mx-auto lg:max-w-6xl"
              : "bg-transparent py-3",
          )}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-ink"
            aria-label="AutoVault home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-soft text-white shadow-glow transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <Car size={18} />
            </span>
            <span className="hidden font-display text-lg uppercase tracking-wider sm:inline">
              Auto<span className="text-gradient">Vault</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "nav-link rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      active
                        ? "active text-ink"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <Link
              href="/cars"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary-soft px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-95 sm:inline-flex"
            >
              Browse Cars
              <ChevronRight size={14} />
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setSearchOpen((open) => !open);
              }}
              aria-label="Toggle search"
              aria-expanded={searchOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-raised text-ink-muted transition-all duration-300 hover:scale-110 hover:text-primary"
            >
              {searchOpen ? <X size={16} /> : <Search size={16} />}
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-raised text-ink lg:hidden"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="glass mx-3 mt-2 rounded-2xl p-4 lg:hidden"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-ink"
                            : "text-ink-muted hover:bg-surface-subtle hover:text-ink",
                        )}
                      >
                        {link.label}
                        {active && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <Link
                href="/cars"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-soft px-4 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-95"
              >
                Browse Cars <ChevronRight size={14} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              role="search"
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mx-3 mt-2 flex items-center gap-2 rounded-2xl border border-line bg-surface-raised p-2 shadow-lg shadow-black/10 lg:mx-auto lg:max-w-2xl"
            >
              <Search size={16} className="ml-2 shrink-0 text-ink-muted" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
                placeholder="Search segments, fuels, parts…"
                aria-label="Global search"
                className="w-full min-w-0 bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-ink-muted"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gradient-to-r from-primary to-primary-soft px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110 active:scale-95"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                aria-label="Close search"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-muted transition-all hover:scale-110 hover:text-ink"
              >
                <X size={16} />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}