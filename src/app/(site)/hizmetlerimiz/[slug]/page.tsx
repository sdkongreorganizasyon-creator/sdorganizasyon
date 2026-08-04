import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/pages/service-detail";
import { physicalServices } from "@/content/site-content";
import { getService } from "@/lib/content/queries";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return physicalServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService("physical", slug);

  if (!service) return {};

  return createMetadata({
    title: service.title,
    description: service.summary,
    path: `/hizmetlerimiz/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getService("physical", slug);

  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hizmetlerimiz", path: "/hizmetlerimiz" },
            {
              name: service.title,
              path: `/hizmetlerimiz/${service.slug}`,
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
        parentLabel="HİZMETLERİMİZ"
        parentPath="/hizmetlerimiz"
        service={service}
      />
    </>
  );
}
