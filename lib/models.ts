import type { Edge } from "@xyflow/react";
import type { ArchitectureNode } from "@/lib/documentation-map";

export type ModelDiagram = {
  id: string;
  kind: "system" | "architecture" | "data-flow" | "training" | "inference";
  title: string;
  description: string;
  nodes: ArchitectureNode[];
  edges: Edge[];
};

export type ModelVersion = {
  id: string;
  title?: string;
  summary?: string;
  publishedAt?: string;
  changelog?: string[];
  diagrams?: ModelDiagram[];
};

export type ModelRecord = {
  slug: string;
  name: string;
  summary: string;
  family?: string;
  latestVersion?: string;
  versions: ModelVersion[];
};

export const models: ModelRecord[] = [
  {
    slug: "vectora",
    name: "Vectora",
    summary:
      "An educational language-model project focused on documenting implementation details and evidence.",
    latestVersion: "v1",
    versions: [
      {
        id: "v1",
        title: "Vectora v1",
        summary:
          "A documented educational decoder-only Transformer implementation. The supplied notebook shows random initialization and a forward-pass/generation demonstration, not training.",
      },
    ],
  },
];

export function findModel(slug: string): ModelRecord | undefined {
  return models.find((model) => model.slug === slug);
}
