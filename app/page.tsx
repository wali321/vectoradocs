import type { Metadata } from "next";
import Link from "next/link";
import { getMDXComponents } from "@/components/docs/mdx-components";
import { findModel } from "@/lib/models";
import { project } from "@/lib/project";
import { source } from "@/lib/source";

export const metadata: Metadata = {
  title: "Language-model research",
  description:
    "Vectora explores how language models work by implementing and examining their components.",
  alternates: process.env.SITE_URL ? { canonical: "/" } : undefined,
};

export default function Home() {
  const projectPage = source.getPage(["project"]);
  if (!projectPage) {
    throw new Error(
      "Required project content is missing: content/project/index.mdx",
    );
  }

  const model = findModel("vectora");
  const version =
    model?.versions.find((item) => item.id === (model.latestVersion ?? "v1.1")) ??
    model?.versions.find((item) => item.id === "v1.1") ??
    model?.versions[0];

  if (!model || !version) {
    throw new Error(
      "A documented Vectora version must be registered to feature it on the homepage.",
    );
  }

  const ProjectContent = projectPage.data.body;

  return (
    <main id="main-content" className="page-width home-page">
      <section aria-labelledby="project-title" className="home-hero">
        <div className="home-hero-copy">
          <h1 id="project-title">{projectPage.data.title}</h1>
          <p className="lead">{projectPage.data.description}</p>
          <div className="home-actions">
            <Link className="primary-action" href="/models">
              Explore Models
            </Link>
            <a
              className="secondary-action"
              href={project.repositoryUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <aside
          aria-labelledby="featured-version-title"
          className="home-feature"
        >
          <p className="home-feature-label">Latest documented release</p>
          <h2 id="featured-version-title">
            {version.title ?? `${model.name} ${version.id}`}
          </h2>
          <p>{version.summary ?? model.summary}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link href={`/models/${model.slug}/${version.id}`}>
              Read the {version.id} documentation →
            </Link>
            <Link
              href={`/models/${model.slug}/v1`}
              style={{ fontSize: "0.875rem", opacity: 0.8 }}
            >
              View Vectora v1 (Architecture baseline)
            </Link>
          </div>
        </aside>
      </section>

      <article className="home-content">
        <ProjectContent components={getMDXComponents()} />
      </article>
    </main>
  );
}
