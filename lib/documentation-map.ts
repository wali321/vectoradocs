import type { Edge, MarkerType, Node } from "@xyflow/react";

const arrowClosedMarker = "arrowclosed" as MarkerType;

export type ArchitectureNodeData = {
  title: string;
  category: string;
  description: string;
  href: string;
  inputShape?: string;
  outputShape?: string;
  dataType?: string;
  technicalDetails?: string;
};

export type ArchitectureNode = Node<ArchitectureNodeData, "architecture">;

export const documentationMapNodes: ArchitectureNode[] = [
  {
    id: "project",
    type: "architecture",
    position: { x: 80, y: 0 },
    data: {
      title: "Project overview",
      category: "Project",
      description:
        "Vectora's project-level research context, scope, and documentation conventions.",
      href: "/",
    },
  },
  {
    id: "models",
    type: "architecture",
    position: { x: 80, y: 150 },
    data: {
      title: "Model directory",
      category: "Index",
      description:
        "An index of model records and links to the versions currently documented.",
      href: "/models",
    },
  },
  {
    id: "versions",
    type: "architecture",
    position: { x: 80, y: 300 },
    data: {
      title: "Version records",
      category: "History",
      description:
        "Version-specific documentation preserves each model release independently.",
      href: "/models",
    },
  },
];

export const documentationMapEdges: Edge[] = [
  {
    id: "project-models",
    source: "project",
    target: "models",
    label: "indexes",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
  {
    id: "models-versions",
    source: "models",
    target: "versions",
    label: "records",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
];
