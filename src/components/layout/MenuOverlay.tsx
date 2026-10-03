"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/animations/gsap";
import { mainLinks, socialLinks, contactDetails } from "@/data/navigation";

type Props = { open: boolean; onClose: () => void };

export default function MenuOverlay({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = prefersReducedMotion();
      if (open) {
        gsap.set(el, { visibility: "visible" });
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: reduce ? 0 : 0.8, ease: "expo.inOut" },
        );
        gsap.fromTo(
          "[data-menu-item]",
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.06, duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.3, ease: "expo.out" },
        );
        gsap.fromTo(
          "[data-menu-fade]",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.6 },
        );
      } else {
        gsap.to(el, {
          clipPath: "inset(0 0 100% 0)",
          duration: reduce ? 0 : 0.6,
          ease: "expo.inOut",
          onComplete: () => gsap.set(el, { visibility: "hidden" }),
        });
      }
    },
    { scope: ref, dependencies: [open] },
  );

  // Keyboard: Esc closes, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const el = ref.current;
    el?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !el) return;
      // The toggle lives in the navbar above the overlay, so include it in the cycle.
      const toggle = document.querySelector<HTMLElement>('[aria-controls="site-menu"]');
      const focusables = [
        ...(toggle ? [toggle] : []),
        ...el.querySelectorAll<HTMLElement>("a, button"),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      className="invisible fixed inset-0 z-(--z-overlay) flex flex-col bg-black"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      {/* Background wordmark, blurred like the reference */}
      <div
        aria-hidden
        className="wordmark pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center opacity-40 blur-md"
      >
        LUMÈRE
      </div>

      <nav
        aria-label="Menu"
        className="relative flex flex-1 flex-col items-center justify-center gap-1"
      >
        {mainLinks.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <span key={link.href} className="block overflow-hidden">
              <Link
                data-menu-item
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`block text-[clamp(2.25rem,6vw,4rem)] leading-[1.1] font-semibold tracking-tight uppercase transition-colors duration-(--transition-fast) ${
                  active ? "text-accent" : "text-white hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            </span>
          );
        })}
      </nav>

      <div
        data-menu-fade
        className="container-page relative flex flex-col gap-4 pb-10 text-meta text-grey sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="flex flex-col gap-1">
          <a href={`tel:${contactDetails.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
            {contactDetails.phone}
          </a>
          <a href={`mailto:${contactDetails.email}`} className="hover:text-white">
            {contactDetails.email}
          </a>
        </div>
        <ul className="flex gap-6">
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
