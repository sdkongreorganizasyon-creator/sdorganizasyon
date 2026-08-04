import type { MetadataRoute } from "next";

import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getProjects } from "@/lib/content/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const navigationPaths = navigation.flatMap((item) => [
    item.href,
    ...(item.children?.map((child) => child.href) ?? []),
  ]);

  const projects = await getProjects();
  const projectPaths = projects.map((project) => `/projeler/${project.slug}`);

  const fixedPaths = ["/teklif-al"];

  return Array.from(
    new Set([...navigationPaths, ...projectPaths, ...fixedPaths]),
  ).map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : path === "/teklif-al" ? 0.9 : 0.7,
  }));
}
