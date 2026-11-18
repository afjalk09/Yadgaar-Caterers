import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import { absoluteUrl, GTM_ID, siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const gtmConsentDefaults = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
(function(){
  var saved = null;
  try { saved = JSON.parse(window.localStorage.getItem('yadgaar-cookie-consent') || 'null'); } catch (e) {}
  var analyticsGranted = !!(saved && saved.analytics === true);
  var marketingGranted = !!(saved && saved.marketing === true);
  gtag('consent', 'default', {
    ad_storage: marketingGranted ? 'granted' : 'denied',
    ad_user_data: marketingGranted ? 'granted' : 'denied',
    ad_personalization: marketingGranted ? 'granted' : 'denied',
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });
  gtag('js', new Date());
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF3C00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-primary px-5 py-3 font-medium text-white focus:not-sr-only"
        >
          Skip to main content
        </a>
        {children}

        {GTM_ID && (
          <>
            <Script id="gtm-consent-defaults" strategy="beforeInteractive">
              {gtmConsentDefaults}
            </Script>
            <Script
              id="gtm-container"
              strategy="beforeInteractive"
              src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`}
            />
          </>
        )}

        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
