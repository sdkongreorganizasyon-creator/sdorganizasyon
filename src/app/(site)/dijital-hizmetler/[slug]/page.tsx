import { permanentRedirect } from "next/navigation";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export default async function DigitalServiceDetailRedirect({
  params,
}: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/dijital-hizmetler#${slug}`);
}
