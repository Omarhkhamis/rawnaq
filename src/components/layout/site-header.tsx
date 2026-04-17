"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigation, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/projects") {
      return pathname.startsWith("/projects");
    }

    return pathname === "/";
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="app-container">
        <div className="panel flex items-center justify-between px-4 py-3 md:px-6">
          <Link className="flex items-center gap-3" href="/">
            <div className="flex size-11 items-center justify-center rounded-full border border-primary/25 bg-primary/12 text-primary">
              ر
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-tight text-text md:text-xl">
                {siteConfig.shortName}
              </div>
              <div className="font-accent text-[0.65rem] uppercase tracking-[0.35em] text-text-muted">
                contracting
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <Link
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isActive(item.href) ? "text-primary" : "text-text-muted hover:text-text",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/#contact" size="md">
              اطلب عرض سعر
            </Button>
          </div>

          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white/5 text-text lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isOpen ? (
          <div className="panel mt-3 overflow-hidden px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm transition-colors duration-300",
                    isActive(item.href)
                      ? "bg-primary/12 text-primary"
                      : "text-text-muted hover:bg-white/5 hover:text-text",
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button className="mt-4 w-full" href="/#contact" onClick={() => setIsOpen(false)}>
              اطلب عرض سعر
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
