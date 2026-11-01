"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { Clock, Sparkles } from "lucide-react";
import FloralDivider from "../ui/FloralDivider";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isWeddingDay: boolean;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isWeddingDay: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeRemaining = (): TimeRemaining => {
      const now = new Date().getTime();
      const target = new Date(weddingData.targetCountdownISO).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isWeddingDay: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isWeddingDay: false,
      };
    };

    setTimeLeft(calculateTimeRemaining());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days, sub: "Until Forever" },
    { label: "Hours", value: timeLeft.hours, sub: "Cherished Time" },
    { label: "Minutes", value: timeLeft.minutes, sub: "Moments Away" },
    { label: "Seconds", value: timeLeft.seconds, sub: "Heartbeats" },
  ];

  return (
    <section
      id="countdown"
      className="relative py-24 sm:py-32 px-4 bg-sand-50/60 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-champagne-300/60 shadow-sm text-xs font-serif uppercase tracking-editorial text-champagne-700">
            <Clock className="w-3.5 h-3.5 text-champagne-500" />
            <span>The Sacred Moment Awaits</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-medium text-editorial tracking-tight">
            Counting Down to Forever
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-editorial-muted max-w-lg mx-auto">
            Sunday, 15th November 2026 • 8:00 AM (IST) • Madurai
          </p>

          <FloralDivider variant="lotus" className="my-6" />
        </motion.div>

        {/* Wedding Day Reached Special Message */}
        {mounted && timeLeft.isWeddingDay ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-white border border-champagne-300 shadow-luxury max-w-xl mx-auto space-y-4"
          >
            <Sparkles className="w-10 h-10 text-champagne-500 mx-auto animate-pulse" />
            <h3 className="font-heading text-3xl sm:text-4xl text-editorial font-medium">
              Today, We Begin Forever! ✨
            </h3>
            <p className="font-serif text-editorial-muted text-base">
              The wedding celebration has commenced. Thank you for gracing us with your sacred presence and blessings!
            </p>
          </motion.div>
        ) : (
          /* Live Countdown Cards */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {timeUnits.map((unit, idx) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="card-editorial rounded-3xl p-6 sm:p-8 text-center relative group overflow-hidden"
              >
                {/* Subtle gold top border highlight */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-champagne-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Number Display with smooth animation */}
                <span className="block font-heading text-4xl sm:text-6xl md:text-7xl font-normal text-editorial tracking-tight">
                  {mounted ? String(unit.value).padStart(2, "0") : "--"}
                </span>

                {/* Main Label */}
                <span className="block text-xs sm:text-sm font-serif uppercase tracking-editorial text-champagne-600 font-semibold mt-2">
                  {unit.label}
                </span>

                {/* Subtitle */}
                <span className="block text-[11px] font-serif text-editorial-light italic mt-1">
                  {unit.sub}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
