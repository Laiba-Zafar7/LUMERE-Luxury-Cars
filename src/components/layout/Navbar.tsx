"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuOverlay from "./MenuOverlay";
import { useLenis } from "./SmoothScroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      // Tuck the bar away while scrolling down, bring it back on the way up.
      setHidden(y > 400 && y > last);
      last = y;
    };
    // At most one state update per frame, however often scroll fires.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-(--z-modal) bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-(--z-nav) transition-[transform,background-color,border-color] duration-(--transition-slow) ease-out ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !open
            ? "border-b border-line-soft bg-black/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-page grid h-(--nav-height) grid-cols-3 items-center"
        >
          <Link
            href="/"
            className="heading justify-self-start text-[15px] tracking-[0.2em]"
            aria-label="LUMÈRE home"
          >
            LUMÈRE
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="group relative size-11 justify-self-center"
          >
            <span className="absolute inset-0 m-auto grid size-3.5 grid-cols-2 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`size-1 rounded-full bg-white transition-transform duration-(--transition-base) ease-out ${
                    open
                      ? ["translate-x-[5px] translate-y-[5px]", "-translate-x-[5px] translate-y-[5px]", "translate-x-[5px] -translate-y-[5px]", "-translate-x-[5px] -translate-y-[5px]"][i]
                      : "group-hover:scale-125"
                  }`}
                />
              ))}
            </span>
          </button>

          <Link
            href="/contact"
            className="justify-self-end text-meta text-white transition-colors hover:text-accent"
          >
            Contact
          </Link>
        </nav>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
