"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmartConsole() {
  const sectionRef = useRef(null);
  const consoleRef = useRef(null);

  useEffect(() => {
    gsap.from(consoleRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, []);

  const buttons = [
    { label: "Bright", icon: "☀️" },
    { label: "Relax", icon: "🌙" },
    { label: "Night", icon: "🌑" },
    { label: "All Off", icon: "⚫" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black to-slate-900/20 flex items-center justify-center px-6 py-20"
    >
      <div ref={consoleRef} className="max-w-2xl w-full">
        <h2 className="text-6xl font-light text-center mb-8 text-white tracking-wider">
          The Smart Console
        </h2>
        <p className="text-center text-white/70 mb-16 font-light">
          Hardware-software interface for ultimate control
        </p>

        {/* Console UI */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {buttons.map((btn, i) => (
              <button
                key={i}
                className="group flex flex-col items-center justify-center py-8 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
              >
                <span className="text-4xl mb-3 group-hover:scale-125 transition-transform">
                  {btn.icon}
                </span>
                <span className="text-sm font-semibold uppercase tracking-widest text-white/80 group-hover:text-white">
                  {btn.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}