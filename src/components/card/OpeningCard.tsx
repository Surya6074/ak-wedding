"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Heart } from "lucide-react";
import FloralDivider from "../ui/FloralDivider";

interface OpeningCardProps {
  onOpen: () => void;
  guestName?: string | null;
}

export default function OpeningCard({ onOpen, guestName }: OpeningCardProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  // Prevent background scrolling while the invitation card is closed
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Broadcast event so AudioPlayer can begin music with user gesture
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding:open-invitation"));
    }

    setTimeout(() => {
      onOpen();
      setIsRendered(false);
      document.body.style.overflow = "auto";
    }, 800);
  };

  const displayName = guestName
    ? guestName
        .trim()
        .replace(/^["']|["']$/g, "")
        .split(" ")
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
        .join(" ")
    : null;

  if (!isRendered) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1715]/90 backdrop-blur-xl overflow-hidden select-none"
      >
        {/* Soft Ambient Floating Background Glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-champagne-600/15 blur-3xl pointer-events-none" />

        {/* The Royal Message Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{
            opacity: isOpening ? 0 : 1,
            scale: isOpening ? 1.08 : 1,
            y: isOpening ? -30 : 0,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-lg w-full rounded-3xl bg-[#FAF7F2] border-2 border-champagne-300/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-6 sm:p-10 text-center flex flex-col items-center justify-between overflow-hidden"
        >
          {/* Subtle Golden Paper Grain Pattern */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Luxury Corner Filigree Borders */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-champagne-400/60 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-champagne-400/60 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-champagne-400/60 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-champagne-400/60 rounded-br-lg pointer-events-none" />

          {/* Top Traditional Blessing Header */}
          <div className="relative z-10 space-y-2 pt-2">
            <div className="inline-flex items-center gap-1.5 text-champagne-700 font-serif text-[11px] sm:text-xs uppercase tracking-editorial font-semibold">
              <span>॥ ஸ்ரீ கணேசாய நமஹ ॥</span>
            </div>
            <p className="text-xs font-serif uppercase tracking-editorial text-champagne-600 font-medium">
              Save the Date
            </p>
          </div>

          {/* Center Personalized Wax Seal / Monogram Medallion */}
          <div className="relative z-10 my-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-champagne-400 via-gold-200 to-champagne-500 shadow-luxury flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#7A0F2E] to-[#4A0A1C] border border-champagne-300/40 flex flex-col items-center justify-center text-white shadow-inner">
                <span className="font-heading text-xl sm:text-2xl font-light tracking-wider text-champagne-200">
                  A & K
                </span>
                <span className="text-[9px] font-serif uppercase tracking-widest text-champagne-300/80 -mt-1">
                  2026
                </span>
              </div>

              {/* Pulsing Outer Ring */}
              <div className="absolute inset-0 rounded-full border border-champagne-400/40 animate-ping pointer-events-none" />
            </div>
          </div>

          {/* Card Invitation Body */}
          <div className="relative z-10 space-y-3 w-full">
            {/* If ?invite= is passed, show personalized guest greeting on the cover */}
            {displayName ? (
              <div className="py-1 px-4 rounded-full bg-champagne-100/70 border border-champagne-300/60 inline-block max-w-full">
                <span className="text-[11px] font-serif uppercase tracking-editorial text-champagne-700 font-bold block">
                  Specially Invited:
                </span>
                <span className="font-heading text-lg sm:text-xl text-editorial font-medium truncate block capitalize">
                  Dearest {displayName}
                </span>
              </div>
            ) : (
              <p className="font-serif italic text-xs sm:text-sm text-editorial-muted">
                Together with our families, we cordially invite you to the wedding of
              </p>
            )}

            {/* Couple Names */}
            <div className="space-y-1">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-editorial tracking-tight font-normal">
                Aravindh
                <span className="inline-block mx-2 font-script text-3xl sm:text-4xl text-gold-gradient font-normal">
                  &
                </span>
                Karthiga
              </h1>
            </div>

            <FloralDivider variant="heart" className="my-3 opacity-80" />

            {/* Date & Location */}
            <div className="text-xs sm:text-sm font-serif text-champagne-700 font-medium space-y-0.5">
              <p>November 14 & 15, 2026</p>
              <p className="text-[11px] sm:text-xs text-editorial-muted">
                Aaryan Thirumana Mahal • Madurai
              </p>
            </div>
          </div>

          {/* Tap to Open CTA Button */}
          <div className="relative z-10 mt-6 sm:mt-8 w-full pt-4 border-t border-champagne-200/60">
            <button
              onClick={handleOpen}
              className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-editorial hover:bg-black text-white shadow-luxury transition-all duration-300 hover:shadow-goldGlow hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              aria-label="Tap to open the wedding invitation"
            >
              <Mail className="w-4 h-4 text-champagne-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-serif uppercase tracking-editorial font-semibold text-champagne-200">
                {isOpening ? "Opening Invitation..." : "Tap to Open Invitation"}
              </span>
              <Sparkles className="w-4 h-4 text-champagne-400 animate-pulse" />
            </button>
            <span className="block text-[11px] font-serif text-editorial-muted italic mt-2">
              Tap to unveil celebrations & music
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
