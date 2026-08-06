import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { ServiceCard } from "@/components/pages/service-card";
import { getServices } from "@/lib/content/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Hizmetlerimiz",
  description:
    "Kongre, toplantı, lansman, workshop, fuar, seyahat, transfer ve operasyon yönetimi hizmetleri.",
  path: "/hizmetlerimiz",
});

export default async function ServicesPage() {
  const services = await getServices("physical");

  return (
    <>
      <InteriorHero
        eyebrow="HİZMETLERİMİZ"
        title="Tüm Organizasyon Hizmetleri Tek Sayfada"
        description="Planlamadan uygulamaya kadar sunduğumuz hizmetleri, açıklamaları ve görselleriyle birlikte inceleyin."
        image="/media/pages/kurumsal.webp"
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "HİZMETLERİMİZ" },
        ]}
      />

      <section className="section service-page-section">
        <div className="container service-page-grid">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
