import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/book/success", "/book/error"],
    },
    sitemap: "https://fixuphone.nl/sitemap.xml",
  };
}
