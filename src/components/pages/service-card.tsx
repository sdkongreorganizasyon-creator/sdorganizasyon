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

  const style = {
    background: service.cardBackground || undefined,
    color: service.textColor || undefined,
  };

  return (
    <article
      className="service-card"
      data-animation={service.animation ?? "fade"}
      id={service.slug}
      style={style}
    >
      <div className="service-card__media">
        {service.videoUrl ? (
          <video
            src={service.videoUrl}
            muted
            playsInline
            loop
            controls
            poster={service.imageUrl}
          />
        ) : (
          <Image
            src={service.imageUrl || "/media/home/sdkongre-approved-hero.webp"}
            alt={
              service.imageAlt ||
              `${service.title} hizmetini temsil eden etkinlik görseli`
            }
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
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
