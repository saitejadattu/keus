"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmartApp() {
  // 1. Define types for the refs so TypeScript knows they aren't 'never'
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. Use gsap.context() for better cleanup and scoping
    let ctx = gsap.context(() => {
      
      // We can now safely select '.app-feature' because it's scoped to contentRef
      gsap.from(".app-feature", {
        opacity: 0,
        x: -50,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          // scrub: true, // Uncomment if you want it to follow scroll progress
        },
      });

    }, contentRef); // <--- This scopes all GSAP selectors to this specific element

    return () => ctx.revert(); // 3. Cleanup on unmount
  }, []);

  const features = [
    { label: "Dimming Sliders", desc: "Intuitive light adjustment" },
    { label: "Scene Automation", desc: "Preset routines and schedules" },
    { label: "Motion Sensors", desc: "Intelligent automation" },
    { label: "Real-time Feedback", desc: "Live device status" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center px-6 py-20 text-white"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto w-full">
        <h2 className="text-6xl font-light text-center mb-8 tracking-wider">
          Smart App Interface
        </h2>
        <p className="text-center text-white/70 mb-16 font-light">
          Mobile-first control for your entire ecosystem
        </p>

        {/* Features Container */}
        <div className="space-y-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="app-feature bg-white/5 border border-white/10 rounded-lg p-6 hover:border-blue-500/50 transition flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg mb-1">{feature.label}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </div>
              <div className="text-3xl">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}