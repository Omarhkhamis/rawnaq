import { values } from "@/data/site";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ValuesSection() {
  return (
    <section className="section-space overflow-hidden">
      <div className="app-container">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="قيمنا الجوهرية"
            title="المبادئ التي تضبط أداء الفريق وتضمن اتساق النتيجة النهائية"
            description="ما يميز رونق ليس فقط المظهر المعماري، بل طريقة العمل التي تحافظ على الجودة والوقت والوضوح طوال دورة المشروع."
          />
          <div className="font-accent hidden text-8xl font-bold uppercase tracking-[0.2em] text-white/5 lg:block">
            Values
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal className="panel h-full px-6 py-7" delay={index * 0.08} key={value.title}>
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <FeatureIcon className="size-7" name={value.icon} />
              </span>
              <h3 className="mt-8 font-display text-2xl font-bold text-text">{value.title}</h3>
              <p className="mt-4 leading-8 text-text-muted">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
