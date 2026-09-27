import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { team } from "@/data/content";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

export default function TeamGrid() {
  return (
    <section className="section-y relative overflow-hidden">
      <Reveal className="container-page">
        <SectionHeading
          eyebrow="The team"
          title="People behind us"
          description="Specialists, not salespeople. Every member of the team has spent years inside the marques we sell."
          align="center"
        />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} data-reveal>
              <article className="group relative aspect-4/5 overflow-hidden rounded-lg border border-line-soft bg-charcoal">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={`Portrait of ${m.name}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="media-zoom object-cover"
                  />
                ) : (
                  // Monogram stand-in until a portrait is supplied.
                  <div
                    aria-hidden
                    className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,#262626_0%,#111_60%)]"
                  >
                    <span className="wordmark text-[clamp(5rem,10vw,8rem)] opacity-70">
                      {initials(m.name)}
                    </span>
                  </div>
                )}
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-lead font-medium tracking-tight">{m.name}</h3>
                  <p className="meta mt-1">{m.role}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
