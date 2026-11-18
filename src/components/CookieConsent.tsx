"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  acceptedConsent,
  makeConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
  readConsent,
  rejectedConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent";

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    if (stored) {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    }
    setReady(true);

    const openPreferences = () => {
      const current = readConsent();
      if (current) {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
      setPreferencesOpen(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openPreferences);
  }, []);

  const save = (next: ConsentState) => {
    writeConsent(next);
    setConsent(next);
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    setPreferencesOpen(false);
  };

  return (
    <>
      {ready && !consent && (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 shadow-2xl backdrop-blur"
        >
          <div className="container mx-auto flex flex-col gap-4 px-4 py-5 md:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-serif text-lg font-bold text-foreground">Your cookie preferences</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                We use essential storage to remember your choice. With your permission, we also use analytics to
                understand how this site is used. You can{" "}
                <Link href="/privacy" className="rounded font-medium text-primary underline underline-offset-2">
                  read our Privacy Policy
                </Link>{" "}
                or change this choice at any time.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:shrink-0">
              <Button type="button" onClick={() => save(acceptedConsent())} className="rounded-full bg-primary px-6 text-white hover:bg-primary/90">
                Accept All
              </Button>
              <Button type="button" variant="outline" onClick={() => save(rejectedConsent())} className="rounded-full border-primary px-6 text-primary hover:bg-primary/5">
                Reject Non-Essential
              </Button>
              <Button type="button" variant="ghost" onClick={() => setPreferencesOpen(true)} className="rounded-full px-6">
                Customize Preferences
              </Button>
            </div>
          </div>
        </section>
      )}

      <Dialog.Root open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-foreground/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-border bg-background p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="font-serif text-2xl font-bold text-foreground">Cookie preferences</Dialog.Title>
                <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Choose which categories may be used. Essential storage is always active because it remembers your
                  choice.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button type="button" aria-label="Close cookie preferences" className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                  <X size={20} aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-foreground">Essential</p>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Always on</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Stores your consent choice locally in your browser. No advertising or tracking cookies are used in this
                  category.
                </p>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-white p-4">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                />
                <span>
                  <span className="block font-semibold text-foreground">Analytics</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    Allows Google Analytics 4 to measure site usage. It is not loaded unless you enable this category.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-white p-4">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                />
                <span>
                  <span className="block font-semibold text-foreground">Marketing</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    Reserved for future advertising features. No marketing cookies are currently loaded by this site.
                  </span>
                </span>
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <Button type="button" onClick={() => save(rejectedConsent())} variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5">
                Reject Non-Essential
              </Button>
              <Button type="button" onClick={() => save(makeConsent(analytics, marketing))} className="rounded-full bg-primary text-white hover:bg-primary/90">
                Save Preferences
              </Button>
              <Button type="button" onClick={() => save(acceptedConsent())} variant="ghost" className="rounded-full">
                Accept All
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
