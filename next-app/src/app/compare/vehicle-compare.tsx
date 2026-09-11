"use client";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Pin, PinOff, Scale } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import {
  getSeededSnapshot,
  seedCompareIds,
  subscribe,
  useCompare,
} from "@/lib/compare-context";
import { carSegments, featuredCars } from "@/data/carData";
import type { FeaturedCar, CarSegment } from "@/lib/types";
import { Reveal } from "@/components/motion-primitives";

type BenchCar = {
  id: string;
  name: string;
  brand?: string;
  image: string;
  specs: Array<{ label: string; value: string }>;
};

const catalog: BenchCar[] = [
  ...featuredCars.map((car: FeaturedCar) => ({
    id: car.id,
    name: car.name,
    brand: car.brand,
    image: car.image,
    specs: [
      { label: "Horsepower", value: `${car.horsepower} hp` },
      { label: "0–100 km/h", value: `${car.acceleration.toFixed(1)} s` },
      { label: "Top speed", value: `${car.topSpeed} km/h` },
      { label: "Powertrain", value: car.fuelType },
      {
        label: "Price",
        value: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(car.price),
      },
    ],
  })),
  ...carSegments.map((s: CarSegment) => ({
    id: s.id,
    name: s.name,
    image: s.image,
    specs: [
      { label: "Drive", value: s.driveType },
      { label: "Seats", value: s.passengerCapacity },
      { label: "Consumption", value: s.typicalFuelConsumption },
      { label: "Invented", value: `${s.year} · ${s.inventor}` },
      { label: "Body", value: s.bodyStyle },
    ],
  })),
];

function lookup(id: string) {
  return catalog.find((c) => c.id === id);
}

export function VehicleCompare({ initialIds }: { initialIds: string[] }) {
  const { carIds, isPinned, togglePin } = useCompare();
  const seeded = useSyncExternalStore(
    subscribe,
    getSeededSnapshot,
    () => false,
  );

  useEffect(() => {
    seedCompareIds(initialIds);
  }, [initialIds]);

  const ids = seeded ? carIds : initialIds;
  const rows = ids.map(lookup).filter(Boolean) as BenchCar[];

  return (
    <>
      <PageHeader
        eyebrow="Compare"
        title={
          <>
            Compare <span className="text-gradient">vehicles</span>
          </>
        }
        description="Pin up to three cars from anywhere on the site, then benchmark their specs side-by-side here."
      />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {rows.length === 0 ? (
          <Reveal>
            <div className="glass flex flex-col items-center rounded-3xl px-6 py-20 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Scale size={30} />
              </span>
              <h2 className="mt-5 font-heading text-xl text-ink">
                No cars on the bench yet
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-ink-muted">
                Hit the <span className="font-semibold text-ink">Pin</span> button
                on any featured ride or car segment and it will appear in the
                compare drawer at the bottom of the screen.
              </p>
              <Link
                href="/cars"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-soft px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-95"
              >
                Browse segments <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rows.map((car, i) => {
              const pinned = isPinned(car.id);
              return (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass flex flex-col overflow-hidden rounded-3xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <h3 className="font-display text-xl uppercase text-white">
                        {car.name}
                      </h3>
                      {car.brand && (
                        <p className="text-xs uppercase tracking-widest text-white/80">
                          {car.brand}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePin(car.id)}
                      aria-pressed={pinned}
                      aria-label={pinned ? `Remove ${car.name} from comparison` : `Add ${car.name} to comparison`}
                      className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-all hover:bg-black/60 active:scale-95"
                    >
                      {pinned ? <PinOff size={12} /> : <Pin size={12} />}
                      {pinned ? "Remove" : "Pin"}
                    </button>
                  </div>

                  <dl className="flex flex-1 flex-col gap-3 p-5">
                    {car.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-baseline justify-between gap-4 border-b border-dashed border-line pb-2"
                      >
                        <dt className="text-xs uppercase tracking-wider text-ink-muted">
                          {spec.label}
                        </dt>
                        <dd className="text-right text-sm font-semibold text-ink">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}