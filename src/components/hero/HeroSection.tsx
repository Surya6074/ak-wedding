"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import MonogramBadge from "../ui/MonogramBadge";
import FloralDivider from "../ui/FloralDivider";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [guestName, setGuestName] = useState<string | null>(null);

  // Parallax scroll transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Read ?invite="Name" or ?invite=Name from URL query params
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const rawParam = params.get("invite") || params.get("guest") || params.get("to");
      if (rawParam) {
        const decoded = decodeURIComponent(rawParam);
        // Clean surrounding quotes e.g. ?invite="Surya" -> Surya
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
      // Fallback
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between px-4 pt-12 sm:pt-16 pb-12 overflow-hidden bg-editorial-grain"
    >
      {/* Layered Parallax Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center opacity-40"
      >
        {/* Soft Golden Halo Background Gradients */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-champagne-200/40 via-gold-100/30 to-rosewood-100/30 blur-3xl" />
        <div className="absolute top-1/4 w-[400px] h-[400px] rounded-full bg-champagne-100/50 blur-2xl" />
      </motion.div>

      {/* Decorative Corner Borders */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-champagne-400/40 pointer-events-none rounded-tl-xl hidden sm:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-champagne-400/40 pointer-events-none rounded-tr-xl hidden sm:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-champagne-400/40 pointer-events-none rounded-bl-xl hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-champagne-400/40 pointer-events-none rounded-br-xl hidden sm:block" />

      {/* Top Container: Monogram & Personalized Guest Welcome Badge */}
      <div className="relative z-10 flex flex-col items-center pt-2">
        {/* Personalized Welcome Card if ?invite= is passed */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 px-6 py-3 rounded-2xl bg-white/95 border border-champagne-300 shadow-luxury backdrop-blur-md text-center max-w-sm sm:max-w-md mx-auto"
          >
            <div className="flex items-center justify-center gap-1.5 text-champagne-600 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-champagne-500 animate-pulse" />
              <span className="font-serif uppercase tracking-editorial text-[10px] font-bold text-champagne-700">
                Exclusive Invitation
              </span>
              <Sparkles className="w-3.5 h-3.5 text-champagne-500 animate-pulse" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-editorial font-medium">
              Welcome, {guestName}!
            </h2>
            <p className="font-serif italic text-xs text-editorial-muted mt-0.5">
              We warmly invite you to join our celebrations
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <MonogramBadge size={guestName ? 60 : 72} />
        </motion.div>
      </div>

      {/* Hero Content Container with smooth scroll parallax */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto my-auto py-4 sm:py-6"
      >
        {/* Intro Subline / Personalized Greeting */}
        {guestName ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-3 max-w-lg mx-auto px-4"
          >
            <p className="font-serif italic text-sm sm:text-base text-champagne-700 leading-relaxed">
              Together with our families, we cordially invite you,{" "}
              <span className="font-serif font-bold text-editorial underline decoration-champagne-400 decoration-2 underline-offset-4">
                {guestName}
              </span>
              , to celebrate the wedding of
            </p>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif uppercase tracking-editorial text-xs sm:text-sm text-champagne-600 font-semibold mb-3"
          >
            {weddingData.hero.weddingDateHeadline}
          </motion.p>
        )}

        {/* Couple's Names in Large Elegant Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="my-2 sm:my-3"
        >
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-editorial tracking-tight font-normal">
            {weddingData.groom.name}
            <span className="block my-1 sm:inline sm:mx-4 font-script text-5xl sm:text-7xl md:text-8xl text-gold-gradient font-normal">
              &
            </span>
            {weddingData.bride.name}
          </h1>
        </motion.div>

        {/* Floral Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <FloralDivider variant="heart" className="my-4 sm:my-5" />
        </motion.div>

        {/* Main Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-champagne-700 font-normal tracking-wide"
        >
          "{weddingData.hero.tagline}"
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="font-serif text-sm sm:text-base text-editorial-muted max-w-md mx-auto mt-3 leading-relaxed"
        >
          {weddingData.hero.subline}
        </motion.p>
      </motion.div>

      {/* Interactive Scroll Down Cue */}
      <motion.a
        href="#countdown"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        aria-label="Scroll down to countdown and details"
        className="relative z-10 flex flex-col items-center gap-2 text-champagne-600 hover:text-editorial transition-colors group cursor-pointer pt-4"
      >
        <span className="text-[11px] font-serif uppercase tracking-editorial font-medium">
          Scroll to Explore
        </span>
        <div className="w-8 h-8 rounded-full border border-champagne-300/60 flex items-center justify-center group-hover:border-champagne-500 transition-colors">
          <ChevronDown className="w-4 h-4 animate-bounce text-champagne-600" />
        </div>
      </motion.a>
    </section>
  );
}
