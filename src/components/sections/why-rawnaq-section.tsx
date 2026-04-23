import type { WhyRawnaqSectionData } from "@/lib/content/types";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type WhyRawnaqSectionProps = {
  section: WhyRawnaqSectionData;
};

export function WhyRawnaqSection({ section }: WhyRawnaqSectionProps) {
  return (
    <section className="section-space bg-background-soft/35" id="why-rawnaq">
      <div className="app-container">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <SectionHeading eyebrow={section.eyebrow} title={section.title} />
          <div className="font-accent hidden text-left text-8xl font-bold uppercase text-white/5 lg:block">
            {section.watermark}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {section.items.map((point, index) => (
            <Reveal className="panel h-full px-6 py-7 md:px-7" delay={index * 0.08} key={point.title}>
              <div className="flex items-start gap-4">
                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <FeatureIcon className="size-6" name={point.icon} />
                </span>
                <div>
                  <h3 className="text-center font-display text-xl font-bold leading-[1.45] text-text md:text-start md:text-2xl">{point.title}</h3>
                  <p className="mt-3 leading-8 text-text-muted">{point.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
