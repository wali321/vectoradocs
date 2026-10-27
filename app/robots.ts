import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.SITE_URL
    ? new URL(process.env.SITE_URL)
    : undefined;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(siteUrl
      ? {
          host: siteUrl.host,
          sitemap: new URL("/sitemap.xml", siteUrl).toString(),
        }
      : {}),
  };
}
