import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ContactCtaSection() {
  return (
    <section className="section-space" id="contact">
      <div className="app-container">
        <div className="architect-frame panel grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="تواصل معنا"
              title="نبني أحلامكم بدقة هندسية وروح إبداعية"
              description="نحن هنا للإجابة على استفساراتكم ومناقشة مشروعكم القادم. فريقنا جاهز لتقديم الاستشارات الفنية المتخصصة خلال 24 ساعة عمل."
            />

            <Reveal delay={0.12}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href={`tel:${siteConfig.phone}`} size="lg">
                  اتصل الآن
                </Button>
                <Button href={`mailto:${siteConfig.email}`} size="lg" variant="outline">
                  راسلنا بالبريد
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Reveal className="panel px-5 py-5" delay={0.06}>
              <div className="flex items-center gap-3 text-primary">
                <Phone className="size-4" />
                <span className="text-sm font-semibold">الهاتف</span>
              </div>
              <p className="mt-4 text-lg font-bold text-text">{siteConfig.phone}</p>
            </Reveal>

            <Reveal className="panel px-5 py-5" delay={0.12}>
              <div className="flex items-center gap-3 text-primary">
                <Mail className="size-4" />
                <span className="text-sm font-semibold">البريد</span>
              </div>
              <p className="mt-4 text-lg font-bold text-text">{siteConfig.email}</p>
            </Reveal>

            <Reveal className="panel px-5 py-5" delay={0.18}>
              <div className="flex items-center gap-3 text-primary">
                <MapPin className="size-4" />
                <span className="text-sm font-semibold">العنوان</span>
              </div>
              <p className="mt-4 text-lg font-bold leading-8 text-text">{siteConfig.address}</p>
            </Reveal>

            <Reveal className="panel px-5 py-5" delay={0.24}>
              <div className="flex items-center gap-3 text-primary">
                <Clock3 className="size-4" />
                <span className="text-sm font-semibold">أوقات العمل</span>
              </div>
              <p className="mt-4 text-lg font-bold text-text">{siteConfig.workingDays}</p>
              <p className="mt-1 text-text-muted">{siteConfig.workingHours}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
