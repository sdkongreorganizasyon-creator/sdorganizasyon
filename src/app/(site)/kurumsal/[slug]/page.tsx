import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InteriorHero } from "@/components/pages/interior-hero";
import { PageCta } from "@/components/pages/page-cta";
import { ProseContent } from "@/components/pages/prose-content";
import { ValueCards } from "@/components/pages/value-cards";
import { corporatePages } from "@/content/site-content";
import { getCorporatePage } from "@/lib/content/queries";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return Object.keys(corporatePages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCorporatePage(slug);

  if (!page) return {};

  return createMetadata({
    title: page.title,
    description: page.headline,
    path: `/kurumsal/${slug}`,
  });
}

export default async function CorporateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getCorporatePage(slug);

  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal" },
          { name: page.title, path: `/kurumsal/${slug}` },
        ])}
      />

      <InteriorHero
        eyebrow={page.eyebrow}
        title={page.headline}
        description={page.title}
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "KURUMSAL", href: "/kurumsal" },
          { label: page.title },
        ]}
      />

      <ProseContent paragraphs={page.paragraphs} />

      {page.values?.length ? <ValueCards items={page.values} /> : null}

      <PageCta />
    </>
  );
}
