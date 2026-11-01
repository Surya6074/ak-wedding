"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: "blushPetal" | "jasmineFloret" | "goldDust";
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const isMobile = width < 768;
    const COUNT = isMobile ? 20 : 38;
    const particles: Particle[] = [];
    const types: Particle["type"][] = ["blushPetal", "jasmineFloret", "goldDust"];

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isMobile ? 6 : 10) + 4,
        speedY: Math.random() * 0.9 + 0.4,
        speedX: Math.sin(Math.random() * 2) * 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.5 + 0.3,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.7 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.type === "blushPetal") {
          // Romantic blush/rose petal
          ctx.fillStyle = "#DCB2B9";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.55, p.size, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "jasmineFloret") {
          // Delicate white jasmine floret
          ctx.fillStyle = "#FFFFFF";
          ctx.strokeStyle = "#F4ECDD";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          // Champagne gold shimmering speck
          ctx.fillStyle = "#C5A059";
          ctx.shadowColor = "#F5E9D3";
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
