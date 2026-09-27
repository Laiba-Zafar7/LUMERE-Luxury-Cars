import Image from "next/image";
import Link from "next/link";
import { type Article, formatDate } from "@/data/articles";

type Props = {
  article: Article;
  /** "feature" spans wide with a cinematic crop. */
  variant?: "default" | "feature";
  sizes?: string;
};

export default function ArticleCard({ article: a, variant = "default", sizes }: Props) {
  const feature = variant === "feature";
  return (
    <article className="group relative overflow-hidden rounded-lg border border-line-soft bg-charcoal">
      <div className={`relative overflow-hidden ${feature ? "aspect-4/5 sm:aspect-21/9" : "aspect-4/3"}`}>
        <Image
          src={a.image}
          alt=""
          fill
          loading={feature ? "eager" : "lazy"}
          sizes={sizes ?? (feature ? "(min-width: 1760px) 1440px, 90vw" : "(min-width: 768px) 45vw, 90vw")}
          className="media-zoom object-cover"
          style={{ objectPosition: a.focus }}
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-micro text-black">
          {a.tag}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className={`max-w-xl font-medium tracking-tight text-balance ${feature ? "text-h3" : "text-lead"}`}>
            <Link href={`/journal/${a.slug}`} className="after:absolute after:inset-0">
              {a.title}
            </Link>
          </h3>
          <p className="meta mt-2">
            <time dateTime={a.date}>{formatDate(a.date)}</time>
          </p>
        </div>
      </div>
    </article>
  );
}
