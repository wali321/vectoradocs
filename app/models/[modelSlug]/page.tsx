import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DocumentationShell } from "@/components/docs/documentation-shell";
import { getMDXComponents } from "@/components/docs/mdx-components";
import { ModelSidebar } from "@/components/docs/model-sidebar";
import { findModel } from "@/lib/models";
import { source } from "@/lib/source";

type PageProps = {
  params: Promise<{ modelSlug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { modelSlug } = await params;
  const model = findModel(modelSlug);

  if (!model) {
    return { title: "Model not found" };
  }

  return {
    title: `${model.name} model family`,
    description: model.summary,
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

  const page = source.getPage(["models", model.slug]);
  if (!page) {
    throw new Error(
      `Missing model documentation for "${model.slug}": content/models/${model.slug}/index.mdx`,
    );
  }
  const Content = page.data.body;

  return (
    <DocumentationShell
      breadcrumbs={[
        { label: "Models", href: "/models" },
        { label: model.name },
      ]}
      sidebar={<ModelSidebar model={model} />}
      toc={page.data.toc}
    >
      <Content components={getMDXComponents()} />
    </DocumentationShell>
  );
}
