"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { scrollToId } from "@/lib/scroll";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Services", id: "services" },
  { name: "Menu", id: "menu" },
  { name: "Gallery", id: "gallery" },
  { name: "Testimonials", id: "testimonials" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(windowHeight > 0 ? totalScroll / windowHeight : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const goTo = (id: string, cta = false) => {
    if (cta) trackEvent("cta_click", { cta_name: "Book Catering", location: "navbar" });
    setMobileMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-1 bg-primary z-50 origin-left"
        style={{ transform: `scaleX(${Math.min(Math.max(scrollProgress, 0), 1)})` }}
      />

      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goTo("home")}
            aria-label="Yadgaar Caterers, back to top"
            className="text-2xl md:text-3xl font-serif font-bold text-primary cursor-pointer text-left"
          >
            Yadgaar <span className="text-accent italic">Caterers</span>
          </button>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => goTo(link.id)}
                    className="rounded text-foreground hover:text-accent font-medium transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              onClick={() => goTo("booking", true)}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
            >
              Book Catering
            </Button>
          </nav>

          <button
            type="button"
            className="md:hidden rounded p-2 text-foreground"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-30 flex flex-col items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-6 text-xl">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => goTo(link.id)}
                    className="rounded text-foreground hover:text-accent font-serif font-medium transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <Button
                  type="button"
                  onClick={() => goTo("booking", true)}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg mt-4"
                >
                  Book Catering
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
