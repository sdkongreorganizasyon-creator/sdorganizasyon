import type { Metadata } from "next";
import Link from "next/link";

import { InteriorHero } from "@/components/pages/interior-hero";
import { legalDocuments } from "@/content/site-content";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "KVKK",
  description:
    "SDKONGRE kişisel verilerin korunması, gizlilik, çerez ve açık rıza metinleri.",
  path: "/kvkk",
});

export default function LegalIndexPage() {
  return (
    <>
      <InteriorHero
        eyebrow="KVKK"
        title="Kişisel Veriler ve Gizlilik"
        description="Kişisel verilerin işlenmesi, saklanması ve web sitesi kullanımına ilişkin yasal metinler."
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "KVKK" },
        ]}
      />

      <section className="section">
        <div className="container card-grid card-grid--two">
          {Object.entries(legalDocuments).map(([slug, document]) => (
            <Link
              className="navigation-card"
              href={`/kvkk/${slug}`}
              key={slug}
            >
              <p className="eyebrow">YASAL METİN</p>
              <h2>{document.title}</h2>
              <p>{document.headline}</p>
              <span>Metni İncele</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
