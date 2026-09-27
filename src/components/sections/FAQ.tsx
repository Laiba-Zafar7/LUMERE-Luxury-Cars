"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { faqs } from "@/data/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section aria-labelledby={`${id}-title`} className="section-y pt-0">
      <Reveal className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p data-reveal className="eyebrow mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            FAQ
          </p>
          <h2 id={`${id}-title`} data-reveal className="heading text-h2">
            Questions, answered
          </h2>
        </div>

        <ul className="flex flex-col gap-3 lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => {
            const expanded = open === i;
            return (
              <li key={f.question} data-reveal className="rounded-md border border-line-soft bg-charcoal">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={expanded}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left text-small font-medium transition-colors hover:text-white-soft"
                  >
                    {f.question}
                    <ChevronDown
                      aria-hidden
                      className={`size-4 shrink-0 text-grey transition-transform duration-(--transition-base) ${expanded ? "rotate-180 text-accent" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  className={`grid transition-[grid-template-rows] duration-(--transition-base) ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden" inert={!expanded}>
                    <p className="px-5 pb-5 text-small text-grey">{f.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
