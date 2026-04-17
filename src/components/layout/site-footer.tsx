import Link from "next/link";
import { ArrowUpLeft, Clock3, Mail, MapPin, Phone } from "lucide-react";

import { navigation, services, siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 pb-10 pt-14">
      <div className="app-container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.9fr]">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="font-display text-3xl font-bold text-text">{siteConfig.name}</div>
              <p className="max-w-md text-sm leading-7 text-text-muted">
                نحن نبني بأسلوب يتجاوز مجرد التشييد؛ نصمم وننفذ مساحات تعكس قيمة العميل وتخدم أهدافه التشغيلية والجمالية.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 hover:-translate-y-0.5"
              href="/projects"
            >
              استعراض المشاريع
              <ArrowUpLeft className="size-4" />
            </Link>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-text">روابط سريعة</h3>
            <ul className="space-y-3 text-sm text-text-muted">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className="transition-colors duration-300 hover:text-text" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-text">الخدمات</h3>
            <ul className="space-y-3 text-sm text-text-muted">
              {services.slice(0, 4).map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-text">اتصل بنا</h3>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 text-primary" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock3 className="size-4 text-primary" />
                <span>
                  {siteConfig.workingDays} | {siteConfig.workingHours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line/70 pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>© ٢٠٢٦ رونق للمقاولات. جميع الحقوق محفوظة.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/#contact">الخصوصية</Link>
            <Link href="/#contact">الشروط والأحكام</Link>
            <Link href="/projects">خريطة المشروع</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
