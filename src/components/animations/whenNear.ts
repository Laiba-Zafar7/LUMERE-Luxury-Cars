/**
 * Runs `callback` once when `el` enters the viewport (grown or shrunk by
 * `rootMargin`), or immediately if it is already scrolled past — e.g. after a
 * reload halfway down the page. Uses IntersectionObserver, so unlike creating
 * a ScrollTrigger it forces no layout reads during hydration.
 *
 * Returns a disconnect function for cleanup.
 */
export function whenNear(
  el: Element | null,
  callback: () => void,
  rootMargin = "0px",
): () => void {
  if (!el) return () => {};
  let done = false;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (done) return;
      if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
        done = true;
        observer.disconnect();
        callback();
      }
    },
    { rootMargin },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
