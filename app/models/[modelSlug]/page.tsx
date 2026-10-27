import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ModelVersionDocumentation } from "@/components/models/model-version-documentation";
import { findModel } from "@/lib/models";

type PageProps = {
  params: Promise<{ modelSlug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { modelSlug } = await params;
  const model = findModel(modelSlug);
  const modelVersion = model?.versions.find(
    (item) => item.id === model.latestVersion,
  );

  if (!model || !modelVersion) {
    return { title: "Version not found" };
  }

  return {
    title: modelVersion.title ?? `${model.name} ${modelVersion.id}`,
    description:
      modelVersion.summary ??
      `Version-specific documentation for ${model.name}.`,
    alternates: process.env.SITE_URL
      ? { canonical: `/models/${model.slug}` }
      : undefined,
  };
}

export default function ModelPage({ params }: PageProps) {
  return (
    <Suspense fallback={<p className="page-width">Loading model documentation...</p>}>
      <ModelPageContent params={params} />
    </Suspense>
  );
}

async function ModelPageContent({ params }: PageProps) {
  const { modelSlug } = await params;
  const model = findModel(modelSlug);
  if (!model) notFound();

  const modelVersion = model.versions.find(
    (item) => item.id === model.latestVersion,
  );
  if (!modelVersion) notFound();

  return (
    <ModelVersionDocumentation model={model} modelVersion={modelVersion} />
  );
}
