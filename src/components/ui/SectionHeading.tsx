type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  /** Right-hand slot (a button, filters…) shown beside the heading on desktop. */
  aside?: React.ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className = "",
  aside,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${
        centered ? "items-center text-center lg:flex-col lg:items-center" : ""
      } ${className}`}
    >
      <div className={`max-w-3xl ${centered ? "mx-auto" : ""}`}>
        {eyebrow && (
          <p data-reveal className="eyebrow mb-4 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {eyebrow}
          </p>
        )}
        <Tag data-reveal className="heading text-h2 text-balance">
          {title}
        </Tag>
        {description && (
          <p
            data-reveal
            className={`mt-5 max-w-xl text-small text-grey ${centered ? "mx-auto" : ""}`}
          >
            {description}
          </p>
        )}
      </div>
      {aside && <div data-reveal>{aside}</div>}
    </div>
  );
}
