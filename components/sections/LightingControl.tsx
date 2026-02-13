"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LightingControl() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Image parallax
    gsap.to(imageRef.current, {
      y: -80,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Content fade in
    gsap.from(contentRef.current?.querySelectorAll(".fade-in"), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background */}
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/hero/lighting.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-4xl px-6 text-center">
        <h2 className="fade-in text-6xl md:text-7xl font-light text-white tracking-wider mb-6">
          Smart Lighting Design
        </h2>
        <p className="fade-in text-xl text-white/70 font-light max-w-2xl mx-auto">
          Create the perfect ambiance with intuitive color, brightness, and scene controls. Transform spaces with a single gesture.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {["Color Control", "Scene Management", "Automation"].map((feature, i) => (
            <div
              key={i}
              className="fade-in bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:border-blue-500/50 transition"
            >
              <h3 className="text-lg font-semibold mb-2">{feature}</h3>
              <p className="text-sm text-white/60">Premium control at your fingertips</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}