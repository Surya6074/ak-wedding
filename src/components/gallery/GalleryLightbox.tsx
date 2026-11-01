"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/data/galleryData";
import { X, ChevronLeft, ChevronRight, Camera, Heart } from "lucide-react";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryLightbox({
  item,
  items,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [item, onClose, onNext, onPrev]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous Image"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all transform hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next Image"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all transform hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Lightbox Card */}
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full rounded-3xl bg-editorial-dark border border-champagne-400/30 overflow-hidden shadow-2xl z-40 text-white p-6 sm:p-10 flex flex-col items-center text-center space-y-6"
        >
          {/* Framed Image Display */}
          <div
            className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.gradient} border border-champagne-300/30 flex flex-col items-center justify-center p-8 relative overflow-hidden text-editorial`}
          >
            <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-champagne-600 mb-3 shadow-md">
              <Camera className="w-7 h-7" />
            </div>

            <span className="font-heading text-3xl sm:text-4xl text-editorial font-medium">
              Aravindh & Karthiga
            </span>
            <span className="font-serif uppercase tracking-editorial text-xs text-champagne-700 font-semibold mt-2">
              {item.category} • Madurai
            </span>
            <div className="mt-4 flex items-center gap-1.5 text-rosewood-600">
              <Heart className="w-4 h-4 fill-rosewood-500 text-rosewood-500" />
              <span className="font-serif italic text-xs">November 2026</span>
            </div>
          </div>

          {/* Caption & Metadata */}
          <div className="space-y-2 max-w-lg">
            <h3 className="font-heading text-2xl sm:text-3xl text-champagne-200 font-medium">
              {item.title}
            </h3>
            <p className="font-serif text-sm sm:text-base text-ivory-200/80 leading-relaxed italic">
              "{item.caption}"
            </p>
          </div>

          {/* Image index counter */}
          <div className="pt-2 text-xs font-serif tracking-widest uppercase text-champagne-400/80">
            Photo {currentIndex + 1} of {items.length}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
