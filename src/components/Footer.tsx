"use client";
import React from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-white relative pt-20 pb-10">
      {/* Decorative Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 text-background">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          
          {/* Brand Col */}
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
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/919975132722" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-white/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => scrollTo("home")} className="text-white/70 hover:text-secondary transition-colors">Home</button></li>
              <li><button onClick={() => scrollTo("services")} className="text-white/70 hover:text-secondary transition-colors">Services</button></li>
              <li><button onClick={() => scrollTo("menu")} className="text-white/70 hover:text-secondary transition-colors">Menu</button></li>
              <li><button onClick={() => scrollTo("gallery")} className="text-white/70 hover:text-secondary transition-colors">Gallery</button></li>
              <li><button onClick={() => scrollTo("contact")} className="text-white/70 hover:text-secondary transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-white/20 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <span className="block text-sm text-white/50 mb-1">Call Us:</span>
                <a href="tel:9975132722" className="hover:text-secondary transition-colors block">+91 9975132722</a>
                <a href="tel:7559127572" className="hover:text-secondary transition-colors block">+91 7559127572</a>
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
          <p>Designed with love for Asgar Khan</p>
        </div>
      </div>
    </footer>
  );
}