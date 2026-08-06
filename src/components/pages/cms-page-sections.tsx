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
          "--cms-section-padding-top": `${section.paddingTop ?? 64}px`,
          "--cms-section-padding-bottom": `${section.paddingBottom ?? 64}px`,
          "--cms-section-gap": `${section.contentGap ?? 32}px`,
          "--cms-section-copy-padding": `${section.contentPadding ?? 0}px`,
          "--cms-section-media-height": `${section.mediaHeight ?? 360}px`,
          "--cms-section-heading-scale": String(section.headingScale ?? 1),
          "--cms-section-body-scale": String(section.bodyScale ?? 1),
        } as CSSProperties;

        return (
          <section
            className={`cms-page-section cms-page-section--${section.type} cms-page-section--template-${section.template ?? "standard"}`}
            data-animation={section.animation ?? "fade"}
            data-heading-font={section.headingFont ?? "system"}
            data-body-font={section.bodyFont ?? "system"}
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
