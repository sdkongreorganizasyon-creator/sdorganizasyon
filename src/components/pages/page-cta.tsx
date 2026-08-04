import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

type PageCtaProps = Readonly<{
  title?: string;
  description?: string;
}>;

export function PageCta({
  title = "Etkinliğinizi Birlikte Planlayalım",
  description = "İhtiyaçlarınızı paylaşın; planlama, operasyon ve dijital çözümler için size özel kapsamı birlikte oluşturalım.",
}: PageCtaProps) {
  return (
    <section className="page-cta-section">
      <div className="container page-cta-section__inner">
        <div>
          <p className="eyebrow">BİRLİKTE ÇALIŞALIM</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <ButtonLink href="/teklif-al">
          Teklif Al
          <ArrowRight aria-hidden="true" size={18} />
        </ButtonLink>
      </div>
    </section>
  );
}
