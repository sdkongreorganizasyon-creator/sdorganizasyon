import { ProjectForm } from "@/components/admin/project-form";
import { getAdminMediaOptions } from "@/lib/cms/media-options";

export default async function NewProjectPage() {
  const mediaOptions = await getAdminMediaOptions();
  return <ProjectForm mediaOptions={mediaOptions} />;
}
