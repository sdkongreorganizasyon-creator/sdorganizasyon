import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { CmsPageSections } from "@/components/pages/cms-page-sections";
import { InteriorHero } from "@/components/pages/interior-hero";
import { ProseContent } from "@/components/pages/prose-content";
import { ValueCards } from "@/components/pages/value-cards";
import { getWhyUsContent } from "@/lib/content/queries";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Neden Biz",
  description:
    "SDKONGRE'nin tek noktadan yönetim, şeffaf bütçe, teknoloji ve ölçülebilir sonuç yaklaşımı.",
  path: "/neden-biz",
});

export default async function WhyUsPage() {
  const [content, settings] = await Promise.all([
    getWhyUsContent(),
    getResolvedSiteSettings(),
  ]);
  const hero = getPageHero(settings, "/neden-biz", {
    eyebrow: "SDKONGRE",
    title: "NEDEN BİZ",
    description: content.headline,
    image: "/media/headers/neden-biz.webp",
    video: null,
    animation: "fade",
  });
  const design = content.design;
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
    <>
      <InteriorHero
        eyebrow="SDKONGRE"
        title="NEDEN BİZ"
        description={content.headline}
        image="/media/headers/neden-biz.webp"
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
          { label: "NEDEN BİZ" },
        ]}
      />

      <main
        className={`cms-page cms-page--${design?.template ?? "standard"}`}
        data-heading-font={design?.headingFont ?? "system"}
        data-body-font={design?.bodyFont ?? "system"}
        style={style}
      >
        <ProseContent paragraphs={content.paragraphs} />
        <ValueCards items={content.items} />
        <CmsPageSections sections={content.sections} />
      </main>
    </>
  );
}
