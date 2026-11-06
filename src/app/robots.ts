import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/sign-in", "/sign-up"],
    },
    sitemap: "https://stoq.xyz/sitemap.xml",
    host: "https://stoq.xyz",
  };
}
