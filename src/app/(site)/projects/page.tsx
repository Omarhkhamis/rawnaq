import type { Metadata } from "next";
import Image from "next/image";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { FaqList } from "@/components/projects/faq-list";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { AnimatedCounter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPublicSiteContent } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مشاريعنا",
  description: "استكشف مجموعة مختارة من مشاريع رونق السكنية والتجارية بتجربة عرض احترافية وحديثة.",
};

export default async function ProjectsPage() {
  const content = await getPublicSiteContent();
  const projects = content.projects;
  const uniqueCategories = new Set(projects.map((project) => project.category)).size;
  const projectMetrics = [
    { value: uniqueCategories, label: "قطاعات رئيسية", suffix: "" },
    { value: projects.length, label: "دراسات حالة معروضة", suffix: "" },
    { value: 100, label: "تركيز على الجودة", suffix: "%" },
  ];
  const backgroundImage =
    projects[0]?.cardImage ??
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCk_qoPCt4mgeQT6uXvb9pBf6_m15ttUnew-1lZ_LtYgM9xRDPPzQRqnssqqjMyOcFQgnuQl53otb1rfaEoPsGe9ESUoCb2f6pVxIa1zQL_maxSCOyXMBvHGMLfuCFDEPrU067b7ApTJaYU1J9BsG_YfsXbtA-JwCfVcouvPMCnQdShqzmIuPuYXQRN0ujaHQRc7ZdYUCFBULR3eD0VDakwwvo2kX9sF14VdIrunbeYPO2CBqoT3Iwn_rtz8vADB88uDUmvyZluQas";

  return (
    <>
      <section className="relative overflow-hidden pt-36">
        <div className="absolute inset-0">
          <Image
            alt="كتلة معمارية حديثة بخطوط هندسية حادة"
            className="object-cover object-center opacity-35"
            fill
            priority
            sizes="100vw"
            src={backgroundImage}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-background/55 to-background" />
        </div>

        <div className="app-container relative py-20 md:py-28">
          <Reveal>
            <div className="max-w-4xl space-y-6">
              <span className="font-accent text-sm uppercase tracking-[0.45em] text-primary">
                Architectural Excellence
              </span>
              <h1 className="text-center font-display text-4xl font-bold leading-[1.35] tracking-normal text-text md:text-start md:text-6xl md:leading-[1.25]">
                مشاريعنا
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-text-muted">
                تجسيد للرؤية العمرانية المعاصرة، حيث تلتقي الدقة الإنشائية بالفخامة المعمارية لتشكيل معالم الغد.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-8">
        <div className="app-container">
          <SectionHeading
            description="تم تحويل صفحة المشاريع إلى تجربة أكثر تفاعلية مع فلاتر سريعة، بطاقات قوية بصرياً، ومسار مباشر للوصول إلى صفحات المشاريع التفصيلية."
            eyebrow="معرض الأعمال"
            title="استكشف مجموعة مختارة من إبداعاتنا في مختلف القطاعات"
          />
          <div className="mt-10">
            <ProjectsExplorer projects={projects} />
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="app-container">
          <div className="grid gap-4 md:grid-cols-3">
            {projectMetrics.map((metric, index) => (
              <Reveal className="panel px-6 py-6" delay={index * 0.08} key={metric.label}>
                <div className="text-5xl font-bold text-primary">
                  <AnimatedCounter suffix={metric.suffix} value={metric.value} />
                </div>
                <p className="mt-3 text-center font-display text-xl font-bold leading-[1.45] text-text md:text-start md:text-2xl">{metric.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="app-container">
          <SectionHeading
            align="center"
            eyebrow={content.sections.faq.eyebrow}
            title={content.sections.faq.title}
          />
          <div className="mx-auto mt-12 max-w-4xl">
            <FaqList items={content.sections.faq.items} />
          </div>
        </div>
      </section>

      <ContactCtaSection section={content.sections.contact} />
    </>
  );
}

