import type { CSSProperties } from "react";
import Image from "next/image";

import type { CmsPageSection } from "@/types/content";

function paragraphs(value: string | undefined) {
  return (value ?? "")
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function CmsPageSections({
  sections,
}: Readonly<{ sections?: readonly CmsPageSection[] }>) {
  const visible = sections?.filter((section) => section.active !== false) ?? [];
  if (!visible.length) return null;

  return (
    <div className="cms-page-sections">
      {visible.map((section) => {
        const style = {
          background: section.background || undefined,
          color: section.textColor || undefined,
          textAlign: section.align || undefined,
          paddingTop:
            typeof section.paddingTop === "number"
              ? `${section.paddingTop}px`
              : undefined,
          paddingBottom:
            typeof section.paddingBottom === "number"
              ? `${section.paddingBottom}px`
              : undefined,
          "--cms-section-gap":
            typeof section.contentGap === "number"
              ? `${section.contentGap}px`
              : undefined,
          "--cms-copy-padding":
            typeof section.contentPadding === "number"
              ? `${section.contentPadding}px`
              : undefined,
          "--cms-media-height":
            typeof section.mediaHeight === "number"
              ? `${section.mediaHeight}px`
              : undefined,
        } as CSSProperties;

        return (
          <section
            className={`cms-page-section cms-page-section--${section.type}`}
            data-animation={section.animation ?? "fade"}
            id={section.id}
            key={section.id}
            style={style}
          >
            <div className="container cms-page-section__layout">
              {section.imageUrl || section.videoUrl ? (
                <div className="cms-page-section__media">
                  {section.videoUrl ? (
                    <video
                      src={section.videoUrl}
                      controls
                      muted
                      playsInline
                      poster={section.imageUrl || undefined}
                    />
                  ) : section.imageUrl ? (
                    <Image
                      src={section.imageUrl}
                      alt={section.imageAlt || section.title || ""}
                      fill
                      sizes="(max-width: 860px) 100vw, 48vw"
                    />
                  ) : null}
                </div>
              ) : null}

              <div className="cms-page-section__copy">
                {section.eyebrow ? (
                  <p className="eyebrow">{section.eyebrow}</p>
                ) : null}
                {section.title ? <h2>{section.title}</h2> : null}
                {paragraphs(section.body).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
