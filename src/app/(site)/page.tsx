import { AboutSection } from "@/components/sections/about-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HomeFaqSection } from "@/components/sections/home-faq-section";
import { HomeHero } from "@/components/sections/home-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ValuesSection } from "@/components/sections/values-section";
import { WhyRawnaqSection } from "@/components/sections/why-rawnaq-section";
import { getPublicSiteContent } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getPublicSiteContent();
  const { sections } = content;

  return (
    <>
      <HomeHero project={content.heroProject} section={sections.hero} />
      <AboutSection section={sections.about} stats={sections.hero.stats} />
      <ServicesSection section={sections.services} />
      <ProcessSection section={sections.workflow} />
      <WhyRawnaqSection section={sections.whyRawnaq} />
      <ValuesSection section={sections.values} />
      <FeaturedProjectsSection projects={content.featuredProjects} />
      <HomeFaqSection section={sections.faq} />
      <ContactCtaSection section={sections.contact} />
    </>
  );
}

