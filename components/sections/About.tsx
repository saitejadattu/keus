"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
      id="about"
      className="min-h-screen bg-gradient-to-b from-slate-900/20 to-black flex items-center justify-center px-6 py-20"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center">About KEUS</h2>
        <div className="space-y-6 text-lg text-gray-300">
          <p>
            KEUS is a premium smart home automation company founded with a vision to simplify modern living through intelligent technology.
          </p>
          <p>
            Our mission is to create beautiful, intuitive smart home solutions that blend seamlessly into distinctive spaces, allowing homeowners to experience next-generation comfort and control.
          </p>
          <p>
            With cutting-edge technology and elegant design, KEUS brings the future of living into your home today.
          </p>
        </div>
      </div>
    </section>
  );
}