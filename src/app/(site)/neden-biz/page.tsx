import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { ProseContent } from "@/components/pages/prose-content";
import { ValueCards } from "@/components/pages/value-cards";
import { getWhyUsContent } from "@/lib/content/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Neden Biz",
  description:
    "SDKONGRE'nin tek noktadan yönetim, şeffaf bütçe, teknoloji ve ölçülebilir sonuç yaklaşımı.",
  path: "/neden-biz",
});

export default async function WhyUsPage() {
  const content = await getWhyUsContent();

  return (
    <>
      <InteriorHero
        eyebrow="NEDEN BİZ"
        title={content.headline}
        description="Planlamadan raporlamaya kadar her adımda profesyonel proje yönetimi."
        image="/media/pages/neden-biz.webp"
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "NEDEN BİZ" },
        ]}
      />

      <ProseContent paragraphs={content.paragraphs} />
      <ValueCards items={content.items} />
    </>
  );
}
