"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Car, ExternalLink, Search, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PinCarButton } from "@/components/CompareDrawer";
import { carSegments } from "@/data/carData";
import type { CarSegmentType } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: Array<{ label: string; value: CarSegmentType | "all" }> = [
  { label: "All", value: "all" },
  ...carSegments.map((s) => ({
    label: s.name,
    value: s.id as CarSegmentType,
  })),
];

export function CarsBrowser({ initialQuery }: { initialQuery: string }) {
  const [activeFilter, setActiveFilter] = useState<CarSegmentType | "all">("all");
  const [query, setQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    return carSegments.filter((segment) => {
      const matchesFilter = activeFilter === "all" || segment.id === activeFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        segment.name.toLowerCase().includes(q) ||
        segment.subtitle.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <>
      <PageHeader
        eyebrow="Inventory"
        title={
          <>
            Car <span className="text-gradient">Segments</span>
          </>
        }
        description="Ten body styles, ten stories. Filter by segment or search across the encyclopedia."
      />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="glass mb-10 rounded-2xl p-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search segments…"
                aria-label="Search car segments"
                className="w-full rounded-full border border-line bg-surface-raised py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-primary/60"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted lg:order-first lg:pl-2">
              <SlidersHorizontal size={14} />
              Filter
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActiveFilter(f.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium capitalize transition-all duration-300",
                    activeFilter === f.value
                      ? "bg-gradient-to-r from-primary to-primary-soft text-white shadow-glow"
                      : "border border-line bg-surface-raised text-ink-muted hover:text-ink",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="glass flex flex-col items-center rounded-3xl py-24 text-center">
            <Car size={40} className="text-ink-muted" />
            <p className="mt-4 font-heading text-lg text-ink">No matches found</p>
            <p className="mt-1 text-sm text-ink-muted">
              Try a different search or clear the filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((segment) => (
                <motion.article
                  key={segment.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group glass flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={segment.image}
                      alt={segment.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute right-3 top-3">
                      <PinCarButton id={segment.id} />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h2 className="font-display text-2xl uppercase text-white">
                        {segment.name}
                      </h2>
                      <p className="text-sm text-white/80">{segment.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="flex-1 text-sm leading-6 text-ink-muted">
                      {segment.description}
                    </p>

                    <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5 text-center">
                      {[
                        { label: "Drive", value: segment.driveType },
                        { label: "Seats", value: segment.passengerCapacity },
                        { label: "Consumption", value: segment.typicalFuelConsumption },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <dt className="text-[11px] uppercase tracking-wider text-ink-muted">
                            {stat.label}
                          </dt>
                          <dd className="mt-1 text-sm font-semibold text-ink">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="min-w-0 flex-1 truncate text-xs text-ink-muted">
                        Invented {segment.year} ·{" "}
                        <span className="text-ink">{segment.inventor}</span>
                      </span>
                      <a
                        href={segment.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                        style={{
                          background: "linear-gradient(90deg,#e11d1d,#ef4444)",
                        }}
                      >
                        Learn more
                        <ExternalLink size={13} className="shrink-0" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-primary hover:text-primary"
          >
            Ready to compare specs? Open the comparison tool
          </Link>
        </div>
      </div>
    </>
  );
}