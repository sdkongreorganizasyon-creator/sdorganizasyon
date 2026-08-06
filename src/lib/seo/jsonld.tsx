import { siteConfig } from "@/config/site";
import type { ResolvedSiteSettings } from "@/lib/content/settings";

type JsonLdProps = Readonly<{
  data: Record<string, unknown> | readonly Record<string, unknown>[];
}>;

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("<", "\\u003c"),
      }}
    />
  );
}

export function organizationJsonLd(
  settings?: ResolvedSiteSettings,
) {
  const contact = settings?.contact ?? siteConfig.contact;
  const social = settings?.social ?? siteConfig.social;
  const sameAs = Object.values(social).filter(
    (value): value is string => Boolean(value),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.general.legalName || siteConfig.legalName,
    alternateName: settings?.general.siteName || siteConfig.name,
    url: settings?.seo.canonicalBaseUrl || siteConfig.url,
    logo: new URL(
      settings?.branding.headerLogoUrl || "/brand/sdkongre-logo-web.png",
      settings?.seo.canonicalBaseUrl || siteConfig.url,
    ).toString(),
    description:
      settings?.seo.defaultDescription ?? siteConfig.description,
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.address,
            addressCountry: "TR",
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbJsonLd(
  items: readonly Readonly<{ name: string; path: string }>[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}
