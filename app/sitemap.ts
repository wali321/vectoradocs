import type { MetadataRoute } from "next";
import { models } from "@/lib/models";

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredSiteUrl = process.env.SITE_URL;
  if (!configuredSiteUrl) {
    console.warn("SITE_URL is unset; omitting absolute sitemap URLs.");
    return [];
  }

  const siteUrl = new URL(configuredSiteUrl);
  const staticPaths = ["/", "/models", "/contact"];
  const modelPaths = models.flatMap((model) =>
    [
      `/models/${model.slug}`,
      ...model.versions.map(
        (version) => `/models/${model.slug}/${version.id}`,
      ),
    ],
  );

  return [...staticPaths, ...modelPaths].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
