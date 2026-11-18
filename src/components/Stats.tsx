"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Events Catered" },
  { value: 10000, suffix: "+", label: "Happy Guests" },
  { value: 100, suffix: "%", label: "Customer Satisfaction" }
];

function Counter({ end, suffix }: { end: number, suffix: string }) {
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(reducedMotion ? end : 0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || reducedMotion) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end, isInView, reducedMotion]);

  return (
    <span
      ref={ref}
      role="img"
      aria-label={`${end.toLocaleString()}${suffix}`}
      className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-accent"
    >
      <span aria-hidden="true">{count.toLocaleString()}{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/80 z-0"></div>
      
      {/* Decorative Pattern overlay */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay z-0" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <Counter end={stat.value} suffix={stat.suffix} />
              <p className="text-white font-medium mt-3 text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}