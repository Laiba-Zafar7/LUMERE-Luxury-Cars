import type { Metadata } from "next";
import CollectionBanner from "@/components/sections/CollectionBanner";
import IntroStats from "@/components/sections/IntroStats";
import WhatSetsUsApart from "@/components/sections/WhatSetsUsApart";
import TeamGrid from "@/components/sections/TeamGrid";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";
import Reveal from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "NOCTRA is an independent showroom for performance and luxury cars, built around honest presentation and specialist knowledge.",
};

const principles = [
  {
    n: "01",
    title: "Curated, not collected",
    text: "We turn down more cars than we buy. Every vehicle has to earn its place on the floor through history, specification and condition.",
  },
  {
    n: "02",
    title: "Nothing hidden",
    text: "Full service records, inspection reports and paint-depth readings are shared before you visit, not after you ask.",
  },
  {
    n: "03",
    title: "After the handover",
    text: "Servicing, storage, detailing and resale. We stay involved for as long as you own the car.",
  },
];

export default function AboutPage() {
  return (
    <>
      <h1 className="sr-only">About NOCTRA</h1>
      <CollectionBanner
        word="Heritage"
        image="/assets/images/sections/showroom.jpg"
        alt="The NOCTRA showroom floor"
        focus="40% 55%"
      />
      <IntroStats />

      <section aria-label="Our principles" className="pb-(--section-y)">
        <Reveal className="container-page grid gap-px overflow-hidden rounded-lg border border-line-soft bg-line-soft md:grid-cols-3">
          {principles.map((p) => (
            <article key={p.n} data-reveal className="bg-black p-8 sm:p-10">
              <p className="heading text-accent">{p.n}</p>
              <h2 className="mt-10 text-h3 font-medium tracking-tight">{p.title}</h2>
              <p className="mt-3 text-small text-grey">{p.text}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <WhatSetsUsApart />
      <TeamGrid />
      <Testimonials />
      <CTASection />
    </>
  );
}
