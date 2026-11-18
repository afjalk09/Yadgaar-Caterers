"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const menuCategories = ["All", "Biryani Specials", "Starters", "Main Course", "Desserts"];

const menuItems = [
  {
    name: "Chicken Biryani",
    category: "Biryani Specials",
    description: "Aromatic basmati rice cooked with tender chicken and secret Yadgaar spices.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80"
  },
  {
    name: "Mutton Biryani",
    category: "Biryani Specials",
    description: "Slow-cooked mutton with fragrant rice, saffron, and rich caramelized onions.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80"
  },
  {
    name: "Veg Dum Biryani",
    category: "Biryani Specials",
    description: "Garden fresh vegetables layered with flavored rice and dum-cooked to perfection.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80"
  },
  {
    name: "Chicken Tikka",
    category: "Starters",
    description: "Juicy chicken chunks marinated in spiced yogurt and roasted in a tandoor.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80"
  },
  {
    name: "Seekh Kebab",
    category: "Starters",
    description: "Minced meat mixed with warm spices and grilled perfectly on skewers.",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80"
  },
  {
    name: "Paneer Tikka",
    category: "Starters",
    description: "Soft cottage cheese cubes marinated and grilled with peppers and onions.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80"
  },
  {
    name: "Butter Chicken",
    category: "Main Course",
    description: "Tender chicken cooked in a rich, creamy, and mildly spiced tomato gravy.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80"
  },
  {
    name: "Dal Tadka",
    category: "Main Course",
    description: "Yellow lentils tempered with ghee, cumin, garlic, and dry red chilies.",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=80"
  },
  {
    name: "Gulab Jamun",
    category: "Desserts",
    description: "Soft milk-solid dumplings soaked in warm rose-flavored sugar syrup.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80"
  }
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Discover Our Taste</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Our Signature Dishes</h3>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full mb-10"></div>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {menuCategories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white text-foreground hover:bg-primary/10 border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border group"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.name} prepared by Yadgaar Caterers`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-serif font-bold text-foreground mb-2">{item.name}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}