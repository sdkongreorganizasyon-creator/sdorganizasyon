import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { ProcessTimeline } from "@/components/pages/process-timeline";
import { processIntro } from "@/content/site-content";
import { getProcessSteps } from "@/lib/content/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Organizasyon Süreci",
  description:
    "Brief, planlama, teklif, onay, operasyon ve raporlama aşamalarından oluşan profesyonel organizasyon yönetim süreci.",
  path: "/organizasyon-sureci",
});

export default async function ProcessPage() {
  const steps = await getProcessSteps();

  return (
    <>
      <InteriorHero
        eyebrow="ORGANİZASYON SURECİ"
        title="Organizasyon Süreci"
        description={processIntro}
        image="/media/pages/organizasyon-sureci.webp"
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
