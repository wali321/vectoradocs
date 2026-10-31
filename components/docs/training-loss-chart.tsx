"use client";

import { useId, useState } from "react";
import lossData from "./training-loss-data.json";

type DataPoint = {
  step: number;
  train: number;
  val: number;
};

export function TrainingLossChart() {
  const chartId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTrain, setShowTrain] = useState(true);
  const [showVal, setShowVal] = useState(true);

  const data: DataPoint[] = lossData;
  const width = 800;
  const height = 360;
  const padding = { top: 24, right: 30, bottom: 44, left: 60 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const minStep = 0;
  const maxStep = 50000;
  const minLoss = 1.0;
  const maxLoss = 6.0;

  const scaleX = (step: number) =>
    padding.left + ((step - minStep) / (maxStep - minStep)) * plotWidth;
  const scaleY = (loss: number) =>
    padding.top +
    (1 - (Math.min(Math.max(loss, minLoss), maxLoss) - minLoss) / (maxLoss - minLoss)) *
      plotHeight;

  const trainPoints = data.map((d) => `${scaleX(d.step)},${scaleY(d.train)}`).join(" ");
  const valPoints = data.map((d) => `${scaleX(d.step)},${scaleY(d.val)}`).join(" ");

  const yTicks = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
  const xTicks = [0, 10000, 20000, 30000, 40000, 50000];

  const currentPoint =
    hoveredIndex !== null && hoveredIndex >= 0 && hoveredIndex < data.length
      ? data[hoveredIndex]
      : data[data.length - 1];

  return (
    <figure
      aria-label="Vectora v1.2 Training and Validation Loss Curve"
      className="loss-chart-container"
      style={{
        margin: "2rem 0",
        padding: "1.25rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
            Training &amp; Validation Loss Dynamics
          </h3>
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "var(--muted)",
            }}
          >
            Recorded across 50,000 iterations (101 verified checkpoints logged from notebook)
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={() => setShowTrain(!showTrain)}
            style={{
              padding: "0.25rem 0.65rem",
              fontSize: "0.8125rem",
              borderRadius: "0.25rem",
              border: "1px solid var(--border)",
              background: showTrain ? "#31667a" : "transparent",
              color: showTrain ? "#ffffff" : "var(--foreground)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: showTrain ? "#ffffff" : "#31667a",
              }}
            />
            Train Loss
          </button>
          <button
            type="button"
            onClick={() => setShowVal(!showVal)}
            style={{
              padding: "0.25rem 0.65rem",
              fontSize: "0.8125rem",
              borderRadius: "0.25rem",
              border: "1px solid var(--border)",
              background: showVal ? "#e65100" : "transparent",
              color: showVal ? "#ffffff" : "var(--foreground)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: showVal ? "#ffffff" : "#e65100",
              }}
            />
            Val Loss
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            padding: "0.6rem 0.8rem",
            borderRadius: "0.375rem",
            background: "var(--soft-surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Current Step</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "0.2rem" }}>
            {currentPoint.step.toLocaleString()}
          </div>
        </div>

        <div
          style={{
            padding: "0.6rem 0.8rem",
            borderRadius: "0.375rem",
            background: "var(--soft-surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Train Loss</div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#31667a",
              marginTop: "0.2rem",
            }}
          >
            {currentPoint.train.toFixed(4)}
          </div>
        </div>

        <div
          style={{
            padding: "0.6rem 0.8rem",
            borderRadius: "0.375rem",
            background: "var(--soft-surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Validation Loss</div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#e65100",
              marginTop: "0.2rem",
            }}
          >
            {currentPoint.val.toFixed(4)}
          </div>
        </div>

        <div
          style={{
            padding: "0.6rem 0.8rem",
            borderRadius: "0.375rem",
            background: "var(--soft-surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Final Val Loss</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "0.2rem" }}>
            1.4082
          </div>
        </div>
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "auto", display: "block" }}
          role="img"
          aria-labelledby={`${chartId}-desc`}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <desc id={`${chartId}-desc`}>
            Vectora v1.2 training loss decreasing from 5.7880 down to 1.3793, and validation
            loss decreasing from 5.7869 down to 1.4082 over 50,000 steps.
          </desc>

          {/* Grid lines */}
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={scaleY(tick)}
                x2={width - padding.right}
                y2={scaleY(tick)}
                stroke="var(--border)"
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <text
                x={padding.left - 10}
                y={scaleY(tick) + 4}
                textAnchor="end"
                fontSize={11}
                fill="var(--muted)"
                fontFamily="var(--font-mono, monospace)"
              >
                {tick.toFixed(1)}
              </text>
            </g>
          ))}

          {/* X ticks */}
          {xTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={scaleX(tick)}
                y1={padding.top}
                x2={scaleX(tick)}
                y2={height - padding.bottom}
                stroke="var(--border)"
                strokeDasharray="2 3"
                strokeWidth={1}
                opacity={0.6}
              />
              <text
                x={scaleX(tick)}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                fontSize={11}
                fill="var(--muted)"
                fontFamily="var(--font-mono, monospace)"
              >
                {tick >= 1000 ? `${tick / 1000}k` : tick}
              </text>
            </g>
          ))}

          {/* Lines */}
          {showTrain && (
            <polyline
              fill="none"
              stroke="#31667a"
              strokeWidth={2.2}
              strokeLinejoin="round"
              strokeLinecap="round"
              points={trainPoints}
            />
          )}

          {showVal && (
            <polyline
              fill="none"
              stroke="#e65100"
              strokeWidth={2.2}
              strokeLinejoin="round"
              strokeLinecap="round"
              points={valPoints}
            />
          )}

          {/* Hover highlight line & marker */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={scaleX(currentPoint.step)}
                y1={padding.top}
                x2={scaleX(currentPoint.step)}
                y2={height - padding.bottom}
                stroke="var(--foreground)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              {showTrain && (
                <circle
                  cx={scaleX(currentPoint.step)}
                  cy={scaleY(currentPoint.train)}
                  r={5}
                  fill="#31667a"
                  stroke="var(--surface)"
                  strokeWidth={2}
                />
              )}
              {showVal && (
                <circle
                  cx={scaleX(currentPoint.step)}
                  cy={scaleY(currentPoint.val)}
                  r={5}
                  fill="#e65100"
                  stroke="var(--surface)"
                  strokeWidth={2}
                />
              )}
            </g>
          )}

          {/* Interactive touch/mouse zones */}
          {data.map((d, i) => {
            const x = scaleX(d.step);
            const w = plotWidth / data.length;
            return (
              <rect
                key={d.step}
                x={x - w / 2}
                y={padding.top}
                width={w}
                height={plotHeight}
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onTouchStart={() => setHoveredIndex(i)}
              />
            );
          })}
        </svg>
      </div>

      <div
        style={{
          marginTop: "0.75rem",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.8125rem",
          color: "var(--muted)",
        }}
      >
        <span>Hover or tap chart to inspect step metrics</span>
        <span>Cross-Entropy Loss (nats)</span>
      </div>
    </figure>
  );
}
