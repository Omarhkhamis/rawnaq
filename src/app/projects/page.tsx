import type { Metadata } from "next";
import Image from "next/image";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { AnimatedCounter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqList } from "@/components/projects/faq-list";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { faqs, projects } from "@/data/site";

export const metadata: Metadata = {
  title: "مشاريعنا",
  description: "استكشف مجموعة مختارة من مشاريع رونق السكنية والتجارية بتجربة عرض احترافية وحديثة.",
};

const projectMetrics = [
  { value: 2, label: "قطاعات رئيسية", suffix: "" },
  { value: 4, label: "دراسات حالة معروضة", suffix: "" },
  { value: 100, label: "تركيز على الجودة", suffix: "%" },
];

export default function ProjectsPage() {
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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk_qoPCt4mgeQT6uXvb9pBf6_m15ttUnew-1lZ_LtYgM9xRDPPzQRqnssqqjMyOcFQgnuQl53otb1rfaEoPsGe9ESUoCb2f6pVxIa1zQL_maxSCOyXMBvHGMLfuCFDEPrU067b7ApTJaYU1J9BsG_YfsXbtA-JwCfVcouvPMCnQdShqzmIuPuYXQRN0ujaHQRc7ZdYUCFBULR3eD0VDakwwvo2kX9sF14VdIrunbeYPO2CBqoT3Iwn_rtz8vADB88uDUmvyZluQas"
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
            eyebrow="معرض الأعمال"
            title="استكشف مجموعة مختارة من إبداعاتنا في مختلف القطاعات"
            description="تم تحويل صفحة المشاريع إلى تجربة أكثر تفاعلية مع فلاتر سريعة، بطاقات قوية بصرياً، ومسار مباشر للوصول إلى صفحات المشاريع التفصيلية."
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
            eyebrow="أسئلة شائعة"
            title="إجابات واضحة تسرّع اتخاذ القرار قبل البدء"
          />
          <div className="mx-auto mt-12 max-w-4xl">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <ContactCtaSection />
    </>
  );
}
