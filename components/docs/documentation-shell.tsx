import Link from "next/link";
import type { ReactNode } from "react";

type Breadcrumb = {
  label: string;
  href?: string;
};

type TocEntry = {
  title?: ReactNode;
  url: string;
  depth: number;
};

type DocumentationShellProps = {
  breadcrumbs: Breadcrumb[];
  children: ReactNode;
  sidebar: ReactNode;
  toc: TocEntry[];
};

function renderTocEntries(toc: TocEntry[]) {
  return toc.map((item) => (
    <li className={`toc-depth-${item.depth}`} key={item.url}>
      <a href={item.url}>{item.title}</a>
    </li>
  ));
}

export function DocumentationShell({
  breadcrumbs,
  children,
  sidebar,
  toc,
}: DocumentationShellProps) {
  return (
    <main className="docs-page" id="main-content">
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {breadcrumbs.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="docs-layout">
        <aside aria-label="Documentation navigation" className="docs-sidebar">
          {sidebar}
        </aside>
        <article className="prose docs-article">{children}</article>
        {toc.length > 0 && (
          <>
            <nav aria-label="On this page" className="docs-toc">
              <h2>On this page</h2>
              <ol>{renderTocEntries(toc)}</ol>
            </nav>
            <details className="docs-toc-compact">
              <summary>On this page</summary>
              <ol>{renderTocEntries(toc)}</ol>
            </details>
          </>
        )}
      </div>
    </main>
  );
}
