"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/components/animations/gsap";

type Props = {
  word: string;
  image: string;
  alt: string;
  focus?: string;
};

/**
 * Page-intro banner: a giant metallic word sitting over a wide photograph,
 * as on the reference's inventory page.
 */
export default function CollectionBanner({ word, image, alt, focus = "50% 60%" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-banner-media]", { scale: 1.12 }, { scale: 1, duration: 2.2 })
          .fromTo("[data-banner-word]", { yPercent: 45, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.6 }, 0.15);
        gsap.to("[data-banner-media]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative isolate h-[72svh] min-h-[480px] overflow-hidden">
      <div data-banner-media className="absolute inset-0 -z-10">
        <Image src={image} alt={alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" style={{ objectPosition: focus }} />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/10 to-black" />
      <div aria-hidden className="overflow-hidden pt-[calc(var(--nav-height)+1rem)] text-center">
        <p data-banner-word className="wordmark text-[clamp(4rem,15vw,15rem)]">
          {word}
        </p>
      </div>
    </section>
  );
}
