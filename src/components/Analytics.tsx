"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, updateConsent } from "@/lib/analytics";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY, readConsent } from "@/lib/consent";
import type { ConsentState } from "@/lib/consent";

export default function Analytics() {
  const pathname = usePathname();
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const sync = (consent: ConsentState | null) => {
      setAnalyticsAllowed(Boolean(consent?.analytics));
      if (consent) updateConsent(consent.analytics, consent.marketing);
    };

    sync(readConsent());

    const onConsentChange = (event: Event) => sync((event as CustomEvent<ConsentState>).detail);
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY) sync(readConsent());
    };

    window.addEventListener(CONSENT_EVENT, onConsentChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsentChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (!analyticsAllowed) return;
    trackPageView(pathname || "/");
  }, [analyticsAllowed, pathname]);

  return null;
}
