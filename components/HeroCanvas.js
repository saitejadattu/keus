"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas() {
  // Removed <HTMLCanvasElement> and <HTMLDivElement> types
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const images = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const totalFrames = 10; 

    const preloadImages = async () => {
      const framePromises = [];

      for (let i = 0; i <= totalFrames; i++) {
        const promise = new Promise((resolve) => {
          const img = new Image();
          const frameNum = String(i).padStart(3, "0");
          img.src = `/assets/hero/frame_${frameNum}.jpg`; 
          
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.error(`Failed to load frame: ${img.src}`);
            resolve(new Image()); 
          };
        });
        framePromises.push(promise);
      }

      const loadedImages = await Promise.all(framePromises);
      images.current = loadedImages.filter(img => img.naturalWidth > 0);
      setIsLoaded(true);
      renderFrame(0);
    };

    const renderFrame = (index) => {
      const img = images.current[Math.floor(index)];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (images.current.length > 0) renderFrame(0);
    };

    preloadImages();
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const scrollObj = { frame: 0 };
    const animation = gsap.to(scrollObj, {
      frame: totalFrames,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", 
        pin: true,     
        scrub: 0.5,    
        onUpdate: () => renderFrame(scrollObj.frame),
      },
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      animation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-screen z-0" />
      <div className="relative z-10 h-screen flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-8xl font-light text-white mb-6 tracking-tight leading-tight">
            Smart is the <br /> <span className="font-medium italic">new home</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base uppercase tracking-[0.5em] mb-8 font-light">
            Premium smarthome systems
          </p>
          <div className="h-[1px] w-16 bg-white/30 mx-auto mb-8" />
          <p className="text-white/40 max-w-md mx-auto leading-relaxed font-light text-sm md:text-base">
            A home is a gorgeous story waiting to unfold. Every inch of it has an ability to express an experience.
          </p>
        </div>
      </div>
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
          <p className="tracking-[0.2em] text-xs font-light">PRELOADING ASSETS</p>
        </div>
      )}
    </div>
  );
}