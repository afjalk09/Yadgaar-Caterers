import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yadgaar Caterers | Wedding & Event Catering in Boisar",
  description:
    "Premium catering services in Boisar for weddings, birthdays, corporate events, veg and non-veg catering, and live food counters.",
  keywords: [
    "Yadgaar Caterers",
    "Catering Service Boisar",
    "Wedding Catering Boisar",
    "Birthday Catering",
    "Biryani Catering",
    "Live Counter Catering",
  ],
  openGraph: {
    title: "Yadgaar Caterers | Wedding & Event Catering in Boisar",
    description:
      "Premium catering services in Boisar for weddings, birthdays, corporate events, veg and non-veg catering, and live food counters.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
