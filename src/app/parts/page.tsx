import type { Metadata } from "next";
import { PartsExplorer } from "./parts-explorer";

export const metadata: Metadata = {
  title: "Car Parts Catalog",
  description:
    "Browse 48 essential car components color-coded by system — engines, braking, suspension, electrical systems and more.",
};

export default function PartsPage() {
  return <PartsExplorer />;
}