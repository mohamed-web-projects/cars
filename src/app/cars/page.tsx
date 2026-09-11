import type { Metadata } from "next";
import { CarsBrowser } from "./cars-browser";

export const metadata: Metadata = {
  title: "Car Segments",
  description:
    "Browse the ten major car segments — from SUVs to hypercars — with specs, history and links.",
};

type PageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function CarsPage({ searchParams }: PageProps) {
  const { search } = await searchParams;
  return <CarsBrowser key={search ?? ""} initialQuery={search ?? ""} />;
}