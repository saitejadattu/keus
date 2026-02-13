"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Lighting() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lighting"
      className="min-h-screen bg-gradient-to-b from-black to-slate-900/20 flex items-center justify-center px-6 py-20"
    >
      <div ref={contentRef} className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">Smart Lighting</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Create the perfect ambiance with our advanced smart lighting system. Control color, brightness, and scenes effortlessly.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-lg p-12 hover:border-blue-500/50 transition">
          <img 
            src="/assets/lighting.jpg" 
            alt="Lighting" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}