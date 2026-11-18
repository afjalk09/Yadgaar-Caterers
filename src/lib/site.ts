export const siteConfig = {
  name: "Yadgaar Caterers",
  shortName: "Yadgaar",
  title: "Yadgaar Caterers | Wedding & Event Catering in Boisar",
  description:
    "Premium veg and non-veg wedding and event catering in Boisar, Maharashtra. Live food counters, biryani specials and full-event coordination for weddings, birthdays and corporate events.",
  locale: "en_IN",
  type: "website" as const,
  keywords: [
    "Yadgaar Caterers",
    "Catering Service Boisar",
    "Wedding Catering Boisar",
    "Birthday Catering Boisar",
    "Corporate Catering Boisar",
    "Biryani Catering Boisar",
    "Live Counter Catering",
    "Veg Catering Boisar",
  ],
  contact: {
    owner: "Asgar Khan",
    phonePrimary: "+91 7559127572",
    phoneSecondary: "+91 9975132722",
    phonePrimaryHref: "tel:7559127572",
    phoneSecondaryHref: "tel:9975132722",
    whatsapp: "https://wa.me/917559127572",
    whatsappNumber: "917559127572",
    address: "Bhandar Wada, Shigaon Road, Near Sunni Masjid, Boisar – 401501, Maharashtra, India",
    email: "PLACEHOLDER: add the business email address before publishing",
  },
  legal: {
    effectiveDate: "18 November 2026",
    entityName: "PLACEHOLDER: add the registered legal entity name, if any",
    cancellationPolicy: "PLACEHOLDER: add the booking cancellation and refund policy",
    paymentTerms: "PLACEHOLDER: add payment terms, accepted methods and advance/payment schedule",
  },
};

function normalizeUrl(value: string | undefined, fallback: string) {
  const raw = (value || fallback).trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

export const SITE_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NODE_ENV === "production"
    ? "https://yadgaarcaterers.cc.cd"
    : "http://localhost:3000",
);

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-T68P9QZR";

export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || "";

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

export const routes = {
  home: "/",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
