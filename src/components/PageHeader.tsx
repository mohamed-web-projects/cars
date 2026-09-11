"use client";

import { motion } from "framer-motion";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-36 sm:px-6 lg:px-8">
      <div className="bg-grid absolute inset-0 -z-20 opacity-50" aria-hidden="true" />
      <div
        className="absolute -top-24 left-1/2 -z-10 h-72 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </p>
        <h1 className="fluid-display mt-4 font-display uppercase text-ink">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">{description}</p>
      </motion.div>
    </section>
  );
}