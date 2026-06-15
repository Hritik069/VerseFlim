'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { val: 0 };
    
    // GSAP Preload Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // High-end polygon clip-path wipe animation
        gsap.to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1.3,
          ease: 'power4.inOut',
          onStart: () => {
            onComplete();
          },
        });
      },
    });

    // Entrance fade for label and count
    tl.fromTo(
      [labelRef.current, countRef.current],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1 }
    );

    // Number counting duration
    tl.to(
      counter,
      {
        val: 100,
        duration: 2.6,
        ease: 'power2.out',
        onUpdate: () => {
          setCount(Math.floor(counter.val));
        },
      },
      '-=0.2'
    );

    // Smooth fade out of details before wipe
    tl.to(
      [countRef.current, labelRef.current, progressRef.current],
      {
        opacity: 0,
        y: -20,
        duration: 0.55,
        ease: 'power3.in',
      },
      '-=0.35'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-[100dvh] bg-[#f5f6f8] z-[99999] flex flex-col justify-between p-6 md:p-14 select-none"
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        willChange: 'clip-path',
      }}
    >
      {/* Editorial Top Details */}
      <div ref={labelRef} className="flex justify-between items-start opacity-0">
        <div>
          <h2 className="font-syne text-[11px] tracking-[0.25em] uppercase text-[#1c242d] font-extrabold">
            VERSEFLIM
          </h2>
          <p className="font-poppins text-[8px] tracking-[0.2em] text-text-muted uppercase mt-1.5">
            Cinematic Studio & Environmental Showcase
          </p>
        </div>
        <span className="font-mono text-[8px] tracking-[0.15em] text-text-muted uppercase">
          SYS_INIT_2026
        </span>
      </div>

      {/* Progress Bar */}
      <div ref={progressRef} className="w-full max-w-[320px] mx-auto h-[1px] bg-[#1c242d]/10 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#1c242d]/70 transition-all duration-75 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>

      {/* Count Tracker */}
      <div className="flex justify-between items-end">
        <span className="font-poppins text-[8px] tracking-[0.2em] text-text-muted uppercase mb-3.5 hidden md:block">
          Synchronizing Experience
        </span>
        <div
          ref={countRef}
          className="font-syne text-[clamp(2.5rem,7.5vw,7.5rem)] font-extrabold text-[#1c242d] leading-none tracking-tighter opacity-0 flex items-baseline select-none"
        >
          {count < 10 ? `0${count}` : count}
          <span className="font-sans text-lg font-light text-[#1c242d]/35 ml-1.5">%</span>
        </div>
      </div>
    </div>
  );
}
