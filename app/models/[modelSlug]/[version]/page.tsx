import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ModelVersionDocumentation } from "@/components/models/model-version-documentation";
import { findModel } from "@/lib/models";

type PageProps = {
  params: Promise<{ modelSlug: string; version: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { modelSlug, version } = await params;
  const model = findModel(modelSlug);
  const modelVersion = model?.versions.find((item) => item.id === version);

  if (!model || !modelVersion) {
    return { title: "Version not found" };
  }

  return {
    title: modelVersion.title ?? `${model.name} ${version}`,
    description:
      modelVersion.summary ??
      `Version-specific documentation for ${model.name}.`,
    alternates: process.env.SITE_URL
      ? { canonical: `/models/${model.slug}/${modelVersion.id}` }
      : undefined,
  };
}

export default function ModelVersionPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={<p className="page-width">Loading version documentation...</p>}
    >
      <ModelVersionContent params={params} />
    </Suspense>
  );
}

async function ModelVersionContent({ params }: PageProps) {
  const { modelSlug, version } = await params;
  const model = findModel(modelSlug);
  const modelVersion = model?.versions.find((item) => item.id === version);
  if (!model || !modelVersion) notFound();

  return (
    <ModelVersionDocumentation model={model} modelVersion={modelVersion} />
  );
}
