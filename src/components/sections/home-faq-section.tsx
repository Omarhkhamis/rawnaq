import { FaqList } from "@/components/projects/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/site";

export function HomeFaqSection() {
  return (
    <section className="section-space">
      <div className="app-container">
        <SectionHeading
          align="center"
          eyebrow="أسئلة شائعة"
          title="إجابات مختصرة تساعد العميل على فهم المسار قبل بدء المشروع"
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <FaqList items={faqs} />
        </div>
      </div>
    </section>
  );
}
