"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Zap, Gauge, Timer } from "lucide-react";
import type { FeaturedCar } from "@/lib/types";

const fuelLabel: Record<FeaturedCar["fuelType"], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  electric: "Electric",
  hybrid: "Hybrid",
};

export function ShowcaseModal({
  car,
  onClose,
}: {
  car: FeaturedCar;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const stats = [
    { icon: Zap, label: "Horsepower", value: `${car.horsepower} hp` },
    { icon: Timer, label: "0–100 km/h", value: `${car.acceleration.toFixed(1)} s` },
    { icon: Gauge, label: "Top speed", value: `${car.topSpeed} km/h` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${car.brand} ${car.name} showcase`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="glass relative w-full max-w-3xl overflow-hidden rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close showcase"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-all hover:scale-110 hover:bg-black/70"
        >
          <X size={17} />
        </button>

        {/* 360 preview stage */}
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-subtle">
          <motion.div
            animate={{ x: ["-2.5%", "2.5%", "-2.5%"], scale: 1.12 }}
            transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
            className="relative h-full w-[107%]"
          >
            <Image
              src={car.image}
              alt={`360 preview of ${car.brand} ${car.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <div className="text-white">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
                360° preview
              </span>
              <h3 className="mt-2 font-display text-3xl uppercase drop-shadow">
                {car.name}
              </h3>
              <p className="text-sm text-white/80">
                {car.brand} · {car.year} · {fuelLabel[car.fuelType]}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border border-line bg-surface-raised p-4 text-center"
              >
                <stat.icon size={17} className="text-primary" />
                <span className="mt-2 font-display text-xl text-ink">
                  {stat.value}
                </span>
                <span className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-line bg-surface-raised/60 px-5 py-4">
            <span className="text-xs uppercase tracking-widest text-ink-muted">
              Starting price
            </span>
            <span className="font-display text-2xl text-gradient">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(car.price)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}