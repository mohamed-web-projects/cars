"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Fuel, Leaf, Zap, Calculator, type LucideIcon } from "lucide-react";
import type { FuelType } from "@/lib/types";
import { Reveal } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

interface FuelConfig {
  icon: LucideIcon;
  unit: string;
  consumption: number;
  price: number;
  priceUnit: string;
  sliderMin: number;
  sliderMax: number;
  sliderStep: number;
  co2PerUnit: number;
}

const configs: Record<FuelType, FuelConfig> = {
  petrol: {
    icon: Flame,
    unit: "L / 100 km",
    consumption: 7.5,
    price: 1.15,
    priceUnit: "/ L",
    sliderMin: 4,
    sliderMax: 16,
    sliderStep: 0.1,
    co2PerUnit: 2.31,
  },
  diesel: {
    icon: Fuel,
    unit: "L / 100 km",
    consumption: 6.2,
    price: 0.99,
    priceUnit: "/ L",
    sliderMin: 3,
    sliderMax: 14,
    sliderStep: 0.1,
    co2PerUnit: 2.68,
  },
  hybrid: {
    icon: Leaf,
    unit: "L / 100 km",
    consumption: 4.5,
    price: 1.15,
    priceUnit: "/ L",
    sliderMin: 2,
    sliderMax: 12,
    sliderStep: 0.1,
    co2PerUnit: 2.31,
  },
  electric: {
    icon: Zap,
    unit: "kWh / 100 km",
    consumption: 17,
    price: 0.16,
    priceUnit: "/ kWh",
    sliderMin: 10,
    sliderMax: 30,
    sliderStep: 0.5,
    co2PerUnit: 0,
  },
};

const fuelLabels: Record<FuelType, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Electric",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface-raised p-4 text-center">
      <dt className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
        {label}
      </dt>
      <motion.dd
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-2 font-display text-2xl text-ink"
      >
        {value}
      </motion.dd>
      <dd className="mt-1 text-xs text-ink-muted">{sub}</dd>
    </div>
  );
}

export function FuelCalculator() {
  const [fuel, setFuel] = useState<FuelType>("petrol");
  const [dailyKm, setDailyKm] = useState(40);
  const [consumption, setConsumption] = useState(configs.petrol.consumption);

  const config = configs[fuel];
  const Icon = config.icon;

  const switchFuel = (next: FuelType) => {
    setFuel(next);
    setConsumption(configs[next].consumption);
  };

  const consumedDaily = (dailyKm / 100) * consumption;
  const dailyCost = consumedDaily * config.price;
  const monthlyCost = dailyCost * 30;
  const annualCost = dailyCost * 365;
  const dailyCo2 = dailyKm * (config.co2PerUnit * (consumption / 100));

  return (
    <section className="border-t border-line bg-surface-subtle/60">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Calculator size={14} /> Cost lab
          </p>
          <h2 className="fluid-display mt-3 font-display uppercase text-ink">
            Fuel & charging{" "}
            <span className="text-gradient">calculator</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Estimate your daily, monthly and yearly running costs based on how
            far you drive and what powers the car.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass mx-auto max-w-4xl rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(configs) as FuelType[]).map((key) => {
                const Cfg = configs[key];
                const ActiveIcon = Cfg.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => switchFuel(key)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-all duration-300 active:scale-95",
                      fuel === key
                        ? "border-transparent bg-gradient-to-r from-primary to-primary-soft text-white shadow-glow"
                        : "border-line bg-surface-raised text-ink-muted hover:text-ink",
                    )}
                  >
                    <ActiveIcon size={15} />
                    {fuelLabels[key]}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <label htmlFor="calc-km" className="font-semibold text-ink">
                    Daily distance
                  </label>
                  <span className="font-display text-lg text-primary">
                    {dailyKm} km
                  </span>
                </div>
                <input
                  id="calc-km"
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={dailyKm}
                  onChange={(e) => setDailyKm(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />

                <div className="mb-2 mt-8 flex items-center justify-between text-sm">
                  <label htmlFor="calc-consumption" className="font-semibold text-ink">
                    Consumption <span className="text-xs font-normal text-ink-muted">({config.unit})</span>
                  </label>
                  <span className="font-display text-lg text-primary">
                    {consumption.toFixed(1)}
                  </span>
                </div>
                <input
                  id="calc-consumption"
                  type="range"
                  min={config.sliderMin}
                  max={config.sliderMax}
                  step={config.sliderStep}
                  value={consumption}
                  onChange={(e) => setConsumption(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
                <p className="mt-2 text-xs text-ink-muted">
                  Current price ≈ {config.price} {config.priceUnit} · adjusting
                  the slider lets you simulate a different car in the same class.
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-3 content-start">
                <Stat label="Daily" value={currency.format(dailyCost)} sub={`${consumedDaily.toFixed(2)} ${fuel === "electric" ? "kWh" : "L"} / day`} />
                <Stat label="Monthly" value={currency.format(monthlyCost)} sub="30 days" />
                <Stat label="Yearly" value={currency.format(annualCost)} sub="365 days" />
                <Stat
                  label="Tailpipe CO₂"
                  value={dailyCo2 > 0 ? `${dailyCo2.toFixed(2)} kg` : "0 g"}
                  sub={dailyCo2 > 0 ? "per day" : "zero-emission"}
                />
              </dl>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface-raised/60 p-4 text-sm text-ink-muted">
              <Icon size={18} className="mt-0.5 shrink-0 text-primary" />
              <p>
                {fuel === "electric"
                  ? "Home charging averages are assumed. Public fast-charging can raise the effective price per kWh by 2–3× depending on tariff."
                  : "Prices assume typical US-market pump averages. Actual costs vary by region, driving style and traffic conditions."}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}