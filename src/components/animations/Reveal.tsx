"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { whenNear } from "./whenNear";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  /** Delay between children marked with data-reveal. */
  stagger?: number;
  delay?: number;
  y?: number;
  /** Plays once the top of the block passes this % of the viewport height. */
  startAt?: number;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className">;

/**
 * Coordinated section entrance. Elements inside marked with `data-reveal`
 * fade up in document order; `data-reveal="image"` gets a clip-path wipe.
 * If no child is marked, the wrapper itself animates.
 *
 * Triggered by an IntersectionObserver rather than ScrollTrigger: these play
 * once and never scrub, so there is no need to measure the page on hydration.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  stagger = 0.1,
  delay = 0,
  y = 30,
  startAt = 82,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const marked = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        const targets = marked.length ? marked : [root];
        const tl = gsap.timeline({ paused: true, delay });

        targets.forEach((el, i) => {
          const at = i * stagger;
          if (el.dataset.reveal === "image") {
            gsap.set(el, { clipPath: "inset(12% 12% 12% 12% round 16px)", scale: 1.06 });
            tl.to(
              el,
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                scale: 1,
                duration: 1.4,
                ease: "expo.out",
                clearProps: "clipPath,transform",
              },
              at,
            );
          } else {
            gsap.set(el, { autoAlpha: 0, y });
            tl.to(el, { autoAlpha: 1, y: 0, duration: 1.1, clearProps: "transform" }, at);
          }
        });

        return whenNear(root, () => tl.restart(true), `0px 0px -${100 - startAt}% 0px`);
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
