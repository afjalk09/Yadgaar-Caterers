"use client";
import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtons() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed z-50 pointer-events-none inset-0 flex justify-between items-end p-4 md:p-6 pb-6">
      
      {/* Bottom Left: Back to Top */}
      <div className="pointer-events-auto">
        <AnimatePresence>
          {showTopBtn && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-white text-foreground shadow-lg border border-border rounded-full flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Right: Contact Actions */}
      <div className="flex flex-col gap-4 pointer-events-auto">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="tel:9975132722"
          className="w-14 h-14 bg-primary text-white shadow-lg rounded-full flex items-center justify-center"
          aria-label="Call Us"
        >
          <Phone size={24} />
        </motion.a>
        
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/919975132722"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white shadow-lg rounded-full flex items-center justify-center"
          aria-label="WhatsApp Us"
        >
          <MessageCircle size={28} />
        </motion.a>
      </div>

    </div>
  );
}