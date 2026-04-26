import type { ContactSectionData } from "@/lib/content/types";
import { ContactForm } from "@/components/sections/contact-form";
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
          <div className="flex h-full items-center">
            <SectionHeading
              className="mx-auto max-w-2xl text-center"
              description={section.description}
              eyebrow={section.eyebrow}
              title={section.title}
            />
          </div>

          <Reveal delay={0.12}>
            <ContactForm framed={false} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
