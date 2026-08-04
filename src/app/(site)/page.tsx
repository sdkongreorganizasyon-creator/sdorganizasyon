import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { ValueGrid } from "@/components/home/value-grid";
import { getResolvedSiteSettings } from "@/lib/content/settings";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Doğru Planlama. Unutulmaz Deneyimler.",
  description:
    "Ulusal ve uluslararası kongre, toplantı ve etkinlik organizasyonlarında fikirleri kusursuz deneyimlere dönüştürüyoruz.",
  path: "/",
});

export default async function HomePage() {
  const settings = await getResolvedSiteSettings();

  return (
    <>
      <Hero hero={settings.hero} />
      <ValueGrid values={settings.homeValues} />
    </>
  );
}
