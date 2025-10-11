import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reparatie Afspraak Bevestigd - FixUphone",
  description: "Uw reparatie afspraak is succesvol aangemaakt. Wij nemen spoedig contact met u op.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
