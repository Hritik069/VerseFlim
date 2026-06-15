'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LivingBackground from './LivingBackground';

interface HeroProps {
  active: boolean;
}

export default function Hero({ active }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const titleLine3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const ctx = gsap.context(() => {
      const titleL1 = titleLine1Ref.current;
      const titleL2 = titleLine2Ref.current;
      const titleL3 = titleLine3Ref.current;
      
      // Reset positions prior to entry timeline for all coordinated elements
      gsap.set('.bg-haze-layer', { opacity: 0 });
      gsap.set('.bg-atmosphere-layer', { opacity: 0 });
      gsap.set('.bg-silhouette-layer', { opacity: 0, x: 28 });
      gsap.set([titleL1, titleL2, titleL3], { yPercent: 105 });
      gsap.set([subtitleRef.current, paraRef.current, ctaRef.current, scrollIndicatorRef.current], { opacity: 0, y: 15 });

      const tl = gsap.timeline({ delay: 0.05 });

      // 1. Background Haze
      tl.to('.bg-haze-layer', {
        opacity: 1,
        duration: 0.65,
        ease: 'power2.out',
      });
      tl.to('.bg-atmosphere-layer', {
        opacity: 1,
        duration: 0.75,
        ease: 'power2.out',
      }, '-=0.45');

      // 2. Owner Silhouette Rim separation
      tl.to('.bg-silhouette-layer', {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: 'power3.out',
      }, '-=0.65');

      // 3. Subtitle & Headline Reveal
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
      }, '-=0.65');
      tl.to([titleL1, titleL2, titleL3], {
        yPercent: 0,
        duration: 0.95,
        ease: 'power4.out',
        stagger: 0.1,
      }, '-=0.5');

      // 4. Description Fade
      tl.to(paraRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
      }, '-=0.45');

      // 5. Explore CTA Fade
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
      }, '-=0.45');

      // 6. Scroll indicator reveal
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0.85,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
        },
        '-=0.35'
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [active]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex flex-col justify-between p-6 md:p-14 overflow-hidden bg-[#f5f6f8]"
    >
      {/* 6-Layer Background System */}
      <LivingBackground />

      {/* Top Spacer */}
      <div className="h-16" />

      {/* Main Copy Dock (Left-aligned, large negative space to the right) */}
      <div className="relative z-10 w-full lg:max-w-[55vw] mt-auto mb-auto flex flex-col items-start text-[#1c242d] pl-0 md:pl-6">
        <div ref={subtitleRef} className="opacity-0">
          <span className="font-poppins text-[9px] font-bold tracking-[0.25em] text-[#1c242d]/50 uppercase">
            VERSEFLIM STUDIO — VOL. 01
          </span>
        </div>

        {/* Headline reveal inside overflow-hidden wrappers */}
        <h1 className="font-syne text-[clamp(1.6rem,7.4vw,7.5rem)] font-extrabold uppercase leading-[0.95] tracking-tighter mt-4 mb-8 select-none">
          <div className="overflow-hidden">
            <div ref={titleLine1Ref} className="will-change-transform text-[#1c242d]">
              DIRECTING
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={titleLine2Ref} className="will-change-transform text-[#1c242d]/90">
              THE
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={titleLine3Ref} className="will-change-transform text-[#1c242d]/80">
              UNSEEN.
            </div>
          </div>
        </h1>

        {/* Text descriptions overlayed on soft gradients of the background */}
        <div className="w-full max-w-[70vw] sm:max-w-[360px] md:max-w-[420px] md:pl-1.5">
          <p
            ref={paraRef}
            className="font-poppins text-[11px] md:text-[12px] font-normal text-[#090d16] leading-[1.7] tracking-wider mb-6 opacity-0"
          >
            A high-end cinematic laboratory crafting evocative visual narratives at the threshold of mist, slate, and cold light. Directing editorial campaigns and luxury portfolio releases globally.
          </p>
 
          {/* Button with magnetic pointer feedback custom cursor targets */}
          <div ref={ctaRef} className="opacity-0">
            <button
              onClick={() => {
                const element = document.getElementById('works');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-3.5 pb-1.5 lg:cursor-none text-[11px] tracking-[0.2em] hover:tracking-[0.23em] font-bold uppercase text-[#090d16] transition-all duration-500 ease-out relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#090d16] group-hover:after:w-full after:transition-all after:duration-500 after:ease-out"
              data-cursor="Discover"
            >
              Explore Showcase
              <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-500 ease-out">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 flex justify-between items-center opacity-0 mt-auto pt-4 text-[8px] tracking-[0.2em] font-semibold uppercase"
      >
        <span className="hidden md:block text-[#8e9cae] font-poppins">GENEVA — PARIS — REYKJAVIK</span>
        <div className="flex items-center gap-2 text-[#1c242d]/80 font-poppins">
          <span className="animate-[pulse_1.5s_infinite_alternate]">Scroll to explore</span>
          <span className="inline-block animate-[bounce_1.5s_infinite] font-light">↓</span>
        </div>
      </div>
    </section>
  );
}
