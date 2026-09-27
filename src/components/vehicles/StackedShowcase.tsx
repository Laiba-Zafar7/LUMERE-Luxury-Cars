"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/components/animations/gsap";
import { whenNear } from "@/components/animations/whenNear";
import SpecLine from "./SpecLine";
import { type Vehicle, formatPrice, vehicleName } from "@/data/vehicles";

/**
 * Full-viewport panels that stick and stack as you scroll: a blurred
 * full-bleed backdrop with a sharp, centred card of the same car on top.
 */
export default function StackedShowcase({ vehicles }: { vehicles: Vehicle[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        // Far below the fold: create the ~20 scrubbed triggers only when the
        // section is within a viewport of the screen, not during page load.
        const init = context.add("init", () => {
          const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", ref.current);
          panels.forEach((panel, i) => {
            const next = panels[i + 1];
            const card = panel.querySelector("[data-card]");
            const cardImage = panel.querySelector("[data-card-image]");

            // Card rises into place as its panel arrives.
            gsap.fromTo(
              card,
              { y: 120, scale: 0.94 },
              {
                y: 0,
                scale: 1,
                ease: "none",
                scrollTrigger: { trigger: panel, start: "top bottom", end: "top top", scrub: true },
              },
            );
            gsap.fromTo(
              cardImage,
              { scale: 1.15 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
              },
            );

            if (!next) return;
            // Previous panel recedes while the next one covers it.
            gsap.to(panel.querySelector("[data-panel-inner]"), {
              scale: 0.9,
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
            });
            gsap.to(panel.querySelector("[data-shade]"), {
              opacity: 0.85,
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
            });
          });
        });
        return whenNear(ref.current, () => init(), "100% 0px 100% 0px");
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-label="Featured vehicles" className="relative">
      {vehicles.map((v, i) => (
        <article
          key={v.slug}
          data-panel
          className="sticky top-0 h-svh overflow-hidden"
          style={{ zIndex: i + 1 }}
        >
          <div data-panel-inner className="relative size-full origin-top overflow-hidden bg-black will-change-transform">
            {/* Backdrop: a tiny render upscaled + blurred reads as soft focus cheaply */}
            <Image
              src={v.image}
              alt=""
              fill
              sizes="12vw"
              className="scale-110 object-cover opacity-60 blur-xl"
              style={{ objectPosition: v.focus }}
            />
            <div aria-hidden className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 flex items-center justify-center px-5">
              <Link
                href={`/inventory/${v.slug}`}
                data-card
                className="group relative block aspect-4/5 w-full max-w-[min(440px,78vw)] overflow-hidden rounded-lg border border-line bg-charcoal shadow-2xl shadow-black/60 sm:aspect-4/3 sm:max-w-[min(640px,60vw)]"
              >
                <div data-card-image className="absolute inset-0 will-change-transform">
                  <Image
                    src={v.image}
                    alt={vehicleName(v)}
                    fill
                    sizes="(min-width: 640px) 60vw, 80vw"
                    className="media-zoom object-cover"
                    style={{ objectPosition: v.focus }}
                  />
                </div>
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 text-center sm:p-8">
                  <p className="eyebrow text-white-soft">
                    {String(i + 1).padStart(2, "0")} / {String(vehicles.length).padStart(2, "0")} · {formatPrice(v.price)}
                  </p>
                  <h3 className="heading text-[clamp(1.5rem,3vw,2.5rem)]">{vehicleName(v)}</h3>
                  <SpecLine vehicle={v} className="justify-center" />
                </div>

                <span
                  aria-hidden
                  className="absolute top-5 right-5 grid size-10 place-items-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm transition-colors duration-(--transition-base) group-hover:border-accent group-hover:bg-accent"
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </div>

            <div data-shade aria-hidden className="pointer-events-none absolute inset-0 bg-black opacity-0" />
          </div>
        </article>
      ))}
    </section>
  );
}
