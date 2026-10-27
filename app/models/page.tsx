import type { Metadata } from "next";
import { ModelList } from "@/components/models/model-list";
import { models } from "@/lib/models";

export const metadata: Metadata = {
  title: "Models",
  description: "Browse Vectora's documented versions and technical records.",
  alternates: process.env.SITE_URL ? { canonical: "/models" } : undefined,
};

export default function ModelsPage() {
  return (
    <main id="main-content" className="page-width index-content">
      <header className="page-heading">
        <h1>Models</h1>
        <p>
          A directory of documented Vectora versions and their technical
          records.
        </p>
      </header>
      <ModelList models={models} />
    </main>
  );
}
