import type { MetadataRoute } from "next";

const BASE = "https://stoq.xyz";
const lastModified = new Date("2026-11-19");

const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/platform", priority: 0.9, changeFrequency: "monthly" },
  { path: "/forecast", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reorder", priority: 0.8, changeFrequency: "monthly" },
  { path: "/suppliers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/assistant", priority: 0.8, changeFrequency: "monthly" },
  { path: "/audience", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
