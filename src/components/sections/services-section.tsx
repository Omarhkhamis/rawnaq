import Image from "next/image";

import { services } from "@/data/site";
import { cn } from "@/lib/utils";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const layoutMap = {
  featured: "lg:col-span-2 lg:row-span-2 min-h-[24rem]",
  standard: "min-h-[18rem]",
  wide: "lg:col-span-2 min-h-[18rem]",
} as const;

export function ServicesSection() {
  return (
    <section className="section-space" id="services">
      <div className="app-container">
        <SectionHeading
          align="center"
          className="max-w-5xl"
          eyebrow="خدماتنا الهندسية"
          title="نظام خدمات مصمم ليقود المشروع بدقة من أول قرار إلى آخر تفصيلة"
          titleClassName="text-3xl leading-[1.42] md:text-4xl md:leading-[1.38]"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal
              className={cn(
                "panel flex h-full flex-col justify-between px-6 py-7 md:px-8 md:py-9",
                layoutMap[service.layout],
              )}
              delay={index * 0.06}
              key={service.title}
            >
              <div className="flex items-center justify-between">
                <span className="font-accent text-[0.7rem] uppercase tracking-[0.35em] text-primary">
                  {service.eyebrow}
                </span>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/6 text-primary">
                  <FeatureIcon className="size-6" name={service.icon} />
                </span>
              </div>

              {service.image ? (
                <div className="relative my-8 aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/20">
                  <Image
                    alt={service.imageAlt ?? service.title}
                    className="object-cover object-center"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    src={service.image}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,19,19,0.08),rgba(20,19,19,0.16)_55%,rgba(20,19,19,0.5))]" />
                </div>
              ) : null}

              <div className={cn(service.image ? "mt-0" : "mt-10")}>
                <h3 className="text-center font-display text-xl font-bold leading-[1.45] text-text md:text-start md:text-2xl md:leading-[1.4]">
                  {service.title}
                </h3>
                <p className="mt-4 leading-8 text-text-muted">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
