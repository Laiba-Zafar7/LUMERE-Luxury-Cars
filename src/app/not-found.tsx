import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <p aria-hidden className="wordmark pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
        404
      </p>
      <h1 className="heading relative text-h2">Wrong turn.</h1>
      <p className="relative mt-4 max-w-sm text-small text-grey">
        The page you are looking for has moved or never existed. The cars are
        still where we left them.
      </p>
      <div className="relative mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/inventory">View inventory</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back home
        </ButtonLink>
      </div>
    </section>
  );
}
