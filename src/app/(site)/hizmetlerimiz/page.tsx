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
  title: "Hizmetlerimiz",
  description:
    "Kongre, toplantı, lansman, workshop, fuar, seyahat, transfer ve operasyon yönetimi hizmetleri.",
  path: "/hizmetlerimiz",
});

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices("physical"),
    getResolvedSiteSettings(),
  ]);
  const hero = getPageHero(settings, "/hizmetlerimiz", {
    eyebrow: "HİZMETLERİMİZ",
    title: "Tüm Organizasyon Hizmetleri Tek Sayfada",
    description:
      "Planlamadan uygulamaya kadar sunduğumuz hizmetleri, açıklamaları ve görselleriyle birlikte inceleyin.",
    image: "/media/headers/hizmetlerimiz.webp",
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
