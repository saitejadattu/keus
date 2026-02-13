"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntelligentSpaces() {
  const sectionRef = useRef(null);
  const [isLit, setIsLit] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          // Sync background frame swap with the scroll progress
          setIsLit(self.progress > 0.4 && self.progress < 0.85);
        }
      },
    });

    // STEP 1: Full Page Introduction
    tl.fromTo(".intel-intro", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.5 }
    )
    .to(".intel-intro", { opacity: 0, y: -20, duration: 1, delay: 1 })

    // STEP 2: Unified Response & Mobile Entrance
    // Text and Mobile enter as a single vertical column
    .fromTo(".response-container", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5 })
    .fromTo(".set-time-clock-hand", { rotation: 0 }, { rotation: 360, duration: 3, ease: "none" }, "<")

    // STEP 3: Final Intelligence Transition
    .to(".response-container", { opacity: 0, y: -50, duration: 1, delay: 1 })
    .fromTo(".intelligence-final", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden text-white font-light">
      
      {/* Background Frame Transition */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/intelligent/frame_001.jpg" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLit ? 'opacity-0' : 'opacity-40'}`}
          alt="Exterior Dusk"
        />
        <img 
          src="/assets/intelligent/frame_002.jpg" 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLit ? 'opacity-40' : 'opacity-0'}`}
          alt="Exterior Lit"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center px-6 md:px-24">
        
        {/* Step 1: Centered Intro */}
        <div className="intel-intro absolute text-center max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.8em] mb-6 text-white/30 font-light">A Home That Senses</p>
          <h2 className="text-6xl md:text-9xl font-extralight tracking-tighter mb-8 leading-none">Intelligent spaces</h2>
          <p className="text-lg md:text-xl text-white/30 font-light">
            experience the sheer convenience of smart living through automated routines and sensory intelligence
          </p>
        </div>

        {/* Step 2: Response & Mobile View (Unified Column) */}
        <div className="response-container absolute left-6 md:left-24 bottom-0 flex flex-col items-start gap-8 opacity-0">
          {/* Response Text above Mobile */}
          <div className="max-w-md">
            <h3 className="text-5xl md:text-7xl font-extralight mb-4 lowercase tracking-tight">response</h3>
            <p className="text-white/40 mb-6 font-light leading-relaxed text-sm md:text-base">
              smart routines that understand your daily needs and takes care of them for you
            </p>
          </div>

          {/* Mobile UI Mockup */}
          <div className="w-[260px] md:w-[320px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
            <img src="/assets/intelligent/mobile_frame_003.png" alt="Schedule UI" className="w-full h-auto" />
          </div>
        </div>

        {/* The Minimalist SVG Clock - Positioned Center-Right */}
        <div className="response-container absolute right-[15%] md:right-[25%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 opacity-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            {/* Outer Ring */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" />
            </svg>
            {/* Rotating Hand */}
            <div className="set-time-clock-hand absolute inset-0 flex items-center justify-center">
              <div className="h-1/2 w-[1px] bg-white origin-bottom -translate-y-1/2 opacity-80" />
            </div>
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2">set time</span>
        </div>

        {/* Step 3: Final Intelligence Text */}
        <div className="intelligence-final absolute text-center max-w-2xl opacity-0">
          <h3 className="text-5xl md:text-7xl font-extralight mb-6 lowercase tracking-tight">intelligence</h3>
          <p className="text-white/40 font-light text-lg">
            smart sense intuitively equips your home with convenience and security
          </p>
        </div>

      </div>
    </section>
  );
}