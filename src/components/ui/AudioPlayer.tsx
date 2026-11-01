"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Maximize2, Minimize2, ExternalLink, Play, Pause } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gain: GainNode;
  } | null>(null);

  const YOUTUBE_VIDEO_ID = "OiADjLFGiF4";

  // Web Audio Harmonic Drone Fallback (in case user is offline or YouTube fails)
  const startSynthDrone = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (synthNodesRef.current) return;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);

      const freqs = [130.81, 196.0, 261.63, 392.0];
      const oscillators: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime((idx - 1.5) * 3, ctx.currentTime);
        oscGain.gain.setValueAtTime(0.18, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscillators.push(osc);
      });

      synthNodesRef.current = { oscillators, gain: masterGain };
    } catch {
      // AudioContext unavailable
    }
  };

  const stopSynthDrone = () => {
    if (synthNodesRef.current && audioCtxRef.current) {
      const { oscillators, gain } = synthNodesRef.current;
      const ctx = audioCtxRef.current;
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      setTimeout(() => {
        oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        synthNodesRef.current = null;
      }, 500);
    }
  };

  const sendYouTubeCommand = (func: string, args: string = "") => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: func,
            args: args,
          }),
          "*"
        );
      } catch {
        // Fallback
      }
    }
  };

  const handleTogglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
      setIsOpen(true);
      return;
    }

    if (isPlaying) {
      sendYouTubeCommand("pauseVideo");
      stopSynthDrone();
      setIsPlaying(false);
    } else {
      sendYouTubeCommand("playVideo");
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthDrone();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 max-w-[calc(100vw-3rem)]">
      {/* Video & Music Player Card (Single Persistent DOM Container) */}
      <div
        className={`w-72 sm:w-80 rounded-3xl bg-white/95 backdrop-blur-md border border-champagne-300 shadow-luxury overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto p-3.5 space-y-3"
            : "opacity-0 translate-y-4 pointer-events-none h-0 p-0 border-0 m-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-champagne-500 animate-ping" />
            <span className="text-xs font-serif font-semibold text-editorial flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-champagne-600" />
              <span>Wedding BGM Music</span>
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-editorial-muted hover:text-editorial p-1 rounded-md text-xs font-serif"
            aria-label="Minimize video player"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Embedded YouTube Video Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-champagne-200">
          {hasStarted ? (
            <iframe
              ref={iframeRef}
              title="Wedding BGM Audio"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&enablejsapi=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&modestbranding=1&rel=0&playsinline=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div
              onClick={handleTogglePlay}
              className="w-full h-full flex flex-col items-center justify-center bg-sand-100 text-editorial cursor-pointer group hover:bg-sand-200 transition-colors p-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-champagne-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-2">
                <Play className="w-5 h-5 ml-0.5 fill-white" />
              </div>
              <span className="text-xs font-serif font-medium text-editorial">
                Tap to Play Wedding Music
              </span>
              <span className="text-[10px] font-serif text-editorial-muted">
                YouTube Short • OiADjLFGiF4
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] font-serif text-editorial-muted px-1 pt-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-600" />
            <span>Shorts BGM</span>
          </span>
          <a
            href="https://youtube.com/shorts/OiADjLFGiF4?si=LlEDgoEGlu34fVYM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-champagne-600 hover:text-editorial flex items-center gap-1 font-semibold transition-colors"
          >
            <span>Open in YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Floating Pill Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause Wedding BGM" : "Play Wedding BGM"}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-editorial border border-champagne-300 shadow-luxury backdrop-blur-md transition-all duration-300 hover:shadow-goldGlow hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Animated sound equalizer bars */}
          <div className="flex items-end gap-[2px] h-3.5 w-3.5">
            <span
              className={`w-[2px] bg-champagne-600 rounded-full transition-all ${
                isPlaying ? "h-3.5 animate-pulse" : "h-1.5 opacity-40"
              }`}
            />
            <span
              className={`w-[2px] bg-champagne-600 rounded-full transition-all delay-75 ${
                isPlaying ? "h-2.5 animate-pulse" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-[2px] bg-champagne-600 rounded-full transition-all delay-150 ${
                isPlaying ? "h-3 animate-pulse" : "h-2 opacity-40"
              }`}
            />
          </div>

          <span className="text-xs font-serif tracking-wider text-editorial font-medium">
            {isPlaying ? "Music Playing" : "Play Wedding BGM"}
          </span>

          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-champagne-600 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-editorial-muted" />
          )}
        </button>

        {/* Toggle Expand Video Button */}
        <button
          onClick={() => {
            if (!hasStarted) setHasStarted(true);
            setIsOpen(!isOpen);
          }}
          title={isOpen ? "Minimize Video" : "View Music Player"}
          className="w-9 h-9 rounded-full bg-white/95 hover:bg-white border border-champagne-300 shadow-luxury flex items-center justify-center text-champagne-600 hover:text-editorial transition-transform hover:scale-110 cursor-pointer"
          aria-label="Toggle music video visibility"
        >
          {isOpen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
