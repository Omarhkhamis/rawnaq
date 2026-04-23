import type { FaqSectionData } from "@/lib/content/types";
import { FaqList } from "@/components/projects/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";

type HomeFaqSectionProps = {
  section: FaqSectionData;
};

export function HomeFaqSection({ section }: HomeFaqSectionProps) {
  return (
    <section className="section-space">
      <div className="app-container">
        <SectionHeading
          align="center"
          eyebrow={section.eyebrow}
          title={section.title}
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <FaqList items={section.items} />
        </div>
      </div>
    </section>
  );
}
