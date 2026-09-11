import Link from "next/link";
import {
  Car,
  Scale,
  Gauge,
  Flag,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { quickTools } from "@/data/carData";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  car: Car,
  scale: Scale,
  gears: Gauge,
  flag: Flag,
};

const accentMap: Record<string, string> = {
  red: "from-red-500/20 to-red-500/5 text-red-500",
  blue: "from-blue-500/20 to-blue-500/5 text-blue-500",
  emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-500",
  amber: "from-amber-500/20 to-amber-500/5 text-amber-500",
};

export function QuickTools() {
  return (
    <section className="border-y border-line bg-surface-subtle/60">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Tools
          </p>
          <h2 className="fluid-display mt-3 font-display uppercase text-ink">
            Cut straight to the <span className="text-gradient">garage</span>
          </h2>
        </Reveal>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickTools.map((tool) => {
            const Icon = iconMap[tool.icon];
            return (
              <StaggerItem key={tool.id}>
                <Link
                  href={tool.href}
                  className="group glass relative block overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
                >
                  <div
                    className={cn(
                      "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br",
                      accentMap[tool.accent],
                    )}
                  >
                    {Icon ? <Icon size={22} /> : null}
                  </div>
                  <h3 className="font-heading text-base text-ink">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    {tool.description}
                  </p>
                  <span className="absolute right-5 top-6 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:-rotate-45"
                    />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}