"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/components/animations/gsap";
import { ButtonLink } from "@/components/ui/Button";

type Props = {
  poster: {
    desktop?: string;
    mobile?: string;
    img: React.ImgHTMLAttributes<HTMLImageElement>;
  };
  videoSrc?: string;
};

export default function HeroView({ poster, videoSrc }: Props) {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const heroVisible = useRef(true);

  // The poster is the LCP image; the video must not compete with it. Attach the
  // source only after load + idle, only where the video is shown (≥768px), and
  // never for reduced-motion or data-saver users.
  useEffect(() => {
    if (!videoSrc) return;
    const mq = (q: string) => window.matchMedia(q).matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!mq("(min-width: 768px)") || mq("(prefers-reduced-motion: reduce)") || saveData) return;

    let idle = 0;
    const start = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setVideoOn(true), { timeout: 2000 })
        : window.setTimeout(() => setVideoOn(true), 200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [videoSrc]);

  // Pause the video while the hero is scrolled out of view.
  useEffect(() => {
    const el = video.current;
    if (!videoOn || !el || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      heroVisible.current = entry.isIntersecting;
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [videoOn]);

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
          <picture>
            {poster.mobile && (
              <source media="(max-width: 767px), (orientation: portrait)" srcSet={poster.mobile} />
            )}
            {poster.desktop && (
              <source media="(min-width: 768px)" srcSet={poster.desktop} />
            )}
            {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative, alt="" comes from props */}
            <img
              {...poster.img}
              fetchPriority="high"
              loading="eager"
              className="size-full object-cover object-[50%_45%]"
            />
          </picture>

          {videoSrc && videoOn && (
            <video
              ref={video}
              className={`absolute inset-0 hidden size-full object-cover transition-opacity duration-1000 md:block ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
              src={videoSrc}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              onCanPlay={(e) => {
                if (heroVisible.current) e.currentTarget.play().catch(() => {});
                setVideoReady(true);
              }}
            />
          )}
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
          NOCTRA
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
            Beyond the showroom. NOCTRA sources, inspects and delivers
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
