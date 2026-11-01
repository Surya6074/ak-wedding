"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
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
    const handleOpenInvite = () => {
      setHasStarted(true);
      setIsPlaying(true);
    };

    window.addEventListener("wedding:open-invitation", handleOpenInvite);

    return () => {
      window.removeEventListener("wedding:open-invitation", handleOpenInvite);
      stopSynthDrone();
    };
  }, []);

  return (
    <>
      {/* Invisible YouTube Audio Stream (No popup, completely hidden in background) */}
      <div
        aria-hidden="true"
        className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden select-none -z-50"
      >
        {hasStarted && (
          <iframe
            ref={iframeRef}
            title="Background Wedding Music"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&enablejsapi=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&modestbranding=1&rel=0&playsinline=1`}
            allow="autoplay; encrypted-media"
            className="w-1 h-1 border-0"
          />
        )}
      </div>

      {/* Floating Audio Control Pill Only (No popup window) */}
      <div className="fixed bottom-6 right-6 z-40">
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
      </div>
    </>
  );
}
