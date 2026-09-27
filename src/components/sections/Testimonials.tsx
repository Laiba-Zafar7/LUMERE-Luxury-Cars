"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { testimonials } from "@/data/content";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const t = testimonials[active];

  // Only tick while the section is visible, so it costs nothing off-screen.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Gentle auto-advance; pauses on hover/focus.
  useEffect(() => {
    if (paused || !onScreen) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % testimonials.length),
      7000,
    );
    return () => clearInterval(id);
  }, [paused, onScreen]);

  return (
    <section
      ref={ref}
      aria-label="Client testimonials"
      className="relative isolate overflow-hidden py-40 lg:py-56"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Image
        src="/assets/images/sections/testimonial-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[50%_78%] opacity-45"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.55)_0%,#050505_75%)]" />

      <Reveal className="container-page flex flex-col items-center text-center">
        <div data-reveal className="flex gap-1" aria-label={`${t.rating} out of 5 stars`} role="img">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden
              className={`size-4 ${i < t.rating ? "fill-[#f5a524] text-[#f5a524]" : "text-grey-dark"}`}
            />
          ))}
        </div>

        <figure data-reveal className="mt-8 max-w-3xl" aria-live="polite">
          <blockquote key={active} className="animate-[fade-up_700ms_var(--ease-out)] text-[clamp(1.25rem,2.2vw,1.875rem)] leading-snug font-medium tracking-tight text-balance">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8">
            <p className="text-small font-medium">{t.name}</p>
            <p className="meta mt-1">{t.location}</p>
          </figcaption>
        </figure>

        <div data-reveal className="mt-10 flex gap-3" role="group" aria-label="Choose testimonial">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`Show testimonial from ${item.name}`}
              className={`grid size-11 place-items-center rounded-full border text-micro font-medium transition-all duration-(--transition-base) ${
                i === active
                  ? "scale-110 border-accent bg-accent text-white"
                  : "border-line bg-charcoal text-grey hover:text-white"
              }`}
            >
              {initials(item.name)}
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
