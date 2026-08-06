import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

type InteriorHeroProps = Readonly<{
  eyebrow: string;
  title: string;
  description?: string;
  image?: string | null;
  breadcrumbs?: readonly Readonly<{
    label: string;
    href?: string;
  }>[];
}>;

export function InteriorHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
}: InteriorHeroProps) {
  return (
    <section className="interior-hero">
      {image ? (
        <div className="interior-hero__media" aria-hidden="true">
          <Image src={image} alt="" fill priority sizes="100vw" />
        </div>
      ) : null}
      <div className="interior-hero__shade" aria-hidden="true" />
      <div className="interior-hero__glow" aria-hidden="true" />
      <Container>
        {breadcrumbs?.length ? (
          <nav className="breadcrumbs" aria-label="Sayfa yolu">
            <ol>
              {breadcrumbs.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  {index > 0 ? (
                    <ChevronRight aria-hidden="true" size={14} />
                  ) : null}
                  {item.href ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span aria-current="page">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description ? <p className="interior-hero__lead">{description}</p> : null}
      </Container>
    </section>
  );
}
