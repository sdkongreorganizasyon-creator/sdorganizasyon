import { CalendarDays, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { InteriorHero } from "@/components/pages/interior-hero";
import { PageCta } from "@/components/pages/page-cta";
import { getProject } from "@/lib/content/queries";
import { formatDate } from "@/lib/utils/format";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return {};

  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projeler/${slug}`,
    image: project.coverUrl ?? "/opengraph-image",
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const startDate = formatDate(project.startDate);
  const endDate = formatDate(project.endDate);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Projeler", path: "/projeler" },
          { name: project.title, path: `/projeler/${slug}` },
        ])}
      />

      <InteriorHero
        eyebrow={project.eventType ?? "PROJE"}
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "PROJELER", href: "/projeler" },
          { label: project.title },
        ]}
      />

      <section className="section">
        <div className="container project-detail">
          <aside className="project-detail__meta">
            {project.clientName ? (
              <div>
                <span>Müşteri / Kurum</span>
                <strong>{project.clientName}</strong>
              </div>
            ) : null}
            {project.city || project.venue ? (
              <div>
                <span>
                  <MapPin aria-hidden="true" size={16} />
                  Lokasyon
                </span>
                <strong>
                  {[project.venue, project.city].filter(Boolean).join(", ")}
                </strong>
              </div>
            ) : null}
            {startDate ? (
              <div>
                <span>
                  <CalendarDays aria-hidden="true" size={16} />
                  Tarih
                </span>
                <strong>
                  {endDate && endDate !== startDate
                    ? `${startDate} – ${endDate}`
                    : startDate}
                </strong>
              </div>
            ) : null}
          </aside>

          <div className="prose">
            {project.challenge ? (
              <section>
                <h2>İhtiyaç</h2>
                <p>{project.challenge}</p>
              </section>
            ) : null}
            {project.solution ? (
              <section>
                <h2>Çözüm</h2>
                <p>{project.solution}</p>
              </section>
            ) : null}
            {project.result && Object.keys(project.result).length ? (
              <section>
                <h2>Sonuç</h2>
                <pre className="project-result-json">
                  {JSON.stringify(project.result, null, 2)}
                </pre>
              </section>
            ) : null}
          </div>
        </div>
      </section>

      {project.media?.length ? (
        <section className="section section--soft">
          <div className="container project-gallery">
            {project.media.map((media) =>
              media.mediaType === "image" ? (
                <figure key={media.id}>
                  <Image
                    src={media.url}
                    alt={media.altText ?? project.title}
                    width={1600}
                    height={1000}
                  />
                  {media.caption ? (
                    <figcaption>{media.caption}</figcaption>
                  ) : null}
                </figure>
              ) : (
                <figure key={media.id}>
                  <video controls preload="metadata">
                    <source src={media.url} />
                  </video>
                  {media.caption ? (
                    <figcaption>{media.caption}</figcaption>
                  ) : null}
                </figure>
              ),
            )}
          </div>
        </section>
      ) : null}

      <PageCta />
    </>
  );
}
