import React from "react";

interface RingOfLoveProps {
  variant?: "engagement" | "wedding" | "intertwined";
  className?: string;
  size?: number;
}

export default function RingOfLove({
  variant = "intertwined",
  className = "w-9 h-9",
  size = 36,
}: RingOfLoveProps) {
  const isEngagement = variant === "engagement";
  const isWedding = variant === "wedding";

  // Unique IDs for gradients to avoid SVG collision
  const uid = variant;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ring of Love"
    >
      <defs>
        {/* Luxury Gold Gradient */}
        <linearGradient
          id={`goldGrad-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#F9E7C4" />
          <stop offset="35%" stopColor="#DFB76C" />
          <stop offset="70%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8E6F34" />
        </linearGradient>

        {/* Rose Gold / Ruby Gradient for Wedding */}
        <linearGradient
          id={`roseGrad-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FAD4CD" />
          <stop offset="40%" stopColor="#D47A6B" />
          <stop offset="80%" stopColor="#9C333D" />
          <stop offset="100%" stopColor="#6E1A24" />
        </linearGradient>

        {/* Diamond Sparkle Gradient */}
        <linearGradient
          id={`diamondGrad-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E2F1FF" />
          <stop offset="100%" stopColor="#A8D0FF" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id={`glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Engagement Ceremony Version: Diamond Solitaire Ring of Love */}
      {isEngagement && (
        <g>
          {/* Subtle Ambient Behind Glow */}
          <circle
            cx="32"
            cy="36"
            r="20"
            fill="#DFB76C"
            opacity="0.12"
            filter={`url(#glow-${uid})`}
          />

          {/* Left Ring (The Promise Band) */}
          <circle
            cx="24"
            cy="38"
            r="13"
            stroke={`url(#goldGrad-${uid})`}
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Ring (The Solitaire Diamond Ring of Love) */}
          <circle
            cx="39"
            cy="36"
            r="13"
            stroke={`url(#goldGrad-${uid})`}
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Interlocking Overlap Arc - Gives true 3D woven ring look */}
          <path
            d="M 32 27.5 A 13 13 0 0 1 37 32"
            stroke={`url(#goldGrad-${uid})`}
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Prong Crown Mount for the Solitaire Gem */}
          <path
            d="M 36.5 23.5 L 39 20 L 41.5 23.5 Z"
            fill="#C5A059"
          />

          {/* Solitaire Diamond Gem (Brilliant Heart & Diamond Cut) */}
          <path
            d="M 39 12 L 44 17 L 39 23 L 34 17 Z"
            fill={`url(#diamondGrad-${uid})`}
            stroke="#C5A059"
            strokeWidth="0.8"
            filter={`url(#glow-${uid})`}
          />
          {/* Diamond Facets */}
          <path
            d="M 34 17 L 44 17 M 39 12 L 39 23 M 36.5 17 L 39 23 L 41.5 17"
            stroke="#FFFFFF"
            strokeWidth="0.6"
            opacity="0.8"
          />

          {/* Sparkling Stars / Glint */}
          <path
            d="M 45 10 L 46 13 L 49 14 L 46 15 L 45 18 L 44 15 L 41 14 L 44 13 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
          <circle cx="32" cy="15" r="1.2" fill="#FFFFFF" opacity="0.8" />

          {/* Floating Miniature Heart of Love */}
          <path
            d="M 32 35 C 30 33 27 34 27 36.5 C 27 39 32 42 32 42 C 32 42 37 39 37 36.5 C 37 34 34 33 32 35 Z"
            fill={`url(#goldGrad-${uid})`}
            opacity="0.9"
          />
        </g>
      )}

      {/* Wedding Ceremony Version: Sacred Interlocked Bands with Ring of Love Knot */}
      {isWedding && (
        <g>
          {/* Ambient Warm Golden Glow */}
          <circle
            cx="32"
            cy="36"
            r="20"
            fill="#B34A3E"
            opacity="0.12"
            filter={`url(#glow-${uid})`}
          />

          {/* Left Wedding Band (Groom - Deep Gold) */}
          <circle
            cx="25"
            cy="37"
            r="13.5"
            stroke={`url(#goldGrad-${uid})`}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Wedding Band (Bride - Rose Gold / Mangalya Hues) */}
          <circle
            cx="39"
            cy="37"
            r="13.5"
            stroke={`url(#roseGrad-${uid})`}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* 3D Weave Overlap: Left Ring loops cleanly through Right Ring */}
          <path
            d="M 32.5 28.5 A 13.5 13.5 0 0 1 38.5 34"
            stroke={`url(#goldGrad-${uid})`}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sacred Central Heart Union ("Ring of Love") */}
          <g filter={`url(#glow-${uid})`}>
            <path
              d="M 32 21 C 29 17 24 17.5 24 22 C 24 26.5 32 32 32 32 C 32 32 40 26.5 40 22 C 40 17.5 35 17 32 21 Z"
              fill={`url(#roseGrad-${uid})`}
              stroke={`url(#goldGrad-${uid})`}
              strokeWidth="1.2"
            />
            {/* Heart Inner Highlight */}
            <path
              d="M 30 20 C 27.5 19 25.5 20.5 25.5 22.5"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.75"
            />
          </g>

          {/* Auspicious Golden Sparkles */}
          <path
            d="M 32 10 L 33 13 L 36 14 L 33 15 L 32 18 L 31 15 L 28 14 L 31 13 Z"
            fill={`url(#goldGrad-${uid})`}
          />
          <circle cx="16" cy="27" r="1.3" fill="#DFB76C" />
          <circle cx="48" cy="27" r="1.3" fill="#D47A6B" />
        </g>
      )}

      {/* Default Intertwined Rings */}
      {!isEngagement && !isWedding && (
        <g>
          <circle
            cx="25"
            cy="36"
            r="13"
            stroke={`url(#goldGrad-${uid})`}
            strokeWidth="3.8"
            fill="none"
          />
          <circle
            cx="39"
            cy="36"
            r="13"
            stroke={`url(#goldGrad-${uid})`}
            strokeWidth="3.8"
            fill="none"
          />
          <path
            d="M 32 27 A 13 13 0 0 1 37 32"
            stroke={`url(#goldGrad-${uid})`}
            strokeWidth="3.8"
            fill="none"
          />
          <path
            d="M 32 22 C 30 19 26 19.5 26 23 C 26 26.5 32 30 32 30 C 32 30 38 26.5 38 23 C 38 19.5 34 19 32 22 Z"
            fill={`url(#goldGrad-${uid})`}
          />
        </g>
      )}
    </svg>
  );
}
