import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { ProcessTimeline } from "@/components/pages/process-timeline";
import { processIntro } from "@/content/site-content";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import { getProcessSteps } from "@/lib/content/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Organizasyon Süreci",
  description:
    "Brief, planlama, teklif, onay, operasyon ve raporlama aşamalarından oluşan profesyonel organizasyon yönetim süreci.",
  path: "/organizasyon-sureci",
});

export default async function ProcessPage() {
  const [steps, settings] = await Promise.all([
    getProcessSteps(),
    getResolvedSiteSettings(),
  ]);
  const hero = getPageHero(settings, "/organizasyon-sureci", {
    eyebrow: "ORGANİZASYON SURECİ",
    title: "Organizasyon Süreci",
    description: processIntro,
    image: "/media/headers/organizasyon-sureci.webp",
    video: null,
    animation: "fade",
  });

  return (
    <>
      <InteriorHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image="/media/headers/organizasyon-sureci.webp"
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
          { label: "ORGANİZASYON SURECİ" },
        ]}
      />

      <section className="section">
        <div className="container">
          <ProcessTimeline steps={steps} />
        </div>
      </section>
    </>
  );
}
