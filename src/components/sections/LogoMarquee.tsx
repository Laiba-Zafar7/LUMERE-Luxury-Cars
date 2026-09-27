import { marques } from "@/data/content";

export default function LogoMarquee() {
  const row = [...marques, ...marques];
  return (
    <section
      aria-label="Marques we specialise in"
      className="relative overflow-hidden border-y border-line-soft py-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <ul className="animate-marquee flex w-max items-center gap-16 pr-16 motion-reduce:animate-none">
        {row.map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= marques.length}
            className="flex items-center gap-16 text-[clamp(1.125rem,1.6vw,1.5rem)] font-semibold tracking-tight whitespace-nowrap text-white/45"
          >
            {name}
            <span aria-hidden className="size-1.5 rotate-45 bg-accent/70" />
          </li>
        ))}
      </ul>
    </section>
  );
}
