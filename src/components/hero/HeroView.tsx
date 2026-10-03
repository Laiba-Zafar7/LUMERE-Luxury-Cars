"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/components/animations/gsap";
import { ButtonLink } from "@/components/ui/Button";

type Props = {
  videoSrc: string;
};

export default function HeroView({ videoSrc }: Props) {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const heroVisible = useRef(true);
  const reducedMotion = useRef(false);

  // Play while the hero is in view; reduced-motion users get the still first frame.
  useEffect(() => {
    const el = video.current;
    if (!el || !ref.current) return;
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      el.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      heroVisible.current = entry.isIntersecting;
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo("[data-hero-media]", { scale: 1.14 }, { scale: 1, duration: 2.6 })
          .fromTo(
            "[data-hero-wordmark]",
            { yPercent: 40, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 1.8 },
            0.2,
          )
          .fromTo(
            "[data-hero-line]",
            { yPercent: 110 },
            { yPercent: 0, duration: 1.2, stagger: 0.08 },
            0.7,
          )
          .fromTo(
            "[data-hero-fade]",
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 },
            0.9,
          );

        // Scroll: media drifts slower than the page, wordmark lifts away.
        const scroll = {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to("[data-hero-parallax]", { yPercent: 18, ease: "none", scrollTrigger: scroll });
        gsap.to("[data-hero-wordmark-wrap]", {
          yPercent: -35,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: scroll,
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex h-svh min-h-[600px] flex-col overflow-hidden bg-black"
    >
      {/* Media */}
      <div data-hero-parallax className="absolute inset-0 -z-10">
        <div data-hero-media className="absolute inset-0">
          <video
            ref={video}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            onLoadedData={() => setVideoReady(true)}
            onEnded={(e) => {
              // Fallback in case a browser ignores `loop`.
              if (heroVisible.current && !reducedMotion.current) {
                e.currentTarget.currentTime = 0;
                e.currentTarget.play().catch(() => {});
              }
            }}
          />
        </div>
      </div>

      {/* Cinematic grading: vignette + floor fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_55%_45%,transparent_20%,rgba(5,5,5,0.55)_62%,#050505_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-black via-black/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-black/80 to-transparent"
      />

      {/* Wordmark */}
      <div
        data-hero-wordmark-wrap
        aria-hidden
        className="pointer-events-none mt-[calc(var(--nav-height)+2svh)] overflow-hidden text-center"
      >
        <p data-hero-wordmark className="wordmark opacity-90">
          LUMÈRE
        </p>
      </div>

      {/* Copy */}
      <div className="container-page mt-auto grid gap-8 pb-12 md:grid-cols-2 md:items-end md:pb-16 lg:pb-20">
        <h1
          id="hero-title"
          className="heading text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.05]"
        >
          <span className="block overflow-hidden pb-1">
            <span data-hero-line className="block">
              Find Your
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span data-hero-line className="block">
              Next Drive.
            </span>
          </span>
        </h1>

        <div className="flex flex-col items-start gap-6 md:ml-auto md:max-w-sm">
          <p data-hero-fade className="text-small text-white-soft">
            Beyond the showroom. LUMÈRE sources, inspects and delivers
            performance and luxury cars for drivers who notice the details.
          </p>
          <div data-hero-fade className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Book a test drive</ButtonLink>
            <ButtonLink href="/inventory" variant="outline" arrow>
              Inventory
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
