import { ArrowUpLeft } from "lucide-react";

import { projects } from "@/data/site";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";

export function FeaturedProjectsSection() {
  const [featured, ...rest] = projects;

  return (
    <section className="section-space" id="projects">
      <div className="app-container">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="معرض المشاريع"
            title="أعمال تُترجم الرؤية المعمارية إلى مساحات قابلة للعيش والعمل"
          />
          <Button href="/projects" size="lg" variant="outline">
            عرض جميع المشاريع
            <ArrowUpLeft className="size-4" />
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <ProjectCard className="min-h-[34rem]" priority project={featured} />
          <div className="grid gap-5">
            {rest.slice(0, 3).map((project, index) => (
              <ProjectCard compact delay={0.08 + index * 0.06} key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
