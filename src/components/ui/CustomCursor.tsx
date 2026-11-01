"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only activate for precision pointer devices (desktop mouse, never mobile/touch)
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    // Respect reduced-motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setIsEnabled(true);

    const ring = { x: -100, y: -100 };
    let isHovering = false;
    let isPressed = false;
    let isVisible = false;
    let isOverIframe = false;

    const updateRingStyle = () => {
      const el = ringRef.current;
      if (!el) return;

      if (!isVisible || isOverIframe) {
        el.style.opacity = "0";
        return;
      }

      el.style.opacity = "1";

      if (isPressed) {
        el.style.width = "22px";
        el.style.height = "22px";
        el.style.borderColor = "rgba(197, 160, 89, 0.9)";
        el.style.backgroundColor = "rgba(197, 160, 89, 0.25)";
        el.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(0.85)`;
      } else if (isHovering) {
        el.style.width = "48px";
        el.style.height = "48px";
        el.style.borderColor = "rgba(197, 160, 89, 0.75)";
        el.style.backgroundColor = "rgba(197, 160, 89, 0.12)";
        el.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(1.05)`;
      } else {
        el.style.width = "28px";
        el.style.height = "28px";
        el.style.borderColor = "rgba(197, 160, 89, 0.45)";
        el.style.backgroundColor = "transparent";
        el.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(1)`;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      ring.x = e.clientX;
      ring.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
      }
      isOverIframe = false;

      // Snappy direct tracking so cursor NEVER feels laggy
      updateRingStyle();
    };

    const onMouseDown = () => {
      isPressed = true;
      updateRingStyle();
    };

    const onMouseUp = () => {
      isPressed = false;
      updateRingStyle();
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If hovering over an iframe (such as Google Maps or YouTube), hide the custom cursor
      // so it never freezes at the iframe border!
      if (target.tagName === "IFRAME" || target.closest("iframe")) {
        isOverIframe = true;
        updateRingStyle();
        return;
      } else {
        isOverIframe = false;
      }

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button";

      if (Boolean(isInteractive) !== isHovering) {
        isHovering = Boolean(isInteractive);
        updateRingStyle();
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      updateRingStyle();
    };

    const onMouseEnter = () => {
      isVisible = true;
      updateRingStyle();
    };

    const onWindowBlur = () => {
      // Hide cursor if focus leaves the window (e.g. user clicked inside an iframe)
      isVisible = false;
      updateRingStyle();
    };

    const onWindowFocus = () => {
      isVisible = true;
      updateRingStyle();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("focus", onWindowFocus);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("focus", onWindowFocus);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-champagne-400/50 opacity-0 transition-[width,height,background-color,border-color,opacity,transform] duration-150 ease-out will-change-transform"
      style={{
        width: "28px",
        height: "28px",
        transform: "translate3d(-100px, -100px, 0)",
      }}
    />
  );
}
