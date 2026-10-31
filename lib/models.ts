import type { Edge, MarkerType } from "@xyflow/react";
import type { ArchitectureNode } from "@/lib/documentation-map";

const arrowClosedMarker = "arrowclosed" as MarkerType;

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

const v11Nodes: ArchitectureNode[] = [
  {
    id: "v1-1-text",
    type: "architecture",
    position: { x: 40, y: 120 },
    data: {
      title: "Raw Text Input",
      category: "Input",
      description:
        "UTF-8 character sequence from Shakespeare corpus, truncated to first 500,000 characters.",
      href: "/models/vectora/v1.1#3-dataset",
      inputShape: "Text string",
      outputShape: "T chars (T <= 128)",
      dataType: "UTF-8",
      technicalDetails: "Split into 450,000 train characters and 50,000 validation characters (90/10 split).",
    },
  },
  {
    id: "v1-1-vocab",
    type: "architecture",
    position: { x: 280, y: 120 },
    data: {
      title: "Character Vocabulary",
      category: "Tokenization",
      description:
        "Deterministic mapping from 83 unique characters to integer indices (string_to_int).",
      href: "/models/vectora/v1.1#3-dataset",
      inputShape: "T characters",
      outputShape: "(B, T) = (16, 128)",
      dataType: "torch.long",
      technicalDetails: "Vocabulary size V=83. Character-level tokenization without subwords or BPE.",
    },
  },
  {
    id: "v1-1-embeddings",
    type: "architecture",
    position: { x: 520, y: 120 },
    data: {
      title: "Token & Position Embeddings",
      category: "Embedding",
      description:
        "Sum of token embedding (83 x 128) and learned absolute position embedding (128 x 128).",
      href: "/models/vectora/v1.1#4-architecture",
      inputShape: "(B, T) IDs",
      outputShape: "(B, T, 128)",
      dataType: "torch.float32",
      technicalDetails: "E[c_t] + P[t]. 10,624 token params + 16,384 position params. No embedding dropout.",
    },
  },
  {
    id: "v1-1-transformer",
    type: "architecture",
    position: { x: 760, y: 120 },
    data: {
      title: "3x Transformer Blocks",
      category: "Backbone",
      description:
        "Stacked Pre-LN decoder blocks with 4-head causal self-attention and GELU FFN.",
      href: "/models/vectora/v1.1#4-architecture",
      inputShape: "(B, T, 128)",
      outputShape: "(B, T, 128)",
      dataType: "torch.float32",
      technicalDetails: "n_layer=3, n_head=4, head_dim=32, d_mlp=512. Dropout=0.1. Residual scaling: 0.02 / sqrt(6).",
    },
  },
  {
    id: "v1-1-projection",
    type: "architecture",
    position: { x: 1000, y: 120 },
    data: {
      title: "Final LN & Tied LM Head",
      category: "Output Projection",
      description:
        "Final LayerNorm(128) followed by bias-free linear projection with tied embedding weights.",
      href: "/models/vectora/v1.1#4-architecture",
      inputShape: "(B, T, 128)",
      outputShape: "(B, T, 83)",
      dataType: "torch.float32",
      technicalDetails: "lm_head.weight = token_embedding_table.weight. Outputs unnormalized vocabulary logits.",
    },
  },
  {
    id: "v1-1-prediction",
    type: "architecture",
    position: { x: 1240, y: 120 },
    data: {
      title: "Autoregressive Prediction",
      category: "Prediction / Loss",
      description:
        "Cross-entropy loss against shifted targets for training; temperature + top-k sampling for generation.",
      href: "/models/vectora/v1.1#8-text-generation",
      inputShape: "(B, T, 83) logits",
      outputShape: "Next char ID / CE loss",
      dataType: "torch.long / float32",
      technicalDetails: "Train loss: 1.3662, val loss: 1.4849. Generation: temp=0.5, top_k=40 over 83 chars.",
    },
  },
];

const v11Edges: Edge[] = [
  {
    id: "v1-1-text-vocab",
    source: "v1-1-text",
    target: "v1-1-vocab",
    label: "encode",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
  {
    id: "v1-1-vocab-embeddings",
    source: "v1-1-vocab",
    target: "v1-1-embeddings",
    label: "lookup IDs",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
  {
    id: "v1-1-embeddings-transformer",
    source: "v1-1-embeddings",
    target: "v1-1-transformer",
    label: "h^(0)",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
  {
    id: "v1-1-transformer-projection",
    source: "v1-1-transformer",
    target: "v1-1-projection",
    label: "h^(3)",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
  {
    id: "v1-1-projection-prediction",
    source: "v1-1-projection",
    target: "v1-1-prediction",
    label: "logits",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
];

const v12Nodes: ArchitectureNode[] = [
  {
    id: "v1-2-text",
    type: "architecture",
    position: { x: 40, y: 120 },
    data: {
      title: "Raw Text Input",
      category: "Input",
      description:
        "Full 82,215,804 character corpus (2,803,655 lines, ~23.4M estimated GPT-2 tokens).",
      href: "/models/vectora/v1.2#4-dataset",
      inputShape: "Text corpus (82.2M chars)",
      outputShape: "T chars (T <= 128)",
      dataType: "UTF-8",
      technicalDetails: "Split into 73,994,223 train characters (90%) and 8,221,581 validation characters (10%).",
    },
  },
  {
    id: "v1-2-vocab",
    type: "architecture",
    position: { x: 280, y: 120 },
    data: {
      title: "Character Vocabulary",
      category: "Tokenization",
      description:
        "Deterministic mapping from 333 unique characters to integer indices (string_to_int).",
      href: "/models/vectora/v1.2#4-dataset",
      inputShape: "T characters",
      outputShape: "(B, T) = (16, 128)",
      dataType: "torch.long",
      technicalDetails: "Vocabulary size V=333. Character-level tokenization without subwords or BPE.",
    },
  },
  {
    id: "v1-2-embeddings",
    type: "architecture",
    position: { x: 520, y: 120 },
    data: {
      title: "Token & Position Embeddings",
      category: "Embedding",
      description:
        "Sum of token embedding (333 x 128) and learned absolute position embedding (128 x 128).",
      href: "/models/vectora/v1.2#3-model-architecture",
      inputShape: "(B, T) IDs",
      outputShape: "(B, T, 128)",
      dataType: "torch.float32",
      technicalDetails: "E[c_t] + P[t]. 42,624 token params + 16,384 position params. No embedding dropout.",
    },
  },
  {
    id: "v1-2-transformer",
    type: "architecture",
    position: { x: 760, y: 120 },
    data: {
      title: "3x Transformer Blocks",
      category: "Backbone",
      description:
        "Stacked Pre-LN decoder blocks with 4-head causal self-attention and GELU FFN.",
      href: "/models/vectora/v1.2#3-model-architecture",
      inputShape: "(B, T, 128)",
      outputShape: "(B, T, 128)",
      dataType: "torch.float32",
      technicalDetails: "n_layer=3, n_head=4, head_dim=32, d_mlp=512. Dropout=0.1. Residual scaling: 0.02 / sqrt(6).",
    },
  },
  {
    id: "v1-2-projection",
    type: "architecture",
    position: { x: 1000, y: 120 },
    data: {
      title: "Final LN & Tied LM Head",
      category: "Output Projection",
      description:
        "Final LayerNorm(128) followed by bias-free linear projection with tied embedding weights.",
      href: "/models/vectora/v1.2#3-model-architecture",
      inputShape: "(B, T, 128)",
      outputShape: "(B, T, 333)",
      dataType: "torch.float32",
      technicalDetails: "lm_head.weight = token_embedding_table.weight. Outputs unnormalized vocabulary logits.",
    },
  },
  {
    id: "v1-2-prediction",
    type: "architecture",
    position: { x: 1240, y: 120 },
    data: {
      title: "Autoregressive Prediction",
      category: "Prediction / Loss",
      description:
        "Cross-entropy loss against shifted targets for training; temperature + top-k sampling for generation.",
      href: "/models/vectora/v1.2#7-text-generation",
      inputShape: "(B, T, 333) logits",
      outputShape: "Next char ID / CE loss",
      dataType: "torch.long / float32",
      technicalDetails: "Train loss: 1.3793, val loss: 1.4082 (step 49,950). Generation: temp=0.5, top_k=40 over 333 chars.",
    },
  },
];

const v12Edges: Edge[] = [
  {
    id: "v1-2-text-vocab",
    source: "v1-2-text",
    target: "v1-2-vocab",
    label: "encode",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
  {
    id: "v1-2-vocab-embeddings",
    source: "v1-2-vocab",
    target: "v1-2-embeddings",
    label: "lookup IDs",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
  {
    id: "v1-2-embeddings-transformer",
    source: "v1-2-embeddings",
    target: "v1-2-transformer",
    label: "h^(0)",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
  {
    id: "v1-2-transformer-projection",
    source: "v1-2-transformer",
    target: "v1-2-projection",
    label: "h^(3)",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
  {
    id: "v1-2-projection-prediction",
    source: "v1-2-projection",
    target: "v1-2-prediction",
    label: "logits",
    type: "smoothstep",
    markerEnd: { type: arrowClosedMarker },
  },
];

export const models: ModelRecord[] = [
  {
    slug: "vectora",
    name: "Vectora",
    summary:
      "An educational language-model project focused on documenting implementation details and evidence.",
    latestVersion: "v1.2",
    versions: [
      {
        id: "v1",
        title: "Vectora v1",
        summary:
          "A documented educational decoder-only Transformer implementation. The supplied notebook shows random initialization and a forward-pass/generation demonstration, not training.",
      },
      {
        id: "v1.1",
        title: "Vectora v1.1",
        summary:
          "An experimental character-level GPT-style Transformer trained from scratch on Shakespeare text.",
        publishedAt: "2026-10-30",
        diagrams: [
          {
            id: "v1-1-pipeline",
            kind: "architecture",
            title: "Vectora v1.1 Processing Pipeline",
            description:
              "Interactive processing pipeline from character text input to next-character autoregressive prediction.",
            nodes: v11Nodes,
            edges: v11Edges,
          },
        ],
      },
      {
        id: "v1.2",
        title: "Vectora v1.2",
        summary:
          "A 23M dataset experiment scaling character-level GPT training across 82M characters over 50,000 steps with lower validation loss.",
        publishedAt: "2026-10-31",
        diagrams: [
          {
            id: "v1-2-pipeline",
            kind: "architecture",
            title: "Vectora v1.2 Processing Pipeline",
            description:
              "Interactive processing pipeline from 82M-character corpus input to next-character autoregressive prediction with tied embeddings.",
            nodes: v12Nodes,
            edges: v12Edges,
          },
        ],
      },
    ],
  },
];

export function findModel(slug: string): ModelRecord | undefined {
  return models.find((model) => model.slug === slug);
}
