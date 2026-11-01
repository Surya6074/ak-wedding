"use client";

import React from "react";

interface MonogramBadgeProps {
  className?: string;
  size?: number;
}

export default function MonogramBadge({
  className = "",
  size = 64,
}: MonogramBadgeProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full border border-champagne-400/50 bg-white/70 backdrop-blur-md shadow-card select-none group hover:border-champagne-500 transition-colors ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer subtle concentric decorative ring */}
      <div className="absolute inset-1 rounded-full border border-champagne-300/30" />

      {/* Monogram Letters */}
      <div className="flex items-center font-serif text-editorial font-medium tracking-widest">
        <span className="text-base text-champagne-600 font-bold">A</span>
        <span className="font-script text-lg text-champagne-400 mx-0.5">&</span>
        <span className="text-base text-champagne-600 font-bold">K</span>
      </div>
    </div>
  );
}
