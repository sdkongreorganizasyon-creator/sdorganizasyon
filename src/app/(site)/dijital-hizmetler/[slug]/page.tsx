import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/pages/service-detail";
import { digitalServices } from "@/content/site-content";
import { getService } from "@/lib/content/queries";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return digitalServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService("digital", slug);

  if (!service) return {};

  return createMetadata({
    title: service.title,
    description: service.summary,
    path: `/dijital-hizmetler/${slug}`,
  });
}

export default async function DigitalServiceDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const service = await getService("digital", slug);

  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Dijital Hizmetler", path: "/dijital-hizmetler" },
            {
              name: service.title,
              path: `/dijital-hizmetler/${service.slug}`,
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.summary,
            provider: {
              "@type": "Organization",
              name: "SD Kongre Organizasyon ve Etkinlik Yönetimi",
            },
          },
        ]}
      />

      <ServiceDetail
        parentLabel="DİJİTAL HİZMETLER"
        parentPath="/dijital-hizmetler"
        service={service}
      />
    </>
  );
}
