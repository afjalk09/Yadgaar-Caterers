"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    text: "The food quality was amazing and every guest loved the biryani. Highly recommend Yadgaar Caterers for any event!",
    author: "Rahul Sharma",
    role: "Wedding Client"
  },
  {
    text: "Excellent catering service for our wedding function. The team was professional and the food was outstanding.",
    author: "Priya Patel",
    role: "Wedding Client"
  },
  {
    text: "Professional team and delicious food. Our corporate event was a huge success thanks to Yadgaar Caterers.",
    author: "Mohammad Ali",
    role: "Corporate Client"
  },
  {
    text: "The live food counters were the highlight of our birthday party. Everyone was impressed with the quality.",
    author: "Sneha Joshi",
    role: "Birthday Client"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      
      {/* Decor */}
      <Quote className="absolute top-10 left-10 text-primary/5 w-40 h-40 -rotate-12" />
      <Quote className="absolute bottom-10 right-10 text-secondary/5 w-40 h-40 rotate-12" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">What Our Clients Say</h3>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-border relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center"
                aria-live="polite"
              >
                <div className="flex gap-1 mb-6" aria-label="5 out of 5 stars" role="img">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-secondary text-xl">★</span>
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed italic mb-8">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div>
                  <h4 className="font-bold text-lg text-foreground">{testimonials[currentIndex].author}</h4>
                  <p className="text-sm text-primary font-medium">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}