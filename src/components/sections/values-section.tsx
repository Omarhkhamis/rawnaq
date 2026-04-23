import type { ValuesSectionData } from "@/lib/content/types";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type ValuesSectionProps = {
  section: ValuesSectionData;
};

export function ValuesSection({ section }: ValuesSectionProps) {
  return (
    <section className="section-space overflow-hidden">
      <div className="app-container">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description={section.description}
            eyebrow={section.eyebrow}
            title={section.title}
          />
          <div className="font-accent hidden text-8xl font-bold uppercase tracking-[0.2em] text-white/5 lg:block">
            {section.watermark}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {section.items.map((value, index) => (
            <Reveal className="panel h-full px-6 py-7" delay={index * 0.08} key={value.title}>
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <FeatureIcon className="size-7" name={value.icon} />
              </span>
              <h3 className="mt-8 text-center font-display text-xl font-bold leading-[1.45] text-text md:text-start md:text-2xl">{value.title}</h3>
              <p className="mt-4 leading-8 text-text-muted">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
