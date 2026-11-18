"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { trackEvent } from "@/lib/analytics";
import { routes, siteConfig } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Menu", href: "/#menu" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white relative pt-20 pb-10">
      <div aria-hidden="true" className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 text-background">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Yadgaar <span className="text-secondary italic">Caterers</span>
            </h2>
            <p className="text-white/70 mb-6 max-w-md">
              "Swaad Bhi, Yaadein Bhi – Sirf Yadgaar Ke Saath"
              <br/><br/>
              Bringing traditional flavors, premium quality, and exceptional service to make your celebrations truly memorable.
            </p>
            <div className="flex gap-4">
              <a
                href={`${siteConfig.contact.whatsapp}?text=Hello%20Yadgaar%20Caterers`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Yadgaar Caterers on WhatsApp"
                onClick={() => trackEvent("cta_click", { cta_name: "WhatsApp", location: "footer" })}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <MessageCircle size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-white/20 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="rounded text-white/70 hover:text-secondary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-white/20 pb-2 inline-block">Contact Info</h3>
            <ul className="space-y-4 text-white/70">
              <li>
                <span className="block text-sm text-white/50 mb-1">Call Us:</span>
                <a href={siteConfig.contact.phonePrimaryHref} className="rounded hover:text-secondary transition-colors block">{siteConfig.contact.phonePrimary}</a>
                <a href={siteConfig.contact.phoneSecondaryHref} className="rounded hover:text-secondary transition-colors block">{siteConfig.contact.phoneSecondary}</a>
              </li>
              <li>
                <span className="block text-sm text-white/50 mb-1">Location:</span>
                Boisar – 401501, Maharashtra, India
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Yadgaar Caterers. All rights reserved.</p>
          <nav aria-label="Legal and preferences" className="flex flex-wrap items-center justify-center gap-4">
            <Link href={routes.privacy} className="rounded hover:text-white">Privacy Policy</Link>
            <Link href={routes.terms} className="rounded hover:text-white">Terms &amp; Conditions</Link>
            <CookieSettingsButton className="hover:text-white" />
          </nav>
          <p>Designed with love for Asgar Khan</p>
        </div>
      </div>
    </footer>
  );
}
