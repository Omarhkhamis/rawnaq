export const dashboardTabs = [
  { key: "hero", label: "القسم الرئيسي" },
  { key: "about", label: "من نحن" },
  { key: "services", label: "الخدمات" },
  { key: "workflow", label: "مسار العمل" },
  { key: "why-rawnaq", label: "لماذا رونق" },
  { key: "values", label: "القيم" },
  { key: "projects", label: "المشاريع" },
  { key: "faq", label: "الأسئلة الشائعة" },
  { key: "contact", label: "تواصل معنا" },
  { key: "footer", label: "الفوتر" },
  { key: "general-settings", label: "إعدادات عامة" },
  { key: "admins", label: "الأدمن" },
  { key: "media", label: "المعرض" },
] as const;

export type DashboardTabKey = (typeof dashboardTabs)[number]["key"];

export function isDashboardTabKey(value: string): value is DashboardTabKey {
  return dashboardTabs.some((tab) => tab.key === value);
}

export function getSectionKeyByTab(tab: DashboardTabKey) {
  switch (tab) {
    case "hero":
      return "hero";
    case "about":
      return "about";
    case "services":
      return "services";
    case "workflow":
      return "workflow";
    case "why-rawnaq":
      return "whyRawnaq";
    case "values":
      return "values";
    case "faq":
      return "faq";
    case "contact":
      return "contact";
    case "footer":
      return "footer";
    case "general-settings":
      return "generalSettings";
    default:
      return null;
  }
}
