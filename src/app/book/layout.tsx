import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boek Reparatie - FixUphone | Telefoon & Tablet Reparaties Hilversum",
  description:
    "Boek uw telefoon of tablet reparatie bij FixUphone in Hilversum. Professionele service, originele onderdelen en 3-maanden garantie. Snelle reparaties beschikbaar.",
  keywords: [
    "telefoonreparatie boeken",
    "tablet reparatie afspraak",
    "iPhone reparatie Hilversum",
    "Samsung reparatie boeken",
    "scherm reparatie afspraak",
    "batterij vervanging boeken",
    "water schade reparatie",
    "reparatie afspraak maken",
  ],
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Boek Reparatie - FixUphone | Telefoon & Tablet Reparaties",
    description:
      "Boek uw telefoon of tablet reparatie bij FixUphone in Hilversum. Professionele service, originele onderdelen en 3-maanden garantie.",
    url: "https://fixuphone.nl/book",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
