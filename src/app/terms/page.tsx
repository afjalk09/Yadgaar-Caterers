import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = `Terms & Conditions | ${siteConfig.name}`;
const description = "Terms governing the use of the Yadgaar Caterers website and catering enquiries submitted through it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/terms") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    title,
    description,
    url: absoluteUrl("/terms"),
    siteName: siteConfig.name,
    images: [{ url: absoluteUrl("/og-image.jpg"), width: 1200, height: 630, alt: "Yadgaar Caterers" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Use of this website",
    body: (
      <>
        <p>
          By browsing this website you agree to these terms. The site provides information about {siteConfig.name} and
          allows you to send a catering enquiry. You must use it lawfully and must not attempt to interfere with its
          operation, submit false enquiries, or overload the enquiry service.
        </p>
        <p>
          Content on this site is provided for general information. Menu items, service descriptions and imagery are
          illustrative and may change.
        </p>
      </>
    ),
  },
  {
    id: "services",
    heading: "Services",
    body: (
      <p>
        We provide veg and non-veg catering for weddings, birthdays, family functions and corporate events, including
        live food counters and event coordination. The exact menu, service scope, staffing and quantities are agreed
        separately with you before an event. Nothing on this website constitutes a binding offer to supply services.
      </p>
    ),
  },
  {
    id: "user-responsibilities",
    heading: "Your responsibilities",
    body: (
      <>
        <p>
          You agree to provide accurate information in your enquiry, including realistic guest numbers, the event date
          and the venue location. You must have the right to share any information you send us.
        </p>
        <p>
          You are responsible for reviewing and confirming all details of any catering arrangement directly with us
          before the event.
        </p>
      </>
    ),
  },
  {
    id: "bookings",
    heading: "Enquiries and booking terms",
    body: (
      <>
        <p>
          Submitting the enquiry form or starting a WhatsApp conversation is a request, not a confirmed booking. A
          booking is formed only when both parties agree the scope, date, price and other material terms through the
          contact channels listed below.
        </p>
        <p>
          PLACEHOLDER: add the process for confirming a booking, including any written confirmation requirement and
          advance notice needed for changes to guest numbers or the event date.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    heading: "Payments and cancellations",
    body: (
      <>
        <p>
          This website does not process payments. Payment instructions, if any, are communicated directly to you during
          the booking process.
        </p>
        <p>{siteConfig.legal.paymentTerms}</p>
        <p>{siteConfig.legal.cancellationPolicy}</p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: (
      <p>
        The text, branding and design of this website belong to {siteConfig.name} or its licensors. Food photography is
        sourced from Unsplash and used for illustration. You may not copy, distribute or reuse site content for
        commercial purposes without written permission.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <>
        <p>
          This website is provided “as is”. To the extent permitted by law, {siteConfig.name} is not liable for losses
          arising from reliance on illustrative content, temporary unavailability of the site, or information submitted
          through third-party services such as WhatsApp.
        </p>
        <p>
          Nothing in these terms limits liability that cannot lawfully be limited. PLACEHOLDER: have the applicable
          jurisdiction and any mandatory consumer protections reviewed by a qualified legal professional.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    heading: "Third-party links and services",
    body: (
      <p>
        Links to WhatsApp, Google Maps and other external services are provided for convenience. We do not control and
        are not responsible for the content or practices of those services. Their own terms and privacy policies apply.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these terms to reflect changes to our website or services. The “Last updated” date at the top of
        this page indicates the current version. Continued use of the website after a change means you accept the
        updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact information",
    body: (
      <>
        <p>
          {siteConfig.name}, {siteConfig.contact.address}. Owner: {siteConfig.contact.owner}.
        </p>
        <p>
          Phone: {siteConfig.contact.phonePrimary}, {siteConfig.contact.phoneSecondary}. Email: {siteConfig.contact.email}
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <LegalPage
        title="Terms & Conditions"
        summary="These terms explain the rules for using this website and how catering enquiries are handled. Placeholder items must be completed and reviewed by a qualified legal professional before publication."
        effectiveDate={siteConfig.legal.effectiveDate}
        sections={sections}
      />
      <Footer />
    </>
  );
}
