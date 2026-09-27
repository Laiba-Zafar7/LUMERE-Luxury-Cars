import CountUp from "@/components/animations/CountUp";
import Reveal from "@/components/animations/Reveal";
import { stats } from "@/data/content";

/** Brand emblem: a chevron-shield in the metallic wordmark finish. */
function Emblem() {
  return (
    <svg viewBox="0 0 48 56" className="h-14 w-12" aria-hidden>
      <defs>
        <linearGradient id="emblem-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fafaf7" />
          <stop offset="0.55" stopColor="#9a9a95" />
          <stop offset="1" stopColor="#3d3d3a" />
        </linearGradient>
      </defs>
      <path
        d="M2 2h10v26l12 12 12-12V2h10v30L24 54 2 32z"
        fill="url(#emblem-metal)"
      />
      <path d="M14 20h20l-4 5H18z" fill="#d0101a" />
    </svg>
  );
}

export default function IntroStats() {
  return (
    <section className="section-y">
      <Reveal className="container-page flex flex-col items-center text-center">
        <div data-reveal>
          <Emblem />
        </div>
        <h2
          data-reveal
          className="heading mt-10 max-w-4xl text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.15] lowercase"
        >
          we don&rsquo;t just sell cars.
          <br />
          we curate what you drive next.
        </h2>
        <p data-reveal className="mt-6 max-w-md text-small text-grey">
          A car is more than a way to get from one place to another. It is a
          reflection of who you are, so every vehicle on our floor is chosen
          as carefully as the person who will drive it.
        </p>

        <dl
          data-reveal
          className="mt-16 grid w-full max-w-3xl grid-cols-3 divide-x divide-line-soft"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse items-center gap-2 px-2">
              <dt className="text-micro text-grey sm:text-meta">{s.label}</dt>
              <dd className="heading text-[clamp(1.75rem,4vw,3rem)] leading-none">
                {s.prefix}
                <CountUp value={s.value} />
                <span className="text-accent">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
