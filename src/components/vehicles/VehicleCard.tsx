import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  type Vehicle,
  formatPrice,
  formatMileage,
} from "@/data/vehicles";

type Props = {
  vehicle: Vehicle;
  sizes?: string;
  className?: string;
};

/**
 * Inventory card: chips over the image (transmission, year) like the
 * reference, then brand / model / price with restrained metadata.
 */
export default function VehicleCard({
  vehicle: v,
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
  className = "",
}: Props) {
  return (
    <article className={`group relative ${className}`}>
      <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-line-soft bg-charcoal">
        <Image
          src={v.image}
          alt={`${v.year} ${v.brand} ${v.model}`}
          fill
          sizes={sizes}
          className="media-zoom object-cover"
          style={{ objectPosition: v.focus }}
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-black/55 via-transparent to-black/30" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between text-micro text-white">
          <span className="rounded-full bg-black/45 px-3 py-1 backdrop-blur-sm">
            {v.transmission}
          </span>
          <span className="rounded-full bg-black/45 px-3 py-1 backdrop-blur-sm">
            {v.year}
          </span>
        </div>
        {v.condition === "New" && (
          <span className="absolute bottom-4 left-4 rounded-full bg-accent px-3 py-1 text-micro text-white">
            New arrival
          </span>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow">{v.brand}</p>
          <h3 className="mt-1.5 truncate text-lead font-medium tracking-tight">
            <Link href={`/inventory/${v.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {v.model}
            </Link>
          </h3>
          <p className="meta mt-2">
            {formatMileage(v.mileage)} · {v.fuel} · {v.body}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-3">
          <p className="text-small font-medium">{formatPrice(v.price)}</p>
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-full border border-line text-grey transition-colors duration-(--transition-base) group-hover:border-accent group-hover:bg-accent group-hover:text-white"
          >
            <ArrowUpRight className="size-4 transition-transform duration-(--transition-base) group-hover:rotate-45" />
          </span>
        </div>
      </div>
      {/* Keyboard focus ring for the stretched link */}
      <span aria-hidden className="pointer-events-none absolute -inset-2 rounded-xl ring-white group-has-focus-visible:ring-1" />
    </article>
  );
}
