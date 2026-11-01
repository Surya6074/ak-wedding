"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { MapPin, Navigation, Copy, Check, Car, Compass } from "lucide-react";
import FloralDivider from "../ui/FloralDivider";

export default function LocationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${weddingData.venue.name}, ${weddingData.venue.address}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="location"
      className="relative py-28 sm:py-36 px-4 bg-sand-50/50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 mb-16"
        >
          <span className="font-serif uppercase tracking-editorial text-xs sm:text-sm text-champagne-600 font-semibold">
            Wedding Destination
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl font-normal text-editorial tracking-tight">
            The Marriage Venue
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-editorial-muted max-w-lg mx-auto">
            We look forward to welcoming you to the historic temple city of Madurai.
          </p>
          <FloralDivider variant="heart" className="my-6" />
        </motion.div>

        {/* Content & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Venue Details (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 card-editorial rounded-3xl p-8 sm:p-12 border border-champagne-300 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Map Pin Badge with pulsating ring */}
              <div className="relative inline-flex items-center justify-center">
                <span className="absolute w-12 h-12 rounded-full bg-champagne-300/40 animate-ping" />
                <div className="w-12 h-12 rounded-2xl bg-champagne-100 border border-champagne-300 text-champagne-700 flex items-center justify-center shadow-sm relative z-10">
                  <MapPin className="w-6 h-6 text-champagne-600 animate-bounce" />
                </div>
              </div>

              {/* Name & Full Address */}
              <div>
                <h3 className="font-heading text-3xl sm:text-4xl text-editorial font-medium">
                  {weddingData.venue.name}
                </h3>
                <p className="font-serif text-base text-editorial-muted mt-3 leading-relaxed">
                  {weddingData.venue.address}
                </p>
              </div>

              {/* Venue Features & Out-of-town guest notes */}
              <div className="space-y-3 pt-4 border-t border-champagne-200/60 font-serif text-xs text-editorial-muted">
                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                  <span>Ample dedicated car and two-wheeler parking available.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Compass className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                  <span>Conveniently accessible from Madurai Junction & Airport via Alagar Kovil Main Road.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-champagne-200/60 flex flex-col sm:flex-row gap-3">
              <a
                href={weddingData.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 rounded-full bg-editorial hover:bg-black text-white text-xs font-serif uppercase tracking-editorial text-center flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-champagne-300" />
                <span>Get Directions</span>
              </a>

              <button
                onClick={handleCopy}
                className="flex-1 py-3.5 px-5 rounded-full bg-white hover:bg-champagne-50 text-editorial border border-champagne-300 text-xs font-serif uppercase tracking-editorial text-center flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-champagne-600" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Embedded Google Map (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 card-editorial rounded-3xl p-3 border border-champagne-300 shadow-luxury overflow-hidden flex flex-col"
          >
            <div className="w-full h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden relative border border-champagne-200">
              <iframe
                title="Aaryan Thirumana Mahal Map Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  weddingData.venue.name + " " + weddingData.venue.address
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
