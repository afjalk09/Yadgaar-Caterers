import { GA4_MEASUREMENT_ID, GTM_ID } from "@/lib/site";

let consentGranted = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __yadgaarTagLoaded?: boolean;
  }
}

function loadGa4(measurementId: string) {
  window.__yadgaarTagLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

export function loadAnalytics() {
  if (typeof window === "undefined" || window.__yadgaarTagLoaded || GTM_ID) return;
  if (GA4_MEASUREMENT_ID) loadGa4(GA4_MEASUREMENT_ID);
}

export function updateConsent(analytics: boolean, marketing: boolean) {
  if (typeof window === "undefined") return;
  consentGranted = analytics;
  loadAnalytics();
  if (!window.gtag) return;

  window.gtag("consent", "update", {
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
    analytics_storage: analytics ? "granted" : "denied",
    functionality_storage: "denied",
    personalization_storage: marketing ? "granted" : "denied",
    security_storage: "granted",
  });
}

export function trackPageView(path: string) {
  if (typeof window === "undefined" || !consentGranted || !window.dataLayer) return;
  window.dataLayer.push({ event: "page_view", page_path: path });
}

export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || !consentGranted || !window.dataLayer) return;
  window.dataLayer.push({ event: eventName, ...params });
}
