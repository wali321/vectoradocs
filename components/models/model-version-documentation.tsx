import Link from "next/link";
import { DocumentationShell } from "@/components/docs/documentation-shell";
import { getMDXComponents } from "@/components/docs/mdx-components";
import { ArchitectureExplorer } from "@/components/diagrams/architecture-explorer";
import { ModelSidebar } from "@/components/docs/model-sidebar";
import type { ModelRecord, ModelVersion } from "@/lib/models";
import { source } from "@/lib/source";

type ModelVersionDocumentationProps = {
  model: ModelRecord;
  modelVersion: ModelVersion;
};

export function ModelVersionDocumentation({
  model,
  modelVersion,
}: ModelVersionDocumentationProps) {
  const page = source.getPage(["models", model.slug, modelVersion.id]);
  if (!page) {
    throw new Error(
      `Missing version documentation for "${model.slug}/${modelVersion.id}": content/models/${model.slug}/${modelVersion.id}.mdx`,
    );
  }
  const Content = page.data.body;

  return (
    <DocumentationShell
      breadcrumbs={[
        { label: "Models", href: "/models" },
        { label: modelVersion.title ?? modelVersion.id },
      ]}
      sidebar={
        <ModelSidebar currentVersion={modelVersion.id} model={model} />
      }
      toc={page.data.toc}
    >
      <p className="version-kicker">
        {model.name}
        {model.latestVersion === modelVersion.id
          ? " · Latest documented"
          : ""}
      </p>
      <ul aria-label="Version navigation" className="version-list">
        {model.versions.map((item) => (
          <li key={item.id}>
            <Link
              aria-current={item.id === modelVersion.id ? "page" : undefined}
              href={
                item.id === model.latestVersion
                  ? `/models/${model.slug}`
                  : `/models/${model.slug}/${item.id}`
              }
            >
              {item.title ?? item.id}
              {model.latestVersion === item.id ? " · Latest" : ""}
            </Link>
          </li>
        ))}
      </ul>
      {modelVersion.diagrams?.map((diagram) => (
        <section className="version-diagram" key={diagram.id}>
          <p className="diagram-kind">{diagram.kind.replace("-", " ")}</p>
          <ArchitectureExplorer
            description={diagram.description}
            edges={diagram.edges}
            nodes={diagram.nodes}
            showTensorDetails
            title={diagram.title}
          />
        </section>
      ))}
      <Content components={getMDXComponents()} />
    </DocumentationShell>
  );
}
