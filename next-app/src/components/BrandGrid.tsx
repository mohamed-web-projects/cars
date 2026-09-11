import Image from "next/image";
import { carBrands } from "@/data/carData";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion-primitives";

export function BrandGrid() {
  return (
    <section id="brands" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Marques
        </p>
        <h2 className="fluid-display mt-3 font-display uppercase text-ink">
          The world&apos;s <span className="text-gradient">brands</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">
          From founding years to headquarters — a quick tour of 26 marques that
          shaped motoring history.
        </p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {carBrands.map((brand) => (
          <StaggerItem key={brand.id}>
            <a
              href={brand.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass flex min-h-[180px] flex-col items-center justify-between rounded-2xl p-4 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow"
            >
              <Image
                src={brand.image}
                alt={`${brand.name} logo`}
                width={72}
                height={72}
                className="mt-2 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="w-full">
                <h3 className="font-heading text-sm text-ink">{brand.name}</h3>
                <div className="mt-2 flex items-center justify-between text-[11px] text-ink-muted">
                  <span>{brand.foundedYear}</span>
                  <span className="truncate pl-2">{brand.country}</span>
                </div>
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}