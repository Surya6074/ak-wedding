"use client";

import React from "react";

interface FloralDividerProps {
  className?: string;
  variant?: "heart" | "lotus" | "diamond";
}

export default function FloralDivider({
  className = "",
  variant = "heart",
}: FloralDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-8 select-none ${className}`}>
      {/* Left fine line */}
      <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-r from-transparent via-champagne-400 to-champagne-600" />

      {/* Decorative center icon */}
      <div className="flex items-center gap-1.5 text-champagne-500">
        <span className="text-[10px] opacity-70">✧</span>
        {variant === "heart" && (
          <svg
            width="18"
            height="16"
            viewBox="0 0 24 22"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_1px_3px_rgba(197,160,89,0.3)] transition-transform hover:scale-125 duration-300"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
        {variant === "lotus" && (
          <span className="text-sm">🪷</span>
        )}
        {variant === "diamond" && (
          <div className="w-2 h-2 rotate-45 border border-champagne-500 bg-champagne-200" />
        )}
        <span className="text-[10px] opacity-70">✧</span>
      </div>

      {/* Right fine line */}
      <div className="h-[1px] w-12 sm:w-28 bg-gradient-to-l from-transparent via-champagne-400 to-champagne-600" />
    </div>
  );
}
