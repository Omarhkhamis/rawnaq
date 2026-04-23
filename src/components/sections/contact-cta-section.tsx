import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import type { ContactSectionData } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type ContactCtaSectionProps = {
  section: ContactSectionData;
};

export function ContactCtaSection({ section }: ContactCtaSectionProps) {
  return (
    <section className="section-space" id="contact">
      <div className="app-container">
        <div className="architect-frame panel grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="space-y-6">
            <SectionHeading
              description={section.description}
              eyebrow={section.eyebrow}
              title={section.title}
            />

            <Reveal delay={0.12}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href={`tel:${section.phone}`} size="lg">
                  {section.primaryButtonLabel}
                </Button>
                <Button href={`mailto:${section.email}`} size="lg" variant="outline">
                  {section.secondaryButtonLabel}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Reveal className="panel px-5 py-5" delay={0.06}>
              <div className="flex items-center gap-3 text-primary">
                <Phone className="size-4" />
                <span className="text-sm font-semibold">{section.phoneLabel}</span>
              </div>
              <p className="mt-4 text-lg font-bold text-text">{section.phone}</p>
            </Reveal>

            <Reveal className="panel px-5 py-5" delay={0.12}>
              <div className="flex items-center gap-3 text-primary">
                <Mail className="size-4" />
                <span className="text-sm font-semibold">{section.emailLabel}</span>
              </div>
              <p className="mt-4 text-lg font-bold text-text">{section.email}</p>
            </Reveal>

            <Reveal className="panel px-5 py-5" delay={0.18}>
              <div className="flex items-center gap-3 text-primary">
                <MapPin className="size-4" />
                <span className="text-sm font-semibold">{section.addressLabel}</span>
              </div>
              <p className="mt-4 text-lg font-bold leading-8 text-text">{section.address}</p>
            </Reveal>

            <Reveal className="panel px-5 py-5" delay={0.24}>
              <div className="flex items-center gap-3 text-primary">
                <Clock3 className="size-4" />
                <span className="text-sm font-semibold">{section.workingHoursLabel}</span>
              </div>
              <p className="mt-4 text-lg font-bold text-text">{section.workingDays}</p>
              <p className="mt-1 text-text-muted">{section.workingHours}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
