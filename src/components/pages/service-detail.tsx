import { CheckCircle2 } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { InteriorHero } from "@/components/pages/interior-hero";
import type { ServiceContent } from "@/types/content";

type ServiceDetailProps = Readonly<{
  service: ServiceContent;
  parentLabel: string;
  parentPath: string;
}>;

export function ServiceDetail({
  service,
  parentLabel,
  parentPath,
}: ServiceDetailProps) {
  return (
    <>
      <InteriorHero
        eyebrow={parentLabel}
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: parentLabel, href: parentPath },
          { label: service.title },
        ]}
      />

      <section className="section">
        <div className="container service-detail">
          <aside className="service-detail__icon">
            <Icon name={service.icon} size={58} strokeWidth={1.35} />
          </aside>

          <div className="prose">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {service.features.length ? (
              <div className="feature-list">
                <h2>Hizmet Kapsamı</h2>
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 aria-hidden="true" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="page-cta">
              <p>
                Organizasyonunuzun kapsamını paylaşın; ihtiyaçlarınıza uygun
                çalışma modelini birlikte oluşturalım.
              </p>
              <ButtonLink
                href={`/teklif-al?hizmet=${encodeURIComponent(service.title)}`}
              >
                Bu Hizmet İçin Teklif Al
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
