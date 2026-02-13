"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LightingControl() {
  // 1. Explicitly type the ref to avoid the 'never' error
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 2. Add a null check to ensure the ref is attached before calling querySelectorAll
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll(".fade-in");

    if (elements.length > 0) {
      gsap.from(elements, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-black">
      <div ref={contentRef} className="max-w-7xl mx-auto px-6">
        <h2 className="fade-in text-5xl font-light text-white mb-10">
          Precision Lighting
        </h2>
        <div className="fade-in grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Your lighting cards here */}
        </div>
      </div>
    </section>
  );
}