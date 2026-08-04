import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type MetadataInput = Readonly<{
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}>;

export function createMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  noindex = false,
}: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();
  const shouldIndex = siteConfig.indexable && !noindex;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
