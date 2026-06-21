"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  
  const [label, setLabel] = useState("");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = 
        window.matchMedia("(max-width: 768px)").matches || 
        window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobile);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useGSAP(() => {
    if (isMobile) return;

    gsap.set(cursorRef.current, { opacity: 1 });

    // Quick setters for smooth follow lag
    const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.4, ease: "power3.out" });
    const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power2.out" });
    const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xToRing(e.clientX);
      yToRing(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Event delegation for hover elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor], a, button, [role='button']");

      if (interactiveEl) {
        const cursorType = interactiveEl.getAttribute("data-cursor");
        
        if (cursorType) {
          setLabel(cursorType.toUpperCase());
          // Morph cursor to hold label
          gsap.to(ringRef.current, {
            width: 76,
            height: 76,
            borderColor: "var(--color-accent-creative)",
            backgroundColor: "rgba(245, 158, 11, 0.08)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dotRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
          });
          gsap.to(labelRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.3,
          });
        } else {
          // Standard link/button hover - grow ring, turn dot dual-accent
          setLabel("");
          gsap.to(ringRef.current, {
            width: 44,
            height: 44,
            borderColor: "var(--color-accent-systems)",
            backgroundColor: "transparent",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dotRef.current, {
            scale: 1.5,
            backgroundColor: "var(--color-accent-creative)",
            duration: 0.2,
          });
          gsap.to(labelRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
          });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("[data-cursor], a, button, [role='button']");

      if (interactiveEl) {
        setLabel("");
        // Reset cursor to default
        gsap.to(ringRef.current, {
          width: 24,
          height: 24,
          borderColor: "rgba(148, 163, 184, 0.4)",
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dotRef.current, {
          scale: 1,
          backgroundColor: "var(--color-accent-creative)",
          opacity: 1,
          duration: 0.2,
        });
        gsap.to(labelRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
        });
      }
    };

    const onMouseMoveMagnetic = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magEl = target.closest("[data-cursor-magnetic]") as HTMLElement;
      
      if (magEl) {
        const bounds = magEl.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        gsap.to(magEl, {
          x: deltaX * 0.35,
          y: deltaY * 0.35,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const onMouseLeaveMagnetic = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magEl = target.closest("[data-cursor-magnetic]") as HTMLElement;
      
      if (magEl) {
        gsap.to(magEl, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousemove", onMouseMoveMagnetic);
    window.addEventListener("mouseout", onMouseLeaveMagnetic);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousemove", onMouseMoveMagnetic);
      window.removeEventListener("mouseout", onMouseLeaveMagnetic);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed inset-0 z-[250] opacity-0 mix-blend-difference"
    >
      {/* Outer Pointer Circle (Reticle Ring) */}
      <div
        ref={ringRef}
        className="absolute -left-3 -top-3 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-400/40 bg-transparent transition-colors duration-200"
        style={{ willChange: "transform, width, height, border-color, background-color" }}
      >
        {/* Hover Text Label inside Reticle */}
        <div
          ref={labelRef}
          className="scale-0 font-mono text-[9px] font-semibold tracking-wider text-background opacity-0"
          style={{ color: "var(--background)", willChange: "transform, opacity" }}
        >
          {label}
        </div>
      </div>

      {/* Center Target Dot */}
      <div
        ref={dotRef}
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-creative"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
