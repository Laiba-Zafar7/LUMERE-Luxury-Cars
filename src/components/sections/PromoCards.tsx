import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export default function PromoCards() {
  return (
    <section aria-label="Current offers" className="pb-(--section-y)">
      <Reveal className="container-page grid gap-6 lg:grid-cols-12">
        {/* Offer */}
        <article
          data-reveal
          className="relative isolate flex min-h-[320px] overflow-hidden rounded-lg bg-accent-deep lg:col-span-7"
        >
          <div className="relative z-10 flex max-w-xs flex-col justify-center p-8 sm:p-10">
            <h3 className="heading text-h3">Autumn Allocation</h3>
            <p className="mt-3 text-small text-white/75">
              Up to $15,000 towards selected certified performance models.
              Limited to vehicles in stock this season.
            </p>
            <div className="mt-8">
              <ButtonLink href="/inventory" variant="light">
                Browse inventory
              </ButtonLink>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 -z-10 w-[62%] [mask-image:linear-gradient(90deg,transparent,#000_45%)]">
            <Image
              src="/assets/images/cars/bmw-m4-competition.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 35vw, 60vw"
              className="object-cover object-[50%_72%]"
            />
          </div>
        </article>

        {/* Financing */}
        <article
          data-reveal
          className="relative flex min-h-[320px] flex-col justify-center overflow-hidden rounded-lg border border-line-soft bg-charcoal p-8 sm:p-10 lg:col-span-5"
        >
          <h3 className="heading text-h3">0% APR Financing</h3>
          <p className="mt-3 max-w-xs text-small text-grey">
            Available on certified pre-owned SUVs and sedans through the end of
            the month, subject to status.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact">Pre-qualify now</ButtonLink>
          </div>
          <span
            aria-hidden
            className="heading pointer-events-none absolute -right-4 -bottom-10 text-[9rem] leading-none text-white/[0.04]"
          >
            0%
          </span>
        </article>
      </Reveal>
    </section>
  );
}
