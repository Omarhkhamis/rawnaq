import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

export function Button({
  children,
  href,
  variant = "solid",
  size = "md",
  className,
  type,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    size === "md" && "min-h-12 px-5",
    size === "lg" && "min-h-14 px-7 text-base",
    variant === "solid" &&
      "border-primary bg-primary text-[#53211c] shadow-[0_18px_40px_rgba(255,180,171,0.24)] hover:-translate-y-0.5 hover:bg-primary-strong",
    variant === "outline" &&
      "border-line bg-white/4 text-text hover:-translate-y-0.5 hover:border-primary/50 hover:bg-white/8",
    variant === "ghost" &&
      "border-transparent bg-transparent text-text-muted hover:text-text",
    className,
  );

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;

    if (isExternal) {
      return (
        <a className={classes} href={href} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type ?? "button"} {...props}>
      {children}
    </button>
  );
}
