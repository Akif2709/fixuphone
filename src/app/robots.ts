import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/book/success", "/book/error", "/_next/", "/admin/", "/private/"],
    },
    sitemap: "https://fixuphone.nl/sitemap.xml",
  };
}
