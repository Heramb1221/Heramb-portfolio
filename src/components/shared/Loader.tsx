"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Loader() {
  const [visible, setVisible] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const outerCircleRef = useRef<SVGCircleElement>(null);
  const innerCircleRef = useRef<SVGCircleElement>(null);
  const lineVRef = useRef<SVGLineElement>(null);
  const lineHRef = useRef<SVGLineElement>(null);
  const starPathsRef = useRef<SVGGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const initialsRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    const elementsToDraw = [
      { ref: outerCircleRef, duration: 1.5, delay: 0.1 },
      { ref: innerCircleRef, duration: 1.2, delay: 0.3 },
      { ref: lineVRef, duration: 1.0, delay: 0.5 },
      { ref: lineHRef, duration: 1.0, delay: 0.5 },
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setVisible(false);
            window.dispatchEvent(new Event("portfolio-intro-complete"));
          }
        });
      }
    });

    elementsToDraw.forEach(({ ref }) => {
      const el = ref.current;
      if (el) {
        const length = el.getTotalLength();
        gsap.set(el, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1,
        });
      }
    });

    const starPaths = starPathsRef.current?.querySelectorAll("path");
    starPaths?.forEach((path) => {
      const p = path as SVGPathElement;
      const length = p.getTotalLength();
      gsap.set(p, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      });
    });

    const initialPaths = initialsRef.current?.querySelectorAll("path");
    initialPaths?.forEach((path) => {
      const p = path as SVGPathElement;
      const length = p.getTotalLength();
      gsap.set(p, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0,
      });
    });

    tl.to(outerCircleRef.current, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.out",
    }, 0);

    tl.to(innerCircleRef.current, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.out",
    }, 0.2);

    tl.to([lineVRef.current, lineHRef.current], {
      strokeDashoffset: 0,
      duration: 1.0,
      ease: "power1.inOut",
    }, 0.4);

    tl.fromTo([innerCircleRef.current, starPathsRef.current], 
      { rotation: -45, transformOrigin: "center" },
      { rotation: 0, transformOrigin: "center", duration: 2.0, ease: "power2.out" },
      0.2
    );

    if (starPaths) {
      tl.to(starPaths, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.08,
        ease: "power1.out",
      }, 0.6);
    }

    if (initialPaths) {
      tl.to(initialPaths, {
        strokeDashoffset: 0,
        opacity: 0.9,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
      }, 1.0);
    }

    tl.fromTo(textRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      1.2
    );

    tl.fromTo(coordsRef.current,
      { opacity: 0, y: 10 },
      { opacity: 0.5, y: 0, duration: 0.8, ease: "power2.out" },
      1.4
    );

    tl.to({}, { duration: 0.6 });

  }, { scope: containerRef });

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#09090b] text-[#f1f5f9] select-none"
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center">
        {/* Navigator's Compass SVG */}
        <svg
          width="220"
          height="220"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-accent-creative dark:text-accent-creative"
        >
          {/* Compass outer dial */}
          <circle
            ref={outerCircleRef}
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0"
          />

          {/* Compass inner graduated scale */}
          <circle
            ref={innerCircleRef}
            cx="100"
            cy="100"
            r="82"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0"
          />

          {/* Navigational Crosshair axes */}
          <line
            ref={lineVRef}
            x1="100"
            y1="5"
            x2="100"
            y2="195"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0"
          />
          <line
            ref={lineHRef}
            x1="5"
            y1="100"
            x2="195"
            y2="100"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0"
          />

          {/* Star points (Star of the Compass) */}
          <g ref={starPathsRef}>
            {/* North Point */}
            <path d="M 100,100 L 100,45 L 94,80 Z" fill="currentColor" opacity="0.15" />
            <path d="M 100,100 L 100,45 L 106,80 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
            
            {/* South Point */}
            <path d="M 100,100 L 100,155 L 106,120 Z" fill="currentColor" opacity="0.15" />
            <path d="M 100,100 L 100,155 L 94,120 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />

            {/* East Point */}
            <path d="M 100,100 L 155,100 L 120,94 Z" fill="currentColor" opacity="0.15" />
            <path d="M 100,100 L 155,100 L 120,106 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />

            {/* West Point */}
            <path d="M 100,100 L 45,100 L 80,106 Z" fill="currentColor" opacity="0.15" />
            <path d="M 100,100 L 45,100 L 80,94 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />

            {/* Intermediate Points */}
            <path d="M 100,100 L 135,65 L 112,85 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M 100,100 L 65,135 L 88,115 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M 100,100 L 135,135 L 115,112 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M 100,100 L 65,65 L 85,88 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </g>

          {/* Central initials: H and C drawn via elegant vector lines */}
          <g ref={initialsRef} className="text-accent-systems dark:text-accent-systems">
            {/* Letter H */}
            <path d="M 85,90 L 85,110" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 95,90 L 95,110" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 85,100 L 95,100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

            {/* Letter C */}
            <path d="M 115,92 C 107,92 105,96 105,100 C 105,104 107,108 115,108" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>

        {/* Text Details underneath */}
        <div className="mt-8 text-center">
          <div
            ref={textRef}
            className="font-heading text-lg font-medium tracking-[0.25em] text-foreground"
          >
            HERAMB CHAUDHARI
          </div>
          <div
            ref={coordsRef}
            className="mt-2 font-mono text-xs tracking-[0.3em] text-muted-foreground"
          >
            21.3524° N · 74.8812° E
          </div>
        </div>
      </div>
    </div>
  );
}
