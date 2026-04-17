import Image from "next/image";
import { Check } from "lucide-react";

import { homeStats } from "@/data/site";
import { AnimatedCounter } from "@/components/ui/counter";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const aboutPoints = [
  "إدارة متكاملة للمشروع من التخطيط وحتى الإقفال.",
  "تنسيق يومي بين التصميم والتنفيذ والموردين.",
  "تقارير تقدم واضحة تضبط الجودة والتكلفة والوقت.",
];

export function AboutSection() {
  return (
    <section className="section-space" id="about">
      <div className="app-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="relative">
            <ParallaxMedia className="architect-frame panel aspect-[4/5] min-h-[28rem]">
              <Image
                alt="فراغ معماري داخلي بخطوط خرسانية وإضاءة طبيعية"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1nhPhpg-FrM8cFuwb3w3llf3sw39EHrQzMb2zOjaT8AHWFlUBeNKkaX4Us1i0dSRuzeYyeywLjSo7YuRMyP_-KuPFQ3ToPQ21onWG-jZMaXvwv6jWVE4KK5fCpGvj3hIa-Mkhd6geMi-x_Lj2WNU6U5a2GMttZAA55v5nvijsZRh5-QSiW8Fm_i_2X2PB8euZgRuredepskj3oySgsLizWzwdgStAxnsFkuxElcq60dQ4X1fxoi8voA34st9azgNBWGlySWVRBy4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/45 to-transparent" />
            </ParallaxMedia>

            <div className="panel absolute -bottom-6 right-6 max-w-[16rem] px-5 py-5">
              <p className="text-sm text-text-muted">سجل إنجاز متنامٍ</p>
              <div className="mt-3 flex items-end gap-4">
                <div>
                  <div className="text-4xl font-bold text-primary">
                    <AnimatedCounter suffix="+" value={homeStats[0].value} />
                  </div>
                  <p className="text-sm text-text-muted">سنوات خبرة</p>
                </div>
                <div className="h-12 w-px bg-line" />
                <div>
                  <div className="text-4xl font-bold text-primary">
                    <AnimatedCounter suffix="+" value={homeStats[1].value} />
                  </div>
                  <p className="text-sm text-text-muted">مشروع مكتمل</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <SectionHeading
              eyebrow="من نحن"
              title="نحوّل التطلعات إلى واقع ملموس يتسم بالرقي والصلابة"
              description="نحن شركة رائدة في قطاع المقاولات، نسعى دائماً لتقديم حلول مبتكرة تجمع بين العصرية والجمال. نؤمن بأن كل مبنى يروي قصة، ومهمتنا هي تحويل تطلعات عملائنا إلى واقع ملموس يتسم بالرقي والصلابة."
            />

            <Reveal delay={0.08}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="panel px-5 py-6">
                  <p className="font-display text-xl font-bold text-text">رؤية تنفيذية دقيقة</p>
                  <p className="mt-2 text-sm leading-7 text-text-muted">
                    نقرأ المشروع كمنظومة واحدة: تكلفة، جودة، تجربة مستخدم، وهوية بصرية.
                  </p>
                </div>
                <div className="panel px-5 py-6">
                  <p className="font-display text-xl font-bold text-text">حضور ميداني مستمر</p>
                  <p className="mt-2 text-sm leading-7 text-text-muted">
                    فرق إشراف ومتابعة يومية تمنع التراكمات وتسرّع اتخاذ القرار أثناء التنفيذ.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-3">
              {aboutPoints.map((point, index) => (
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
