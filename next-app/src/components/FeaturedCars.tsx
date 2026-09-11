"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Gauge, Timer, Zap, RotateCw } from "lucide-react";
import { featuredCars } from "@/data/carData";
import { PinCarButton } from "@/components/CompareDrawer";
import { ShowcaseModal } from "@/components/ShowcaseModal";
import { StaggerGroup, StaggerItem } from "@/components/motion-primitives";
import type { FeaturedCar } from "@/lib/types";

const statIcon = (value: number, max: number, icon: React.ReactNode) => (
  <div className="flex flex-col items-center">
    <span className="text-ink-muted">{icon}</span>
    <span className="mt-1 font-display text-sm text-ink">{value}</span>
    <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-surface-subtle">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-primary-soft"
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  </div>
);

export function FeaturedCars() {
  const [preview, setPreview] = useState<FeaturedCar | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Signature lineup
          </p>
          <h2 className="fluid-display mt-3 font-display uppercase text-ink">
            Featured <span className="text-gradient">2026</span> rides
          </h2>
        </div>
        <Link
          href="/cars"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-muted transition-colors hover:text-primary"
        >
          View all cars
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredCars.map((car) => (
          <StaggerItem key={car.id}>
            <div className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Link href="/cars" aria-label={`Learn about ${car.brand} ${car.name}`}>
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cmVjdCB3aWR0aD0iMjAwJSIgaGVpZ2h0PSIyMDAlIiBmaWxsPSIjMTMxNTFmIi8+PC9zdmc+"
                  />
                </Link>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                  {car.brand}
                </span>

                <div className="absolute right-3 top-3">
                  <PinCarButton id={car.id} className="!py-1.5 !px-3" />
                </div>

                <button
                  type="button"
                  onClick={() => setPreview(car)}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white opacity-0 backdrop-blur transition-all duration-300 hover:bg-white/30 group-hover:opacity-100 focus:opacity-100 active:scale-95"
                >
                  <RotateCw size={13} />
                  360 view
                </button>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-heading text-lg text-ink">{car.name}</h3>
                  <span className="whitespace-nowrap text-xs text-ink-muted">
                    {car.year}
                  </span>
                </div>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-ink-muted">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(car.price)}
                </p>

                <div className="mt-5 flex items-start justify-between border-t border-line pt-5">
                  {statIcon(car.horsepower, 1100, <Zap size={14} />)}
                  {statIcon(Math.round(car.topSpeed), 400, <Gauge size={14} />)}
                  {statIcon(100 - Math.round(car.acceleration * 20), 100, <Timer size={14} />)}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <AnimatePresence>
        {preview && (
          <ShowcaseModal car={preview} onClose={() => setPreview(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}