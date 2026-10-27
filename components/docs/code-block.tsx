"use client";

import {
  Children,
  isValidElement,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import katex from "katex";
import { MermaidDiagram } from "./mermaid-diagram";

type CopyState = "idle" | "copied" | "failed";
type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
  title?: string;
};

function extractText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (!isValidElement<{ children?: ReactNode }>(child)) return "";
      if (child.type === "br") return "\n";
      return extractText(child.props.children);
    })
    .join("");
}

export function CodeBlock({
  children,
  title,
  ...props
}: CodeBlockProps) {
  const codeChild = Children.toArray(children).find(
    (child) =>
      isValidElement<{ className?: string }>(child) &&
      child.props.className?.includes("language-"),
  );
  const childLanguage = isValidElement<{ className?: string }>(codeChild)
    ? codeChild.props.className?.match(/language-([\w-]+)/)?.[1]
    : undefined;
  const language =
    props["data-language"] ??
    props.className?.match(/language-([\w-]+)/)?.[1] ??
    childLanguage;

  if (language === "mermaid") {
    return <MermaidDiagram chart={extractText(children).trim()} />;
  }
  if (language === "math") {
    return (
      <div
        className="math-formula"
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(extractText(children).trim(), {
            displayMode: true,
            throwOnError: false,
          }),
        }}
      />
    );
  }

  return (
    <CodeBlockFrame title={title} {...props}>
      {children}
    </CodeBlockFrame>
  );
}

export function InlineCode({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  if (className?.split(/\s+/).includes("language-math")) {
    return (
      <span
        className="math-formula-inline"
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(extractText(children), {
            displayMode: false,
            throwOnError: false,
          }),
        }}
      />
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

function CodeBlockFrame({
  children,
  title,
  ...props
}: CodeBlockProps) {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copyState, setCopyState] = useState<CopyState>("idle");

  async function copyCode() {
    const text = codeRef.current?.textContent;
    if (text === undefined || text === null) {
      setCopyState("failed");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div className="code-frame">
      <div className="code-frame-heading">
        <span>{title || "Code"}</span>
        <button onClick={copyCode} type="button">
          {copyState === "copied" ? "Copied" : "Copy"}
        </button>
      </div>
      <pre {...props} ref={codeRef}>
        {children}
      </pre>
      {copyState === "failed" && (
        <p aria-live="polite" className="code-copy-status">
          Copy is unavailable. Select the code and copy it manually.
        </p>
      )}
    </div>
  );
}
