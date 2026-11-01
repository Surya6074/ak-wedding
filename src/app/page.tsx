"use client";

import React, { useEffect } from "react";
import HeroSection from "@/components/hero/HeroSection";
import CountdownSection from "@/components/countdown/CountdownSection";
import CoupleSection from "@/components/couple/CoupleSection";
import EventsSection from "@/components/events/EventsSection";
import GallerySection from "@/components/gallery/GallerySection";
import LocationSection from "@/components/location/LocationSection";
import FooterSection from "@/components/footer/FooterSection";

import FloatingPetals from "@/components/ui/FloatingPetals";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AudioPlayer from "@/components/ui/AudioPlayer";

export default function WeddingPage() {
  // Client-only dynamic initialization of Lenis smooth scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lenisInstance: any = null;
    let animId: number;

    import("lenis")
      .then(({ default: Lenis }) => {
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
        });

        function raf(time: number) {
          if (lenisInstance) {
            lenisInstance.raf(time);
            animId = requestAnimationFrame(raf);
          }
        }
        animId = requestAnimationFrame(raf);

        // Smooth scroll for anchor clicks
        const handleAnchorClick = (e: MouseEvent) => {
          const target = (e.target as HTMLElement)?.closest("a");
          if (target && target.hash && target.hash.startsWith("#")) {
            const el = document.querySelector(target.hash);
            if (el && lenisInstance) {
              e.preventDefault();
              lenisInstance.scrollTo(el, { offset: -20 });
            }
          }
        };

        document.addEventListener("click", handleAnchorClick);
        return () => {
          document.removeEventListener("click", handleAnchorClick);
        };
      })
      .catch(() => {
        // fallback to native scroll
      });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#2C2422] selection:bg-[#C5A059] selection:text-white overflow-x-hidden">
      {/* 60fps Ambient Floating Petals & Gold Sparkles */}
      <FloatingPetals />

      {/* Desktop Custom Champagne Cursor */}
      <CustomCursor />

      {/* Top Gold Scroll Progress */}
      <ScrollProgress />

      {/* 1. Hero Section — Wedding Introduction with Parallax */}
      <HeroSection />

      {/* 2. Wedding Countdown Section */}
      <CountdownSection />

      {/* 3. Couple Introduction */}
      <CoupleSection />

      {/* 4. Wedding Events Itinerary */}
      <EventsSection />

      {/* 5. Interactive Editorial Masonry Gallery (Fisher-Yates shuffled & Lightbox) */}
      <GallerySection />

      {/* 6. Wedding Location & Directions */}
      <LocationSection />

      {/* 7. Footer with Romantic Poetry */}
      <FooterSection />

      {/* Floating Traditional Audio Music Controller */}
      <AudioPlayer />
    </main>
  );
}
