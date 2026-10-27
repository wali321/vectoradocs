"use client";

import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

type RenderState =
  | { status: "loading" }
  | { status: "rendered"; svg: string }
  | { status: "error"; message: string };

export function MermaidDiagram({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const generatedId = useId();
  const diagramId = `vectora-mermaid-${generatedId.replaceAll(":", "")}`;
  const [state, setState] = useState<RenderState>({ status: "loading" });

  useEffect(() => {
    let active = true;
    mermaid.initialize({
      securityLevel: "strict",
      startOnLoad: false,
      theme: resolvedTheme === "dark" ? "dark" : "default",
    });

    void mermaid
      .render(diagramId, chart)
      .then(({ svg }) => {
        if (active) setState({ status: "rendered", svg });
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Mermaid could not render this diagram.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [chart, diagramId, resolvedTheme]);

  return (
    <figure className="mermaid-diagram">
      {state.status === "loading" ? (
        <p aria-live="polite">Rendering diagram…</p>
      ) : state.status === "rendered" ? (
        <div
          aria-label="Rendered Mermaid diagram"
          className="mermaid-diagram-rendered"
          dangerouslySetInnerHTML={{ __html: state.svg }}
          role="img"
        />
      ) : (
        <div className="mermaid-diagram-error" role="status">
          <p>Diagram rendering failed: {state.message}</p>
        </div>
      )}
      <details>
        <summary>View diagram source</summary>
        <pre>
          <code>{chart}</code>
        </pre>
      </details>
    </figure>
  );
}
