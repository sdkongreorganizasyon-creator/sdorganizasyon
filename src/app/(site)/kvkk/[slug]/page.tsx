import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InteriorHero } from "@/components/pages/interior-hero";
import { LegalDocument } from "@/components/pages/legal-document";
import { legalDocuments } from "@/content/site-content";
import { getLegalDocument } from "@/lib/content/queries";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

const legalHeroImages: Record<string, string> = {
  "aydinlatma-metni": "/media/legal/aydinlatma-metni.webp",
  "gizlilik-politikasi": "/media/legal/gizlilik-politikasi.webp",
  "cerez-politikasi": "/media/legal/cerez-politikasi.webp",
  "acik-riza-metni": "/media/legal/acik-riza-metni.webp",
  "yasal-dayanaklar": "/media/legal/yasal-dayanaklar.webp",
};

export function generateStaticParams() {
  return Object.keys(legalDocuments).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = await getLegalDocument(slug);

  if (!document) return {};

  return createMetadata({
    title: document.title,
    description: document.headline,
    path: `/kvkk/${slug}`,
  });
}

export default async function LegalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const document = await getLegalDocument(slug);

  if (!document) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "KVKK", path: "/kvkk" },
          { name: document.title, path: `/kvkk/${slug}` },
        ])}
      />

      <InteriorHero
        eyebrow="KVKK"
        title={document.title}
        description={document.headline}
        image={legalHeroImages[slug] ?? "/media/pages/kvkk.webp"}
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "KVKK", href: "/kvkk" },
          { label: document.title },
        ]}
      />

      <section className="section">
        <div className="container legal-container">
          <LegalDocument document={document} />
        </div>
      </section>
    </>
  );
}
