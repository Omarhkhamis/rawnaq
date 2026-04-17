import { AboutSection } from "@/components/sections/about-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { HomeFaqSection } from "@/components/sections/home-faq-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HomeHero } from "@/components/sections/home-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ValuesSection } from "@/components/sections/values-section";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ValuesSection />
      <FeaturedProjectsSection />
      <HomeFaqSection />
      <ContactCtaSection />
    </>
  );
}
