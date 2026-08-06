import type { Metadata } from "next";
import Image from "next/image";

import { CmsPageSections } from "@/components/pages/cms-page-sections";
import { InteriorHero } from "@/components/pages/interior-hero";
import { corporatePages } from "@/content/site-content";
import { getCorporatePage } from "@/lib/content/queries";
import { createMetadata } from "@/lib/seo/metadata";
import type { CorporatePageContent } from "@/types/content";

export const metadata: Metadata = createMetadata({
  title: "Kurumsal",
  description:
    "SDKONGRE hakkında, hikayemiz, misyonumuz, vizyonumuz ve değerlerimiz.",
  path: "/kurumsal",
});

const corporateImages: Readonly<Record<string, string>> = {
  hakkimizda: "/media/pages/kurumsal.webp",
  hikayemiz: "/media/pages/neden-biz.webp",
  misyon: "/media/services/physical/kongre-organizasyonlari.webp",
  vizyon: "/media/pages/organizasyon-sureci.webp",
};

export default async function CorporateIndexPage() {
  const sections = (
    await Promise.all(
      Object.keys(corporatePages).map(async (slug) => {
        const page = await getCorporatePage(slug);
        return page ? ([slug, page] as const) : null;
      }),
    )
  ).filter(
    (item): item is readonly [string, CorporatePageContent] => item !== null,
  );

  return (
    <>
      <InteriorHero
        eyebrow="KURUMSAL"
        title="SDKONGRE'yi Yakından Tanıyın"
        description="Hikayemizi, yaklaşımımızı, misyonumuzu, vizyonumuzu ve değerlerimizi tek sayfada inceleyin."
        image="/media/pages/kurumsal.webp"
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "KURUMSAL" },
        ]}
      />

      <main className="corporate-page">
        {sections.map(([slug, page], index) => {
          const values = page.values;
          const image = corporateImages[slug];

          return (
            <section
              className={`corporate-section${index % 2 ? " corporate-section--reverse" : ""}${image ? "" : " corporate-section--text-only"}`}
              id={slug}
              key={slug}
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
