import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureExplorer } from "@/components/diagrams/architecture-explorer";
import { getMDXComponents } from "@/components/docs/mdx-components";
import { ModelList } from "@/components/models/model-list";
import {
  documentationMapEdges,
  documentationMapNodes,
} from "@/lib/documentation-map";
import { models } from "@/lib/models";
import { project } from "@/lib/project";
import { source } from "@/lib/source";

export const metadata: Metadata = {
  title: "Research overview",
  description:
    "Project-wide research context, model directory, and documentation conventions for Vectora.",
  alternates: process.env.SITE_URL ? { canonical: "/" } : undefined,
};

const methodologyTopics = [
  { topic: "Tokenization and embeddings", status: "Documented in v1" },
  { topic: "Architecture and data flow", status: "Documented in v1" },
  { topic: "Training implementation", status: "Not implemented in v1" },
  { topic: "Evaluation evidence", status: "No results supplied" },
  { topic: "Inference and generation", status: "Documented in v1" },
  { topic: "Reproducibility and limits", status: "Documented in v1" },
];

export default function Home() {
  const projectPage = source.getPage(["project"]);
  if (!projectPage) {
    throw new Error(
      "Required project content is missing: content/project/index.mdx",
    );
  }
  const ProjectContent = projectPage.data.body;

  return (
    <main id="main-content" className="page-width home-page">
      <section aria-labelledby="project-title" className="home-hero">
        <div>
          <h1 id="project-title">{project.name}</h1>
          <p className="lead">{project.description}</p>
          <p className="byline">
            Made by {project.author} ·{" "}
            <Link href="/contact">Contact Us</Link>
          </p>
        </div>
        <aside className="hero-note">
          <h2>Research direction</h2>
          <p>
            Vectora documents small language-model implementations with a
            focus on transparent architecture, reproducibility, and separating
            implemented behavior from future work.
          </p>
        </aside>
      </section>

      <section aria-labelledby="research-title" className="section-rule">
        <div className="section-heading">
          <h2 id="research-title">Research overview</h2>
          <p>
            Vectora is a project for exploring and documenting language-model
            implementations. Its current published model record is Vectora v1;
            future versions will have independent documentation and evidence.
          </p>
        </div>
        <div className="research-content">
          <ProjectContent components={getMDXComponents()} />
        </div>
      </section>

      <section aria-labelledby="architecture-title" className="section-rule">
        <div className="section-heading">
          <h2 id="architecture-title">Project map</h2>
          <p>
            This conceptual map shows how the documentation is organized. It
            does not describe a model, training process, or research system.
          </p>
        </div>
        <ArchitectureExplorer
          description="Documentation structure only; the model's technical diagrams live in its version record."
          edges={documentationMapEdges}
          nodes={documentationMapNodes}
          title="How Vectora documentation is organized"
        />
      </section>

      <section aria-labelledby="models-title" className="section-rule">
        <div className="section-heading">
          <h2 id="models-title">Model directory</h2>
          <p>
            Browse the models documented by this project and their separate
            version histories.
          </p>
        </div>
        <ModelList models={models} />
        <p>
          <Link className="text-link" href="/models">
            Open the model index
          </Link>
        </p>
      </section>

      <section aria-labelledby="methodology-title" className="section-rule">
        <div className="section-heading">
          <h2 id="methodology-title">Research methodology</h2>
          <p>
            The v1 record covers its implemented architecture and tokenization,
            while also identifying training and evaluation details that have
            not been demonstrated.
          </p>
        </div>
        <ul className="method-list">
          {methodologyTopics.map(({ topic, status }) => (
            <li key={topic}>
              <span>{topic}</span>
              <span>{status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="conventions-title" className="section-rule">
        <div className="section-heading">
          <h2 id="conventions-title">Reading the documentation</h2>
          <p>
            Model pages summarize a project record. Version pages keep
            architecture, configuration, and evaluation history addressable
            without overwriting earlier documentation.
          </p>
        </div>
        <div className="documentation-conventions">
          <section>
            <h3>Versions stay distinct</h3>
            <p>
              Each version has a stable URL. The latest designation appears
              only when project metadata sets it.
            </p>
          </section>
          <section>
            <h3>Figures link to evidence</h3>
            <p>
              Interactive diagrams are version-specific. Unknown dimensions
              and data types are labeled as not documented.
            </p>
          </section>
          <section>
            <h3>Missing facts stay visible</h3>
            <p>
              Results, datasets, citations, and implementation details are
              included only when source information is available.
            </p>
          </section>
        </div>
      </section>

      <section aria-labelledby="references-title" className="section-rule">
        <div className="contact-inline">
          <div>
            <h2 id="references-title">References and contact</h2>
            <p>
              The Vectora v1 record includes its technical references and
              evidence scope.
            </p>
          </div>
          <div className="inline-links">
            <Link className="text-link" href="/models/vectora">
              Read the v1 references
            </Link>
            <Link className="text-link" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
