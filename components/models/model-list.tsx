import Link from "next/link";
import type { ModelRecord } from "@/lib/models";

export function ModelList({ models }: { models: ModelRecord[] }) {
  const versions = models.flatMap((model) =>
    model.versions.map((version) => ({ model, version })),
  );

  if (versions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No model versions published yet</h3>
        <p>
          Version names and technical documentation will appear here once
          verified project information has been added.
        </p>
      </div>
    );
  }

  return (
    <ul className="model-list">
      {versions.map(({ model, version }) => (
        <li key={`${model.slug}-${version.id}`}>
          <Link
            href={
              version.id === model.latestVersion
                ? `/models/${model.slug}`
                : `/models/${model.slug}/${version.id}`
            }
          >
            <span className="model-list-title">
              {version.title ?? `${model.name} ${version.id}`}
            </span>
            <span className="model-list-summary">
              {version.summary ?? model.summary}
            </span>
            <span className="model-list-meta">
              {model.family && <span>{model.family}</span>}
              <span>{model.name}</span>
              {model.latestVersion === version.id && (
                <span>Latest documented version</span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
