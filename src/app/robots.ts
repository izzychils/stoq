import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/sign-in", "/sign-up"],
    },
    sitemap: "https://www.stoq.site/sitemap.xml",
    host: "https://www.stoq.site",
  };
}
