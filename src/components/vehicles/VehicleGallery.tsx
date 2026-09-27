"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

/**
 * Full-width slider over editorial crops of the vehicle's photograph,
 * with arrows, dots, keyboard + swipe support and a native <dialog> lightbox.
 */
export default function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const slides = vehicle.gallery;
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const name = `${vehicle.brand} ${vehicle.model}`;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const arrow =
    "grid size-11 place-items-center rounded-full border border-white/25 bg-black/35 backdrop-blur-sm transition-colors duration-(--transition-fast) hover:border-white hover:bg-white hover:text-black";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${name} gallery`}
      className="relative h-[78svh] min-h-[460px] overflow-hidden bg-charcoal select-none"
      onKeyDown={onKey}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {slides.map((crop, i) => (
        <div
          key={i}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-(--transition-slow) ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={vehicle.image}
            alt={i === 0 ? name : `${name}, detail ${i}`}
            fill
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: crop.position,
              transformOrigin: crop.position,
              scale: String(crop.scale),
            }}
          />
        </div>
      ))}

      <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/70" />

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-(--page-margin)">
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={arrow}>
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className={arrow}>
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className="grid h-6 place-items-center px-1"
          >
            <span
              className={`block h-1 rounded-full transition-all duration-(--transition-base) ${
                i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="absolute right-(--page-margin) bottom-5 flex items-center gap-2 text-meta text-white-soft transition-colors hover:text-white"
      >
        <Expand aria-hidden className="size-4" /> View full image
      </button>

      <dialog
        ref={dialog}
        aria-label={`${name}, full image`}
        className="m-auto size-full max-h-none max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="relative size-full p-4 sm:p-12">
          <div className="relative size-full">
            <Image src={vehicle.image} alt={name} fill sizes="100vw" className="object-contain" />
          </div>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close full image"
            className={`absolute top-4 right-4 ${arrow}`}
          >
            <X className="size-5" />
          </button>
        </div>
      </dialog>
    </section>
  );
}
