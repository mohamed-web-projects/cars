"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I compare two cars side by side?",
    a: "Hit the Pin button on any featured ride or car segment — the compare drawer slides up from the bottom. Pin up to three cars, then open /compare to see their specs benchmarked in a grid.",
  },
  {
    q: "Where do the fuel prices in the calculator come from?",
    a: "The cost lab uses typical US-market pump rates (gasoline, diesel) and average home-charging electricity tariffs. It is an estimate for comparison, not a quote — slide the efficiency bar to simulate your own car.",
  },
  {
    q: "Can I search across the whole site from the navbar?",
    a: "Yes. Tap the search icon in the header, type a segment, fuel or part name and press Enter. You will land on the cars page with results already filtered.",
  },
  {
    q: "Are the technical specs accurate?",
    a: "Every segment, part and powertrain entry is cross-checked against automotive reference material and each card links to a full source for deeper reading.",
  },
  {
    q: "Does the site respect reduced-motion preferences?",
    a: "All scroll-triggered animations run once, are subtle, and are built with Framer Motion. We gate heavy marquees and decorative loops behind prefers-reduced-motion where it matters.",
  },
];

function FaqItem({
  faq,
  open,
  onToggle,
  index,
}: {
  faq: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors duration-300",
        open
          ? "border-primary/40 bg-surface-raised"
          : "border-line bg-surface-raised/60 hover:border-primary/25",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-3">
          <span className="hidden font-display text-sm text-primary sm:inline">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-heading text-base text-ink">{faq.q}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
            open ? "border-primary/40 text-primary" : "border-line text-ink-muted",
          )}
        >
          <ChevronDown size={15} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="border-t border-line px-5 py-4 text-sm leading-6 text-ink-muted">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Help desk
        </p>
        <h2 className="fluid-display mt-3 font-display uppercase text-ink">
          Frequently asked <span className="text-gradient">questions</span>
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}