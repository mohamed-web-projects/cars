"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Pin, PinOff, X } from "lucide-react";
import { useCompare } from "@/lib/compare-context";
import { carSegments, featuredCars } from "@/data/carData";
import { cn } from "@/lib/utils";

const catalog = [...featuredCars, ...carSegments];

function lookup(id: string) {
  return catalog.find((item) => item.id === id);
}

export function CompareDrawer() {
  const { carIds, clear, togglePin, max } = useCompare();
  const open = carIds.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl overflow-x-hidden px-4 pb-4"
        >
          <div className="glass rounded-3xl p-3 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between gap-3 px-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                Compare bench · {carIds.length}/{max}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clear}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:text-ink"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1">
              <AnimatePresence initial={false}>
                {carIds.map((id) => {
                  const car = lookup(id);
                  if (!car) return null;
                  return (
                    <motion.div
                      key={id}
                      layout
                      initial={{ opacity: 0, scale: 0.85, x: -8 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="relative flex shrink-0 items-center gap-2.5 rounded-2xl border border-line bg-surface-raised py-1.5 pl-1.5 pr-8"
                    >
                    <Image
                      src={car.image}
                      alt={car.name}
                      width={48}
                      height={36}
                      className="h-9 w-12 rounded-xl object-cover"
                    />
                    <div className="leading-tight">
                      <p className="max-w-[110px] truncate text-sm font-semibold text-ink">
                        {car.name}
                      </p>
                      {"brand" in car && car.brand ? (
                        <p className="text-[11px] uppercase tracking-wider text-ink-muted">
                          {car.brand}
                        </p>
                      ) : (
                        <p className="text-[11px] uppercase tracking-wider text-ink-muted">
                          Segment
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePin(id)}
                      aria-label={`Remove ${car.name} from comparison`}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
                    >
                      <X size={13} />
                    </button>
                  </motion.div>
                );
              })}
              </AnimatePresence>

              <Link
                href={`/compare?cars=${carIds.join(",")}`}
                className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary-soft px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110 active:scale-95"
              >
                Compare
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PinCarButton({ id, className }: { id: string; className?: string }) {
  const { isPinned, togglePin } = useCompare();
  const pinned = isPinned(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePin(id);
      }}
      aria-pressed={pinned}
      aria-label={pinned ? "Remove from comparison" : "Add to comparison"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold backdrop-blur transition-all duration-300 hover:scale-[1.04] active:scale-95",
        pinned
          ? "border-transparent bg-gradient-to-r from-primary to-primary-soft text-white shadow-glow"
          : "border-line bg-surface-raised/70 text-ink-muted hover:border-primary/50 hover:text-primary",
        className,
      )}
    >
      <motion.span
        key={pinned ? "pinned" : "unpinned"}
        initial={{ scale: 0.4, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 24 }}
        className="grid place-items-center"
      >
        {pinned ? <PinOff size={13} /> : <Pin size={13} />}
      </motion.span>
      <span className="whitespace-nowrap">{pinned ? "Pinned" : "Pin to compare"}</span>
    </button>
  );
}