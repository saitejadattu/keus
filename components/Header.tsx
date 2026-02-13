"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        y: isVisible ? 0 : -150,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [isVisible]);

  const navLinks = [
    { name: "Smart App", href: "#smart-app" },
    { name: "Interfaces", href: "#interfaces" },
    { name: "Hub", href: "#hub" },
    { name: "Lighting", href: "#lighting" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Downloads", href: "#downloads" },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed w-full top-0 z-[100] bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-lg border-b border-white/5 shadow-2xl"
    >
      <nav className="w-full px-6 lg:px-12 py-5">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto relative">
          
          {/* Logo - Left */}
          <Link 
            href="/" 
            className="text-xl font-bold tracking-widest text-white hover:text-blue-400 transition duration-300 flex-shrink-0"
          >
            KEUS
          </Link>

          {/* Desktop Menu - Center */}
          <ul className="hidden lg:flex gap-6 xl:gap-10 items-center absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-[13px] uppercase tracking-wider font-medium text-white/70 hover:text-white transition duration-300 relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Phone - Right */}
          <div className="hidden lg:flex items-center gap-3 text-white/90 hover:text-blue-400 transition duration-300 flex-shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm font-semibold tracking-wide">+91 93929 05179</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white text-2xl p-2"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/98 border-t border-white/10 h-screen overflow-y-auto py-10 px-8">
          <ul className="space-y-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className="text-lg font-light tracking-widest text-white/80 hover:text-blue-400 transition uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-10 border-t border-white/10">
              <div className="flex items-center gap-4 text-white/80">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-lg">+91 93929 05179</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}