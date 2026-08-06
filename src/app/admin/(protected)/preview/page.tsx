import { PreviewStudio } from "@/components/admin/preview-studio";

type PreviewPageProps = Readonly<{
  searchParams: Promise<{ path?: string }>;
}>;

function safePath(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export default async function AdminPreviewPage({
  searchParams,
}: PreviewPageProps) {
  const params = await searchParams;
  return <PreviewStudio initialPath={safePath(params.path)} />;
}
