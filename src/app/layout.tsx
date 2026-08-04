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
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.seo.defaultTitle,
      template: "%s | SDKONGRE",
    },
    description: settings.seo.defaultDescription,
    applicationName: siteConfig.name,
    icons: {
      icon: "/icon.svg",
    },
    robots: siteConfig.indexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: settings.seo.defaultTitle,
      description: settings.seo.defaultDescription,
      url: siteConfig.url,
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
