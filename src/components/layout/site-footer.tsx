import Link from "next/link";
import { ArrowUpLeft, Clock3, Mail, MapPin, Phone } from "lucide-react";

import { navigation, services, siteConfig } from "@/data/site";
import { SiteBrand } from "@/components/layout/site-brand";

type SocialIconProps = {
  platform: string;
  className?: string;
};

function SocialIcon({ platform, className = "size-4" }: SocialIconProps) {
  if (platform === "instagram") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <rect height="18" rx="5" stroke="currentColor" strokeWidth="1.7" width="18" x="3" y="3" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.5" cy="6.5" fill="currentColor" r="1.2" />
      </svg>
    );
  }

  if (platform === "snapchat") {
    return (
      <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.7c3.1 0 5.1 2.1 5.1 5.4v3.1c0 .5.4.9 1.2 1.2.6.2 1.1.4 1.1.9 0 .8-1.4 1.1-2.2 1.2-.2.8-.7 1.4-1.5 1.8-.5.3-.7.6-.9 1.1-.2.6-.6 1-1.3 1-.5 0-.9-.2-1.3-.4-.5-.2-.9-.2-1.4 0-.4.2-.8.4-1.3.4-.7 0-1.1-.4-1.3-1-.2-.5-.4-.8-.9-1.1-.8-.4-1.3-1-1.5-1.8-.8-.1-2.2-.4-2.2-1.2 0-.5.5-.7 1.1-.9.8-.3 1.2-.7 1.2-1.2V8.1c0-3.3 2-5.4 5.1-5.4Z" />
      </svg>
    );
  }

  if (platform === "tiktok") {
    return (
      <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.5 3c.3 2.4 1.7 3.8 4 4v3.1a8 8 0 0 1-4-1.1v5.7c0 4-2.5 6.3-6.1 6.3-3.1 0-5.3-2.1-5.3-5.1s2.3-5.1 5.2-5.1c.5 0 1 .1 1.4.2v3.3a3 3 0 0 0-1.3-.3c-1.2 0-2.1.7-2.1 1.9 0 1.1.8 1.9 2 1.9 1.3 0 2.2-.7 2.2-2.4V3h4Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M7.8 19.4A9 9 0 1 0 4.6 16L3.5 21l4.3-1.6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M9 8.8c.3 3 2.2 5.1 5.2 6.2l1.6-1.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 pb-10 pt-14 text-center md:text-start">
      <div className="app-container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.9fr]">
          <div className="space-y-5">
            <div className="space-y-2">
              <Link aria-label={siteConfig.name} className="inline-flex items-center" href="/">
                <SiteBrand className="h-auto w-[6rem] md:w-[7rem]" />
              </Link>
              <p className="mx-auto max-w-md text-sm leading-7 text-text-muted md:mx-0">
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
              <li className="flex items-start justify-center gap-3 md:justify-start">
                <MapPin className="mt-1 size-4 text-primary" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center justify-center gap-3 md:justify-start">
                <Phone className="size-4 text-primary" />
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
              </li>
              <li className="flex items-center justify-center gap-3 md:justify-start">
                <Mail className="size-4 text-primary" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li className="flex items-center justify-center gap-3 md:justify-start">
                <Clock3 className="size-4 text-primary" />
                <span>
                  {siteConfig.workingDays} | {siteConfig.workingHours}
                </span>
              </li>
            </ul>

            <div className="mt-6 flex items-center justify-center gap-2 md:justify-start">
              {siteConfig.socialLinks.map((item) => (
                <Link
                  aria-label={item.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white/5 text-text-muted transition-colors duration-300 hover:border-primary/60 hover:bg-primary/12 hover:text-primary"
                  href={item.href}
                  key={item.label}
                  rel="noreferrer"
                  target="_blank"
                  title={item.label}
                >
                  <SocialIcon platform={item.platform} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line/70 pt-6 text-center text-sm text-text-muted">
          <p>© ٢٠٢٦ رونق للمقاولات. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
