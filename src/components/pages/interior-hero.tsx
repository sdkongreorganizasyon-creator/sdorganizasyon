import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";

type InteriorHeroProps = Readonly<{
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: readonly Readonly<{
    label: string;
    href?: string;
  }>[];
}>;

export function InteriorHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: InteriorHeroProps) {
  return (
    <section className="interior-hero">
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
