"use client";
import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Cake, Leaf, UtensilsCrossed, Flame, Briefcase } from "lucide-react";

const services = [
  {
    title: "Wedding Catering",
    description: "Make your big day truly unforgettable with our premium royal wedding feasts.",
    icon: <HeartHandshake size={32} className="text-primary" />
  },
  {
    title: "Birthday Parties",
    description: "Delicious treats and special menus tailored to make every birthday celebration joyous.",
    icon: <Cake size={32} className="text-accent" />
  },
  {
    title: "Pure Veg Catering",
    description: "Authentic, flavorful vegetarian delicacies prepared in separate, hygienic setups.",
    icon: <Leaf size={32} className="text-primary" />
  },
  {
    title: "Non-Veg Specialties",
    description: "Rich, aromatic Mughlai and traditional Indian non-veg dishes that guests love.",
    icon: <UtensilsCrossed size={32} className="text-secondary" />
  },
  {
    title: "Live Food Counters",
    description: "Engaging live stations serving fresh chaat, dosas, pasta, and interactive desserts.",
    icon: <Flame size={32} className="text-accent" />
  },
  {
    title: "Corporate Events",
    description: "Professional, punctual, and high-quality catering for office parties and seminars.",
    icon: <Briefcase size={32} className="text-primary" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">What We Offer</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Our Premium Services</h3>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="bg-background rounded-2xl p-8 shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-serif font-bold text-foreground mb-3">{service.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}