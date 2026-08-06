import type { Metadata } from "next";
import Link from "next/link";

import { InteriorHero } from "@/components/pages/interior-hero";
import { corporatePages } from "@/content/site-content";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Kurumsal",
  description:
    "SDKONGRE hakkında, hikayemiz, misyonumuz, vizyonumuz ve değerlerimiz.",
  path: "/kurumsal",
});

export default function CorporateIndexPage() {
  return (
    <>
      <InteriorHero
        eyebrow="KURUMSAL"
        title="SDKONGRE'yi Tanıyın"
        description="Organizasyon yönetimi yaklaşımımızı, hikayemizi ve iş yapış biçimimizi keşfedin."
        image="/media/pages/kurumsal.webp"
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "KURUMSAL" },
        ]}
      />

      <section className="section">
        <div className="container card-grid card-grid--two">
          {Object.entries(corporatePages).map(([slug, page]) => (
            <Link
              className="navigation-card"
              href={`/kurumsal/${slug}`}
              key={slug}
            >
              <p className="eyebrow">{page.eyebrow}</p>
              <h2>{page.title}</h2>
              <p>{page.headline}</p>
              <span>Sayfayı İncele</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
