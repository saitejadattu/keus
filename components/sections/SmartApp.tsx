"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmartApp() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from(contentRef.current?.querySelectorAll(".app-feature"), {
      opacity: 0,
      x: -50,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black flex items-center justify-center px-6 py-20"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto">
        <h2 className="text-6xl font-light text-center mb-8 text-white tracking-wider">
          Smart App Interface
        </h2>
        <p className="text-center text-white/70 mb-16 font-light">
          Mobile-first control for your entire ecosystem
        </p>

        {/* Features */}
        <div className="space-y-6">
          {[
            { label: "Dimming Sliders", desc: "Intuitive light adjustment" },
            { label: "Scene Automation", desc: "Preset routines and schedules" },
            { label: "Motion Sensors", desc: "Intelligent automation" },
            { label: "Real-time Feedback", desc: "Live device status" },
          ].map((feature, i) => (
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