import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { ServiceCard } from "@/components/pages/service-card";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import { getServices } from "@/lib/content/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Dijital Hizmetler",
  description:
    "Katılımcı yönetimi, etkinlik teknolojileri, QR sistemleri, davet, takip, veri ve raporlama çözümleri.",
  path: "/dijital-hizmetler",
});

export default async function DigitalServicesPage() {
  const [services, settings] = await Promise.all([
    getServices("digital"),
    getResolvedSiteSettings(),
  ]);
  const hero = getPageHero(settings, "/dijital-hizmetler", {
    eyebrow: "DİJİTAL HİZMETLER",
    title: "Etkinlik Teknolojileri ve Dijital Çözümler",
    description:
      "Kayıt, iletişim, takip ve raporlama süreçlerini tek sayfada açıklamalarıyla birlikte inceleyin.",
    image: "/media/pages/organizasyon-sureci.webp",
    video: null,
    animation: "fade",
  });

  return (
    <>
      <InteriorHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={hero.image}
        video={hero.video}
        animation={hero.animation}
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
