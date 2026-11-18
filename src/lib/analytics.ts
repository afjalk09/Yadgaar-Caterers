import { GA4_MEASUREMENT_ID, GTM_ID } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __yadgaarTagLoaded?: boolean;
  }
}

function loadGtm() {
  window.__yadgaarTagLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
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
  if (typeof window === "undefined" || window.__yadgaarTagLoaded) return;
  if (GTM_ID) {
    loadGtm();
    return;
  }
  if (GA4_MEASUREMENT_ID) loadGa4(GA4_MEASUREMENT_ID);
}

export function trackPageView(path: string) {
  if (typeof window === "undefined" || !window.__yadgaarTagLoaded || !window.dataLayer) return;
  window.dataLayer.push({ event: "page_view", page_path: path });
}

export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || !window.__yadgaarTagLoaded || !window.dataLayer) return;
  window.dataLayer.push({ event: eventName, ...params });
}
