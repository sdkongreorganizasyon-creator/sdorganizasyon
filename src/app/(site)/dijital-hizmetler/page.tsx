import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
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
        title="Etkinlik Teknolojileri ve Dijital Çözümler"
        description="Kayıt, iletişim, takip ve raporlama süreçlerini tek sayfada açıklamalarıyla birlikte inceleyin."
        image="/media/pages/organizasyon-sureci.webp"
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "DİJİTAL HİZMETLER" },
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
