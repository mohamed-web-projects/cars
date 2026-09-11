export type FuelType = "petrol" | "diesel" | "electric" | "hybrid";

export type CarSegmentType =
  | "suv"
  | "sedan"
  | "electric"
  | "hatchback"
  | "minivans"
  | "coupe"
  | "crossover"
  | "luxury"
  | "hybrid"
  | "4x4";

export type DriveType = "FWD" | "RWD" | "AWD" | "4WD";

export type BodyStyle =
  | "SUV"
  | "Sedan"
  | "Hatchback"
  | "Coupe"
  | "Crossover"
  | "Minivan"
  | "Convertible"
  | "Wagon"
  | "Pickup";

export interface CarSegment {
  id: CarSegmentType;
  name: string;
  subtitle: string;
  inventor: string;
  year: string;
  description: string;
  link: string;
  image: string;
  bodyStyle: BodyStyle;
  driveType: DriveType;
  passengerCapacity: string;
  typicalFuelConsumption: string;
}

export interface CarBrand {
  id: string;
  name: string;
  founder: string;
  headquarters: string;
  foundedYear: string;
  country: string;
  image: string;
  link: string;
}

export interface FuelFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CarPart {
  id: string;
  name: string;
  category: "engine" | "electrical" | "suspension" | "brakes" | "body" | "interior" | "exhaust" | "steering" | "safety";
  link?: string;
  description?: string;
}

export interface FuelTypeInfo {
  id: FuelType;
  title: string;
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  icon: string;
}

export interface FeaturedCar {
  id: string;
  name: string;
  brand: string;
  segment: CarSegmentType;
  image: string;
  horsepower: number;
  topSpeed: number;
  acceleration: number;
  price: number;
  year: number;
  fuelType: FuelType;
  featured?: boolean;
}

export interface QuickTool {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  accent: "red" | "blue" | "emerald" | "amber";
}