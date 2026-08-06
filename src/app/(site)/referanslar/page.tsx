import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { ProseContent } from "@/components/pages/prose-content";
import { ReferenceGrid } from "@/components/pages/reference-grid";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { referencesIntro } from "@/content/site-content";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import { getReferences } from "@/lib/content/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Referanslar",
  description:
    "SDKONGRE'nin kamu, üniversite, dernek, sağlık ve özel sektör iş birlikleri.",
  path: "/referanslar",
});

export default async function ReferencesPage() {
  const [references, settings] = await Promise.all([
    getReferences(),
    getResolvedSiteSettings(),
  ]);
  const hero = getPageHero(settings, "/referanslar", {
    eyebrow: "SDKONGRE",
    title: "REFERANSLAR",
    description: referencesIntro.headline,
    image: "/media/headers/referanslar.webp",
    video: null,
    animation: "fade",
  });

  return (
    <>
      <InteriorHero
        eyebrow="SDKONGRE"
        title="REFERANSLAR"
        description={referencesIntro.headline}
        image="/media/headers/referanslar.webp"
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
          { label: "REFERANSLAR" },
        ]}
      />

      <ProseContent paragraphs={referencesIntro.paragraphs} />

      <section className="section">
        <div className="container">
          {references.length ? (
            <ReferenceGrid references={references} />
          ) : (
            <EmptyState
              title="Referanslar yayınlanmaya hazırlanıyor."
              description="Yalnız kullanım izni doğrulanmış gerçek kurum logoları ve onaylı başarı hikâyeleri yönetim panelinden eklenecektir."
              action={
                <ButtonLink href="/iletisim" variant="secondary">
                  Bizimle İletişime Geçin
                </ButtonLink>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}
