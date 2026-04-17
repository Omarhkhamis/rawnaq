import { workflow } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProcessSection() {
  return (
    <section className="section-space">
      <div className="app-container">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            <SectionHeading
              eyebrow="مسار العمل"
              title="آلية تنفيذ مدروسة تمنح العميل وضوحاً وثقة في كل مرحلة"
            />
            <Reveal delay={0.1}>
              <div className="panel px-6 py-6">
                <p className="font-display text-2xl font-bold text-text">تنسيق واحد لكل التخصصات</p>
                <p className="mt-3 leading-8 text-text-muted">
                  الهدف هو تقليل الفجوة بين ما يُعتمد على الورق وما يُنفذ في الموقع، مع ضبط الجودة والزمن والتكلفة ضمن مسار واحد.
                </p>
                <Button className="mt-5" href="/#contact" variant="outline">
                  ناقش مشروعك معنا
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="space-y-4">
            {workflow.map((item, index) => (
              <Reveal className="panel px-6 py-6 md:px-8" delay={index * 0.08} key={item.step}>
                <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
                  <div className="font-accent text-5xl font-bold leading-none text-primary/85">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-text">{item.title}</h3>
                    <p className="mt-3 max-w-2xl leading-8 text-text-muted">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
