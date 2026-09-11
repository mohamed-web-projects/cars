"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16 lg:pt-36">
      {/* Ambient background */}
      <div className="bg-grid absolute inset-0 -z-20 opacity-60" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/30 via-primary-soft/20 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 -z-10 h-[360px] w-[360px] rounded-full bg-gradient-to-tl from-blue-500/20 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div
            variants={item}
            className="glass-subtle inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink-muted"
          >
            <Sparkles size={13} className="text-primary" />
            The 2026 Automotive Encyclopedia
          </motion.div>

          <motion.h1
            variants={item}
            className="fluid-hero mt-6 font-display uppercase text-ink"
          >
            Everything you want to know about{" "}
            <span className="text-gradient">cars</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-8 text-ink-muted"
          >
            Explore every segment, compare fuels and specs, and visualize the
            anatomy of modern vehicles — engineered for enthusiasts in 2026.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/cars"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-soft px-7 py-3.5 font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-95"
            >
              Explore the Inventory
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-7 py-3.5 font-semibold text-ink transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Compare Fuels
            </Link>
          </motion.div>

          {/* Quick stat strip */}
          <motion.div
            variants={item}
            className="mt-14 grid max-w-xl grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface-raised/60 backdrop-blur"
          >
            {[
              { value: "10", label: "Segments" },
              { value: "48", label: "Parts mapped" },
              { value: "26", label: "Brands" },
            ].map((stat) => (
              <div key={stat.label} className="px-4 py-4 text-center">
                <p className="font-display text-2xl text-ink sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-ink-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-muted"
        aria-hidden="true"
      >
        <ChevronDown size={22} />
      </motion.div>
    </section>
  );
}