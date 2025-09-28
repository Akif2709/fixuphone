import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { WhatsAppButton } from "@/components/whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixUphone - Professionele Telefoon & Tablet Reparaties in Hilversum",
  description:
    "Expert telefoonreparaties in Hilversum. Scherm reparatie, batterij vervanging, water schade en meer. Originele onderdelen, 3-maanden garantie. Gratis parkeren, 5 minuten van station.",
  keywords: [
    "telefoonreparatie Hilversum",
    "iPhone reparatie",
    "Samsung reparatie",
    "scherm reparatie",
    "batterij vervanging",
    "water schade reparatie",
    "tablet reparatie",
    "telefoon reparatie service",
    "originele onderdelen",
    "garantie reparatie",
  ],
  authors: [{ name: "FixUphone" }],
  creator: "FixUphone",
  publisher: "FixUphone",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fixuphone.nl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FixUphone - Professionele Telefoon & Tablet Reparaties in Hilversum",
    description:
      "Expert telefoonreparaties in Hilversum. Scherm reparatie, batterij vervanging, water schade en meer. Originele onderdelen, 3-maanden garantie.",
    url: "https://fixuphone.nl",
    siteName: "FixUphone",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FixUphone - Telefoonreparatie Service",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FixUphone - Professionele Telefoon & Tablet Reparaties",
    description: "Expert telefoonreparaties in Hilversum. Originele onderdelen, 3-maanden garantie.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FixUphone",
    description: "Professionele telefoon en tablet reparaties in Hilversum",
    url: "https://fixuphone.nl",
    telephone: "+31 6 687715368",
    email: "info@fixuphone.nl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Larenseweg 30",
      postalCode: "1221CN",
      addressLocality: "Hilversum",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "52.2230",
      longitude: "5.1764",
    },
    openingHours: ["Mo,Tu,Th,Fr 18:00-20:00", "Sa 10:00-16:00"],
    priceRange: "€€",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    currenciesAccepted: "EUR",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "52.2230",
        longitude: "5.1764",
      },
      geoRadius: "25000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Telefoonreparatie Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Scherm Reparatie",
            description: "Professionele scherm reparatie voor alle telefoon merken",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Batterij Vervanging",
            description: "Batterij vervanging voor langere levensduur",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Water Schade Reparatie",
            description: "Water schade reparatie en droog behandeling",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };

  return (
    <html lang="nl">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
