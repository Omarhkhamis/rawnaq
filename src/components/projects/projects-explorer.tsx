"use client";

import { startTransition, useState } from "react";

import type { Project, ProjectCategory } from "@/data/site";
import { projectCategories } from "@/data/site";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/projects/project-card";

type ProjectsExplorerProps = {
  projects: Project[];
};

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {projectCategories.map((category) => (
          <button
            aria-pressed={activeFilter === category.key}
            className={cn(
              "rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300",
              activeFilter === category.key
                ? "border-primary bg-primary text-[#53211c]"
                : "border-line bg-white/5 text-text-muted hover:border-primary/40 hover:text-text",
            )}
            key={category.key}
            onClick={() => {
              startTransition(() => {
                setActiveFilter(category.key);
              });
            }}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:auto-rows-[20rem] lg:grid-cols-12">
        {visibleProjects.map((project, index) => {
          const layoutClass =
            index === 0
              ? "lg:col-span-7 lg:row-span-2"
              : index === 3
                ? "lg:col-span-7"
                : "lg:col-span-5";

          return (
            <ProjectCard
              className={layoutClass}
              compact={index !== 0}
              delay={index * 0.08}
              key={project.slug}
              priority={index < 2}
              project={project}
            />
          );
        })}
      </div>
    </div>
  );
}
