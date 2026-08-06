import type { Metadata } from "next";

import { InteriorHero } from "@/components/pages/interior-hero";
import { ProjectCard } from "@/components/pages/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { projectsIntro } from "@/content/site-content";
import {
  getPageHero,
  getResolvedSiteSettings,
} from "@/lib/content/settings";
import { getProjects } from "@/lib/content/queries";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projeler",
  description:
    "SDKONGRE tarafından gerçekleştirilen kongre, toplantı, lansman, fuar ve kurumsal etkinlik projeleri.",
  path: "/projeler",
});

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getResolvedSiteSettings(),
  ]);
  const hero = getPageHero(settings, "/projeler", {
    eyebrow: "PROJELER",
    title: projectsIntro.headline,
    description: projectsIntro.paragraphs.join(" "),
    image: "/media/pages/projeler.webp",
    video: null,
    animation: "fade",
  });

  return (
    <>
      <InteriorHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={hero.image}
        video={hero.video}
        animation={hero.animation}
        breadcrumbs={[
          { label: "ANA SAYFA", href: "/" },
          { label: "PROJELER" },
        ]}
      />

      <section className="section">
        <div className="container">
          {projects.length ? (
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Projeler yayınlanmaya hazırlanıyor."
              description="Gerçek proje kayıtları ve kullanım izni bulunan görseller yönetim panelinden eklendiğinde bu alanda görüntülenecektir."
              action={
                <ButtonLink href="/teklif-al">
                  Organizasyonunuz İçin Teklif Alın
                </ButtonLink>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}
