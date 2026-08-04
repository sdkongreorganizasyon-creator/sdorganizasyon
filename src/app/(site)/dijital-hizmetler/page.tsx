import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { PageCta } from "@/components/pages/page-cta";
import { ServiceCard } from "@/components/pages/service-card";
import { getServices } from "@/lib/content/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Dijital Hizmetler",
  description:
    "Katılımcı yönetimi, etkinlik teknolojileri, QR sistemleri, davet, takip, veri ve raporlama çözümleri.",
  path: "/dijital-hizmetler",
});

export default async function DigitalServicesPage() {
  const services = await getServices("digital");

  return (
    <>
      <InteriorHero
        eyebrow="DİJİTAL HİZMETLER"
        title="Dijital Hizmetler"
        description="Modern organizasyonların ihtiyaç duyduğu tüm teknolojik çözümleri sunuyoruz."
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "DİJİTAL HİZMETLER" },
        ]}
      />

      <section className="section">
        <div className="container card-grid card-grid--two">
          {services.map((service) => (
            <ServiceCard
              basePath="/dijital-hizmetler"
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
