"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  ReactFlow,
  ReactFlowProvider,
  Position,
  useReactFlow,
  type Edge,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import Link from "next/link";
import { useState } from "react";
import type { ArchitectureNode } from "@/lib/documentation-map";

function ArchitectureNodeView({
  data,
  selected,
}: NodeProps<ArchitectureNode>) {
  return (
    <div
      aria-label={`${data.title}. ${data.category}`}
      className={`architecture-node${selected ? " is-selected" : ""}`}
    >
      <Handle
        isConnectable={false}
        position={Position.Left}
        type="target"
      />
      <span className="node-category">{data.category}</span>
      <strong>{data.title}</strong>
      <Handle
        isConnectable={false}
        position={Position.Right}
        type="source"
      />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  architecture: ArchitectureNodeView,
};

type ArchitectureExplorerProps = {
  title: string;
  description: string;
  nodes: ArchitectureNode[];
  edges: Edge[];
  showTensorDetails?: boolean;
};

function ViewControls() {
  const { fitView, setViewport } = useReactFlow();

  return (
    <div aria-label="Diagram view controls" className="diagram-controls">
      <button onClick={() => fitView({ padding: 0.18 })} type="button">
        Fit view
      </button>
      <button
        onClick={() => setViewport({ x: 0, y: 0, zoom: 1 })}
        type="button"
      >
        Reset view
      </button>
    </div>
  );
}

function ArchitectureCanvas({
  title,
  description,
  nodes,
  edges,
  showTensorDetails = false,
}: ArchitectureExplorerProps) {
  const [selectedId, setSelectedId] = useState(nodes[0]?.id ?? "");
  const selectedNode = nodes.find((node) => node.id === selectedId);

  if (nodes.length === 0) {
    return (
      <p className="empty-note">
        No verified architecture has been documented for this model version.
      </p>
    );
  }

  return (
    <section aria-label={title} className="architecture-explorer">
      <div className="diagram-heading">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <ViewControls />
      </div>
      <div className="diagram-workspace">
        <div aria-label={title} className="diagram-canvas">
          <ReactFlow
            aria-label={title}
            edges={edges}
            fitView
            fitViewOptions={{ padding: 0.18 }}
            maxZoom={1.6}
            minZoom={0.45}
            nodes={nodes}
            nodesConnectable={false}
            nodesDraggable
            nodesFocusable
            nodeTypes={nodeTypes}
            onNodeClick={(_event, node) => setSelectedId(node.id)}
            edgesFocusable
            elementsSelectable
          >
            <Background
              color="var(--diagram-grid)"
              gap={24}
              size={1}
              variant={BackgroundVariant.Dots}
            />
            <Controls
              position="bottom-left"
              showFitView={false}
              showInteractive={false}
            />
          </ReactFlow>
        </div>
        <aside aria-live="polite" className="diagram-inspector">
          {selectedNode ? (
            <>
              <span className="inspector-category">
                {selectedNode.data.category}
              </span>
              <h4>{selectedNode.data.title}</h4>
              <p>{selectedNode.data.description}</p>
              {showTensorDetails && (
                <details className="node-technical-details" open>
                  <summary>Technical details</summary>
                  <dl>
                    <dt>Input shape</dt>
                    <dd>{selectedNode.data.inputShape ?? "Not documented"}</dd>
                    <dt>Output shape</dt>
                    <dd>{selectedNode.data.outputShape ?? "Not documented"}</dd>
                    <dt>Data type</dt>
                    <dd>{selectedNode.data.dataType ?? "Not documented"}</dd>
                  </dl>
                  {selectedNode.data.technicalDetails && (
                    <p>{selectedNode.data.technicalDetails}</p>
                  )}
                </details>
              )}
              <Link href={selectedNode.data.href}>Open related page</Link>
            </>
          ) : (
            <p>Select a diagram node to inspect its details.</p>
          )}
        </aside>
      </div>
      <details className="diagram-text-version">
        <summary>Read the diagram as a list</summary>
        <ol>
          {nodes.map((node) => (
            <li key={node.id}>
              <button
                aria-pressed={node.id === selectedId}
                onClick={() => setSelectedId(node.id)}
                type="button"
              >
                {node.data.title}
              </button>
              <span>
                {" "}
                — {node.data.category}: {node.data.description}
              </span>
            </li>
          ))}
        </ol>
        <p>
          {edges.map((edge) => {
            const from = nodes.find((node) => node.id === edge.source);
            const to = nodes.find((node) => node.id === edge.target);
            return `${from?.data.title ?? edge.source} ${edge.label ?? "connects to"} ${to?.data.title ?? edge.target}`;
          }).join("; ")}
        </p>
      </details>
    </section>
  );
}

export function ArchitectureExplorer(props: ArchitectureExplorerProps) {
  return (
    <ReactFlowProvider>
      <ArchitectureCanvas {...props} />
    </ReactFlowProvider>
  );
}
