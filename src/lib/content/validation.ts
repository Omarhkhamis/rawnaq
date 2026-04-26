import { z } from "zod";

import type { DashboardSectionKey } from "@/lib/content/types";

const siteIconSchema = z.enum([
  "drafting",
  "paint",
  "structure",
  "ruler",
  "shield",
  "window",
  "sofa",
  "badge",
  "clock",
  "handshake",
  "sparkles",
  "layers",
  "building",
  "home",
]);

const featureIconSchema = z.enum([
  ...siteIconSchema.options,
  "calculator",
  "calendar",
  "folder",
  "file",
]);

const metricSchema = z.object({
  value: z.number(),
  suffix: z.string().optional(),
  prefix: z.string().optional(),
  label: z.string(),
  description: z.string().optional(),
});

const socialLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  platform: z.string(),
});

const serviceSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: siteIconSchema,
  eyebrow: z.string(),
  layout: z.enum(["featured", "standard", "wide"]),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const workflowStepSchema = z.object({
  step: z.string(),
  title: z.string(),
  description: z.string(),
});

const valueSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: siteIconSchema,
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const projectImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

const projectMaterialSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: siteIconSchema,
});

const generalSettingsSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  englishName: z.string(),
  description: z.string(),
  logoPath: z.string(),
  faviconPath: z.string(),
  quoteButtonLabel: z.string(),
  whatsappUrl: z.string().optional().default(""),
  socialLinks: z.array(socialLinkSchema),
});

const heroSectionSchema = z.object({
  heading: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  stats: z.array(metricSchema),
  featuredProjectSlug: z.string().nullable(),
  badgeText: z.string(),
  primaryButtonLabel: z.string(),
  secondaryButtonLabel: z.string(),
  floatingLabel: z.string(),
  floatingTitle: z.string(),
  backgroundImage: z.string(),
  backgroundAlt: z.string(),
});

const aboutSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  badgeTitle: z.string(),
  badgeLabels: z.array(z.string()),
  highlights: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  ),
  points: z.array(z.string()),
});

const servicesSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(serviceSchema),
});

const workflowSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  summaryTitle: z.string(),
  summaryDescription: z.string(),
  ctaLabel: z.string(),
  items: z.array(workflowStepSchema),
});

const whyRawnaqSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  watermark: z.string(),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: featureIconSchema,
    }),
  ),
});

const valuesSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  watermark: z.string(),
  items: z.array(valueSchema),
});

const faqSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  items: z.array(faqItemSchema),
});

const contactSectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  primaryButtonLabel: z.string(),
  secondaryButtonLabel: z.string(),
  phoneLabel: z.string(),
  emailLabel: z.string(),
  addressLabel: z.string(),
  workingHoursLabel: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  workingDays: z.string(),
  workingHours: z.string(),
});

const footerSectionSchema = z.object({
  iconPath: z.string(),
  description: z.string(),
  quickLinksTitle: z.string(),
  servicesTitle: z.string(),
  contactTitle: z.string(),
  projectsLinkLabel: z.string(),
  services: z.array(z.string()),
  copyrightText: z.string(),
});

export const dashboardSectionSchemas = {
  generalSettings: generalSettingsSchema,
  hero: heroSectionSchema,
  about: aboutSectionSchema,
  services: servicesSectionSchema,
  workflow: workflowSectionSchema,
  whyRawnaq: whyRawnaqSectionSchema,
  values: valuesSectionSchema,
  faq: faqSectionSchema,
  contact: contactSectionSchema,
  footer: footerSectionSchema,
} satisfies Record<DashboardSectionKey, z.ZodTypeAny>;

export const dashboardProjectSchema = z.object({
  id: z.string().optional().default(""),
  slug: z.string().default(""),
  category: z.enum(["residential", "commercial"]),
  categoryLabel: z.string(),
  title: z.string(),
  subtitle: z.string(),
  excerpt: z.string(),
  heroLabel: z.string(),
  location: z.string(),
  area: z.string(),
  duration: z.string(),
  status: z.string(),
  year: z.string(),
  heroImage: z.string(),
  heroAlt: z.string(),
  cardImage: z.string(),
  overview: z.string(),
  challenge: z.string(),
  solution: z.string(),
  deliverables: z.array(z.string()),
  gallery: z.array(projectImageSchema),
  materials: z.array(projectMaterialSchema),
  results: z.array(metricSchema),
  awardTitle: z.string(),
  awardDescription: z.string(),
  homeOrder: z.number().nullable().default(null),
  showOnHome: z.boolean().default(false),
});

export const featuredSlotsSchema = z.array(
  z.object({
    slot: z.number().min(1).max(4),
    projectId: z.string().nullable(),
  }),
);
