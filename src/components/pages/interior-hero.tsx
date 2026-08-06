import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Container } from "@/components/ui/container";

type InteriorHeroProps = Readonly<{
  eyebrow: string;
  title: string;
  description?: string;
  image?: string | null;
  video?: string | null;
  animation?: "fade" | "slide" | "scale" | "none";
  template?: "standard" | "split" | "editorial" | "minimal";
  headingFont?: "system" | "serif" | "geometric" | "humanist";
  bodyFont?: "system" | "serif" | "geometric" | "humanist";
  background?: string;
  textColor?: string;
  accentColor?: string;
  headingScale?: number;
  bodyScale?: number;
  heroSpacing?: number;
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
  video,
  animation = "fade",
  template = "standard",
  headingFont = "system",
  bodyFont = "system",
  background = "#07111d",
  textColor = "#ffffff",
  accentColor = "#f2b632",
  headingScale = 1,
  bodyScale = 1,
  heroSpacing = 72,
  breadcrumbs,
}: InteriorHeroProps) {
  const style = {
    "--interior-hero-background": background,
    "--interior-hero-text": textColor,
    "--interior-hero-accent": accentColor,
    "--interior-hero-heading-scale": String(headingScale),
    "--interior-hero-body-scale": String(bodyScale),
    "--interior-hero-spacing": `${heroSpacing}px`,
  } as CSSProperties;

  return (
    <section
      className={`interior-hero interior-hero--${template}`}
      data-animation={animation}
      data-heading-font={headingFont}
      data-body-font={bodyFont}
      style={style}
    >
      {video || image ? (
        <div className="interior-hero__media" aria-hidden="true">
          {video ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={image || undefined}
            >
              <source src={video} />
            </video>
          ) : image ? (
            <Image src={image} alt="" fill priority sizes="100vw" />
          ) : null}
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
        {description ? (
          <p className="interior-hero__lead">{description}</p>
        ) : null}
      </Container>
    </section>
  );
}
