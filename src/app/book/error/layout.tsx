import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fout bij Afspraak - FixUphone",
  description: "Er is een fout opgetreden bij het maken van uw afspraak. Probeer het opnieuw of neem contact met ons op.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function ErrorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
