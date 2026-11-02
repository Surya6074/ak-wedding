import React from "react";
import Image from "next/image";

interface KalashIconProps {
  className?: string;
  size?: number;
}

export default function KalashIcon({
  className = "w-11 h-11",
  size = 44,
}: KalashIconProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <Image
        src="/kalash-logo.png"
        alt="Sacred Mangala Kalasam"
        width={size}
        height={size}
        className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(110,26,36,0.15)] transition-transform group-hover:scale-110 duration-300"
        priority
      />
    </div>
  );
}
