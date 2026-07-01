"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Menu", id: "menu" },
    { name: "Gallery", id: "gallery" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-primary z-50 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-md shadow-sm py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div 
            className="text-2xl md:text-3xl font-serif font-bold text-primary cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            Yadgaar <span className="text-accent italic">Caterers</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollTo(link.id)}
                    className="text-foreground hover:text-accent font-medium transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => scrollTo("booking")}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
            >
              Book Now
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <motion.div 
        className={`fixed inset-0 bg-background z-30 flex flex-col items-center justify-center ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col items-center gap-6 text-xl">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button 
                onClick={() => scrollTo(link.id)}
                className="text-foreground hover:text-accent font-serif font-medium transition-colors"
              >
                {link.name}
              </button>
            </li>
          ))}
          <li>
            <Button 
              onClick={() => scrollTo("booking")}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg mt-4"
            >
              Book Now
            </Button>
          </li>
        </ul>
      </motion.div>
    </>
  );
}