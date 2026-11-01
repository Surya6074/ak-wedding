"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import MonogramBadge from "../ui/MonogramBadge";
import FloralDivider from "../ui/FloralDivider";
import { ChevronDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);

  // Parallax scroll transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between px-4 pt-16 pb-12 overflow-hidden bg-editorial-grain"
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

      {/* Top Monogram Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 pt-2"
      >
        <MonogramBadge size={72} />
      </motion.div>

      {/* Hero Content Container with smooth scroll parallax */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto my-auto py-6"
      >
        {/* Intro Subline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif uppercase tracking-editorial text-xs sm:text-sm text-champagne-600 font-semibold mb-3"
        >
          {weddingData.hero.weddingDateHeadline}
        </motion.p>

        {/* Couple's Names in Large Elegant Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="my-3"
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
          <FloralDivider variant="heart" className="my-5" />
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
