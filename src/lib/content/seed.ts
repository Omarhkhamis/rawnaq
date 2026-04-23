import {
  faqs,
  heroHighlights,
  homeProjectHero,
  homeStats,
  navigation,
  projectCategories,
  projects,
  services,
  siteConfig,
  values,
  workflow,
} from "@/data/site";
import type {
  DashboardProject,
  DashboardSections,
  FooterSectionData,
  MediaAsset,
} from "@/lib/content/types";

export const seedNavigation = navigation;
export const seedProjectCategories = projectCategories;

const defaultLogoPath = "/uploads/rawnaq-logo.png";
const defaultFaviconPath = "/uploads/rawnaq-favicon.png";

export const seedSections: DashboardSections = {
  generalSettings: {
    name: siteConfig.name,
    shortName: siteConfig.shortName,
    englishName: siteConfig.englishName,
    description: siteConfig.description,
    logoPath: defaultLogoPath,
    faviconPath: defaultFaviconPath,
    quoteButtonLabel: "اطلب عرض سعر",
    socialLinks: siteConfig.socialLinks,
  },
  hero: {
    heading: "رونق.. تجسيد للذوق الرفيع في كل ما حولك",
    description:
      "شركة مقاولات متخصصة في بناء تجارب معمارية متكاملة تبدأ من الفكرة، وتعبر بالتصميم والتنفيذ، وتنتهي بتسليم يليق بطموح العميل.",
    highlights: heroHighlights,
    stats: homeStats,
    featuredProjectSlug: homeProjectHero.slug,
    badgeText: "مشروع مميز",
    primaryButtonLabel: "ابدأ مشروعك الآن",
    secondaryButtonLabel: "استكشف أعمالنا",
    floatingLabel: "من الفكرة إلى التسليم",
    floatingTitle: "حل متكامل تحت سقف واحد",
    backgroundImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA73YROwfkoBCB_nF4pNnHldL_wyQxh_ba8zx60aRCQAR-u8D-fRtsqIMnObd_mMkSxiys9YtIqii7jV5-QtXnlx8M3SBkR9Ee8o5OvZaXjjVWvRprdrS09ivqXuf5BsuFCOQ34yOtW0b8y8VCN74il8d9ZOusDWgpe9lLcn0hlncboEw1-eBkr9vEIt01yKqWQAPJtQa4FlFts-THMnf-DdUZybKPo_Cz3aecYIiD5i97bP6ZTDBlrfZSazk2aMpROomzQFlHEW9A",
    backgroundAlt: "برج معماري حديث بواجهة زجاجية في أجواء مسائية",
  },
  about: {
    eyebrow: "من نحن",
    title: "نحوّل التطلعات إلى واقع ملموس يتسم بالرقي والصلابة",
    description:
      "نحن شركة رائدة في قطاع المقاولات، نسعى دائماً لتقديم حلول مبتكرة تجمع بين العصرية والجمال. نؤمن بأن كل مبنى يروي قصة، ومهمتنا هي تحويل تطلعات عملائنا إلى واقع ملموس يتسم بالرقي والصلابة.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1nhPhpg-FrM8cFuwb3w3llf3sw39EHrQzMb2zOjaT8AHWFlUBeNKkaX4Us1i0dSRuzeYyeywLjSo7YuRMyP_-KuPFQ3ToPQ21onWG-jZMaXvwv6jWVE4KK5fCpGvj3hIa-Mkhd6geMi-x_Lj2WNU6U5a2GMttZAA55v5nvijsZRh5-QSiW8Fm_i_2X2PB8euZgRuredepskj3oySgsLizWzwdgStAxnsFkuxElcq60dQ4X1fxoi8voA34st9azgNBWGlySWVRBy4",
    imageAlt: "فراغ معماري داخلي بخطوط خرسانية وإضاءة طبيعية",
    badgeTitle: "سجل إنجاز متنامٍ",
    badgeLabels: ["سنوات خبرة", "مشروع مكتمل"],
    highlights: [
      {
        title: "رؤية تنفيذية دقيقة",
        description:
          "نقرأ المشروع كمنظومة واحدة: تكلفة، جودة، تجربة مستخدم، وهوية بصرية.",
      },
      {
        title: "حضور ميداني مستمر",
        description:
          "فرق إشراف ومتابعة يومية تمنع التراكمات وتسرّع اتخاذ القرار أثناء التنفيذ.",
      },
    ],
    points: [
      "إدارة متكاملة للمشروع من التخطيط وحتى الإقفال.",
      "تنسيق يومي بين التصميم والتنفيذ والموردين.",
      "تقارير تقدم واضحة تضبط الجودة والتكلفة والوقت.",
    ],
  },
  services: {
    eyebrow: "خدماتنا الهندسية",
    title: "نظام خدمات مصمم ليقود المشروع بدقة من أول قرار إلى آخر تفصيلة",
    items: services,
  },
  workflow: {
    eyebrow: "مسار العمل",
    title: "آلية تنفيذ مدروسة تمنح العميل وضوحاً وثقة في كل مرحلة",
    summaryTitle: "تنسيق واحد لكل التخصصات",
    summaryDescription:
      "الهدف هو تقليل الفجوة بين ما يُعتمد على الورق وما يُنفذ في الموقع، مع ضبط الجودة والزمن والتكلفة ضمن مسار واحد.",
    ctaLabel: "ناقش مشروعك معنا",
    items: workflow,
  },
  whyRawnaq: {
    eyebrow: "لماذا رونق؟",
    title: "وضوح في التكلفة، التزام في التنفيذ، وتوثيق مستمر لكل مرحلة",
    watermark: "RONAQ",
    items: [
      {
        title: "تسعير دقيق بالكميات",
        description:
          "نحسب تكلفة مشروعك بحساب دقيق عن طريق حصر الكميات بالضبط، وليس بسعر المتر العام. كل شيء واضح من البداية ولا توجد مفاجآت في السعر.",
        icon: "calculator",
      },
      {
        title: "خطة زمنية مرحلية",
        description:
          "بعد التعاقد سيتم تزويدك بخطة زمنية مرحلية لكل بند من بنود مشروعك، مع تحديثها بشكل أسبوعي وضمان التزامنا بها.",
        icon: "calendar",
      },
      {
        title: "توثيق يومي للأعمال",
        description:
          "سيتم تزويدك بملف درايف من قبلنا يُحدّث بشكل شبه يومي لأعمال مشروع منزلك، مع إرسال إشعار لك عبر الواتساب لمراجعة الصور وجودة الأعمال.",
        icon: "folder",
      },
      {
        title: "عقود وضمانات واضحة",
        description:
          "عند التعاقد معنا سنزودك بعقود تنفيذية وضمانات تحفظ حقك بشكل صارم، إضافة إلى ضمانات تمتد لعشر سنوات وعقد صيانة لمدة سنة.",
        icon: "file",
      },
    ],
  },
  values: {
    eyebrow: "قيمنا الجوهرية",
    title: "المبادئ التي تضبط أداء الفريق وتضمن اتساق النتيجة النهائية",
    description:
      "ما يميز رونق ليس فقط المظهر المعماري، بل طريقة العمل التي تحافظ على الجودة والوقت والوضوح طوال دورة المشروع.",
    watermark: "Values",
    items: values,
  },
  faq: {
    eyebrow: "أسئلة شائعة",
    title: "إجابات مختصرة تساعد العميل على فهم المسار قبل بدء المشروع",
    items: faqs,
  },
  contact: {
    eyebrow: "تواصل معنا",
    title: "نبني أحلامكم بدقة هندسية وروح إبداعية",
    description:
      "نحن هنا للإجابة على استفساراتكم ومناقشة مشروعكم القادم. فريقنا جاهز لتقديم الاستشارات الفنية المتخصصة خلال 24 ساعة عمل.",
    primaryButtonLabel: "اتصل الآن",
    secondaryButtonLabel: "راسلنا بالبريد",
    phoneLabel: "الهاتف",
    emailLabel: "البريد",
    addressLabel: "العنوان",
    workingHoursLabel: "أوقات العمل",
    phone: siteConfig.phone,
    email: siteConfig.email,
    address: siteConfig.address,
    workingDays: siteConfig.workingDays,
    workingHours: siteConfig.workingHours,
  },
  footer: {
    iconPath: defaultLogoPath,
    description:
      "نحن نبني بأسلوب يتجاوز مجرد التشييد؛ نصمم وننفذ مساحات تعكس قيمة العميل وتخدم أهدافه التشغيلية والجمالية.",
    quickLinksTitle: "روابط سريعة",
    servicesTitle: "الخدمات",
    contactTitle: "اتصل بنا",
    projectsLinkLabel: "استعراض المشاريع",
    services: services.slice(0, 4).map((service) => service.title),
    copyrightText: "© 2026 رونق للمقاولات. جميع الحقوق محفوظة.",
  },
};

export const seedProjects: DashboardProject[] = projects.map((project, index) => ({
  ...project,
  id: `project-${project.slug}`,
  homeOrder: index < 4 ? index + 1 : null,
  showOnHome: index < 4,
}));

export const seedFooter = seedSections.footer satisfies FooterSectionData;

export const initialMediaBlueprint: Array<
  Omit<MediaAsset, "id" | "createdAt" | "sizeBytes"> & { sourcePath: string }
> = [
  {
    sourcePath: "public/brand/rawnaq-logo.png",
    fileName: "rawnaq-logo.png",
    originalName: "rawnaq-logo.png",
    mimeType: "image/png",
    path: "public/uploads/rawnaq-logo.png",
    url: defaultLogoPath,
    altText: "شعار رونق",
  },
  {
    sourcePath: "public/brand/rawnaq-favicon.png",
    fileName: "rawnaq-favicon.png",
    originalName: "rawnaq-favicon.png",
    mimeType: "image/png",
    path: "public/uploads/rawnaq-favicon.png",
    url: defaultFaviconPath,
    altText: "أيقونة رونق",
  },
];

