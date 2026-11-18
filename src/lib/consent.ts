export const CONSENT_STORAGE_KEY = "yadgaar-cookie-consent";
export const CONSENT_EVENT = "yadgaar:consent-change";
export const OPEN_COOKIE_SETTINGS_EVENT = "yadgaar:open-cookie-settings";

export type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  version: number;
  updatedAt: string;
};

export const CONSENT_VERSION = 1;

export function rejectedConsent(): ConsentState {
  return {
    essential: true,
    analytics: false,
    marketing: false,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
}

export function acceptedConsent(): ConsentState {
  return {
    essential: true,
    analytics: true,
    marketing: true,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
}

export function makeConsent(analytics: boolean, marketing: boolean): ConsentState {
  return {
    essential: true,
    analytics,
    marketing,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
}

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const value = parsed as Partial<ConsentState>;
    if (
      value.essential !== true ||
      typeof value.analytics !== "boolean" ||
      typeof value.marketing !== "boolean" ||
      value.version !== CONSENT_VERSION ||
      typeof value.updatedAt !== "string"
    ) {
      return null;
    }
    return value as ConsentState;
  } catch {
    return null;
  }
}

export function writeConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    return;
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: consent }));
}
