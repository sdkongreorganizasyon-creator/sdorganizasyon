import Image from "next/image";

import type { ServiceContent } from "@/types/content";

type ServiceCardProps = Readonly<{
  service: ServiceContent;
}>;

export function ServiceCard({ service }: ServiceCardProps) {
  const fullDescription = [service.summary, ...service.paragraphs]
    .filter(Boolean)
    .join(" ");

  const featureText = service.features.length
    ? service.features.join(" · ")
    : null;

  return (
    <article className="service-card" id={service.slug}>
      <div className="service-card__media">
        <Image
          src={service.imageUrl || "/media/home/sdkongre-approved-hero.webp"}
          alt={
            service.imageAlt ||
            `${service.title} hizmetini temsil eden etkinlik görseli`
          }
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="service-card__body">
        <h2>{service.title}</h2>
        <p>{fullDescription}</p>
        {featureText ? (
          <p className="service-card__features">{featureText}</p>
        ) : null}
      </div>
    </article>
  );
}
