export type ProjectCategory = "all" | "residential" | "commercial";

export type IconKey =
  | "drafting"
  | "paint"
  | "structure"
  | "ruler"
  | "shield"
  | "window"
  | "sofa"
  | "badge"
  | "clock"
  | "handshake"
  | "sparkles"
  | "layers"
  | "building"
  | "home";

export type Metric = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
};

export type Service = {
  title: string;
  description: string;
  icon: IconKey;
  eyebrow: string;
  layout: "featured" | "standard" | "wide";
  image?: string;
  imageAlt?: string;
};

export type Value = {
  title: string;
  description: string;
  icon: IconKey;
};

export type WorkflowStep = {
  step: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProjectMaterial = {
  title: string;
  description: string;
  icon: IconKey;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  category: Exclude<ProjectCategory, "all">;
  categoryLabel: string;
  title: string;
  subtitle: string;
  excerpt: string;
  heroLabel: string;
  location: string;
  area: string;
  duration: string;
  status: string;
  year: string;
  heroImage: string;
  heroAlt: string;
  cardImage: string;
  overview: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  gallery: ProjectImage[];
  materials: ProjectMaterial[];
  results: Metric[];
  awardTitle: string;
  awardDescription: string;
};

export const siteConfig = {
  name: "رونق للمقاولات",
  shortName: "رونق",
  englishName: "RONAQ CONTRACTING",
  description:
    "شركة مقاولات تقدم حلولاً متكاملة في التصميم والتنفيذ وإدارة المشاريع بهوية عصرية ومعايير تنفيذ عالية.",
  phone: "+966 500 000 000",
  email: "info@ronaq.sa",
  address: "الرياض، حي الملقا، طريق الملك فهد",
  workingDays: "الأحد - الخميس",
  workingHours: "08:00 صباحاً - 05:00 مساءً",
};

export const navigation = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/#about" },
  { label: "خدماتنا", href: "/#services" },
  { label: "مشاريعنا", href: "/projects" },
  { label: "اتصل بنا", href: "/#contact" },
] as const;

export const heroHighlights = [
  "مقاولات عامة",
  "تشطيبات راقية",
  "إدارة مشاريع",
  "حلول هندسية متكاملة",
];

export const homeStats: Metric[] = [
  {
    value: 15,
    suffix: "+",
    label: "عاماً من الخبرة",
    description: "خبرة تنفيذية متراكمة في المشاريع السكنية والتجارية الراقية.",
  },
  {
    value: 200,
    suffix: "+",
    label: "مشروع مكتمل",
    description: "تسليمات متنوعة بهويات تصميمية عالية واعتماد هندسي منضبط.",
  },
  {
    value: 94,
    suffix: "%",
    label: "التزام زمني",
    description: "نسبة إنجاز وتسليم وفق الجدول المعتمد لكل مشروع.",
  },
];

export const services: Service[] = [
  {
    title: "تصاميم ثلاثية الأبعاد",
    description:
      "رؤية مستقبلية دقيقة لمشروعك قبل التنفيذ، مع لقطات واقعية تُسهّل اتخاذ القرار وتُسرّع الاعتماد.",
    icon: "drafting",
    eyebrow: "Concept & Visualization",
    layout: "featured",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA73YROwfkoBCB_nF4pNnHldL_wyQxh_ba8zx60aRCQAR-u8D-fRtsqIMnObd_mMkSxiys9YtIqii7jV5-QtXnlx8M3SBkR9Ee8o5OvZaXjjVWvRprdrS09ivqXuf5BsuFCOQ34yOtW0b8y8VCN74il8d9ZOusDWgpe9lLcn0hlncboEw1-eBkr9vEIt01yKqWQAPJtQa4FlFts-THMnf-DdUZybKPo_Cz3aecYIiD5i97bP6ZTDBlrfZSazk2aMpROomzQFlHEW9A",
    imageAlt: "منظور معماري حديث لبرج زجاجي بتكوين بصري درامي",
  },
  {
    title: "تنفيذ التشطيبات",
    description:
      "معالجة متقنة لكل طبقة تشطيب، من الأرضيات إلى الإضاءة، مع ضبط عالٍ للتفاصيل النهائية.",
    icon: "paint",
    eyebrow: "Finishing",
    layout: "standard",
  },
  {
    title: "تنفيذ العظم",
    description:
      "بنية إنشائية صلبة تُنفذ وفق أعلى معايير السلامة والجودة لضمان الاستدامة وقوة الأداء.",
    icon: "structure",
    eyebrow: "Structure",
    layout: "standard",
  },
  {
    title: "التصميم الهندسي",
    description:
      "مخططات ذكية تراعي الاستغلال الأمثل للمساحات وتؤسس لتجربة استخدام فعالة ومريحة.",
    icon: "ruler",
    eyebrow: "Engineering",
    layout: "wide",
  },
  {
    title: "أعمال العزل",
    description:
      "حماية حرارية ومائية دقيقة ترفع عمر المبنى التشغيلي وتدعم راحة المستخدمين على المدى الطويل.",
    icon: "shield",
    eyebrow: "Protection",
    layout: "standard",
  },
  {
    title: "أعمال الألمنيوم والواجهات",
    description:
      "أنظمة واجهات معاصرة تجمع بين المتانة والأناقة وكفاءة الأداء في مختلف الظروف المناخية.",
    icon: "window",
    eyebrow: "Facade Systems",
    layout: "standard",
  },
  {
    title: "أعمال الديكور وتفصيل الأثاث",
    description:
      "قطع ووحدات مخصصة تُصمم خصيصاً للمكان لتُكمل المشهد المعماري وتُعزز فرادة التجربة.",
    icon: "sofa",
    eyebrow: "Interior Craft",
    layout: "wide",
  },
];

export const values: Value[] = [
  {
    title: "الجودة العالية",
    description:
      "نستخدم أفضل المواد ونطبق أدق معايير الرقابة لضمان مخرجات تفوق التوقعات في كل مرحلة.",
    icon: "badge",
  },
  {
    title: "الالتزام بالوقت",
    description:
      "نحترم مواعيد التسليم بدقة متناهية لأن الاحترافية تبدأ من تقدير وقت العميل وإدارة المخاطر مبكراً.",
    icon: "clock",
  },
  {
    title: "الشفافية التامة",
    description:
      "وضوح كامل في التعاملات والتكلفة والخطة الزمنية منذ أول اجتماع وحتى التسليم النهائي.",
    icon: "handshake",
  },
];

export const workflow: WorkflowStep[] = [
  {
    step: "01",
    title: "اكتشاف المشروع",
    description:
      "نبدأ بفهم الهدف التجاري أو السكني وتحليل الموقع والميزانية والتطلعات التشغيلية والجمالية.",
  },
  {
    step: "02",
    title: "تطوير المفهوم",
    description:
      "نبني تصوراً معمارياً واضحاً يشمل المخططات، المواد، تجارب الحركة، والمشهد البصري العام.",
  },
  {
    step: "03",
    title: "التنفيذ المنضبط",
    description:
      "فِرق ميدانية وإشراف هندسي يومي يضمنان جودة التنفيذ، سرعة الاستجابة، وضبط التفاصيل الحرجة.",
  },
  {
    step: "04",
    title: "التسليم والتشغيل",
    description:
      "نراجع كل نقطة بدقة ونجهز المشروع للتسليم بمعايير جاهزية عالية وتجربة استخدام مكتملة.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "ما هي إجراءات شراء العقار مع رونق؟",
    answer:
      "نحن نرافقكم في رحلة متكاملة تبدأ من اختيار الموقع، مروراً بتدقيق المستندات القانونية، وصولاً إلى توقيع العقود النهائية وضمان نقل الملكية بكل شفافية ويسر.",
  },
  {
    question: "ما هي خيارات التمويل المتاحة؟",
    answer:
      "نقدم شراكات استراتيجية مع كبرى البنوك المحلية لتوفير حلول تمويلية مرنة تصل إلى 25 عاماً، مع تسهيلات خاصة في الدفعة المقدمة لعملاء رونق.",
  },
  {
    question: "كم تستغرق مدة التشطيب النهائي؟",
    answer:
      "تتراوح المدة حسب حجم المشروع، ولكن بمتوسط من 4 إلى 8 أشهر، مع الالتزام الصارم بجدول زمني محدد يتم تسليمه للعميل عند التعاقد.",
  },
  {
    question: "ما هي معايير الجودة المتبعة في الإنشاء؟",
    answer:
      "نطبق أعلى الأكواد الهندسية العالمية والسعودية، مع إجراء فحوصات تربة واختبارات خرسانة دورية من خلال مختبرات مستقلة لضمان ديمومة البناء.",
  },
  {
    question: "ما هي الخدمات والمرافق المقدمة في مشاريعكم؟",
    answer:
      "تشمل مشاريعنا أنظمة ذكية، مساحات خضراء منسقة، صالات رياضية خاصة، وأنظمة أمان متطورة على مدار الساعة لضمان نمط حياة راقٍ وآمن.",
  },
];

export const projectCategories = [
  { key: "all" as const, label: "الكل" },
  { key: "residential" as const, label: "مشاريع سكنية" },
  { key: "commercial" as const, label: "مشاريع تجارية" },
];

export const projects: Project[] = [
  {
    slug: "qasr-rawnaq-almasi",
    category: "residential",
    categoryLabel: "مشاريع سكنية",
    title: "قصر رونق الماسي",
    subtitle: "قصر خاص بإطلالة بانورامية",
    excerpt:
      "تصميم عصري يجمع بين الخصوصية التامة والجمال البصري المفتوح في قلب العاصمة، مع تفاصيل تشطيب مترفة وتدرج كتلي واضح.",
    heroLabel: "سكن فاخر خاص",
    location: "الرياض، حي النخيل",
    area: "1,420 متر مربع",
    duration: "18 شهر",
    status: "مكتمل",
    year: "2025",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHtrkMo4rPkk092Xq0KiNyr1qPShqPbvvToHmRd_uJ6ZOXw1wsXFx7FKWbS-rpYspM0dfc_KeLYMlL5Isn1_bQzRRHEEkp3LdwbKhXl2MrKysnalUMwz0E0UZ1gG9KLflRWb8kRLtO3DJdYuYHHvYzvVxYB0lq0YpFlejvH8THKszfnuMN5pdJJcALu2tJHqXUIB-Pa9Qk50OGiWJTQE41fpXb21GkBGmG9ml-bIMaec5h-sDD2Q6JOniPoVAUtGdcKFVLUipcRc4",
    heroAlt:
      "فيلا فاخرة بإضاءة دافئة وانعكاسات على الماء في الليل",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHtrkMo4rPkk092Xq0KiNyr1qPShqPbvvToHmRd_uJ6ZOXw1wsXFx7FKWbS-rpYspM0dfc_KeLYMlL5Isn1_bQzRRHEEkp3LdwbKhXl2MrKysnalUMwz0E0UZ1gG9KLflRWb8kRLtO3DJdYuYHHvYzvVxYB0lq0YpFlejvH8THKszfnuMN5pdJJcALu2tJHqXUIB-Pa9Qk50OGiWJTQE41fpXb21GkBGmG9ml-bIMaec5h-sDD2Q6JOniPoVAUtGdcKFVLUipcRc4",
    overview:
      "طُور المشروع ليمنح العائلة تجربة سكنية مترفة تتوازن فيها المساحات الرسمية مع مناطق المعيشة اليومية، مع واجهة ليلية قوية الحضور.",
    challenge:
      "تمثل التحدي في خلق خصوصية عالية مع الحفاظ على انفتاح بصري فخم نحو الحديقة والمسطح المائي دون الإخلال بهدوء الكتل الخارجية.",
    solution:
      "اعتمدنا تكويناً متدرجاً للكتل، مع واجهات حجرية وزجاجية دقيقة، ومسارات حركة تفصل بين الاستقبال الرسمي والحياة العائلية بسلاسة.",
    deliverables: [
      "التصميم المعماري التنفيذي",
      "تنفيذ الهيكل والواجهات",
      "تشطيبات فاخرة داخلية",
      "تنسيق الإضاءة والمشاهد الخارجية",
    ],
    gallery: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHtrkMo4rPkk092Xq0KiNyr1qPShqPbvvToHmRd_uJ6ZOXw1wsXFx7FKWbS-rpYspM0dfc_KeLYMlL5Isn1_bQzRRHEEkp3LdwbKhXl2MrKysnalUMwz0E0UZ1gG9KLflRWb8kRLtO3DJdYuYHHvYzvVxYB0lq0YpFlejvH8THKszfnuMN5pdJJcALu2tJHqXUIB-Pa9Qk50OGiWJTQE41fpXb21GkBGmG9ml-bIMaec5h-sDD2Q6JOniPoVAUtGdcKFVLUipcRc4",
        alt: "واجهة قصر فاخرة في الليل مع واجهات زجاجية ممتدة",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrFUqvu2uHFW8OrwGiSa_4fb9wRLTjURCw8viWkLV547tvr5n2FrucvPpWWzYHQ-cnAKkXDEybjYPlO-8qx8_3jvOYdLmQbennEdfA7T0YLktNrCgH_NzvmQ0vRWbPbHHyELdHzSG3hPqt64dsTSWn6tuX2fX_VBUo4Z1QjWESvmghK_TC_vFtvF4yIle0gdqB-qcrtR0M-NTNZ7JBcY5zKxb5YYfVzxU_ULrVNcgxgxQMk-9PGw2b33EL-KR9UeOZiP4aN6daa3U",
        alt: "فيلا فاخرة بإضاءة معمارية ومسبح خارجي",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAlPCZiQbdYrdr3tWk50CjF4V-39B7EzRue-YLCikN7h-R6K2Z_w38ehYuhcLynf6eo3fZrXjLktWerBIct6va7FRVxMePDjOO_eUkD5z7RjreWSnrznOeDNNxsBmOrG0fdoDPXrHMGMSXn1OokiA-Fb1WEm65_OpilRpULSpFfvNc9KTSSPlGgJlNhHtLqrf_sV0zygvXoy792hZOCAWXv4eBtZH5p0VsBRwNI3Khwk7sDerVzSUPA_sShmnPivIbQqkn02sDC0o",
        alt: "غرفة معيشة مزدوجة الارتفاع بمواد فاخرة",
      },
    ],
    materials: [
      {
        title: "حجر طبيعي فاخر",
        description:
          "استخدام ألواح حجرية بدرجات دافئة لتعزيز حضور الكتلة الخارجية ورفع القيمة البصرية للمشروع.",
        icon: "layers",
      },
      {
        title: "أنظمة واجهات زجاجية",
        description:
          "معالجة واجهات زجاجية عالية الكفاءة توفر مشاهد واسعة مع أداء حراري محسّن.",
        icon: "window",
      },
      {
        title: "إضاءة مشهدية",
        description:
          "توزيع ضوئي يبرز العمق المعماري ويمنح الواجهة حضورا فاخرا ليلاً.",
        icon: "sparkles",
      },
    ],
    results: [
      { value: 100, suffix: "%", label: "رضا العميل" },
      { value: 18, suffix: " شهراً", label: "مدة التنفيذ" },
      { value: 4, suffix: "+", label: "مناطق استقبال ومعيشة رئيسية" },
      { value: 32, suffix: "%", label: "رفع القيمة السوقية المقدرة" },
    ],
    awardTitle: "اعتماد تشطيب خاص",
    awardDescription:
      "حصل المشروع على إشادة من العميل والمشرف الاستشاري بوصفه نموذجاً للدمج بين الرفاهية والدقة التنفيذية.",
  },
  {
    slug: "digital-business-center",
    category: "commercial",
    categoryLabel: "مشاريع تجارية",
    title: "مركز الأعمال الرقمي",
    subtitle: "بيئة عمل إنتاجية عالية الكفاءة",
    excerpt:
      "بيئة عمل متكاملة ترتكز على فلسفة العمارة الإنتاجية، وتجمع بين الحركة الانسيابية، التقنية، والهوية المؤسسية الواضحة.",
    heroLabel: "بيئة عمل تجارية",
    location: "الرياض، حي الصحافة",
    area: "2,300 متر مربع",
    duration: "11 شهر",
    status: "مكتمل",
    year: "2024",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBODYg7qZ-zALtjBE8gaLpyXvV0G_rrvE7on0GW38H_iRyPaKZ-gK9s8QR8BwajubI0cIv1RZ5MMW6XyPddwKO9RMAPJ_zdMktf1b8jr2epAJDwBZpGVw7kwviANGi9PvklV4iiA_UiwAY_Qw-FMNVeRuFgDy8A1l2iTKuaVIcIy7mcO8FYq2JoDb3spdgHTBt7yAQS3OyusIM-gMQcJrN5vaOA2g94MBT0QJfzH7gYHMRrdh0lEXt0dpCb_LELD53dgrDhpT3VgxM",
    heroAlt:
      "ردهة مكتبية عصرية بخامات خرسانية وسلالم هندسية",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBODYg7qZ-zALtjBE8gaLpyXvV0G_rrvE7on0GW38H_iRyPaKZ-gK9s8QR8BwajubI0cIv1RZ5MMW6XyPddwKO9RMAPJ_zdMktf1b8jr2epAJDwBZpGVw7kwviANGi9PvklV4iiA_UiwAY_Qw-FMNVeRuFgDy8A1l2iTKuaVIcIy7mcO8FYq2JoDb3spdgHTBt7yAQS3OyusIM-gMQcJrN5vaOA2g94MBT0QJfzH7gYHMRrdh0lEXt0dpCb_LELD53dgrDhpT3VgxM",
    overview:
      "مركز أعمال صُمم ليخدم فرقاً تشغيلية سريعة النمو، مع فراغات استقبال واجتماعات ومناطق عمل مرنة ذات حضور مؤسسي قوي.",
    challenge:
      "التحدي الأساسي كان خلق بيئة عمل رسمية لكن غير باردة، تسمح بالتوسع وتخدم تعدد أنماط العمل والاجتماعات القصيرة والطويلة.",
    solution:
      "تم تصميم قلب حركة واضح، مع استخدام خامات خرسانية وخشبية سوداء الملامح، وإدماج مساحات مرنة قابلة للتكيف مع تغير الحاجة التشغيلية.",
    deliverables: [
      "تخطيط مسارات الحركة",
      "تشطيبات مكاتب تنفيذية",
      "قاعات اجتماعات ذكية",
      "تنسيق الواجهة الداخلية واللافتات",
    ],
    gallery: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBODYg7qZ-zALtjBE8gaLpyXvV0G_rrvE7on0GW38H_iRyPaKZ-gK9s8QR8BwajubI0cIv1RZ5MMW6XyPddwKO9RMAPJ_zdMktf1b8jr2epAJDwBZpGVw7kwviANGi9PvklV4iiA_UiwAY_Qw-FMNVeRuFgDy8A1l2iTKuaVIcIy7mcO8FYq2JoDb3spdgHTBt7yAQS3OyusIM-gMQcJrN5vaOA2g94MBT0QJfzH7gYHMRrdh0lEXt0dpCb_LELD53dgrDhpT3VgxM",
        alt: "ردهة مكتبية عصرية بسلم هندسي وملمس خرسانة",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY3gSUQt0IaNMgUAAG-nbNw-NDO2c6Pt03i7XFTdLX4WjpQJqory3IbVv8Zm208tvXEq_A7WenljzbVZ52t9dCb--c29yTDspuo4zI5CwHDL0l9t_5FRoEoUpmseB-SflTmOVNKJ73B3DyQshld7E5wI9Jy57255ahNaeMS8ifRcfPmayc7kkKiZ07hLvblyEzQUa8Fw77edCSQPZOEPM9pS-aWAER6cEbEO3WuYqHuNuvsYOGuZxaDETDYGe2rrrBTkpMjOVxxPk",
        alt: "مكتب تنفيذي بإطلالة بانورامية وتشطيبات خشبية داكنة",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk_qoPCt4mgeQT6uXvb9pBf6_m15ttUnew-1lZ_LtYgM9xRDPPzQRqnssqqjMyOcFQgnuQl53otb1rfaEoPsGe9ESUoCb2f6pVxIa1zQL_maxSCOyXMBvHGMLfuCFDEPrU067b7ApTJaYU1J9BsG_YfsXbtA-JwCfVcouvPMCnQdShqzmIuPuYXQRN0ujaHQRc7ZdYUCFBULR3eD0VDakwwvo2kX9sF14VdIrunbeYPO2CBqoT3Iwn_rtz8vADB88uDUmvyZluQas",
        alt: "كتلة معمارية تجارية بخطوط هندسية حادة",
      },
    ],
    materials: [
      {
        title: "ألواح خشبية هندسية",
        description:
          "كسوات داخلية داكنة تعزز حضور العلامة المؤسسية وتخلق دفئاً بصرياً في أماكن العمل.",
        icon: "layers",
      },
      {
        title: "أنظمة ذكية",
        description:
          "حلول تحكم في الإضاءة، الحضور، وقاعات الاجتماعات لتسهيل التشغيل اليومي وتقليل الهدر.",
        icon: "sparkles",
      },
      {
        title: "زجاج مزدوج الأداء",
        description:
          "معالجة للمكاتب ذات الإطلالة الواسعة بما يرفع الراحة الحرارية ويقلل استهلاك الطاقة.",
        icon: "window",
      },
    ],
    results: [
      { value: 11, suffix: " شهراً", label: "مدة الإنجاز" },
      { value: 7, suffix: "+", label: "مساحات تشغيل مرنة" },
      { value: 28, suffix: "%", label: "تحسين كفاءة استغلال المساحة" },
      { value: 100, suffix: "%", label: "مطابقة متطلبات الهوية" },
    ],
    awardTitle: "تشغيل أكثر كفاءة",
    awardDescription:
      "ساهمت المعالجة الداخلية للمشروع في تسريع التشغيل الفعلي للشركة وتقليص التعديلات اللاحقة بعد الافتتاح.",
  },
  {
    slug: "afaq-villas",
    category: "residential",
    categoryLabel: "مشاريع سكنية",
    title: "فيلات الأفق",
    subtitle: "مشروع سكني فاخر",
    excerpt:
      "تلاعب بالظلال والكتل لخلق تجربة سكنية فريدة من نوعها، توازن بين خصوصية الأسرة والانفتاح على الطبيعة الداخلية.",
    heroLabel: "مجموعة فلل مميزة",
    location: "الرياض، حي حطين",
    area: "850 متر مربع",
    duration: "14 شهر",
    status: "مكتمل",
    year: "2023",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMaqdSGa6Iy2twOEdfKixuQ3RNJshuptwihz4lATSEi6SKFLMp8SqzH5SVEFMHYsJ0URYS7jEMivuc7KssNp26uxd-QOcPdC5DtzJcwvNQE9zqraXQ1WuuyT26FcZ_Uo78PD7bg8tFNEQy6cjebzrT40xV8TSA9L9ZL-0OYbKWhsKE0q_6D69SSuYcDeewu3jjMrLfaxdvYNmXDj29BD-ZYHeScLqNGO2XwodNjFoXXXsEiiTkJ4ferZH4PuYubgpRObRr_iuB1Ss",
    heroAlt:
      "فيلا حديثة فاخرة بإضاءة دافئة وانعكاس على مسبح خارجي",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTlLERv_Go8ailhWBgVNzGWBAj9IiyfsvzzivJcqWDaJy8A5OhWlbWmISlLD5TE85tqOpepX9GD6iR7e1FEtyOJcFjlRSD1ECP7VMrAXELA_a1wDGtfzN8C3cWE_0DcUULCcbXoiqen26NQg1AwIzJiSbUs3LULdfjr2Vqoz4CWwo3JvsNERbB-4jqCQtsqIL3T42a29T5eonMVKaTMyEPEU8fq3CMKmCCdcHYcFUVAZrJPxuIcsesxBOwPw6Elwh3z7_QedGwz74",
    overview:
      "كان التحدي يكمن في خلق مساحة معيشة تمزج بين الخصوصية التامة للعائلة السعودية وبين الجماليات المعمارية الحديثة المنفتحة. قمنا بتطوير مفهوم الواحة المخفية، حيث تتوزع الكتل المعمارية حول فناء مركزي يسمح بدخول الضوء الطبيعي وتدفق الهواء دون التنازل عن حرمة المنزل.",
    challenge:
      "احتاج المشروع إلى صياغة تجربة سكنية مترفة في مساحة مضبوطة نسبياً، مع عزل بصري ذكي بين الفناء الداخلي والشارع والفراغات المجاورة.",
    solution:
      "تم تشكيل الكتل حول فناء مركزي، مع إبراز المحاور الأفقية والمواد الدافئة واستخدام واجهات دقيقة لتوجيه الضوء وإبراز النِسَب المعمارية.",
    deliverables: [
      "التصميم المعماري والتطوير البصري",
      "تنفيذ الهيكل والتشطيبات",
      "تكامل الأنظمة الذكية",
      "تنسيق الفراغات الداخلية والخارجية",
    ],
    gallery: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAlPCZiQbdYrdr3tWk50CjF4V-39B7EzRue-YLCikN7h-R6K2Z_w38ehYuhcLynf6eo3fZrXjLktWerBIct6va7FRVxMePDjOO_eUkD5z7RjreWSnrznOeDNNxsBmOrG0fdoDPXrHMGMSXn1OokiA-Fb1WEm65_OpilRpULSpFfvNc9KTSSPlGgJlNhHtLqrf_sV0zygvXoy792hZOCAWXv4eBtZH5p0VsBRwNI3Khwk7sDerVzSUPA_sShmnPivIbQqkn02sDC0o",
        alt: "مساحة معيشة مزدوجة الارتفاع مع فتحات زجاجية كبيرة",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqVzgA9O2bcX2u01PsavDLKaPo5Xu5fPovhaVenxiFbIsSWkO0G7QgY0ShFcwh0xjT5MFX7CVe0THOXFwrh6JvbO4nHeUfidl9PNtdWs5zyuDJj3mgHaTO_h-TkBlEwxt_92czqbgiLH_nzye2hJ5Pwd-S49zOEgwKCfTOppaZnQ-6u-xOomKbc_hLoCMPYYdzzQBVOqTyah96DJ21pRoE9upA905CjzrnTkCt8M2jYYPMLZFCveisWmDkdOxyR_aHp_vKW_sQ6ig",
        alt: "تفصيل درج خرساني حديث بإضاءة مخفية",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_K7isKPdZUHqGqNo_0AhwaMbAMtAyVEQKF4ejy54DX8SZh41f5IXbX_SUyKbtQa6LuyspSnirpyvLzO3GZL0wfdZjCeWuKCGNOH_EWyHxFp6-Wt390USON2Tx-elCcmN0r2W9h2WOK0uuSX_PEvyrC13GqxNJIh9xp-e1rFsMYh0GFMsJtXrMS96Xep-e8N7k8wkprpxJFv3wNgvOWv3r1p7D62IWOwjFplPVnM4hnuI1ce2IM1cn44cm87Gd2uraM4qdNDnACc8",
        alt: "غرفة نوم رئيسية بإنارة محيطية ولمسات داكنة",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvNqybbDZbiCAZlE4GkFUpSMvAMg2fqDhw04EoWN9OqdX7h9yVKNobjwDF7S8cKGrBGyu-uCKOl8hXWUJT9WA9RfwJwcZHHFuLf5AqPsbZKQ2UzZzc511NzpYmXhp386ncqY61q11olvyYO0Lzfq4FZw7QOMcH8rrm5Jsf7-S2XzR_JC2XmjEqqzfUV_QPvDI3aXuzrw4-CadQm3KMznRNRGPX_OKZy5ThgxH2rIvGumypjHtpfWI0uYpyAiAM4u9Lg4goIPE0o74",
        alt: "واجهة جانبية لفيلا حديثة بمواد حجر وخشب",
      },
    ],
    materials: [
      {
        title: "رخام إيطالي",
        description:
          "استخدام رخام ستاتوريو النادر في المجالس والمساحات العامة لإضفاء لمسة من الفخامة الأبدية.",
        icon: "layers",
      },
      {
        title: "أنظمة ذكية",
        description:
          "تكامل كامل مع أنظمة التحكم في الإضاءة، التكييف، والأمن عبر واجهة مستخدم موحدة.",
        icon: "sparkles",
      },
      {
        title: "زجاج مستدام",
        description:
          "زجاج مزدوج عالي الكفاءة يقلل من نفاذ الحرارة بنسبة 60% مع الحفاظ على وضوح الرؤية.",
        icon: "window",
      },
    ],
    results: [
      { value: 100, suffix: "%", label: "رضا العميل" },
      { value: 3, suffix: "+", label: "جوائز معمارية" },
      { value: 14, suffix: " شهراً", label: "مدة التنفيذ" },
      { value: 60, suffix: "%", label: "خفض الحمل الحراري" },
    ],
    awardTitle: "شهادة التميز المعماري",
    awardDescription:
      "تم تكريم هذا المشروع كأفضل تصميم سكني عصري لعام 2023 في المنطقة الوسطى.",
  },
  {
    slug: "rawnaq-office-park",
    category: "commercial",
    categoryLabel: "مشاريع تجارية",
    title: "مجمع رونق المكتبي",
    subtitle: "مقر أعمال بهوية تنفيذية راقية",
    excerpt:
      "دمج الاستدامة البيئية مع الفخامة المهنية في مشروع تجاري ضخم يركز على تجربة الزائر وكفاءة التشغيل اليومية.",
    heroLabel: "مجمع مكاتب تنفيذي",
    location: "الرياض، طريق الملك سلمان",
    area: "3,100 متر مربع",
    duration: "16 شهر",
    status: "مكتمل",
    year: "2025",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBY3gSUQt0IaNMgUAAG-nbNw-NDO2c6Pt03i7XFTdLX4WjpQJqory3IbVv8Zm208tvXEq_A7WenljzbVZ52t9dCb--c29yTDspuo4zI5CwHDL0l9t_5FRoEoUpmseB-SflTmOVNKJ73B3DyQshld7E5wI9Jy57255ahNaeMS8ifRcfPmayc7kkKiZ07hLvblyEzQUa8Fw77edCSQPZOEPM9pS-aWAER6cEbEO3WuYqHuNuvsYOGuZxaDETDYGe2rrrBTkpMjOVxxPk",
    heroAlt:
      "مكتب فاخر بكسوات خشبية وسخام رخامي وإطلالة على المدينة",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBY3gSUQt0IaNMgUAAG-nbNw-NDO2c6Pt03i7XFTdLX4WjpQJqory3IbVv8Zm208tvXEq_A7WenljzbVZ52t9dCb--c29yTDspuo4zI5CwHDL0l9t_5FRoEoUpmseB-SflTmOVNKJ73B3DyQshld7E5wI9Jy57255ahNaeMS8ifRcfPmayc7kkKiZ07hLvblyEzQUa8Fw77edCSQPZOEPM9pS-aWAER6cEbEO3WuYqHuNuvsYOGuZxaDETDYGe2rrrBTkpMjOVxxPk",
    overview:
      "مشروع مكتبي واسع يركز على إبراز صورة مؤسسية راقية مع توزيع مرن للوحدات التنفيذية، وقاعات اجتماعات، ومناطق انتظار ذات حضور بصري قوي.",
    challenge:
      "كان المطلوب تحقيق توازن بين فخامة التجربة المكانية وبين احتياجات التشغيل السريع، مع مراعاة استضافة الزوار والعملاء المهمين بصورة تليق بالهوية.",
    solution:
      "اعتمدنا فراغات استقبال مضيئة، وخامات طبيعية دافئة، ومراكز قرار بصرية واضحة، مع توزيع دقيق للمكاتب التنفيذية ومناطق الدعم.",
    deliverables: [
      "تنسيق فراغات العمل والاجتماعات",
      "إدارة تشطيبات الهوية المؤسسية",
      "حلول واجهات داخلية راقية",
      "إشراف شامل على جودة التنفيذ",
    ],
    gallery: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY3gSUQt0IaNMgUAAG-nbNw-NDO2c6Pt03i7XFTdLX4WjpQJqory3IbVv8Zm208tvXEq_A7WenljzbVZ52t9dCb--c29yTDspuo4zI5CwHDL0l9t_5FRoEoUpmseB-SflTmOVNKJ73B3DyQshld7E5wI9Jy57255ahNaeMS8ifRcfPmayc7kkKiZ07hLvblyEzQUa8Fw77edCSQPZOEPM9pS-aWAER6cEbEO3WuYqHuNuvsYOGuZxaDETDYGe2rrrBTkpMjOVxxPk",
        alt: "مكتب تنفيذي بمواد طبيعية داكنة وإطلالة حضرية",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBODYg7qZ-zALtjBE8gaLpyXvV0G_rrvE7on0GW38H_iRyPaKZ-gK9s8QR8BwajubI0cIv1RZ5MMW6XyPddwKO9RMAPJ_zdMktf1b8jr2epAJDwBZpGVw7kwviANGi9PvklV4iiA_UiwAY_Qw-FMNVeRuFgDy8A1l2iTKuaVIcIy7mcO8FYq2JoDb3spdgHTBt7yAQS3OyusIM-gMQcJrN5vaOA2g94MBT0QJfzH7gYHMRrdh0lEXt0dpCb_LELD53dgrDhpT3VgxM",
        alt: "ردهة أعمال بخامات خرسانية وسلالم عصرية",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk_qoPCt4mgeQT6uXvb9pBf6_m15ttUnew-1lZ_LtYgM9xRDPPzQRqnssqqjMyOcFQgnuQl53otb1rfaEoPsGe9ESUoCb2f6pVxIa1zQL_maxSCOyXMBvHGMLfuCFDEPrU067b7ApTJaYU1J9BsG_YfsXbtA-JwCfVcouvPMCnQdShqzmIuPuYXQRN0ujaHQRc7ZdYUCFBULR3eD0VDakwwvo2kX9sF14VdIrunbeYPO2CBqoT3Iwn_rtz8vADB88uDUmvyZluQas",
        alt: "واجهة تجارية بخطوط حادة وحضور بصري قوي",
      },
    ],
    materials: [
      {
        title: "رخام وأسقف معدنية",
        description:
          "معالجة المواد لتعزيز الفخامة المؤسسية مع الحفاظ على سهولة الصيانة وطول العمر التشغيلي.",
        icon: "layers",
      },
      {
        title: "إضاءة تشغيلية ومشهدية",
        description:
          "طبقات إضاءة مختلفة للمكاتب، الردهات، وقاعات الاجتماعات تدعم الراحة والإبهار معاً.",
        icon: "sparkles",
      },
      {
        title: "فواصل زجاجية عازلة",
        description:
          "فواصل تحقق الانفتاح البصري وتدعم الخصوصية السمعية والبصرية داخل بيئة العمل.",
        icon: "window",
      },
    ],
    results: [
      { value: 16, suffix: " شهراً", label: "مدة التنفيذ" },
      { value: 22, suffix: "%", label: "رفع كفاءة توزيع المساحات" },
      { value: 9, suffix: "+", label: "مساحات استقبال وتشغيل رئيسية" },
      { value: 100, suffix: "%", label: "جاهزية التسليم التشغيلي" },
    ],
    awardTitle: "واجهة مؤسسية متكاملة",
    awardDescription:
      "تحول المشروع إلى مرجع داخلي للهوية المكانية لدى العميل بفضل الانسجام بين التنفيذ، العلامة، وتجربة المستخدم.",
  },
];

export const homeProjectHero = projects[2];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string) {
  return projects.filter((project) => project.slug !== slug).slice(0, 2);
}
