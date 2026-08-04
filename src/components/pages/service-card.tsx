import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import type { ServiceContent } from "@/types/content";

type ServiceCardProps = Readonly<{
  service: ServiceContent;
  basePath: string;
}>;

export function ServiceCard({ service, basePath }: ServiceCardProps) {
  return (
    <article className="service-card">
      <span className="service-card__icon">
        <Icon name={service.icon} size={32} />
      </span>
      <h2>{service.title}</h2>
      <p>{service.summary}</p>
      <Link href={`${basePath}/${service.slug}`}>
        <span>Hizmeti Keşfet</span>
        <ArrowUpRight aria-hidden="true" size={18} />
      </Link>
    </article>
  );
}
