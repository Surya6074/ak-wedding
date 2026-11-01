"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { galleryItems, GalleryItem, shuffleArray } from "@/data/galleryData";
import GalleryLightbox from "./GalleryLightbox";
import { Camera, ZoomIn, Sparkles } from "lucide-react";
import FloralDivider from "../ui/FloralDivider";

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shuffledItems, setShuffledItems] = useState<GalleryItem[]>(galleryItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Editorial Parallax Column Speeds
  const col1Y = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-20, 25]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [35, -35]);

  // Fisher-Yates shuffle algorithm on initial page load
  useEffect(() => {
    const randomized = shuffleArray(galleryItems);
    setShuffledItems(randomized);
  }, []);

  const categories = ["All", "Couple", "Moments", "Celebration", "Ceremony"];

  const filteredItems =
    selectedCategory === "All"
      ? shuffledItems
      : shuffledItems.filter((item) => item.category === selectedCategory);

  const handleNext = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveLightboxItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightboxItem(filteredItems[prevIndex]);
  };

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-28 sm:py-36 px-4 bg-editorial-grain overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 mb-14"
        >
          <span className="font-serif uppercase tracking-editorial text-xs sm:text-sm text-champagne-600 font-semibold">
            Visual Storytelling
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl font-normal text-editorial tracking-tight">
            Captured Moments
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-editorial-muted max-w-lg mx-auto">
            A curated gallery of love, laughter, and timeless celebrations.
          </p>
          <FloralDivider variant="lotus" className="my-6" />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-serif uppercase tracking-editorial transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-editorial text-white shadow-md scale-105"
                    : "bg-white/80 text-editorial-muted hover:text-editorial border border-champagne-200 hover:border-champagne-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Masonry-Style Editorial Gallery with Parallax Shifts */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredItems.map((item, idx) => {
            const parallaxY = idx % 3 === 0 ? col1Y : idx % 3 === 1 ? col2Y : col3Y;

            return (
              <motion.div
                key={item.id}
                style={{ y: parallaxY }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                onClick={() => setActiveLightboxItem(item)}
                className="break-inside-avoid group cursor-pointer rounded-3xl p-3 bg-white border border-champagne-300/40 shadow-card hover:shadow-floating transition-all duration-300"
              >
                {/* Frame Container */}
                <div
                  className={`w-full ${item.heightClass} rounded-2xl bg-gradient-to-br ${item.gradient} border border-champagne-200/60 p-6 flex flex-col justify-between relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]`}
                >
                  {/* Top Badge */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-serif uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm text-champagne-700 font-semibold border border-white">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-champagne-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Center Vignette */}
                  <div className="text-center my-auto space-y-1">
                    <span className="font-heading text-2xl sm:text-3xl text-editorial font-medium block">
                      A & K
                    </span>
                    <span className="font-serif text-xs text-editorial-muted italic block">
                      {item.title}
                    </span>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="rounded-xl bg-white/80 backdrop-blur-sm p-3 border border-white/80 space-y-0.5">
                    <p className="font-heading text-sm text-editorial font-medium line-clamp-1">
                      {item.title}
                    </p>
                    <p className="font-serif text-[11px] text-editorial-muted italic line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        item={activeLightboxItem}
        items={filteredItems}
        onClose={() => setActiveLightboxItem(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
