"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { Heart, Sparkles } from "lucide-react";
import FloralDivider from "../ui/FloralDivider";

export default function CoupleSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Harmonized scroll parallax for level alignment
  const cardsY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const heartScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.85, 1.18, 0.95]);
  const bgFloatY = useTransform(scrollYProgress, [0, 1], [-40, 50]);

  return (
    <section
      ref={sectionRef}
      id="couple"
      className="relative py-28 sm:py-36 px-4 bg-editorial-grain overflow-hidden"
    >
      {/* Parallax Background Aura */}
      <motion.div
        style={{ y: bgFloatY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-champagne-200/25 blur-3xl pointer-events-none select-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 mb-16 sm:mb-24"
        >
          <span className="font-serif uppercase tracking-editorial text-xs sm:text-sm text-champagne-600 font-semibold">
            The Bride & Groom
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl font-normal text-editorial tracking-tight">
            Destined to Walk as One
          </h2>
          <FloralDivider variant="heart" className="my-6" />
        </motion.div>

        {/* Symmetrical Two-Column Editorial Layout with Parallax */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Connecting Heart Line & Monogram in Center (Desktop) */}
          <motion.div
            style={{ scale: heartScale }}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center pointer-events-none"
          >
            <div className="w-16 h-16 rounded-full bg-white border border-champagne-300 shadow-floating flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-champagne-50 flex items-center justify-center text-champagne-600">
                <Heart className="w-6 h-6 fill-champagne-500 text-champagne-500 animate-pulse" />
              </div>
            </div>
            <span className="font-script text-xl text-champagne-600 mt-2">Forever</span>
          </motion.div>

          {/* GROOM COLUMN: Aravindh */}
          <motion.div
            style={{ y: cardsY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Groom Portrait Frame */}
            <div className="relative group">
              <div className="w-72 sm:w-80 h-[380px] sm:h-[410px] rounded-t-full rounded-b-3xl p-1.5 sm:p-2 bg-gradient-to-b from-champagne-400 via-champagne-200 to-champagne-300 shadow-luxury flex flex-col">
                <div className="w-full flex-1 rounded-t-full rounded-b-2xl bg-gradient-to-br from-[#EFE8DE] via-[#FAF7F2] to-[#E3D8CA] border border-white flex flex-col items-center justify-center p-5 sm:p-6 text-center overflow-hidden relative group-hover:scale-[1.01] transition-transform duration-500">
                  {/* Subtle Background Radial Pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Groom Vector Silhouette & Monogram */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-champagne-400 bg-white/90 flex items-center justify-center mb-2 shadow-sm shrink-0">
                    <span className="font-heading text-3xl sm:text-4xl font-medium text-champagne-700">
                      {weddingData.groom.monogram}
                    </span>
                  </div>

                  <span className="font-serif uppercase tracking-editorial text-[10px] sm:text-xs text-champagne-700 font-semibold">
                    The Groom
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl text-editorial font-medium mt-0.5 my-3">
                    {weddingData.groom.name}
                  </h3>

                  {/* Parents Data inside the box */}
                  <div className="my-2 px-3.5 py-1 rounded-full bg-champagne-100/80 border border-champagne-300/70 max-w-[240px]">
                    <p className="font-serif text-xs sm:text-[13px] text-champagne-800 font-semibold">
                      {weddingData.groom.parents}
                    </p>
                  </div>

                  <p className="text-xs sm:text-[13px] font-serif text-editorial-muted italic mt-1 max-w-[220px] leading-relaxed">
                    "{weddingData.groom.bio}"
                  </p>
                </div>
              </div>

              {/* Decorative Corner Flairs */}
              <div className="absolute -bottom-2 -left-2 text-champagne-400 text-xs">✧</div>
              <div className="absolute -bottom-2 -right-2 text-champagne-400 text-xs">✧</div>
            </div>
          </motion.div>

          {/* BRIDE COLUMN: Karthiga */}
          <motion.div
            style={{ y: cardsY }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Bride Portrait Frame */}
            <div className="relative group">
              <div className="w-72 sm:w-80 h-[380px] sm:h-[410px] rounded-t-full rounded-b-3xl p-1.5 sm:p-2 bg-gradient-to-b from-rosewood-400 via-rosewood-200 to-rosewood-300 shadow-luxury flex flex-col">
                <div className="w-full flex-1 rounded-t-full rounded-b-2xl bg-gradient-to-br from-[#FAF0EB] via-[#FAF7F2] to-[#EFE4DE] border border-white flex flex-col items-center justify-center p-5 sm:p-6 text-center overflow-hidden relative group-hover:scale-[1.01] transition-transform duration-500">
                  {/* Subtle Background Radial Pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8E6F34_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Bride Vector Silhouette & Monogram */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-rosewood-300 bg-white/90 flex items-center justify-center mb-2 shadow-sm shrink-0">
                    <span className="font-heading text-3xl sm:text-4xl font-medium text-rosewood-700">
                      {weddingData.bride.monogram}
                    </span>
                  </div>

                  <span className="font-serif uppercase tracking-editorial text-[10px] sm:text-xs text-rosewood-700 font-semibold">
                    The Bride
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl text-editorial font-medium mt-0.5 my-3">
                    {weddingData.bride.name}
                  </h3>

                  {/* Parents Data inside the box */}
                  <div className="my-2 px-3.5 py-1 rounded-full bg-rosewood-100/80 border border-rosewood-300/70 max-w-[240px]">
                    <p className="font-serif text-xs sm:text-[13px] text-rosewood-800 font-semibold">
                      {weddingData.bride.parents}
                    </p>
                  </div>

                  <p className="text-xs sm:text-[13px] font-serif text-editorial-muted italic mt-1 max-w-[220px] leading-relaxed">
                    "{weddingData.bride.bio}"
                  </p>
                </div>
              </div>

              {/* Decorative Corner Flairs */}
              <div className="absolute -bottom-2 -left-2 text-rosewood-400 text-xs">✧</div>
              <div className="absolute -bottom-2 -right-2 text-rosewood-400 text-xs">✧</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
