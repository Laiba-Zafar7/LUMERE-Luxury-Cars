import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import VehicleGallery from "@/components/vehicles/VehicleGallery";
import VehicleSpecs from "@/components/vehicles/VehicleSpecs";
import VehicleCard from "@/components/vehicles/VehicleCard";
import CTASection from "@/components/sections/CTASection";
import {
  vehicles,
  getVehicle,
  relatedVehicles,
  formatPrice,
  formatMileage,
} from "@/data/vehicles";

export const dynamicParams = false;

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/inventory/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) return {};
  return {
    title: `${v.year} ${v.brand} ${v.model}`,
    description: v.summary,
    openGraph: { images: [v.image] },
  };
}

export default async function VehiclePage({ params }: PageProps<"/inventory/[slug]">) {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) notFound();

  const related = relatedVehicles(slug);

  return (
    <>
      <div className="h-(--nav-height) bg-black" />
      <VehicleGallery vehicle={v} />

      {/* Title block */}
      <Reveal as="section" className="container-page grid gap-10 pt-14 pb-16 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Link
            href="/inventory"
            data-reveal
            className="meta inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <ArrowLeft aria-hidden className="size-4" /> Back to inventory
          </Link>
          <p data-reveal className="eyebrow mt-8">
            {v.brand} · {v.year}
          </p>
          <h1 data-reveal className="heading mt-3 text-display">
            {v.model}
          </h1>
          <p data-reveal className="meta mt-4">
            {formatMileage(v.mileage)} · {v.transmission} · {v.fuel} · {v.exterior}
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4 lg:items-end">
          <p data-reveal className="heading text-h2">
            {formatPrice(v.price)}
          </p>
          <div data-reveal className="flex flex-wrap gap-3">
            <ButtonLink href={`/contact?vehicle=${v.slug}`}>Request details</ButtonLink>
            <ButtonLink href="/contact" variant="outline" arrow>
              Book test drive
            </ButtonLink>
          </div>
        </div>
      </Reveal>

      {/* Specs */}
      <Reveal as="section" aria-label="Specifications" stagger={0.04} className="container-page pb-(--section-y)">
        <VehicleSpecs vehicle={v} />
      </Reveal>

      {/* Story + highlights */}
      <Reveal as="section" className="container-page grid gap-12 pb-(--section-y) lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            About this car
          </p>
          <h2 data-reveal className="heading text-h2 text-balance">
            Inspected, documented, ready to drive.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p data-reveal className="text-lead text-white-soft">
            {v.summary}
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {v.highlights.map((h) => (
              <li key={h} data-reveal className="flex items-center gap-3 border-b border-line-soft pb-4 text-small">
                <Check aria-hidden className="size-4 text-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Related */}
      <Reveal as="section" className="container-page pb-(--section-y)">
        <SectionHeading
          title="You might also like"
          aside={
            <ButtonLink href="/inventory" variant="outline" arrow>
              View all inventory
            </ButtonLink>
          }
        />
        <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug} data-reveal>
              <VehicleCard vehicle={r} />
            </li>
          ))}
        </ul>
      </Reveal>

      <CTASection />
    </>
  );
}
