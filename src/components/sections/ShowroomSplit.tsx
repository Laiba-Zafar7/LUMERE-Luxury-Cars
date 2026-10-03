import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function ShowroomSplit() {
  return (
    <section className="section-y pt-0">
      <Reveal className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            The showroom
          </p>
          <h2 data-reveal className="heading text-h2 text-balance">
            More than a showroom. A destination for people who love to drive.
          </h2>
          <p data-reveal className="mt-6 max-w-md text-small text-grey">
            LUMÈRE rethinks buying a car: curated vehicles, honest
            presentation, private viewings and a team that knows every car on
            the floor by heart.
          </p>
          <div data-reveal className="mt-10">
            <ButtonLink href="/inventory" variant="outline" arrow>
              Browse inventory
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div
            data-reveal="image"
            className="relative aspect-4/3 overflow-hidden rounded-lg border border-line-soft"
          >
            <Image
              src="/assets/images/sections/showroom.jpg"
              alt="A Bugatti Divo and Chiron on a polished showroom floor"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-[35%_55%]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
