import type { Metadata } from "next";

import { QuoteForm } from "@/components/forms/quote-form";
import { InteriorHero } from "@/components/pages/interior-hero";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Teklif Al",
  description:
    "Kongre, toplantı, lansman, fuar ve dijital etkinlik çözümleri için teklif talebi oluşturun.",
  path: "/teklif-al",
});

type PageProps = Readonly<{
  searchParams: Promise<{ hizmet?: string }>;
}>;

export default async function QuotePage({ searchParams }: PageProps) {
  const { hizmet } = await searchParams;

  return (
    <>
      <InteriorHero
        eyebrow="TEKLİF AL"
        title="Organizasyonunuzu Birlikte Planlayalım"
        description="Etkinliğinizin temel bilgilerini paylaşın. Ekibimiz ihtiyaçlarınızı değerlendirerek kapsam ve çözüm yaklaşımı için sizinle iletişime geçsin."
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "TEKLİF AL" },
        ]}
      />

      <section className="section">
        <div className="container quote-container">
          <QuoteForm initialService={hizmet} />
        </div>
      </section>
    </>
  );
}
