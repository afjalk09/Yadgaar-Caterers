"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, User } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Reach Out</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Get In Touch</h3>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-border"
          >
            <h4 className="text-2xl font-serif font-bold text-foreground mb-8">Contact Information</h4>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Owner</p>
                  <p className="text-lg font-bold text-foreground">Asgar Khan</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Phone Numbers</p>
                  <a href="tel:9975132722" className="block text-lg font-bold text-foreground hover:text-primary transition-colors">+91 9975132722</a>
                  <a href="tel:7559127572" className="block text-lg font-bold text-foreground hover:text-primary transition-colors">+91 7559127572</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-secondary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Address</p>
                  <p className="text-lg font-medium text-foreground leading-relaxed">
                    Bhandar Wada, Shigaon Road, <br/>
                    Near Sunni Masjid, Boisar – 401501, <br/>
                    Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button 
                onClick={() => window.location.href = "tel:9975132722"}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Phone size={18} />
                Call
              </button>
              <button 
                onClick={() => window.open("https://wa.me/919975132722", "_blank")}
                className="flex-1 bg-[#25D366] hover:bg-[#1ebd5a] text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp
              </button>
              <button 
                onClick={() => window.open("https://maps.google.com/?q=Boisar,Maharashtra", "_blank")}
                className="w-full bg-foreground hover:bg-foreground/90 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <MapPin size={18} />
                Get Directions
              </button>
            </div>
          </motion.div>

          {/* Right Column: Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[500px] lg:h-full min-h-[500px] rounded-3xl overflow-hidden shadow-lg border border-border"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.5!2d72.7486!3d19.8018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71c8567c09a5b%3A0x2bef0f5ed07b1a9d!2sBoisar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Yadgaar Caterers Location"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}