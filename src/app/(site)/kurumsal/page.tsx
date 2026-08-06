import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";

import { CmsPageSections } from "@/components/pages/cms-page-sections";
import { InteriorHero } from "@/components/pages/interior-hero";
import { corporatePages } from "@/content/site-content";
import { getCorporatePage } from "@/lib/content/queries";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import { createMetadata } from "@/lib/seo/metadata";
import type { CorporatePageContent } from "@/types/content";

export const metadata: Metadata = createMetadata({
  title: "Kurumsal",
  description:
    "SDKONGRE hakkında, hikayemiz, misyonumuz, vizyonumuz ve değerlerimiz.",
  path: "/kurumsal",
});

const corporateImages: Readonly<Record<string, string>> = {
  hakkimizda: "/media/corporate/hakkimizda.webp",
  hikayemiz: "/media/corporate/hikayemiz.webp",
  misyon: "/media/corporate/misyon.webp",
  vizyon: "/media/corporate/vizyon.webp",
  degerlerimiz: "/media/corporate/degerlerimiz.webp",
};

export default async function CorporateIndexPage() {
  const [settings, resolvedSections] = await Promise.all([
    getResolvedSiteSettings(),
    Promise.all(
      Object.keys(corporatePages).map(async (slug) => {
        const page = await getCorporatePage(slug);
        return page ? ([slug, page] as const) : null;
      }),
    ),
  ]);

  const sections = resolvedSections.filter(
    (item): item is readonly [string, CorporatePageContent] => item !== null,
  );
  const hero = getPageHero(settings, "/kurumsal", {
    eyebrow: "KURUMSAL",
    title: "SDKONGRE'yi Yakından Tanıyın",
    description:
      "Hikayemizi, yaklaşımımızı, misyonumuzu, vizyonumuzu ve değerlerimizi tek sayfada inceleyin.",
    image: "/media/headers/kurumsal.webp",
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
          { label: "KURUMSAL" },
        ]}
      />

      <main className="corporate-page">
        {sections.map(([slug, page], index) => {
          const values = page.values;
          const image = page.heroImage || corporateImages[slug];
          const design = page.design;
          const style = {
            background: design?.background || undefined,
            color: design?.textColor || undefined,
            "--page-accent": design?.accentColor || undefined,
            "--page-heading-scale": String(design?.headingScale ?? 1),
            "--page-body-scale": String(design?.bodyScale ?? 1),
            "--page-section-spacing": `${design?.sectionSpacing ?? 72}px`,
            "--page-card-gap": `${design?.cardGap ?? 16}px`,
            "--page-card-padding": `${design?.cardPadding ?? 18}px`,
          } as CSSProperties;

          return (
            <section
              className={`corporate-section${index % 2 ? " corporate-section--reverse" : ""}${image ? "" : " corporate-section--text-only"} corporate-section--${design?.template ?? "standard"}`}
              data-heading-font={design?.headingFont ?? "system"}
              data-body-font={design?.bodyFont ?? "system"}
              id={slug}
              key={slug}
              style={style}
            >
              <div className="container corporate-section__layout">
                {image ? (
                  <div className="corporate-section__media">
                    <Image
                      src={image}
                      alt={`${page.title} bölümünü temsil eden etkinlik görseli`}
                      fill
                      sizes="(max-width: 860px) 100vw, 42vw"
                    />
                  </div>
                ) : null}

                <div className="corporate-section__copy">
                  <p className="eyebrow">{page.title}</p>
                  <h2>{page.headline}</h2>
                  <div className="corporate-section__prose">
                    {page.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <CmsPageSections sections={page.sections} />

              {values?.length ? (
                <div className="container corporate-values-grid">
                  {values.map((value) => (
                    <article key={value.title}>
                      <h3>{value.title}</h3>
                      <p>{value.description}</p>
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </main>
    </>
  );
}
