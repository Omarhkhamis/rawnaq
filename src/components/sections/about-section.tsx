import Image from "next/image";
import { Check } from "lucide-react";

import type { Metric } from "@/data/site";
import type { AboutSectionData } from "@/lib/content/types";
import { AnimatedCounter } from "@/components/ui/counter";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type AboutSectionProps = {
  section: AboutSectionData;
  stats: Metric[];
};

export function AboutSection({ section, stats }: AboutSectionProps) {
  return (
    <section className="section-space" id="about">
      <div className="app-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="relative">
            <ParallaxMedia className="architect-frame panel aspect-[4/5] min-h-[28rem]">
              <Image
                alt={section.imageAlt}
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                src={section.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/45 to-transparent" />
            </ParallaxMedia>

            <div className="panel absolute -bottom-6 right-6 max-w-[16rem] px-5 py-5">
              <p className="text-sm text-text-muted">{section.badgeTitle}</p>
              <div className="mt-3 flex items-end gap-4">
                <div>
                  <div className="text-4xl font-bold text-primary">
                    <AnimatedCounter suffix={stats[0]?.suffix} value={stats[0]?.value ?? 0} />
                  </div>
                  <p className="text-sm text-text-muted">{section.badgeLabels[0] ?? ""}</p>
                </div>
                <div className="h-12 w-px bg-line" />
                <div>
                  <div className="text-4xl font-bold text-primary">
                    <AnimatedCounter suffix={stats[1]?.suffix} value={stats[1]?.value ?? 0} />
                  </div>
                  <p className="text-sm text-text-muted">{section.badgeLabels[1] ?? ""}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
            />

            <Reveal delay={0.08}>
              <div className="grid gap-4 md:grid-cols-2">
                {section.highlights.map((item) => (
                  <div className="panel px-5 py-6" key={item.title}>
                    <p className="text-center font-display text-lg font-bold leading-[1.5] text-text md:text-start md:text-xl">{item.title}</p>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-7 text-text-muted">{item.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="space-y-3">
              {section.points.map((point, index) => (
                <Reveal className="panel flex items-start gap-3 px-5 py-4" delay={0.12 + index * 0.06} key={point}>
                  <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <Check className="size-4" />
                  </span>
                  <p className="leading-8 text-text-muted">{point}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
