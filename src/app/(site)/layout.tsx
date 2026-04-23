import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getPublicSiteContent } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { sections } = await getPublicSiteContent();
  const site = sections.generalSettings;

  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    icons: {
      icon: [{ url: site.faviconPath, sizes: "256x256", type: "image/png" }],
      shortcut: site.faviconPath,
      apple: [{ url: site.faviconPath, sizes: "256x256", type: "image/png" }],
    },
    openGraph: {
      title: site.name,
      description: site.description,
      siteName: site.name,
      locale: "ar_SA",
      type: "website",
    },
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getPublicSiteContent();
  const { generalSettings, contact, footer } = content.sections;

  return (
    <>
      <SiteHeader
        logoPath={generalSettings.logoPath}
        navigation={content.navigation}
        quoteButtonLabel={generalSettings.quoteButtonLabel}
        siteName={generalSettings.name}
      />
      <main>{children}</main>
      <SiteFooter
        contact={contact}
        footer={footer}
        generalSettings={generalSettings}
        navigation={content.navigation}
      />
    </>
  );
}

