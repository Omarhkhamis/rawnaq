import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ProjectCard } from "@/components/projects/project-card";
import { AnimatedCounter } from "@/components/ui/counter";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjectBySlug, getRelatedProjects, projects } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "مشروع غير موجود",
    };
  }

  return {
    title: project.title,
    description: project.excerpt,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug);

  return (
    <>
      <section className="relative overflow-hidden pt-36">
        <div className="absolute inset-0">
          <Image
            alt={project.heroAlt}
            className="object-cover object-center opacity-45"
            fill
            priority
            sizes="100vw"
            src={project.heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-background/55 to-background" />
        </div>

        <div className="app-container relative py-18 md:py-24">
          <Reveal>
            <div className="max-w-5xl space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                <Link className="transition-colors duration-300 hover:text-text" href="/projects">
                  المشاريع
                </Link>
                <ChevronLeft className="size-4 text-primary" />
                <span>{project.title}</span>
              </div>

              <span className="inline-flex rounded-full border border-primary/25 bg-primary/12 px-4 py-2 text-sm font-semibold text-primary">
                {project.heroLabel}
              </span>

              <h1 className="text-balance font-display text-5xl font-bold tracking-tight text-text md:text-7xl">
                {project.title}
                <span className="mt-3 block text-3xl text-text-muted md:text-4xl">{project.subtitle}</span>
              </h1>

              <p className="max-w-3xl text-lg leading-8 text-text-muted">{project.excerpt}</p>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-text">
                  {project.categoryLabel}
                </span>
                <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-text-muted">
                  {project.area}
                </span>
                <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-text-muted">
                  {project.duration}
                </span>
                <span className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-text-muted">
                  {project.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-text-muted">
                <MapPin className="size-4 text-primary" />
                <span>{project.location}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-8">
        <div className="app-container">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="نظرة عامة على المشروع"
                title="صياغة معمارية تجمع بين الأداء اليومي والحضور البصري"
                description={project.overview}
              />

              <Reveal>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="panel px-6 py-6">
                    <p className="font-display text-2xl font-bold text-text">التحدي</p>
                    <p className="mt-3 leading-8 text-text-muted">{project.challenge}</p>
                  </div>
                  <div className="panel px-6 py-6">
                    <p className="font-display text-2xl font-bold text-text">الحل</p>
                    <p className="mt-3 leading-8 text-text-muted">{project.solution}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <aside className="panel h-fit px-6 py-6 lg:sticky lg:top-28">
                <h2 className="font-display text-2xl font-bold text-text">تفاصيل المشروع</h2>
                <div className="mt-6 space-y-4 border-b border-line/70 pb-6 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-text-muted">المساحة</span>
                    <span className="font-semibold text-text">{project.area}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-text-muted">المدة الزمنية</span>
                    <span className="font-semibold text-text">{project.duration}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-text-muted">الحالة</span>
                    <span className="font-semibold text-text">{project.status}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-text-muted">الموقع</span>
                    <span className="font-semibold text-text">{project.location}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-display text-xl font-bold text-text">نطاق العمل</h3>
                  <div className="mt-4 space-y-3">
                    {project.deliverables.map((item) => (
                      <div className="flex items-start gap-3" key={item}>
                        <span className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                          <Check className="size-4" />
                        </span>
                        <span className="leading-8 text-text-muted">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="app-container">
          <SectionHeading
            eyebrow="المواد والتشطيبات"
            title="مواد مختارة لتدعيم الأداء ورفع قيمة التجربة البصرية"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {project.materials.map((material, index) => (
              <Reveal className="panel px-6 py-7" delay={index * 0.08} key={material.title}>
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <FeatureIcon className="size-7" name={material.icon} />
                </span>
                <h3 className="mt-8 font-display text-2xl font-bold text-text">{material.title}</h3>
                <p className="mt-4 leading-8 text-text-muted">{material.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="app-container">
          <SectionHeading
            eyebrow="معرض بصري"
            title="لقطات من المشروع تكشف منطق التكوين والتفاصيل المنفذة"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-12 md:auto-rows-[17rem]">
            {project.gallery.map((image, index) => {
              const layoutClass =
                index === 0
                  ? "md:col-span-7 md:row-span-2"
                  : index === project.gallery.length - 1
                    ? "md:col-span-7"
                    : "md:col-span-5";

              return (
                <Reveal className={layoutClass} delay={index * 0.07} key={image.src}>
                  <div className="architect-frame panel relative h-full min-h-[18rem]">
                    <Image
                      alt={image.alt}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      src={image.src}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="app-container">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <SectionHeading
                title="نتائج العمل"
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {project.results.map((result, index) => (
                  <Reveal className="panel px-6 py-6" delay={index * 0.07} key={result.label}>
                    <div className="text-5xl font-bold text-primary">
                      <AnimatedCounter
                        prefix={result.prefix}
                        suffix={result.suffix}
                        value={result.value}
                      />
                    </div>
                    <p className="mt-3 font-display text-2xl font-bold text-text">{result.label}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal>
              <div className="panel flex h-full items-center justify-center px-8 py-10">
                <div className="w-full rounded-[1.75rem] border border-line/80 px-8 py-10 text-center">
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <FeatureIcon className="size-8" name="badge" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-bold text-text">{project.awardTitle}</h3>
                  <p className="mt-4 leading-8 text-text-muted">{project.awardDescription}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="app-container">
          <div className="mb-10">
            <SectionHeading
              eyebrow="مشاريع ذات صلة"
              title="مشاريع أخرى من نفس مستوى العناية والهوية"
            />
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {relatedProjects.map((related, index) => (
              <ProjectCard
                compact
                delay={index * 0.08}
                key={related.slug}
                project={related}
              />
            ))}
          </div>
        </div>
      </section>

      <ContactCtaSection />
    </>
  );
}
