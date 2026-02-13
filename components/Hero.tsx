"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AmbienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Master Timeline: Pins the section and coordinates video + text
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=400%", // Provides 4 "screens" worth of scroll distance
        pin: true,
        scrub: 1, // Smoothly links scroll to progress
      },
    });

    // Ensure video metadata is loaded before calculating duration
    const handleLoadedMetadata = () => {
      const duration = video.duration || 3;

      // 1. Initial Title: Fades out as you start scrolling
      tl.to(".main-title", { opacity: 0, y: -50, duration: 1 })
        .to(video, { currentTime: duration * 0.2, duration: 1 }, "<");

      // 2. Curtain Control: Fades in/out during the first light transition
      tl.fromTo(".curtain-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .to(video, { currentTime: duration * 0.4, duration: 1 }, "<")
        .to(".curtain-text", { opacity: 0, y: -30, duration: 1, delay: 0.5 });

      // 3. Lighting Control: Appears as the room gets darker
      tl.fromTo(".lighting-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .to(video, { currentTime: duration * 0.7, duration: 1 }, "<")
        .to(".lighting-text", { opacity: 0, y: -30, duration: 1, delay: 0.5 });

      // 4. Final Scene: Climate & Media appear with the floating icons
      tl.fromTo([".climate-text", ".media-text"], 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, stagger: 0.2, duration: 1 }
      )
      .to(video, { currentTime: duration, duration: 1 }, "<")
      .fromTo(".floating-tooltips", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, "<");
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    // Fallback if metadata is already loaded
    if (video.readyState >= 1) handleLoadedMetadata();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black overflow-hidden">
      {/* Background Video Layer */}
      <div className="h-screen w-full relative">
        <video
          ref={videoRef}
          src="/sectiontwo-video.mp4" // Ensure this is in your /public folder
          playsInline
          muted
          preload="auto"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Sequential Text Layers */}
      <div ref={textGroupRef} className="absolute inset-0 z-10 flex items-center justify-center text-white pointer-events-none px-6">
        
        {/* Step 0: Initial Header */}
        <div className="main-title absolute text-center">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-white/50">A Home That Perceives</p>
          <h2 className="text-6xl md:text-8xl font-light tracking-tight">Ambience control</h2>
        </div>

        {/* Step 1: Curtain Control */}
        <div className="curtain-text absolute left-10 bottom-32 md:left-24 max-w-sm opacity-0">
          <h3 className="text-4xl font-light mb-4">Curtain control</h3>
          <p className="text-lg text-white/50 leading-relaxed font-light">
            Integrate blinds into your scenes and experience the magic of ambience unfold.
          </p>
        </div>

        {/* Step 2: Lighting Control */}
        <div className="lighting-text absolute left-10 bottom-32 md:left-24 max-w-sm opacity-0">
          <h3 className="text-4xl font-light mb-4">Lighting control</h3>
          <p className="text-lg text-white/50 leading-relaxed font-light">
            When smart tech makes your light design, transform your space with a single tap.
          </p>
        </div>

        {/* Step 3: Combined Climate & Media */}
        <div className="absolute bottom-24 w-full max-w-7xl px-10 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="climate-text opacity-0">
            <h3 className="text-3xl font-light mb-3">Climate control</h3>
            <p className="text-white/40 font-light">Assign the right temperature for every mood to elevate your living experience.</p>
          </div>
          <div className="media-text opacity-0">
            <h3 className="text-3xl font-light mb-3">Media control</h3>
            <p className="text-white/40 font-light">Enhance the potential of your scene by integrating music and media.</p>
          </div>
        </div>

        {/* Floating Interactive Elements (23° and Music) */}
        <div className="floating-tooltips absolute inset-0 opacity-0">
          {/* Temperature Tooltip */}
          <div className="absolute top-[38%] left-[42%] flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm font-light">23°C</span>
          </div>
          {/* Music Tooltip */}
          <div className="absolute top-[62%] right-[28%] flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
            <span className="text-sm font-light">🎵 Music</span>
          </div>
        </div>
      </div>
    </section>
  );
}