import type { LucideIcon } from "lucide-react";
import { Calculator, CalendarCheck, FileCheck2, FolderOpen } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type WhyRawnaqPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const whyRawnaqPoints: WhyRawnaqPoint[] = [
  {
    title: "تسعير دقيق بالكميات",
    description:
      "نحسب تكلفة مشروعك بحساب دقيق عن طريق حصر الكميات بالضبط، وليس بسعر المتر العام. كل شيء واضح من البداية ولا توجد مفاجآت في السعر، إلا في حالة تعديل المخطط بعد التسعير.",
    icon: Calculator,
  },
  {
    title: "خطة زمنية مرحلية",
    description:
      "بعد التعاقد سيتم تزويدك بخطة زمنية مرحلية لكل بند من بنود مشروعك، مع تحديثها بشكل أسبوعي وضمان التزامنا بها.",
    icon: CalendarCheck,
  },
  {
    title: "توثيق يومي للأعمال",
    description:
      "سيتم تزويدك بملف درايف من قبلنا يحدث بشكل شبه يومي لأعمال مشروع منزلك، مع إرسال إشعار لك عبر الواتساب لتتمكن من الاحتفاظ بالصور ومراجعة جودة الأعمال.",
    icon: FolderOpen,
  },
  {
    title: "عقود وضمانات واضحة",
    description:
      "عند التعاقد معنا على المفتاح، عظم وتشطيب، سنزودك بعقود تنفيذية صادرة من هيئة المقاولين السعودية تحفظ حقك بشكل صارم، إضافة إلى ضمانات تمتد لعشر سنوات وعقد صيانة لمدة سنة مجاناً.",
    icon: FileCheck2,
  },
];

export function WhyRawnaqSection() {
  return (
    <section className="section-space bg-background-soft/35" id="why-rawnaq">
      <div className="app-container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <SectionHeading
            eyebrow="لماذا رونق؟"
            title="وضوح في التكلفة، التزام في التنفيذ، وتوثيق مستمر لكل مرحلة"
          />
          <div className="font-accent hidden text-left text-8xl font-bold uppercase text-white/5 lg:block">
            RONAQ
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {whyRawnaqPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <Reveal className="panel h-full px-6 py-7 md:px-7" delay={index * 0.08} key={point.title}>
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="size-6" strokeWidth={1.65} />
                  </span>
                  <div>
                    <h3 className="text-center font-display text-xl font-bold leading-[1.45] text-text md:text-start md:text-2xl">{point.title}</h3>
                    <p className="mt-3 leading-8 text-text-muted">{point.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
