import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { PageCta } from "@/components/pages/page-cta";
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
        title="Hizmetlerimiz"
        description="SD Kongre, kongre, sempozyum, toplantı, lansman, fuar, kurumsal etkinlik ve seyahat organizasyonlarında uçtan uca hizmet sunan profesyonel bir organizasyon ve etkinlik yönetim şirketidir."
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "HİZMETLERİMİZ" },
        ]}
      />

      <section className="section">
        <div className="container card-grid card-grid--two">
          {services.map((service) => (
            <ServiceCard
              basePath="/hizmetlerimiz"
              key={service.slug}
              service={service}
            />
          ))}
        </div>
      </section>

      <PageCta />
    </>
  );
}
