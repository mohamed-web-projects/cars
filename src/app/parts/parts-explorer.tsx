"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Layers } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { carParts } from "@/data/carData";
import type { CarPart } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All parts" },
  { id: "engine", label: "Engine & Drivetrain" },
  { id: "electrical", label: "Electrical" },
  { id: "suspension", label: "Suspension" },
  { id: "brakes", label: "Brakes" },
  { id: "steering", label: "Steering" },
  { id: "exhaust", label: "Exhaust" },
  { id: "body", label: "Body" },
  { id: "interior", label: "Interior" },
  { id: "safety", label: "Safety" },
] as const;

const categoryLabels = Object.fromEntries(
  categories.map((c) => [c.id, c.label]),
) as Record<CarPart["category"], string>;

const categoryDotColors = {
  engine: "bg-red-500",
  electrical: "bg-amber-500",
  suspension: "bg-emerald-500",
  brakes: "bg-blue-500",
  steering: "bg-violet-500",
  exhaust: "bg-orange-500",
  body: "bg-sky-500",
  interior: "bg-pink-500",
  safety: "bg-teal-500",
} as const;

export function PartsExplorer() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]["id"]>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredParts = useMemo(() => {
    if (activeCategory === "all") return carParts;
    return carParts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <PageHeader
        eyebrow="Anatomy"
        title={
          <>
            Car parts <span className="text-gradient">catalog</span>
          </>
        }
        description="Browse every essential component — color-coded by system and mapped across 9 categories."
      />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Category filter */}
        <div className="-mx-1 mt-4 overflow-x-auto px-1 pb-2">
          <div className="flex min-w-max items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedId(null);
                }}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "border-transparent bg-gradient-to-r from-primary to-primary-soft text-white shadow-glow"
                    : "border-line bg-surface-raised text-ink-muted hover:text-ink",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="mt-4 text-xs uppercase tracking-widest text-ink-muted">
          {filteredParts.length} part{filteredParts.length === 1 ? "" : "s"} mapped
        </p>

        {/* Parts grid */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredParts.map((part, i) => {
            const categoryLabel = categoryLabels[part.category];
            return (
              <motion.button
                key={part.id}
                type="button"
                onClick={() => setSelectedId(selectedId === part.id ? null : part.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.2) }}
                aria-pressed={selectedId === part.id}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-line bg-surface-raised p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow",
                  selectedId === part.id && "border-primary/60 ring-2 ring-primary/30",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
                    <span className={cn("h-2 w-2 rounded-full", categoryDotColors[part.category])} />
                    {categoryLabel}
                  </span>
                  {part.link && (
                    <a
                      href={part.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Read more about ${part.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-all duration-300 hover:border-primary hover:text-primary sm:h-7 sm:w-7 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                <h3 className="mt-3 font-heading text-lg text-ink">{part.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-ink-muted">
                  {part.description}
                </p>

                <span
                  className={cn(
                    "mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300",
                    selectedId === part.id ? "text-primary" : "text-ink-muted group-hover:text-primary",
                  )}
                >
                  {selectedId === part.id ? "Selected" : "View detail"}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredParts.length === 0 && (
          <div className="glass mt-6 flex flex-col items-center justify-center rounded-3xl px-6 py-20 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Layers size={26} />
            </span>
            <h3 className="mt-4 font-heading text-xl text-ink">No parts found</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-ink-muted">
              Try a different category, or reset back to &ldquo;All parts&rdquo; to browse the full catalog.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className="mt-6 rounded-full bg-gradient-to-r from-primary to-primary-soft px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-95"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </>
  );
}