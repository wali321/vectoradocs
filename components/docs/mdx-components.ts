import type { MDXComponents } from "mdx/types";
import { Callout } from "./callout";
import { CodeBlock, InlineCode } from "./code-block";

export function getMDXComponents(): MDXComponents {
  return {
    Callout,
    code: InlineCode,
    pre: CodeBlock,
  };
}
