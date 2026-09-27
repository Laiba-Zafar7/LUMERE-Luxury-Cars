import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate flex min-h-[90svh] flex-col overflow-hidden"
    >
      <Image
        src="/assets/images/cars/lamborghini-aventador-s.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[40%_70%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-black via-black/60 to-black/10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-black to-transparent" />

      <Reveal className="container-page flex flex-col items-center pt-32 text-center lg:pt-40">
        <h2 id="cta-title" data-reveal className="heading max-w-3xl text-display text-balance">
          Ready to find your perfect car?
        </h2>
        <p data-reveal className="mt-6 max-w-md text-small text-white-soft">
          Premium vehicles, straightforward service and fair numbers. Book a
          private viewing or let us source the exact car you want.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/inventory">Browse cars</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Talk to a specialist
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
