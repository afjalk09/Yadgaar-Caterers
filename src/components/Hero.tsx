"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { scrollToId } from "@/lib/scroll";
import { siteConfig } from "@/lib/site";

const heroImage = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&q=85";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const float = (distance: number) => (reducedMotion ? {} : { y: [0, distance, 0] });

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: reducedMotion ? 0 : 0.2 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full font-medium text-sm w-fit border border-primary/20">
            Swaad Bhi, Yaadein Bhi – Sirf Yadgaar Ke Saath
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
            Delicious Catering <br />
            <span className="text-accent italic">For Every Celebration</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
            From weddings and birthdays to corporate events, Yadgaar Caterers delivers unforgettable food experiences with authentic taste and exceptional service.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Button
              type="button"
              size="lg"
              onClick={() => {
                trackEvent("cta_click", { cta_name: "Book Catering", location: "hero" });
                scrollToId("booking");
              }}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
            >
              Book Catering
            </Button>

            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 rounded-full px-6 gap-2">
              <a href={siteConfig.contact.phonePrimaryHref} onClick={() => trackEvent("cta_click", { cta_name: "Call Now", location: "hero" })}>
                <Phone size={18} aria-hidden="true" />
                Call Now
              </a>
            </Button>

            <Button asChild variant="outline" size="lg" className="border-green-600 text-green-700 hover:bg-green-50 rounded-full px-6 gap-2">
              <a
                href={`${siteConfig.contact.whatsapp}?text=Hello%20Yadgaar%20Caterers`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_click", { cta_name: "WhatsApp", location: "hero" })}
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: reducedMotion ? 0 : 0.4 }}
          className="relative"
        >
          <div className="relative rounded-t-full rounded-b-3xl overflow-hidden border-8 border-white shadow-2xl aspect-[4/5] max-w-md mx-auto">
            <Image
              src={heroImage}
              alt="Aromatic Indian biryani served at a Yadgaar Caterers event"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <motion.div
            animate={float(-15)}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 right-0 md:right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div aria-hidden="true" className="bg-secondary/20 p-2 rounded-full">
              <span className="text-secondary font-bold">10+</span>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Years Experience</p>
              <p className="text-xs text-muted-foreground">Trusted by locals</p>
            </div>
          </motion.div>

          <motion.div
            animate={float(15)}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-0 md:left-4 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div aria-hidden="true" className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-primary/20 flex items-center justify-center text-xs">
                  <span aria-hidden="true">★</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">10k+ Guests</p>
              <p className="text-xs text-muted-foreground">Served Happily</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
