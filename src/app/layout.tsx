import type { Metadata } from "next";
import { Cairo, Epilogue, Noto_Kufi_Arabic } from "next/font/google";

import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/data/site";

const displayFont = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-display-ui",
  weight: ["600", "700", "800"],
});

const bodyFont = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-body-ui",
  weight: ["400", "500", "700"],
});

const brandFont = Epilogue({
  subsets: ["latin"],
  variable: "--font-brand-ui",
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rawnaq.sa"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="ar">
      <body className={`${displayFont.variable} ${bodyFont.variable} ${brandFont.variable}`}>
        <div className="relative isolate min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-[-14rem] -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(176,203,209,0.11),transparent_60%)]" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
