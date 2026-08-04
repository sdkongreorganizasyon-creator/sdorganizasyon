import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/utils/format";
import type { ProjectRecord } from "@/types/content";

type ProjectCardProps = Readonly<{
  project: ProjectRecord;
}>;

export function ProjectCard({ project }: ProjectCardProps) {
  const date = formatDate(project.startDate);

  return (
    <article className="project-card">
      <Link href={`/projeler/${project.slug}`}>
        <div className="project-card__media">
          {project.coverUrl ? (
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="project-card__placeholder" aria-hidden="true" />
          )}
          <div className="project-card__overlay" />
        </div>

        <div className="project-card__content">
          <p className="eyebrow">{project.eventType ?? "PROJE"}</p>
          <h2>{project.title}</h2>
          <div className="project-card__meta">
            {project.city ? (
              <span>
                <MapPin aria-hidden="true" size={16} />
                {project.city}
              </span>
            ) : null}
            {date ? <span>{date}</span> : null}
          </div>
          <span className="project-card__link">
            Proje Detayını Gör
            <ArrowUpRight aria-hidden="true" size={18} />
          </span>
        </div>
      </Link>
    </article>
  );
}
