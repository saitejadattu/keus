"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
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
      id="contact"
      className="min-h-screen bg-black flex items-center justify-center px-6 py-20"
    >
      <div ref={contentRef} className="max-w-2xl w-full">
        <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">Get in Touch</h2>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 focus:border-blue-500/50 outline-none transition"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 focus:border-blue-500/50 outline-none transition"
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 focus:border-blue-500/50 outline-none transition resize-none"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-lg transition font-semibold text-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}