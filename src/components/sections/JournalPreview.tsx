import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import ArticleCard from "@/components/journal/ArticleCard";
import type { Article } from "@/data/articles";

type Props = {
  articles: Article[];
  title?: string;
};

export default function JournalPreview({ articles, title = "News & articles" }: Props) {
  return (
    <section className="section-y">
      <Reveal className="container-page">
        <SectionHeading
          eyebrow="Journal"
          title={title}
          aside={
            <ButtonLink href="/journal" variant="outline" arrow>
              View all articles
            </ButtonLink>
          }
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {articles.map((a) => (
            <li key={a.slug} data-reveal>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
