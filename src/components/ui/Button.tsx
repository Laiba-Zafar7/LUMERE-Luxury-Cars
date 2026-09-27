import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "outline" | "light" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  outline:
    "border border-white/70 text-white hover:bg-white hover:text-black",
  light: "bg-white text-black hover:bg-white-soft",
  ghost: "px-0! text-white hover:text-white-soft",
};

type CommonProps = {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

const classes = (variant: Variant, className = "") =>
  [
    "group/button inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] px-6 py-3",
    "text-meta font-medium uppercase tracking-[0.08em]",
    "transition-colors duration-(--transition-base) ease-out",
    variants[variant],
    className,
  ].join(" ");

const Arrow = () => (
  <ArrowUpRight
    aria-hidden
    className="size-4 transition-transform duration-(--transition-base) ease-out group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
  />
);

export function ButtonLink({
  href,
  variant = "primary",
  arrow = false,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link href={href} className={classes(variant, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  arrow = false,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variant, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
