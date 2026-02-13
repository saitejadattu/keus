"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AmbienceSection() {
  // Explicitly typing the refs to avoid 'null' errors during build
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    
    // Safety check for TypeScript: Build will fail if these are potentially null
    if (!video || !container) return;

    // Initialize the timeline
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: 1.2,
      },
    });

    const createAnimation = () => {
      // Ensure the timeline exists before adding animations
      if (!tlRef.current || !video) return;
      
      const duration = video.duration || 3;
      const tl = tlRef.current;
      
      tl.clear();

      // Stage 1: Initial Header
      tl.to(".main-title", { opacity: 0, y: -30, duration: 1 });

      // Stage 2: Curtain Control (Persistent Build)
      tl.fromTo(".item-curtain", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5 })
        .to(video, { currentTime: duration * 0.3, duration: 2 }, ">")
        
      // Stage 3: Lighting Control
        .fromTo(".item-lighting", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5 }, ">")
        .to(video, { currentTime: duration * 0.6, duration: 2 }, ">")
        
      // Stage 4: Climate Control
        .fromTo(".item-climate", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5 }, ">")
        .to(video, { currentTime: duration * 0.85, duration: 1 }, ">")
        
      // Stage 5: Media Control
        .fromTo(".item-media", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5 }, ">")
        .to(video, { currentTime: duration, duration: 1 }, "<")
        .fromTo(".floating-ui", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, ">");
    };

    if (video.readyState >= 1) {
      createAnimation();
    } else {
      video.addEventListener("loadedmetadata", createAnimation);
    }

    return () => {
      video.removeEventListener("loadedmetadata", createAnimation);
      if (tlRef.current) tlRef.current.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black overflow-hidden">
      <div className="h-screen w-full relative">
        <video
          ref={videoRef}
          src="/sectiontwo-video.mp4" 
          playsInline
          muted
          preload="auto"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 text-white pointer-events-none px-6">
        <div className="main-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <p className="text-[10px] uppercase tracking-[0.6em] mb-4 text-white/40 font-light">A Home That Perceives</p>
          <h2 className="text-6xl md:text-8xl font-extralight tracking-tight">Ambience control</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-7xl px-4 md:px-12">
          {/* Apply individual item classes used in the GSAP timeline above */}
          <div className="item-curtain opacity-0">
            <h3 className="text-2xl md:text-3xl font-extralight mb-3">Curtain control</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed">Integrate blinds into your scenes for magic to unfold.</p>
          </div>
          <div className="item-lighting opacity-0 border-l border-white/10 pl-6">
            <h3 className="text-2xl md:text-3xl font-extralight mb-3">Lighting control</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed">Transform your space with a single tap.</p>
          </div>
          <div className="item-climate opacity-0 border-l border-white/10 pl-6">
            <h3 className="text-2xl md:text-3xl font-extralight mb-3">Climate control</h3>
            <p className="text-sm text-white/40 font-light">The right temperature for every mood.</p>
          </div>
          <div className="item-media opacity-0 border-l border-white/10 pl-6">
            <h3 className="text-2xl md:text-3xl font-extralight mb-3">Media control</h3>
            <p className="text-sm text-white/40 font-light">Music and media integrated seamlessly.</p>
          </div>
        </div>

        <div className="floating-ui absolute inset-0 opacity-0">
          <div className="absolute top-[35%] left-[40%] flex items-center gap-3 bg-black/50 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-lg">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]" />
            <span className="text-[10px] tracking-widest uppercase font-light">23°C</span>
          </div>
        </div>
      </div>
    </section>
  );
}