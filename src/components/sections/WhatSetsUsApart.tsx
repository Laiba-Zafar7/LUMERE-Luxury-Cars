import Image from "next/image";
import { CarFront, ShieldCheck, Wallet, Wrench } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { features } from "@/data/content";

const icons = { car: CarFront, shield: ShieldCheck, wallet: Wallet, wrench: Wrench };

export default function WhatSetsUsApart() {
  return (
    <section className="section-y">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Sticky intro column */}
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-[calc(var(--nav-height)+48px)]">
            <p data-reveal className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden className="h-px w-6 bg-accent" />
              Why LUMÈRE
            </p>
            <h2 data-reveal className="heading text-h2">
              What sets
              <br />
              us apart
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-small text-grey">
              A car is not just transportation. It is a statement of identity,
              ambition and taste, and buying one should feel that way too.
            </p>
            <div data-reveal className="mt-10">
              <ButtonLink href="/about" variant="outline" arrow>
                About us
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Card column */}
        <ul className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
          {features.map((f) => {
            const Icon = icons[f.icon];
            return (
              <Reveal as="li" key={f.title}>
                <article className="group overflow-hidden rounded-lg border border-line-soft bg-charcoal">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={f.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="media-zoom object-cover"
                      style={{ objectPosition: f.focus }}
                    />
                    <div aria-hidden className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/20 to-transparent" />
                    <span className="absolute top-5 left-5 grid size-10 place-items-center rounded-sm bg-accent">
                      <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="p-6 pt-2 sm:p-8 sm:pt-2">
                    <h3 className="text-h3 font-medium tracking-tight">{f.title}</h3>
                    <p className="mt-2 max-w-md text-small text-grey">{f.description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
