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
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "KVKK", href: "/kvkk" },
          { label: document.title },
        ]}
      />

      <section className="section">
        <div className="container legal-container">
          <p className="legal-review-notice">
            Bu metin sağlanan kaynak dokümandan aktarılmıştır. Canlı yayından
            önce yetkili hukuk danışmanı veya kurum sorumlusu tarafından
            güncellik kontrolü yapılmalıdır.
          </p>
          <LegalDocument document={document} />
        </div>
      </section>
    </>
  );
}
