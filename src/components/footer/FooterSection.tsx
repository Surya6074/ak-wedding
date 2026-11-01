"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { Heart, Sparkles } from "lucide-react";
import FloralDivider from "../ui/FloralDivider";
import MonogramBadge from "../ui/MonogramBadge";

export default function FooterSection() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [guestName, setGuestName] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const poetryY = useTransform(scrollYProgress, [0, 1], [25, -15]);
  const auraScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.25]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const rawParam = params.get("invite") || params.get("guest") || params.get("to");
      if (rawParam) {
        const decoded = decodeURIComponent(rawParam);
        const cleaned = decoded.replace(/^["']|["']$/g, "").trim();
        if (cleaned) {
          const capitalized = cleaned
            .split(" ")
            .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
            .join(" ");
          setGuestName(capitalized);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-24 sm:py-32 px-4 bg-editorial text-ivory-100 text-center overflow-hidden"
    >
      {/* Background warm radial aura with Parallax Scale */}
      <motion.div
        style={{ scale: auraScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-champagne-600/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        {/* Monogram Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-block"
        >
          <MonogramBadge size={68} />
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-2"
        >
          <h2 className="font-heading text-4xl sm:text-6xl font-normal text-champagne-200">
            {weddingData.groom.name} & {weddingData.bride.name}
          </h2>
          <p className="font-serif uppercase tracking-editorial text-xs sm:text-sm text-champagne-400 font-semibold">
            {weddingData.footer.weddingDateTag}
          </p>
        </motion.div>

        <FloralDivider variant="heart" className="my-6 opacity-70" />

        {/* Romantic Poetry Lines with Parallax Elevation */}
        <motion.div
          style={{ y: poetryY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-2 font-serif italic text-lg sm:text-2xl text-ivory-100/90 max-w-xl mx-auto leading-relaxed"
        >
          {weddingData.footer.poemLines.map((line, idx) => (
            <p key={idx} className="block">
              "{line}"
            </p>
          ))}
        </motion.div>

        {/* Personalized Guest Closing Message if ?invite= is passed */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-2"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-champagne-400/40 text-champagne-200 text-xs sm:text-sm font-serif italic shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400 animate-pulse" />
              <span>Looking forward to celebrating with you, {guestName}!</span>
            </div>
          </motion.div>
        )}

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-serif text-ivory-300/60 max-w-xl mx-auto gap-2">
          <span>Aravindh & Karthiga's Wedding Invitation</span>
          <div className="flex items-center gap-1.5">
            <span>{weddingData.footer.madeWithLove}</span>
            <Heart className="w-3.5 h-3.5 text-champagne-400 fill-champagne-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
