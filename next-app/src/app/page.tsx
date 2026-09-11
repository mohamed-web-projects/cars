import { Hero } from "@/components/Hero";
import { FeaturedCars } from "@/components/FeaturedCars";
import { QuickTools } from "@/components/QuickTools";
import { BrandGrid } from "@/components/BrandGrid";
import { Testimonials } from "@/components/Testimonials";
import { FaqAccordion } from "@/components/FaqAccordion";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <QuickTools />
      <BrandGrid />
      <Testimonials />
      <FaqAccordion />
    </>
  );
}