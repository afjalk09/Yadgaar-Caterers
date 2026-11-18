import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl(routes.home), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl(routes.privacy), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl(routes.terms), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
