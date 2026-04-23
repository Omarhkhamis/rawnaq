import type {
  FaqItem,
  IconKey,
  Metric,
  Project,
  ProjectCategory,
  Service,
  Value,
  WorkflowStep,
} from "@/data/site";

export type FeatureIconKey = IconKey | "calculator" | "calendar" | "folder" | "file";

export type SocialLink = {
  label: string;
  href: string;
  platform: string;
};

export type GeneralSettingsData = {
  name: string;
  shortName: string;
  englishName: string;
  description: string;
  logoPath: string;
  faviconPath: string;
  quoteButtonLabel: string;
  socialLinks: SocialLink[];
};

export type HeroSectionData = {
  heading: string;
  description: string;
  highlights: string[];
  stats: Metric[];
  featuredProjectSlug: string | null;
  badgeText: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  floatingLabel: string;
  floatingTitle: string;
  backgroundImage: string;
  backgroundAlt: string;
};

export type AboutHighlight = {
  title: string;
  description?: string;
};

export type AboutSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  badgeTitle: string;
  badgeLabels: string[];
  highlights: AboutHighlight[];
  points: string[];
};

export type ServicesSectionData = {
  eyebrow: string;
  title: string;
  description?: string;
  items: Service[];
};

export type WorkflowSectionData = {
  eyebrow: string;
  title: string;
  summaryTitle: string;
  summaryDescription: string;
  ctaLabel: string;
  items: WorkflowStep[];
};

export type WhyRawnaqItem = {
  title: string;
  description: string;
  icon: FeatureIconKey;
};

export type WhyRawnaqSectionData = {
  eyebrow: string;
  title: string;
  watermark: string;
  items: WhyRawnaqItem[];
};

export type ValuesSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  watermark: string;
  items: Value[];
};

export type FaqSectionData = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

export type ContactSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;
  workingHoursLabel: string;
  phone: string;
  email: string;
  address: string;
  workingDays: string;
  workingHours: string;
};

export type FooterSectionData = {
  iconPath: string;
  description: string;
  quickLinksTitle: string;
  servicesTitle: string;
  contactTitle: string;
  projectsLinkLabel: string;
  services: string[];
  copyrightText: string;
};

export type DashboardProject = Project & {
  id: string;
  homeOrder: number | null;
  showOnHome: boolean;
};

export type MediaAsset = {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  path: string;
  url: string;
  altText: string;
  createdAt: string;
};

export type DashboardSections = {
  generalSettings: GeneralSettingsData;
  hero: HeroSectionData;
  about: AboutSectionData;
  services: ServicesSectionData;
  workflow: WorkflowSectionData;
  whyRawnaq: WhyRawnaqSectionData;
  values: ValuesSectionData;
  faq: FaqSectionData;
  contact: ContactSectionData;
  footer: FooterSectionData;
};

export type DashboardSectionKey = keyof DashboardSections;

export type DashboardSnapshot = {
  sections: DashboardSections;
  projects: DashboardProject[];
  media: MediaAsset[];
};

export type PublicSiteContent = {
  navigation: ReadonlyArray<{ label: string; href: string }>;
  projectCategories: ReadonlyArray<{ key: ProjectCategory; label: string }>;
  sections: DashboardSections;
  projects: DashboardProject[];
  featuredProjects: DashboardProject[];
  heroProject: DashboardProject | null;
};

