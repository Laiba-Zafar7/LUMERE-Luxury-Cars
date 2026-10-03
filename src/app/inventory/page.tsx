import type { Metadata } from "next";
import CollectionBanner from "@/components/sections/CollectionBanner";
import VehicleGrid from "@/components/vehicles/VehicleGrid";
import CTASection from "@/components/sections/CTASection";
import { vehicles } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse LUMÈRE's curated inventory of performance and luxury cars. Filter by brand, body type and condition.",
};

export default function InventoryPage() {
  return (
    <>
      <h1 className="sr-only">Inventory</h1>
      <CollectionBanner
        word="Collection"
        image="/assets/images/sections/collection-lineup.jpg"
        alt="A lineup of performance cars in an underground garage"
        focus="50% 70%"
      />
      <section className="container-page -mt-16 pb-(--section-y) relative">
        <VehicleGrid vehicles={vehicles} />
      </section>
      <CTASection />
    </>
  );
}
