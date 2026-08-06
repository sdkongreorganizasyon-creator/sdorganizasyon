import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { corporatePages } from "@/content/site-content";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return Object.keys(corporatePages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = corporatePages[slug as keyof typeof corporatePages];

  if (!page) return {};

  return createMetadata({
    title: page.title,
    description: page.headline,
    path: `/kurumsal#${slug}`,
  });
}

export default async function CorporateDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!(slug in corporatePages)) {
    notFound();
  }

  redirect(`/kurumsal#${slug}`);
}
