import { defineConfig } from "fumadocs-mdx/config";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypeCodeOptions: {
      addLanguageClass: true,
      langs: ["latex"],
      langAlias: { math: "latex" },
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
