"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { whenNear } from "./whenNear";

/** Number that counts up from 0 once it scrolls into view. Renders the final value on the server. */
export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", (context) => {
      const counter = { value: 0 };
      const play = context.add("play", () => {
        gsap.to(counter, {
          value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(counter.value).toString();
          },
        });
      });
      return whenNear(el, () => play(), "0px 0px -10% 0px");
    });
  });

  return <span ref={ref}>{value}</span>;
}
