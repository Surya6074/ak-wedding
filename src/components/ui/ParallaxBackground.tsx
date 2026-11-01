"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBackground() {
  const { scrollY } = useScroll();

  // Multi-layered parallax transforms moving at distinct speeds
  const slowY = useTransform(scrollY, (v) => v * 0.12);
  const midY = useTransform(scrollY, (v) => v * 0.22);
  const fastY = useTransform(scrollY, (v) => v * 0.35);
  const rotateMandala1 = useTransform(scrollY, [0, 4000], [0, 180]);
  const rotateMandala2 = useTransform(scrollY, [0, 4000], [0, -180]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Layer 1: Slow Deep Ambient Golden Halos */}
      <motion.div
        style={{ y: slowY }}
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-gradient-to-tr from-champagne-300/20 via-gold-100/15 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: slowY }}
        className="absolute top-2/3 -right-48 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-rosewood-200/15 via-champagne-200/20 to-transparent blur-3xl"
      />

      {/* Layer 2: Mid-depth Rotating Kolam / Mandala Ornaments */}
      {/* Left side decorative mandala beside Couple / Countdown */}
      <motion.div
        style={{ y: midY, rotate: rotateMandala1 }}
        className="absolute top-[35%] -left-28 w-64 h-64 opacity-[0.14] hidden md:block"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#C5A059]">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.8" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="10"
              x2="100"
              y2="190"
              stroke="currentColor"
              strokeWidth="0.5"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <circle
              key={deg}
              cx="100"
              cy="35"
              r="6"
              fill="currentColor"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Right side decorative mandala beside Events / Gallery */}
      <motion.div
        style={{ y: midY, rotate: rotateMandala2 }}
        className="absolute top-[65%] -right-28 w-72 h-72 opacity-[0.12] hidden md:block"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#C5A059]">
          <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.7" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path
              key={deg}
              d="M100,20 C110,50 110,60 100,75 C90,60 90,50 100,20 Z"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="currentColor"
              fillOpacity="0.1"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>
      </motion.div>

      {/* Layer 3: Fast Subtle Shimmer Dust Particles */}
      <motion.div
        style={{ y: fastY }}
        className="absolute inset-0 flex justify-between px-8 opacity-25"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-champagne-400 shadow-[0_0_8px_#C5A059] mt-[40vh]" />
        <div className="w-2 h-2 rounded-full bg-champagne-300 shadow-[0_0_10px_#C5A059] mt-[80vh]" />
        <div className="w-1.5 h-1.5 rounded-full bg-champagne-500 shadow-[0_0_6px_#C5A059] mt-[120vh]" />
      </motion.div>
    </div>
  );
}
