"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intelligence() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    // Animate title
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    // Animate SVG lines
    linesRef.current.forEach((line, i) => {
      gsap.from(line, {
        strokeDashoffset: 1000,
        opacity: 0,
        duration: 1.5,
        delay: i * 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-slate-900/10 to-black flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-5xl w-full">
        <h2
          ref={titleRef}
          className="text-6xl font-light text-center mb-20 text-white tracking-wider"
        >
          Intelligence at Every Level
        </h2>

        {/* SVG Path Animation */}
        <svg
          viewBox="0 0 1000 600"
          className="w-full mb-16"
          style={{ height: "400px" }}
        >
          {/* Connecting lines */}
          <path
            ref={(el) => el && linesRef.current.push(el)}
            d="M 100 300 Q 250 200, 400 300"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="1000"
          />
          <path
            ref={(el) => el && linesRef.current.push(el)}
            d="M 400 300 Q 550 100, 700 300"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="1000"
          />
          <path
            ref={(el) => el && linesRef.current.push(el)}
            d="M 700 300 Q 850 400, 900 300"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="1000"
          />

          {/* Gradient */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>

          {/* Nodes */}
          {[
            { cx: 100, cy: 300, label: "Sensors" },
            { cx: 400, cy: 300, label: "Hub" },
            { cx: 700, cy: 300, label: "Devices" },
            { cx: 900, cy: 300, label: "Automation" },
          ].map((node, i) => (
            <g key={i}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r="30"
                fill="white/10"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <text
                x={node.cx}
                y={node.cy + 60}
                textAnchor="middle"
                fill="white"
                fontSize="16"
                fontWeight="500"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {[
            "AI-Powered Learning",
            "Predictive Automation",
            "Energy Optimization",
            "Security Integration",
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-blue-500/50 transition"
            >
              <h3 className="font-semibold text-lg mb-2">{feature}</h3>
              <p className="text-white/60">Advanced IoT Intelligence</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}