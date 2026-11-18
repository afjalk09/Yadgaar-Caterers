"use client";

import React, { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80", alt: "Catering buffet spread" },
  { src: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80", alt: "Indian food served on a platter" },
  { src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80", alt: "Freshly prepared food for an event" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Food presentation at a catered event" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Dining table prepared for guests" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", alt: "Freshly made food close-up" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80", alt: "Assorted dishes ready to serve" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80", alt: "Plated food arrangement" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", alt: "Meal served at a celebration" },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const selected = selectedIndex === null ? null : galleryImages[selectedIndex];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Beautiful Memories</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Our Food Gallery</h3>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={image.src}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reducedMotion ? 0 : (idx % 3) * 0.1, duration: 0.5 }}
              className="relative group overflow-hidden rounded-2xl break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Enlarge photo: ${image.alt}`}
                className="relative block w-full aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white w-10 h-10" />
                </span>
              </button>
            </motion.div>
          ))}
        </div>

      </div>

      <Dialog.Root open={selected !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/90" />
          <Dialog.Content className="fixed inset-0 z-[81] flex items-center justify-center p-4" aria-describedby="gallery-image-alt">
            <Dialog.Title className="sr-only">Enlarged gallery photo</Dialog.Title>
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={reducedMotion ? false : { scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={reducedMotion ? undefined : { scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
                >
                  <div className="relative w-full h-[80vh] max-h-[80vh]">
                    <Image
                      src={selected.src}
                      alt={selected.alt}
                      fill
                      sizes="100vw"
                      className="object-contain rounded-lg shadow-2xl"
                    />
                  </div>
                  <p id="gallery-image-alt" className="mt-4 text-sm text-white/80">{selected.alt}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close enlarged photo"
                className="absolute right-4 top-4 rounded-full p-2 text-white hover:text-accent"
              >
                <X size={32} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
