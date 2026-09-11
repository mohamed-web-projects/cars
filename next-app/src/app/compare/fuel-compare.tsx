"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Flame,
  Fuel,
  Zap,
  Leaf,
} from "lucide-react";
import { fuelTypes } from "@/data/carData";
import type { FuelType } from "@/lib/types";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

interface FuelMetric {
  icon: LucideIcon;
  color: string;
  efficiency: number;
  torque: number;
  cost: number;
  emissions: number;
  range: number;
}

const fuelMeta: Record<FuelType, FuelMetric> = {
  petrol: {
    icon: Flame,
    color: "from-red-500/25 to-red-500/5 text-red-500",
    efficiency: 62,
    torque: 70,
    cost: 68,
    emissions: 42,
    range: 75,
  },
  diesel: {
    icon: Fuel,
    color: "from-amber-500/25 to-amber-500/5 text-amber-600 dark:text-amber-500",
    efficiency: 85,
    torque: 95,
    cost: 55,
    emissions: 58,
    range: 88,
  },
  electric: {
    icon: Zap,
    color: "from-emerald-500/25 to-emerald-500/5 text-emerald-500",
    efficiency: 90,
    torque: 100,
    cost: 90,
    emissions: 100,
    range: 62,
  },
  hybrid: {
    icon: Leaf,
    color: "from-sky-500/25 to-sky-500/5 text-sky-500",
    efficiency: 78,
    torque: 82,
    cost: 72,
    emissions: 76,
    range: 80,
  },
};

type MetricKey = "efficiency" | "torque" | "cost" | "emissions" | "range";

const metricLabels: Array<{ key: MetricKey; label: string }> = [
  { key: "efficiency", label: "Efficiency" },
  { key: "torque", label: "Torque feel" },
  { key: "cost", label: "Running cost" },
  { key: "emissions", label: "Environmental" },
  { key: "range", label: "Range / refuel" },
];

export function FuelCompare() {
  const [left, setLeft] = useState<FuelType>("petrol");
  const [right, setRight] = useState<FuelType>("electric");

  const leftData = fuelTypes.find((f) => f.id === left)!;
  const rightData = fuelTypes.find((f) => f.id === right)!;
  const leftMeta = fuelMeta[left];
  const rightMeta = fuelMeta[right];

  const winner = useMemo(() => {
    const leftScore = Object.keys(metricLabels).reduce(
      (acc, _, i) => acc + leftMeta[metricLabels[i].key],
      0,
    );
    const rightScore = Object.keys(metricLabels).reduce(
      (acc, _, i) => acc + rightMeta[metricLabels[i].key],
      0,
    );
    return leftScore === rightScore ? null : leftScore > rightScore ? left : right;
  }, [left, right, leftMeta, rightMeta]);

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-12 pt-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Powertrains
          </p>
          <h2 className="fluid-display mt-3 font-display uppercase text-ink">
            Fuels & <span className="text-gradient">specs</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Pick two powertrains and settle the debate — efficiency, torque,
            running cost and eco-credentials.
          </p>
        </div>
        {/* Pickers */}
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <FuelPicker value={left} onChange={setLeft} align="left" />
          <div className="hidden text-center lg:block">
            <span className="font-display text-3xl text-gradient">vs</span>
          </div>
          <FuelPicker value={right} onChange={setRight} align="right" />
        </div>

        {/* Metric bars */}
        <div className="glass mt-10 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-3 items-end gap-4 pb-6">
            <h3 className="font-heading text-sm text-ink lg:text-base">{leftData.title}</h3>
            <p className="hidden text-center text-xs uppercase tracking-widest text-ink-muted sm:block">
              Score
            </p>
            <h3
              className={cn(
                "text-right font-heading text-sm text-ink lg:text-base",
                right === winner && "text-primary",
              )}
            >
              {rightData.title}
            </h3>
          </div>

          <div className="space-y-5">
            {metricLabels.map((metric) => {
              const lValue = leftMeta[metric.key];
              const rValue = rightMeta[metric.key];
              const lWins = lValue > rValue;
              const rWins = rValue > lValue;
              return (
                <div key={metric.key}>
                  <div className="mb-1.5 flex items-center justify-between text-xs uppercase tracking-wider text-ink-muted">
                    <span className={cn(lWins && "font-semibold text-ink")}>
                      {metric.label}
                      {lWins && <Check size={12} className="ml-1 inline text-emerald-500" />}
                    </span>
                    <span className={cn(rWins && "font-semibold text-ink")}>
                      {rWins && <Check size={12} className="mr-1 inline text-emerald-500" />}
                      {metric.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <motion.div
                        className="h-2.5 rounded-full bg-gradient-to-r from-primary to-primary-soft"
                        initial={{ width: 0 }}
                        animate={{ width: `${lValue}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <span className="w-9 text-xs font-semibold text-ink">{lValue}</span>
                    <span className="w-9 text-right text-xs font-semibold text-ink">{rValue}</span>
                    <div className="flex-1">
                      <motion.div
                        className="ml-auto h-2.5 rounded-full bg-gradient-to-l from-sky-500 to-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${rValue}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-surface-subtle/60 p-5">
            {winner ? (
              <p className="text-center text-sm text-ink-muted">
                <span className="font-semibold text-ink">
                  {winner === left ? leftData.title : rightData.title}
                </span>{" "}
                edges ahead on this metric set — but there&apos;s no universal
                best. It depends on how you drive.
              </p>
            ) : (
              <p className="text-center text-sm text-ink-muted">
                These two are perfectly matched. Choose on feel and lifestyle.
              </p>
            )}
          </div>
        </div>

        {/* Detached detail cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <DetailCard data={leftData} color="from-primary/10 to-primary/0 border-primary/30" left />
          <DetailCard data={rightData} color="from-sky-500/10 to-sky-500/0 border-sky-500/30" />
        </div>
      </div>
    </section>
  );
}

function FuelPicker({
  value,
  onChange,
  align,
}: {
  value: FuelType;
  onChange: (f: FuelType) => void;
  align: "left" | "right";
}) {
  return (
    <div className="glass rounded-3xl p-4">
      <p className={cn("mb-3 text-xs font-semibold uppercase tracking-widest text-ink-muted", align === "right" && "text-right")}>
        {align === "left" ? "Choose A" : "Choose B"}
      </p>
      <div className={cn("flex flex-wrap gap-2", align === "right" && "justify-end")}>
        {fuelTypes.map((fuel) => {
          const Icon = fuelMeta[fuel.id].icon;
          const active = value === fuel.id;
          return (
            <button
              key={fuel.id}
              type="button"
              onClick={() => onChange(fuel.id)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium capitalize transition-all duration-300",
                active
                  ? "border-transparent bg-gradient-to-r from-primary to-primary-soft text-white shadow-glow"
                  : "border-line bg-surface-raised text-ink-muted hover:text-ink",
              )}
            >
              <Icon size={15} /> {fuel.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DetailCard({
  data,
  color,
  left,
}: {
  data: (typeof fuelTypes)[number];
  color: string;
  left?: boolean;
}) {
  const Icon = fuelMeta[data.id].icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "glass rounded-3xl border bg-gradient-to-b p-6",
        color,
        left ? "border-r-2" : "border-l-2",
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br", fuelMeta[data.id].color)}>
          <Icon size={22} />
        </span>
        <div>
          <h3 className="font-heading text-lg text-ink">{data.title}</h3>
          <p className="text-xs uppercase tracking-widest text-ink-muted">{data.tagline}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-muted">{data.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Pros
          </p>
          <ul className="space-y-1.5">
            {data.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-1.5 text-sm text-ink-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
            Cons
          </p>
          <ul className="space-y-1.5">
            {data.cons.map((con) => (
              <li key={con} className="flex items-start gap-1.5 text-sm text-ink-muted">
                <X size={14} className="mt-0.5 shrink-0 text-red-500" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}