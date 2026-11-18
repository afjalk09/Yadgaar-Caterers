"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/lib/consent";

export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={`rounded text-left underline-offset-2 hover:underline ${className}`}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      Cookie Settings
    </button>
  );
}
