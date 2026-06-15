'use client';

import { useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const bgImage = bgImageRef.current;
    const footer = footerRef.current;
    const elements = elementsRef.current;
    if (!footer || !bgImage) return;

    const ctx = gsap.context(() => {
      // 1. Subtle parallax on the mountain background
      gsap.fromTo(
        bgImage,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // 2. Luxury fade on scroll for the elements container
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0.1, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 80%',
              end: 'top 35%',
              scrub: 0.8,
            },
          }
        );
      }
    }, footer);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full min-h-screen py-16 md:py-24 bg-[#0a0d14] border-t border-white/[0.03] flex flex-col justify-between p-6 md:p-16 z-20 select-none overflow-hidden text-[#e2e8f0] antialiased"
    >
      {/* Background Mountain Image Layer (with subtle parallax and bottom dark blending) */}
      <div ref={bgImageRef} className="absolute inset-0 z-0 pointer-events-none will-change-transform scale-105">
        <Image
          src="/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png"
          alt="VERSEFILM Mountain Footer"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-85"
        />
        {/* Soft cold blue-grey gradient overlays to unify color tone and contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,23,42,0.15)_0%,transparent_100%)] mix-blend-color-dodge" />
      </div>

      {/* Subtle dark overlay behind the content only */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.18))'
        }}
      />

      {/* Grid Elements Container */}
      <div ref={elementsRef} className="relative z-10 w-full max-w-7xl mx-auto flex-grow flex flex-col justify-between gap-16 md:gap-24">
        
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 w-full pt-4">
          
          {/* Left Micro Copy */}
          <div className="md:col-span-5 flex flex-col items-start gap-5">
            <span 
              className="font-mono text-[8px] tracking-[0.25em] text-[rgba(255,255,255,0.82)] uppercase"
              style={{ textShadow: '0 0 12px rgba(255,255,255,0.04)' }}
            >
              03 / STUDIO PROTOCOL
            </span>
            <div 
              className="flex flex-col gap-1.5 font-mono text-[9px] tracking-[0.18em] leading-relaxed text-[rgba(255,255,255,0.82)] uppercase"
              style={{ textShadow: '0 0 12px rgba(255,255,255,0.04)' }}
            >
              <p>VERSEFILM was born from visual storytelling,</p>
              <p>not as a trend,</p>
              <p>but as a pursuit of timeless cinema.</p>
            </div>
            <span 
              className="font-mono text-[8px] tracking-[0.25em] text-[rgba(255,255,255,0.82)] font-bold mt-2"
              style={{ textShadow: '0 0 12px rgba(255,255,255,0.04)' }}
            >
              [ STUDIO_PROTOCOL_01 ]
            </span>
          </div>

          {/* Center Micro Copy/Tags */}
          <div 
            className="md:col-span-3 flex flex-col items-start gap-4 font-mono text-[8px] tracking-[0.25em] text-[rgba(255,255,255,0.82)] font-bold"
            style={{ textShadow: '0 0 12px rgba(255,255,255,0.04)' }}
          >
            <span className="hover:text-white transition-colors duration-300 pointer-events-auto cursor-none" data-cursor="Lab">[ CINEMA_LAB ]</span>
            <span className="hover:text-white transition-colors duration-300 pointer-events-auto cursor-none" data-cursor="System">[ FRAME_SYSTEM ]</span>
            <span className="hover:text-white transition-colors duration-300 pointer-events-auto cursor-none" data-cursor="Archive">[ VISUAL_ARCHIVE_01 ]</span>
          </div>

          {/* Right Micro Copy */}
          <div 
            className="md:col-span-4 flex flex-col md:items-end gap-3 text-left md:text-right font-mono text-[9px] tracking-[0.2em] leading-relaxed text-[rgba(255,255,255,0.82)] uppercase"
            style={{ textShadow: '0 0 12px rgba(255,255,255,0.04)' }}
          >
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1">
              [ PHILOSOPHY ]
            </span>
            <p>FOR THOSE WHO</p>
            <p>SEE BEFORE</p>
            <p>THEY SHOOT.</p>
          </div>

        </div>

        {/* Bottom Hero & Barcode Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end w-full mt-auto">
          
          {/* Huge Statement */}
          <div className="md:col-span-8 flex flex-col items-start">
            <h2 className="font-syne text-[clamp(1.8rem,5.6vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-tighter text-white select-none">
              CRAFTED IN SILENCE<br />
              BUILT TO MOVE<br />
              DESIGNED TO LAST
            </h2>
          </div>

          {/* Back to Top & Copyright */}
          <div className="md:col-span-4 flex flex-col md:items-end gap-6">
            
            {/* Custom generated barcode */}
            <div className="flex items-stretch h-7 gap-[1.5px] opacity-40 hover:opacity-75 transition-opacity duration-500 ease-out" title="VERSEFILM CODE">
              <div className="w-[1px] bg-[#e2e8f0]" />
              <div className="w-[2px] bg-[#e2e8f0]" />
              <div className="w-[1px] bg-transparent" />
              <div className="w-[1px] bg-[#e2e8f0]" />
              <div className="w-[3px] bg-[#e2e8f0]" />
              <div className="w-[2px] bg-transparent" />
              <div className="w-[1px] bg-[#e2e8f0]" />
              <div className="w-[1px] bg-transparent" />
              <div className="w-[2px] bg-[#e2e8f0]" />
              <div className="w-[4px] bg-[#e2e8f0]" />
              <div className="w-[1px] bg-transparent" />
              <div className="w-[1px] bg-[#e2e8f0]" />
              <div className="w-[2px] bg-[#e2e8f0]" />
              <div className="w-[3px] bg-transparent" />
              <div className="w-[1px] bg-[#e2e8f0]" />
              <div className="w-[1px] bg-[#e2e8f0]" />
            </div>

            {/* Copyright & Action Button */}
            <div 
              className="flex flex-col md:items-end gap-4 font-mono text-[8px] tracking-[0.2em] font-semibold text-[rgba(255,255,255,0.82)] uppercase text-left md:text-right"
              style={{ textShadow: '0 0 12px rgba(255,255,255,0.04)' }}
            >
              <span>[ EDITORIAL_PROTOCOL ]</span>
              <div className="flex flex-col gap-1 font-bold">
                <span>© 2026 VERSEFILM</span>
                <span>ALL RIGHTS RESERVED</span>
              </div>
              
              {/* Back to Top */}
              <button
                onClick={handleScrollToTop}
                className="flex items-center gap-2 border border-white/10 hover:border-white/20 rounded-full px-4 py-1.5 transition-all duration-500 lg:cursor-none bg-white/[0.02] hover:bg-white/[0.06] group text-[#e2e8f0] pointer-events-auto"
                data-cursor="Top"
              >
                <span>Back to Top</span>
                <ArrowUp 
                  className="w-2.5 h-2.5 text-[rgba(255,255,255,0.82)] group-hover:text-white transform group-hover:-translate-y-0.5 transition-transform duration-500" 
                  style={{ textShadow: '0 0 12px rgba(255,255,255,0.04)' }}
                />
              </button>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
