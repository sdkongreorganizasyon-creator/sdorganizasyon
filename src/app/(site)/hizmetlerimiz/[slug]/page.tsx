import { permanentRedirect } from "next/navigation";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export default async function ServiceDetailRedirect({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/hizmetlerimiz#${slug}`);
}
