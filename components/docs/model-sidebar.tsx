import Link from "next/link";
import type { ModelRecord } from "@/lib/models";

type ModelSidebarProps = {
  model: ModelRecord;
  currentVersion?: string;
};

export function ModelSidebar({ model, currentVersion }: ModelSidebarProps) {
  return (
    <div className="sidebar-content">
      <Link className="sidebar-back" href="/models">
        All models
      </Link>
      <p className="sidebar-heading">{model.name}</p>
      {currentVersion !== model.latestVersion && (
        <nav aria-label={`${model.name} documentation`}>
          <ul>
            <li>
              <Link href={`/models/${model.slug}`}>Latest version</Link>
            </li>
          </ul>
        </nav>
      )}
      <h2 className="sidebar-heading">Versions</h2>
      {model.versions.length === 0 ? (
        <p className="sidebar-empty">No versions are documented.</p>
      ) : (
        <nav aria-label={`${model.name} versions`}>
          <ul>
            {model.versions.map((version) => (
              <li key={version.id}>
                <Link
                  aria-current={
                    currentVersion === version.id ? "page" : undefined
                  }
                  href={
                    version.id === model.latestVersion
                      ? `/models/${model.slug}`
                      : `/models/${model.slug}/${version.id}`
                  }
                >
                  {version.title ?? version.id}
                  {model.latestVersion === version.id && (
                    <span className="latest-tag">Latest</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
