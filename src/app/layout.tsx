import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { AnalyticsLoader } from "@/components/layout/analytics-loader";
import { siteConfig } from "@/config/site";
import { getResolvedSiteSettings } from "@/lib/content/settings";
import { JsonLd, organizationJsonLd } from "@/lib/seo/jsonld";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getResolvedSiteSettings();

  return {
    metadataBase: new URL(settings.seo.canonicalBaseUrl || siteConfig.url),
    title: {
      default: settings.seo.defaultTitle,
      template: "%s | SDKONGRE",
    },
    description: settings.seo.defaultDescription,
    applicationName: siteConfig.name,
    icons: {
      icon: settings.branding.faviconUrl,
      shortcut: settings.branding.faviconUrl,
      apple: settings.branding.faviconUrl,
    },
    robots: settings.seo.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: settings.seo.defaultTitle,
      description: settings.seo.defaultDescription,
      url: settings.seo.canonicalBaseUrl || siteConfig.url,
      images: settings.seo.ogImage
        ? [{ url: settings.seo.ogImage }]
        : undefined,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071A2F",
  colorScheme: "dark",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const settings = await getResolvedSiteSettings();

  return (
    <html lang={siteConfig.language}>
      <body>
        <JsonLd data={organizationJsonLd(settings)} />
        {children}
        <AnalyticsLoader />
      </body>
    </html>
  );
}
