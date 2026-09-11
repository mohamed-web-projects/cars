import type { Metadata } from "next";
import { VehicleCompare } from "./vehicle-compare";
import { FuelCompare } from "./fuel-compare";
import { FuelCalculator } from "./fuel-calculator";

export const metadata: Metadata = {
  title: "Compare Fuels & Specs",
  description:
    "Pin vehicles, benchmark specs side-by-side, compare powertrains and estimate monthly running costs.",
};

type PageProps = {
  searchParams: Promise<{ cars?: string }>;
};

export default async function ComparePage({ searchParams }: PageProps) {
  const { cars } = await searchParams;
  const ids = cars
    ? cars
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <VehicleCompare initialIds={ids} />
      <FuelCompare />
      <FuelCalculator />
    </>
  );
}