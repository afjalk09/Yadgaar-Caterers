import type { Metadata } from "next";
import Home from "@/components/Home";
import { absoluteUrl, siteConfig } from "@/lib/site";

const pageTitle = siteConfig.title;
const pageDescription = siteConfig.description;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: siteConfig.type,
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: absoluteUrl("/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: "Yadgaar Caterers wedding and event catering in Boisar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [absoluteUrl("/og-image.jpg")],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: siteConfig.name,
  url: absoluteUrl("/"),
  image: absoluteUrl("/og-image.jpg"),
  telephone: [siteConfig.contact.phonePrimary, siteConfig.contact.phoneSecondary],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bhandar Wada, Shigaon Road, Near Sunni Masjid",
    addressLocality: "Boisar",
    addressRegion: "Maharashtra",
    postalCode: "401501",
    addressCountry: "IN",
  },
  areaServed: "Boisar, Maharashtra, India",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Home />
    </>
  );
}
