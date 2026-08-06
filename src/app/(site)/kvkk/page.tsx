import type { Metadata } from "next";
import Link from "next/link";

import { InteriorHero } from "@/components/pages/interior-hero";
import { legalDocuments } from "@/content/site-content";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "KVKK",
  description:
    "SDKONGRE kişisel verilerin korunması, gizlilik, çerez ve açık rıza metinleri.",
  path: "/kvkk",
});

export default async function LegalIndexPage() {
  const settings = await getResolvedSiteSettings();
  const hero = getPageHero(settings, "/kvkk", {
    eyebrow: "KVKK",
    title: "Kişisel Veriler ve Gizlilik",
    description:
      "Kişisel verilerin işlenmesi, saklanması ve web sitesi kullanımına ilişkin yasal metinler.",
    image: "/media/headers/kvkk.webp",
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
          { label: "KVKK" },
        ]}
      />

      <section className="section">
        <div className="container card-grid card-grid--two">
          {Object.entries(legalDocuments).map(([slug, document]) => (
            <Link
              className="navigation-card"
              href={`/kvkk/${slug}`}
              key={slug}
            >
              <p className="eyebrow">YASAL METİN</p>
              <h2>{document.title}</h2>
              <p>{document.headline}</p>
              <span>Metni İncele</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
