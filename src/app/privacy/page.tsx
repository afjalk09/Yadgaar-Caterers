import type { Metadata } from "next";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import Footer from "@/components/Footer";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = `Privacy Policy | ${siteConfig.name}`;
const description = "How Yadgaar Caterers handles information submitted through this website, cookies, analytics and third-party services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/privacy") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    title,
    description,
    url: absoluteUrl("/privacy"),
    siteName: siteConfig.name,
    images: [{ url: absoluteUrl("/og-image.jpg"), width: 1200, height: 630, alt: "Yadgaar Caterers" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    heading: "Information we collect",
    body: (
      <>
        <p>
          This website does not require an account and does not sell products online. We receive information only when you
          choose to contact us:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Booking enquiry form: name, phone number, event type, approximate guest count, event date, event location and
            any optional requirements you type into the message field.
          </li>
          <li>
            Telephone and WhatsApp links: if you call us or start a WhatsApp conversation, your phone number and the
            contents of that conversation are handled by your telephone provider and WhatsApp.
          </li>
          <li>
            Technical data: standard web server and image-optimization request data (such as IP address and user agent)
            is processed by our hosting infrastructure to deliver the site and protect it from abuse.
          </li>
        </ul>
        <p>
          We do not intentionally collect sensitive personal information, payment card details, or information from
          children through this website. Please do not include such details in an enquiry.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    heading: "How we use information",
    body: (
      <>
        <p>
          Enquiry details are used only to respond to your request, understand your event requirements and discuss
          catering availability. We do not use enquiry details for automated decision-making or profiling.
        </p>
        <p>
          When you submit the booking form, your entry is validated on our server. The validated details are used to
          prepare a WhatsApp message addressed to {siteConfig.name}. The message is sent only when your browser opens
          WhatsApp and you choose to send it. We do not store enquiry submissions in a database on this website.
        </p>
      </>
    ),
  },
  {
    id: "cookies-and-tracking",
    heading: "Cookies and tracking technologies",
    body: (
      <>
        <p>
          Essential storage is used to remember your cookie preferences. Your choice is saved in your browser&apos;s local
          storage and is not sent to our servers.
        </p>
        <p>
          Google Analytics 4 is used only if a measurement ID is configured and you grant Analytics consent. It is not
          loaded before consent. Analytics cookies and identifiers are set by Google, not by this website.
        </p>
        <p>
          The Marketing category is currently reserved for future use; no marketing or advertising cookies are loaded by
          this website at present. Essential storage cannot be disabled because it remembers your choices.
        </p>
        <p>
          You can change your preferences at any time using the “Cookie Settings” link in the footer or here:{" "}
          <CookieSettingsButton className="text-primary" />.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    heading: "Third-party services and integrations",
    body: (
      <>
        <ul className="list-disc space-y-2 pl-5">
          <li>WhatsApp (Meta) — used when you start an enquiry conversation with us.</li>
          <li>Google Maps — an embedded map on the contact section loads content from Google.</li>
          <li>Unsplash — illustrative food photography is delivered through our image optimization endpoint.</li>
          <li>Google Analytics 4 — only after Analytics consent, if configured.</li>
          <li>Cloudflare Turnstile — only if enabled for spam protection on the enquiry form.</li>
        </ul>
        <p>
          These providers process data under their own privacy policies. We do not control their independent practices.
        </p>
      </>
    ),
  },
  {
    id: "storage-and-security",
    heading: "Data storage and security",
    body: (
      <>
        <p>
          This website is delivered over HTTPS and uses security headers to reduce common browser-based risks. Form
          validation, rate limiting and optional spam verification run server-side. Rate-limit counters are held in
          server memory and are cleared when the server restarts.
        </p>
        <p>
          No method of transmission or storage is completely secure. Please avoid sending confidential information in
          an enquiry.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "Data retention",
    body: (
      <>
        <p>
          We do not retain enquiry form submissions in a website database. Conversation history on WhatsApp is retained
          according to WhatsApp&apos;s settings and our own business record-keeping needs. PLACEHOLDER: add the business
          retention period for enquiry correspondence, if one applies.
        </p>
        <p>
          Cookie preference storage remains in your browser until you clear it or change your settings. Analytics data
          retention is controlled by the configured Google Analytics 4 property.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights and data deletion requests",
    body: (
      <>
        <p>
          You may ask us to confirm whether we hold information about you, request a copy, ask for corrections, or ask
          us to delete information we hold. You can also withdraw analytics consent at any time through Cookie Settings.
        </p>
        <p>
          To make a request, contact us using the details below. We will need enough information to identify the
          enquiry. PLACEHOLDER: add the identity-verification process and expected response timeframe required by your
          jurisdiction.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contact information",
    body: (
      <>
        <p>
          {siteConfig.name}, {siteConfig.contact.address}
        </p>
        <p>
          Owner: {siteConfig.contact.owner}. Phone: {siteConfig.contact.phonePrimary},{" "}
          {siteConfig.contact.phoneSecondary}. WhatsApp:{" "}
          <a className="rounded text-primary hover:underline" href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer">
            Open WhatsApp
          </a>
          .
        </p>
        <p>Email: {siteConfig.contact.email}</p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy when our website practices change. The “Last updated” date at the top of this page
        indicates the current version.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <LegalPage
        title="Privacy Policy"
        summary="This policy explains what happens to information you provide when you use this website. It reflects the current setup of this site and must be reviewed by a qualified legal professional before publication."
        effectiveDate={siteConfig.legal.effectiveDate}
        sections={sections}
      />
      <Footer />
    </>
  );
}
