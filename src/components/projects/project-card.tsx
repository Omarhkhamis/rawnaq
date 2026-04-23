import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, MapPin } from "lucide-react";

import type { Project } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type ProjectCardProps = {
  project: Project;
  className?: string;
  compact?: boolean;
  priority?: boolean;
  delay?: number;
};

export function ProjectCard({
  project,
  className,
  compact = false,
  priority = false,
  delay = 0,
}: ProjectCardProps) {
  return (
    <Reveal className={cn("h-full", className)} delay={delay}>
      <Link
        className={cn(
          "group relative flex h-full overflow-hidden rounded-[1.75rem] border border-line bg-card",
          compact ? "min-h-[22rem] lg:min-h-0" : "min-h-[26rem] lg:min-h-0",
        )}
        href={`/projects/${project.slug}`}
      >
        <Image
          alt={project.heroAlt}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fill
          priority={priority}
          sizes={compact ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 1024px) 100vw, 60vw"}
          src={project.cardImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-primary/30 bg-primary/12 px-3 py-1 font-semibold text-primary">
              {project.categoryLabel}
            </span>
            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-text-muted">
              {project.year}
            </span>
          </div>

          <h3
            className={cn(
              "text-balance text-center font-display font-bold leading-[1.45] tracking-normal text-text md:text-start md:leading-[1.4]",
              compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl",
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              "mt-3 max-w-2xl leading-7 text-text-muted",
              compact ? "text-sm" : "text-base",
            )}
          >
            {project.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <MapPin className="size-4 text-primary" />
              <span>{project.location}</span>
            </div>

            <span className="inline-flex items-center gap-2 font-semibold text-text transition-transform duration-300 group-hover:-translate-x-1">
              استعرض المشروع
              <ArrowUpLeft className="size-4 text-primary" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
