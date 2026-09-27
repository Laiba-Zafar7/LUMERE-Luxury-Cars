"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/components/animations/gsap";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Lenis only smooths wheel input; touch scrolling stays native. On touch-first
    // devices it would just add a per-frame loop, so skip it there.
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;

    const instance = new Lenis({ duration: 1.15, smoothWheel: true });
    instance.on("scroll", ScrollTrigger.update);
    if (process.env.NODE_ENV === "development") {
      // Lets automated screenshot scripts drive scrolling through Lenis.
      (window as unknown as { __lenis?: Lenis }).__lenis = instance;
    }

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // eslint-disable-next-line react-hooks/set-state-in-effect -- expose the instance once created
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // New route: start at the top and recalculate trigger positions. Skipped on
  // the first render: ScrollTrigger already refreshes itself on page load.
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    lenis?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
