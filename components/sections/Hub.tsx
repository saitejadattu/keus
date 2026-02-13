"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hub() {
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
      id="hub"
      className="min-h-screen bg-gradient-to-b from-slate-900/20 via-black to-black flex items-center justify-center px-6 py-20"
    >
      <div ref={contentRef} className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8">Central Hub</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          The brain of your smart home. Our central hub connects all devices and ensures seamless communication.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-lg p-12 hover:border-blue-500/50 transition">
          <img 
            src="/assets/hub.jpg" 
            alt="Hub" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}