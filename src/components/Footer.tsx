'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo('#contact');
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    const bgImage = bgImageRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // 1. Subtle parallax on the mountain background
      if (bgImage) {
        gsap.fromTo(
          bgImage,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: footer,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 2. Entrance animation when entering the viewport
      const elementsToAnimate = footer.querySelectorAll('.footer-animate-item');
      if (elementsToAnimate.length > 0) {
        gsap.fromTo(
          elementsToAnimate,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footer);

    return () => {
      ctx.revert();
    };
  }, []);

  const linkStyle =
    "group relative inline-block text-white/60 hover:text-white transition-all duration-300 ease-out hover:translate-x-[3px] font-poppins text-xs md:text-sm font-light w-fit pb-1";
  const underlineStyle =
    "absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-full";

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full min-h-[700px] lg:min-h-[850px] py-24 md:py-32 bg-black flex flex-col justify-between p-6 md:p-16 z-20 select-none overflow-hidden text-white antialiased"
    >
      {/* Background Artwork Layer */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform scale-110"
      >
        <Image
          src="/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png"
          alt="VERSEFILM Mountain Footer"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 grayscale contrast-125"
        />
        {/* Darker gradient from bottom and subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.85)_100%)] z-[2]" />
        {/* Subtle cinematic grain overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_250_250%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noise%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.75%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noise)%22/%3E%3C/svg%3E')] z-[3]"
        />
      </div>

      {/* Grid Elements Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-grow flex flex-col justify-between gap-16 md:gap-24">
        
        {/* Top Area: Label and Statement */}
        <div className="footer-animate-item flex flex-col gap-4 text-left pt-4">
          <span className="font-poppins text-[10px] tracking-[0.25em] text-white/50 uppercase font-medium">
            VERSEFLIM STUDIO
          </span>
          <h2 className="font-syne text-[clamp(1.8rem,4.5vw,3.8rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white select-none">
            Every frame deserves intention.<br />
            Every story deserves emotion.
          </h2>
        </div>

        {/* Main Footer Layout (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full mt-8">
          
          {/* Column 1: Studio */}
          <div className="footer-animate-item flex flex-col gap-5 text-left">
            <span className="font-poppins text-[10px] tracking-[0.25em] text-white/50 uppercase font-medium">
              Studio
            </span>
            <div className="font-poppins text-[13px] md:text-sm leading-relaxed text-white/85 font-light space-y-4">
              <p className="whitespace-pre-line">Creative Product &{"\n"}Lifestyle Photographer</p>
              <p>Based in India</p>
              <p>Available Worldwide</p>
            </div>
          </div>

          {/* Column 2: Connect */}
          <div className="footer-animate-item flex flex-col gap-5 text-left">
            <span className="font-poppins text-[10px] tracking-[0.25em] text-white/50 uppercase font-medium">
              Connect
            </span>
            <div className="flex flex-col gap-3.5 items-start">
              <a
                href="https://www.instagram.com/versefilmss?utm_source=qr&igsh=MW52aDZ1NWJtMWVtOA=="
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyle}
              >
                Instagram
                <span className={underlineStyle} />
              </a>
              <a
                href="https://www.linkedin.com/in/r-a-v-i-kumar-09721335a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyle}
              >
                LinkedIn
                <span className={underlineStyle} />
              </a>
              <a
                href="https://www.behance.net/plladium"
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyle}
              >
                Behance
                <span className={underlineStyle} />
              </a>
              <a
                href="mailto:ravioffi6@gmail.com"
                className={linkStyle}
              >
                Email
                <span className={underlineStyle} />
              </a>
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="footer-animate-item flex flex-col gap-5 text-left">
            <span className="font-poppins text-[10px] tracking-[0.25em] text-white/50 uppercase font-medium">
              Services
            </span>
            <div className="font-poppins text-[13px] md:text-sm leading-relaxed text-white/85 font-light space-y-3.5">
              <p>Commercial Photography</p>
              <p>Lifestyle Photography</p>
              <p>Fitness Campaigns</p>
              <p>Creative Direction</p>
              <p>Post Production</p>
            </div>
          </div>

          {/* Column 4: Availability */}
          <div className="footer-animate-item flex flex-col gap-5 text-left items-start">
            <span className="font-poppins text-[10px] tracking-[0.25em] text-white/50 uppercase font-medium">
              Availability
            </span>
            <div className="flex flex-col gap-4 items-start w-full">
              <p className="font-poppins text-[13px] md:text-sm leading-relaxed text-white/85 font-light max-w-[280px]">
                Currently accepting selected collaborations for brands, agencies and creative campaigns.
              </p>
              <button
                onClick={handleScrollToContact}
                className="mt-2 px-5 py-2.5 border border-white/10 hover:border-white text-white font-poppins text-[10px] md:text-[11px] uppercase tracking-wider transition-all duration-300 ease-out hover:bg-white hover:text-black flex items-center gap-2 group cursor-pointer"
              >
                Start a Project
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Divider and Copyright Row */}
        <div className="footer-animate-item w-full flex flex-col gap-8 mt-auto">
          <div className="w-full h-[1px] bg-white/[0.08]" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] font-poppins text-white/40 uppercase font-medium w-full">
            <div>© 2026 VERSEFLIM</div>
            <div className="normal-case tracking-normal italic opacity-60">Crafted with intention.</div>
            <div>Designed & Developed by VERSEFLIM</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
