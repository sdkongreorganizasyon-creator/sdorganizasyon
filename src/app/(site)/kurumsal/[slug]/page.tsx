import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CmsPageSections } from "@/components/pages/cms-page-sections";
import { InteriorHero } from "@/components/pages/interior-hero";
import { ProseContent } from "@/components/pages/prose-content";
import { ValueCards } from "@/components/pages/value-cards";
import { corporatePages } from "@/content/site-content";
import { getCorporatePage } from "@/lib/content/queries";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return Object.keys(corporatePages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = corporatePages[slug as keyof typeof corporatePages];

  if (!page) return {};

  return createMetadata({
    title: page.title,
    description: page.headline || page.paragraphs[0],
    path: `/kurumsal/${slug}`,
  });
}

export default async function CorporateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [page, settings] = await Promise.all([
    getCorporatePage(slug),
    getResolvedSiteSettings(),
  ]);

  if (!page) {
    notFound();
  }

  const hero = getPageHero(settings, `/kurumsal/${slug}`, {
    eyebrow: "KURUMSAL",
    title: page.title.toLocaleUpperCase("tr-TR"),
    description: page.headline,
    image: page.heroImage || `/media/corporate/${slug}.webp`,
    video: page.heroVideo || null,
    animation:
      page.heroAnimation === "slide" ||
      page.heroAnimation === "scale" ||
      page.heroAnimation === "none"
        ? page.heroAnimation
        : "fade",
  });
  const design = page.design;
  const style = {
    background: design?.background || undefined,
    color: design?.textColor || undefined,
    "--page-accent": design?.accentColor || undefined,
    "--page-heading-scale": String(design?.headingScale ?? 1),
    "--page-body-scale": String(design?.bodyScale ?? 1),
    "--page-section-spacing": `${design?.sectionSpacing ?? 56}px`,
    "--page-card-gap": `${design?.cardGap ?? 16}px`,
    "--page-card-padding": `${design?.cardPadding ?? 18}px`,
  } as CSSProperties;

  return (
    <>
      <InteriorHero
        eyebrow="KURUMSAL"
        title={page.title.toLocaleUpperCase("tr-TR")}
        description={page.headline || undefined}
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
          { label: page.title.toLocaleUpperCase("tr-TR") },
        ]}
      />

      <main
        className={`cms-page cms-page--${design?.template ?? "standard"}`}
        data-heading-font={design?.headingFont ?? "system"}
        data-body-font={design?.bodyFont ?? "system"}
        style={style}
      >
        <ProseContent paragraphs={page.paragraphs} />
        {page.values?.length ? <ValueCards items={page.values} /> : null}
        <CmsPageSections sections={page.sections} />
      </main>
    </>
  );
}
