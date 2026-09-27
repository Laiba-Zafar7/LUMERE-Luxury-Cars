import type { Metadata } from "next";
import Reveal from "@/components/animations/Reveal";
import ArticleCard from "@/components/journal/ArticleCard";
import CTASection from "@/components/sections/CTASection";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Journal",
  description: "Insights, buying guides and stories from the world of high-end automobiles.",
};

export default function JournalPage() {
  const [feature, ...rest] = articles;
  return (
    <>
      <Reveal as="section" className="container-page pt-[calc(var(--nav-height)+80px)] pb-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h1 data-reveal className="heading text-display">
            Automotive
            <br />
            insights &amp; tips
          </h1>
          <p data-reveal className="max-w-xs text-small text-grey">
            Insights, stories and buying advice from the world of high-end
            automobiles.
          </p>
        </div>
        <div data-reveal className="mt-14">
          <ArticleCard article={feature} variant="feature" />
        </div>
      </Reveal>

      <Reveal as="section" aria-label="Latest articles" className="container-page pb-(--section-y)">
        <h2 data-reveal className="heading text-h2">Our latest</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <li key={a.slug} data-reveal>
              <ArticleCard article={a} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" />
            </li>
          ))}
        </ul>
      </Reveal>

      <CTASection />
    </>
  );
}
