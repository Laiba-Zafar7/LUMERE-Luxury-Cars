import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import JournalPreview from "@/components/sections/JournalPreview";
import { articles, getArticle, formatDate } from "@/data/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt, openGraph: { images: [a.image] } };
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative isolate flex min-h-[80svh] flex-col justify-end overflow-hidden">
          <Image
            src={a.image}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="-z-10 object-cover"
            style={{ objectPosition: a.focus }}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/55 to-black/30" />
          <Reveal className="container-page max-w-4xl pb-16">
            <Link href="/journal" data-reveal className="meta inline-flex items-center gap-2 hover:text-white">
              <ArrowLeft aria-hidden className="size-4" /> Journal
            </Link>
            <div data-reveal className="mt-8 flex items-center gap-4 text-micro">
              <span className="rounded-full bg-white px-3 py-1 text-black">{a.tag}</span>
              <span className="flex items-center gap-1.5 text-white-soft">
                <CalendarDays aria-hidden className="size-3.5" />
                <time dateTime={a.date}>{formatDate(a.date)}</time>
              </span>
            </div>
            <h1 data-reveal className="heading mt-6 text-h2 text-balance">
              {a.title}
            </h1>
          </Reveal>
        </header>

        <Reveal className="container-page max-w-4xl pt-12 pb-(--section-y)">
          <p data-reveal className="border-b border-line-soft pb-10 text-lead text-white-soft">
            {a.excerpt}
          </p>
          {a.body.map((block) => (
            <section key={block.heading} data-reveal className="mt-12">
              <h2 className="text-h3 font-medium tracking-tight">{block.heading}</h2>
              {block.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 max-w-[68ch] text-grey">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </Reveal>
      </article>

      <JournalPreview articles={more} title="More articles" />
    </>
  );
}
