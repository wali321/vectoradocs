import type { MDXComponents } from "mdx/types";
import { Callout } from "./callout";
import { CodeBlock, InlineCode } from "./code-block";
import { TrainingLossChart } from "./training-loss-chart";

export function getMDXComponents(): MDXComponents {
  return {
    Callout,
    TrainingLossChart,
    code: InlineCode,
    pre: CodeBlock,
  };
}
