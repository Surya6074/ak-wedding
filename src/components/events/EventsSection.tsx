"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingData, WeddingEvent } from "@/data/weddingData";
import { Calendar, Clock, MapPin, Download, Sparkles, ExternalLink } from "lucide-react";
import FloralDivider from "../ui/FloralDivider";

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const card1Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [-15, 25]);

  const downloadIcs = (event: WeddingEvent) => {
    const { calendarData } = event;
    const icsString = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Aravindh Karthiga Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${calendarData.title}`,
      `DESCRIPTION:${calendarData.description}`,
      `LOCATION:${calendarData.location}`,
      `DTSTART:${calendarData.startTimeUTC}`,
      `DTEND:${calendarData.endTimeUTC}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", calendarData.icsFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGoogleCalendarUrl = (event: WeddingEvent) => {
    const { calendarData } = event;
    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const text = encodeURIComponent(calendarData.title);
    const dates = `${calendarData.startTimeUTC}/${calendarData.endTimeUTC}`;
    const details = encodeURIComponent(calendarData.description);
    const location = encodeURIComponent(calendarData.location);
    return `${baseUrl}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-28 sm:py-36 px-4 bg-sand-50/50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 mb-16 sm:mb-20"
        >
          <span className="font-serif uppercase tracking-editorial text-xs sm:text-sm text-champagne-600 font-semibold">
            Wedding Festivities
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl font-normal text-editorial tracking-tight">
            The Celebration Itinerary
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-editorial-muted max-w-lg mx-auto">
            We cordially invite you to join us across two unforgettable ceremonies.
          </p>
          <FloralDivider variant="diamond" className="my-6" />
        </motion.div>

        {/* 2 Event Cards with Individual Parallax Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {weddingData.events.map((event, idx) => {
            const isEngagement = event.id === "engagement";

            return (
              <motion.div
                key={event.id}
                style={{ y: isEngagement ? card1Y : card2Y }}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className={`card-editorial rounded-3xl p-8 sm:p-12 border ${
                  isEngagement ? "border-champagne-300" : "border-rosewood-200"
                } flex flex-col justify-between relative group overflow-hidden`}
              >
                {/* Background ambient corner flare */}
                <div
                  className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-40 transition-opacity group-hover:opacity-70 ${
                    isEngagement ? "bg-champagne-200" : "bg-rosewood-200"
                  }`}
                />

                <div className="space-y-6 relative z-10">
                  {/* Event Visual Identity Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-sm transition-transform group-hover:scale-105 ${
                        isEngagement
                          ? "bg-champagne-100/80 border-champagne-300 text-champagne-700"
                          : "bg-rosewood-100/80 border-rosewood-300 text-rosewood-700"
                      }`}
                    >
                      {isEngagement ? (
                        <Sparkles className="w-8 h-8 text-champagne-600 animate-pulse" />
                      ) : (
                        <div className="text-2xl font-serif text-rosewood-700">🪔</div>
                      )}
                    </div>

                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-editorial font-semibold border ${
                        isEngagement
                          ? "bg-champagne-50 border-champagne-300 text-champagne-700"
                          : "bg-rosewood-50 border-rosewood-300 text-rosewood-700"
                      }`}
                    >
                      {event.title}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-heading text-3xl sm:text-4xl text-editorial font-medium">
                      {event.title} Ceremony
                    </h3>
                    {event.subTitle && (
                      <p className="font-serif italic text-sm text-editorial-muted mt-1">
                        "{event.subTitle}"
                      </p>
                    )}
                  </div>

                  {/* Date & Time Badges */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-sm font-serif text-editorial font-medium">
                      <Calendar className="w-4 h-4 text-champagne-600 shrink-0" />
                      <span>{event.dateFormatted}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm font-serif text-editorial font-medium">
                      <Clock className="w-4 h-4 text-champagne-600 shrink-0" />
                      <span className="font-semibold text-champagne-800">
                        {event.timeFormatted}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 text-xs font-serif text-editorial-muted leading-relaxed">
                      <MapPin className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                      <span>
                        {event.venueName}, {event.venueAddress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Calendar Actions */}
                <div className="pt-8 mt-6 border-t border-champagne-200/60 flex flex-col sm:flex-row gap-3 relative z-10">
                  <a
                    href={getGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full bg-editorial hover:bg-black text-white text-xs font-serif uppercase tracking-editorial text-center flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Google Calendar</span>
                    <ExternalLink className="w-3.5 h-3.5 text-champagne-300" />
                  </a>

                  <button
                    onClick={() => downloadIcs(event)}
                    className="py-3 px-4 rounded-full bg-white hover:bg-sand-100 text-editorial border border-champagne-300 text-xs font-serif uppercase tracking-editorial flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-champagne-600" />
                    <span>iCal / Outlook</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
