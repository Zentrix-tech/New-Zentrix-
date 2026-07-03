"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState("");
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Track mouse coordinates
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    // Smooth spring interpolation for the outer ring
    const animateRing = () => {
      const ease = 0.15; // Spring intensity
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y });
      requestRef.current = requestAnimationFrame(animateRing);
    };

    // Event handlers for interactive hovers
    const onMouseEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      ring.classList.add("hover");
      gsap.to(dot, { scale: 0, duration: 0.15 });

      // Check for custom cursor text (e.g. data-cursor-text="VIEW")
      const text = target.getAttribute("data-cursor-text") || "";
      setCursorText(text);
    };

    const onMouseLeaveInteractive = () => {
      ring.classList.remove("hover");
      gsap.to(dot, { scale: 1, duration: 0.2 });
      setCursorText("");
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "back.out(2)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Magnetic pull setup
    const handleMagneticElements = () => {
      const magneticElements = document.querySelectorAll("[data-magnetic]");
      magneticElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const bound = htmlEl.getBoundingClientRect();
        const centerX = bound.left + bound.width / 2;
        const centerY = bound.top + bound.height / 2;

        const onMouseMoveMagnetic = (e: MouseEvent) => {
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;

          // Pull intensity
          gsap.to(htmlEl, {
            x: distanceX * 0.35,
            y: distanceY * 0.35,
            duration: 0.3,
            ease: "power2.out",
          });

          // Attract cursor dot slightly towards center
          mousePos.current = {
            x: centerX + distanceX * 0.5,
            y: centerY + distanceY * 0.5,
          };
        };

        const onMouseLeaveMagnetic = () => {
          gsap.to(htmlEl, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        };

        htmlEl.addEventListener("mousemove", onMouseMoveMagnetic);
        htmlEl.addEventListener("mouseleave", onMouseLeaveMagnetic);
      });
    };

    // Attach hover animations to links and interactive elements
    const updateInteractiveElements = () => {
      const interactives = document.querySelectorAll(
        "a, button, [data-cursor='hover'], input, textarea, select, label"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    updateInteractiveElements();
    handleMagneticElements();
    requestRef.current = requestAnimationFrame(animateRing);

    // Re-scan dynamically loaded DOM nodes periodically
    const interval = setInterval(() => {
      updateInteractiveElements();
      handleMagneticElements();
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(requestRef.current);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9997,
          transform: "translate(-50%, -50%)",
        }}
      >
        <span ref={labelRef} className="cursor-label">
          {cursorText}
        </span>
      </div>
    </>
  );
}
