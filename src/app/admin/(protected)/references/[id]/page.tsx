import { notFound } from "next/navigation";

import { ReferenceForm } from "@/components/admin/reference-form";
import { createClient } from "@/lib/supabase/server";

type PageProps = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function EditReferencePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("references")
    .select(
      "id,name,website,category,story,logo_media_id,visible",
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <ReferenceForm
      reference={{
        id: data.id,
        name: data.name,
        website: data.website,
        category: data.category,
        story: data.story,
        logoMediaId: data.logo_media_id,
        visible: data.visible,
      }}
    />
  );
}
