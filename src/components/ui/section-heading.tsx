import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "text-center md:text-start",
        className,
      )}
    >
      {eyebrow ? (
        <span className="font-accent text-xs font-semibold uppercase tracking-[0.45em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-balance font-display text-3xl font-bold leading-[1.42] tracking-normal text-text md:text-5xl md:leading-[1.32]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-balance mx-auto max-w-2xl text-base leading-8 text-text-muted md:text-lg",
            align !== "center" && "md:mx-0",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
