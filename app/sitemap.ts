import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { getWordPressServices } from "@/lib/mahir-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/become-a-mahir`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/for-business`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  try {
    const services = await getWordPressServices();
    const serviceRoutes: MetadataRoute.Sitemap = services
      .filter((service) => Boolean(service.slug))
      .map((service) => ({
        url: `${SITE_URL}/services/${service.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [...staticRoutes, ...serviceRoutes];
  } catch (error) {
    console.error("Failed to load dynamic services for sitemap:", error);
    return staticRoutes;
  }
}
