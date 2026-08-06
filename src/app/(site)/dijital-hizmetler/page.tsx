import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { ProseContent } from "@/components/pages/prose-content";
import { ServiceCard } from "@/components/pages/service-card";
import { digitalServicesIntro } from "@/content/site-content";
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
    eyebrow: "SDKONGRE",
    title: "DİJİTAL HİZMETLER",
    description: digitalServicesIntro.headline,
    image: "/media/headers/dijital-hizmetler.webp",
    video: null,
    animation: "fade",
  });

  return (
    <>
      <InteriorHero
        eyebrow="SDKONGRE"
        title="DİJİTAL HİZMETLER"
        description={digitalServicesIntro.headline}
        image="/media/headers/dijital-hizmetler.webp"
        video={hero.video}
        animation={hero.animation}
        template={hero.template}
        headingFont={hero.headingFont}
        bodyFont={hero.bodyFont}
        background={hero.background}
        textColor={hero.textColor}
        accentColor={hero.accentColor}
        headingScale={hero.headingScale}
        bodyScale={hero.bodyScale}
        heroSpacing={hero.heroSpacing}
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "DİJİTAL HİZMETLER" },
        ]}
      />

      <ProseContent paragraphs={digitalServicesIntro.paragraphs} />

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
