import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/motion-primitives";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "AutoVault is a 2026-grade automotive encyclopedia built by Mohamed Wahib.",
};

const values = [
  {
    title: "Accuracy first",
    text: "Every segment, part and spec is fact-checked against automotive reference material.",
  },
  {
    title: "Open data",
    text: "All content is available free and open — because car knowledge belongs to everyone.",
  },
  {
    title: "Performance minded",
    text: "A 2026 app shell: edge renders, zero-CLS images and motion that respects reduced-motion.",
  },
];

const milestones = [
  { year: "2024", text: "Project starts as a static Bootstrap experiment." },
  { year: "2025", text: "Refactored to Next.js with TypeScript and Tailwind." },
  { year: "2026", text: "Rebuilt as a multi-page platform with 2026 design language." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Driven by <span className="text-gradient">curiosity</span>
          </>
        }
        description="AutoVault began as a simple car encyclopedia and evolved into a modern, interactive automotive platform."
      />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Story */}
          <Reveal>
            <section className="glass h-full rounded-3xl p-8">
              <h2 className="fluid-section font-display uppercase text-ink">The story</h2>
              <p className="mt-4 leading-7 text-ink-muted">
                What started as a single-page Bootstrap template about car
                segments grew into something bigger: a high-end platform that
                treats automotive knowledge like a product. From the mechanics of
                a 4x4 to the thermodynamics of a diesel engine, every section is
                designed to teach.
              </p>
              <p className="mt-4 leading-7 text-ink-muted">
                The 2026 rebuild brings glassmorphic surfaces, fluid typography,
                dark/light themes and interactive tools — built with Next.js App
                Router, TypeScript, Tailwind CSS and Framer Motion.
              </p>
            </section>
          </Reveal>

          {/* Values */}
          <Reveal delay={0.1}>
            <section className="glass h-full rounded-3xl p-8">
              <h2 className="fluid-section font-display uppercase text-ink">What we value</h2>
              <ul className="mt-5 space-y-5">
                {values.map((v) => (
                  <li key={v.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-soft">
                      <Check size={15} className="text-white" />
                    </span>
                    <div>
                      <h3 className="font-heading text-base text-ink">{v.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-muted">{v.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        {/* Timeline */}
        <Reveal delay={0.05}>
          <section className="glass mt-8 rounded-3xl p-8">
            <h2 className="fluid-section font-display uppercase text-ink">Milestones</h2>
            <ol className="mt-8 space-y-8 border-l-2 border-line pl-8">
              {milestones.map((m) => (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-surface shadow-glow" />
                  <span className="font-display text-lg text-gradient">{m.year}</span>
                  <p className="mt-1 text-ink-muted">{m.text}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      </div>
    </>
  );
}