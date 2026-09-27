import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a private viewing or test drive, or ask NOCTRA to source a specific car.",
};

export default function ContactPage() {
  return (
    <>
      <Reveal as="section" className="container-page pt-[calc(var(--nav-height)+80px)] pb-(--section-y)">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h1 data-reveal className="heading text-display">
            Let&rsquo;s find
            <br />
            your car
          </h1>
          <p data-reveal className="max-w-xs text-small text-grey">
            Book a private viewing or test drive, or tell us exactly what you
            are looking for and we will source it.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div data-reveal="image" className="relative aspect-4/5 overflow-hidden rounded-lg border border-line-soft lg:col-span-5 lg:aspect-auto">
            <Image
              src="/assets/images/cars/porsche-panamera-4s.jpg"
              alt="A Porsche Panamera at dusk by the coast"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[55%_75%]"
            />
          </div>

          <div data-reveal className="lg:col-span-6 lg:col-start-7">
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </Reveal>

      <FAQ />
      <CTASection />
    </>
  );
}
