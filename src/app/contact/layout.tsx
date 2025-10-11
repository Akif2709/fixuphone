import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - FixUphone | Telefoon & Tablet Reparaties Hilversum",
  description:
    "Neem contact op met FixUphone in Hilversum. Professionele telefoon en tablet reparaties. Gratis parkeren, 5 minuten van station. Bel of bezoek onze winkel.",
  keywords: [
    "contact FixUphone",
    "telefoonreparatie Hilversum contact",
    "reparatie service contact",
    "telefoon reparatie afspraak",
    "Hilversum telefoonreparatie",
    "Larenseweg 30 Hilversum",
    "telefoon reparatie service",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact - FixUphone | Telefoon & Tablet Reparaties",
    description:
      "Neem contact op met FixUphone in Hilversum. Professionele telefoon en tablet reparaties. Gratis parkeren, 5 minuten van station.",
    url: "https://fixuphone.nl/contact",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
