"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Lina Marzouk",
    role: "EV owner · Cairo",
    rating: 5,
    quote:
      "The fuel calculator sold me. I ran my daily commute through it before switching to electric and the monthly estimate was spot on.",
  },
  {
    name: "Omar Haddad",
    role: "Mechanic · Alexandria",
    rating: 5,
    quote:
      "The parts catalog is a cheat sheet for my students. Color-coded systems and source links make every lesson easier to explain.",
  },
  {
    name: "Sara El-Tayeb",
    role: "Auto journalist",
    rating: 5,
    quote:
      "Finally a car encyclopedia that feels like a 2026 product. The compare bench and lightbox previews are genuinely useful, not decoration.",
  },
  {
    name: "Karim Ashraf",
    role: "Fleet manager · Giza",
    rating: 4,
    quote:
      "Pin two SUVs and a van, compare their consumption side by side, then budget the fleet — that workflow saved me hours.",
  },
  {
    name: "Dina Fouad",
    role: "Student researcher",
    rating: 4,
    quote:
      "I used the testimonial filter-heavy sources for my thesis. Clean design, zero clutter, facts with citations.",
  },
  {
    name: "Youssef Nabil",
    role: "Enthusiast",
    rating: 3,
    quote:
      "Solid reference tool. I would love to see a garage/wishlist feature for marked favourites next.",
  },
];

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "fill-amber-400 text-amber-400" : "text-line"}
        />
      ))}
    </span>
  );
}

export function Testimonials() {
  const [filter, setFilter] = useState<number | "all">("all");

  const filtered = useMemo(
    () =>
      filter === "all" ? testimonials : testimonials.filter((t) => t.rating >= filter),
    [filter],
  );

  const filters: Array<{ value: number | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: 5, label: "5★" },
    { value: 4, label: "4★+" },
    { value: 3, label: "3★+" },
  ];

  return (
    <section className="border-y border-line bg-surface-subtle/60">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Community
          </p>
          <h2 className="fluid-display mt-3 font-display uppercase text-ink">
            From the <span className="text-gradient">garage</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Mechanics, journalists, owners and students — what the community says
            about AutoVault.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {filters.map((f) => (
              <button
                key={String(f.value)}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                  filter === f.value
                    ? "border-transparent bg-gradient-to-r from-primary to-primary-soft text-white shadow-glow"
                    : "border-line bg-surface-raised text-ink-muted hover:text-ink",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.24) }}
              className="glass flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow"
            >
              <Quote size={22} className="text-primary/40" />
              <blockquote className="mt-4 flex-1 text-sm leading-6 text-ink-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <p className="font-heading text-sm text-ink">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </div>
                <Stars rating={t.rating} />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}