import type { Metadata } from "next";

import { QuoteForm } from "@/components/forms/quote-form";
import { InteriorHero } from "@/components/pages/interior-hero";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Teklif Al",
  description:
    "Kongre, toplantı, lansman, fuar ve dijital etkinlik çözümleri için teklif talebi oluşturun.",
  path: "/teklif-al",
});

type PageProps = Readonly<{
  searchParams: Promise<{ hizmet?: string }>;
}>;

export default async function QuotePage({ searchParams }: PageProps) {
  const [{ hizmet }, settings] = await Promise.all([
    searchParams,
    getResolvedSiteSettings(),
  ]);
  const hero = getPageHero(settings, "/teklif-al", {
    eyebrow: "TEKLİF AL",
    title: "Organizasyonunuzu Birlikte Planlayalım",
    description:
      "Etkinliğinizin temel bilgilerini paylaşın. Ekibimiz ihtiyaçlarınızı değerlendirerek kapsam ve çözüm yaklaşımı için sizinle iletişime geçsin.",
    image: "/media/headers/teklif-al.webp",
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
          { label: "TEKLİF AL" },
        ]}
      />

      <section className="section">
        <div className="container quote-container">
          <QuoteForm initialService={hizmet} />
        </div>
      </section>
    </>
  );
}
