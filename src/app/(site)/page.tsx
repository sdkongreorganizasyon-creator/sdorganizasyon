import type { Metadata } from "next";

import { CapabilityStrip } from "@/components/home/capability-strip";
import { Hero } from "@/components/home/hero";
import { ValueGrid } from "@/components/home/value-grid";
import { getResolvedSiteSettings } from "@/lib/content/settings";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Doğru Yerde. Doğru Zaman. Mükemmel Sonuçlar.",
  description:
    "Kongre, toplantı ve etkinlikleriniz için yaratıcı ve etkili çözümler üretiyoruz.",
  path: "/",
});

export default async function HomePage() {
  const settings = await getResolvedSiteSettings();

  return (
    <>
      <Hero hero={settings.hero} />
      <ValueGrid values={settings.homeValues} />
      <CapabilityStrip />
    </>
  );
}
