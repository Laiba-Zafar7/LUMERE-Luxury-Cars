"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/components/animations/gsap";
import { whenNear } from "@/components/animations/whenNear";
import { type Vehicle, vehicleName, formatPrice } from "@/data/vehicles";

/**
 * "On display": tall cards that scroll sideways. On desktop the section pins
 * and vertical scroll drives the track; on touch devices it is a native swipe row.
 */
export default function FutureCarousel({ vehicles }: { vehicles: Vehicle[] }) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        (context) => {
          const el = track.current;
          if (!el) return;
          const distance = () => el.scrollWidth - window.innerWidth;
          // Pin is only created as the section approaches, keeping it out of page load.
          const init = context.add("init", () => {
            gsap.to(el, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });
          });
          return whenNear(ref.current, () => init(), "100% 0px 100% 0px");
        },
      );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="on-display-title"
      className="relative flex flex-col justify-center overflow-hidden py-24 lg:h-svh lg:py-0"
    >
      <div className="container-page mb-12 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="on-display-title" className="heading text-h2">
          The future on display
        </h2>
        <p className="max-w-xs text-small text-grey">
          A curated glimpse of the next generation of performance, available to
          view by private appointment.
        </p>
      </div>

      <ul
        ref={track}
        className="lg:will-change-transform no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-(--page-margin) lg:w-max lg:snap-none lg:overflow-visible"
      >
        {vehicles.map((v) => (
          <li key={v.slug} className="shrink-0 snap-start">
            <Link
              href={`/inventory/${v.slug}`}
              className="group relative block aspect-3/4 w-[72vw] overflow-hidden rounded-lg border border-line-soft bg-charcoal sm:w-[42vw] lg:h-[58svh] lg:w-auto"
            >
              <Image
                src={v.image}
                alt={vehicleName(v)}
                fill
                sizes="(min-width: 1024px) 30vw, 72vw"
                className="media-zoom object-cover brightness-75 transition-[filter,transform] duration-(--transition-slow) group-hover:brightness-100"
                style={{ objectPosition: v.focus }}
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="eyebrow">{v.brand}</p>
                <p className="mt-1 text-lead font-medium tracking-tight">{v.model}</p>
                <p className="meta mt-1 translate-y-2 opacity-0 transition-all duration-(--transition-base) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {formatPrice(v.price)} · {v.year}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
