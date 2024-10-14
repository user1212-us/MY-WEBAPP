import { MetadataRoute } from "next";
//you shall implement the dyanmic routes later
//when implemented you will make it async and promise return
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || "https://yourdomain.com";

  const staticPages = [
    { url: `${baseUrl}/en`, changefreq: "daily", priority: 1 },
    { url: `${baseUrl}/ar`, changefreq: "daily", priority: 1 },
    {
      url: `${baseUrl}/en/ask-about-stock`,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/financial-events`,
      changefreq: "daily",
      priority: 0.7,
    },
    { url: `${baseUrl}/en/history`, changefreq: "weekly", priority: 0.6 },
    { url: `${baseUrl}/en/news`, changefreq: "daily", priority: 0.7 },
    { url: `${baseUrl}/en/signals`, changefreq: "daily", priority: 0.7 },
    { url: `${baseUrl}/en/auth/login`, priority: 0.5 },
    { url: `${baseUrl}/en/auth/register`, priority: 0.5 },

    {
      url: `${baseUrl}/ar/ask-about-stock`,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ar/financial-events`,
      changefreq: "daily",
      priority: 0.7,
    },
    { url: `${baseUrl}/ar/history`, changefreq: "weekly", priority: 0.6 },
    { url: `${baseUrl}/ar/news`, changefreq: "daily", priority: 0.7 },
    { url: `${baseUrl}/ar/signals`, changefreq: "daily", priority: 0.7 },
    { url: `${baseUrl}/ar/auth/login`, priority: 0.5 },
    { url: `${baseUrl}/ar/auth/register`, priority: 0.5 },
  ];

  return [...staticPages];
}
