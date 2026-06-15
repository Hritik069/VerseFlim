'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const pathname = usePathname();
  const isVisibleRef = useRef(false);

  // Reset custom cursor on route change / page transitions
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (cursor && dot) {
      setCursorText('');
      // Force reset cursor styling to default non-hover state and ensure it remains visible
      gsap.killTweensOf([cursor, dot]);
      gsap.to(cursor, {
        scale: 0.314,
        backgroundColor: 'transparent',
        borderColor: 'rgba(28, 36, 45, 0.35)',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
      });
      isVisibleRef.current = true;
    }
  }, [pathname]);

  useEffect(() => {
    // Only enable custom cursor on fine-pointer devices (desktops)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Set initial custom cursor position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100, scale: 0.314, opacity: 0 });
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100, opacity: 0 });
 
    // Use gsap.quickTo for high-performance trailing physics (avoids lag/jank)
    const xToCursor = gsap.quickTo(cursor, 'x', { duration: 0.22, ease: 'power3.out' });
    const yToCursor = gsap.quickTo(cursor, 'y', { duration: 0.22, ease: 'power3.out' });
 
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3.out' });
 
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        gsap.to([cursor, dot], { opacity: 1, duration: 0.2 });
        isVisibleRef.current = true;
      }
      xToCursor(e.clientX);
      yToCursor(e.clientY);
 
      xToDot(e.clientX);
      yToDot(e.clientY);
    };
 
    window.addEventListener('mousemove', handleMouseMove);
 
    // Hover detection for interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent is a link, button, or has custom data-cursor attribute
      const interactive = target.closest('a, button, [role="button"], [data-cursor]');
      if (interactive) {
        const text = interactive.getAttribute('data-cursor') || '';
        setCursorText(text);
 
        // Animate cursor expand (using soft dark slate transparent tones on GPU scale)
        gsap.to(cursor, {
          scale: text ? 1.0 : 0.643,
          backgroundColor: 'rgba(28, 36, 45, 0.05)',
          borderColor: 'rgba(28, 36, 45, 0.7)',
          duration: 0.25,
          ease: 'power2.out',
        });
        
        gsap.to(dot, {
          scale: 0,
          duration: 0.15,
        });
      } else {
        setCursorText('');
 
        // Animate cursor reset (using GPU scale)
        gsap.to(cursor, {
          scale: 0.314,
          backgroundColor: 'transparent',
          borderColor: 'rgba(28, 36, 45, 0.35)',
          duration: 0.25,
          ease: 'power2.out',
        });
 
        gsap.to(dot, {
          scale: 1,
          duration: 0.15,
        });
      }
    };
 
    window.addEventListener('mouseover', handleMouseOver);
 
    // Hide custom cursor when mouse leaves the window
    const handleMouseLeave = (e: MouseEvent) => {
      // Only hide if coordinates are truly outside the viewport bounds
      if (
        e.clientY <= 1 ||
        e.clientX <= 1 ||
        e.clientX >= window.innerWidth - 1 ||
        e.clientY >= window.innerHeight - 1
      ) {
        gsap.to([cursor, dot], { opacity: 0, duration: 0.2 });
        isVisibleRef.current = false;
      }
    };
 
    const handleMouseEnter = () => {
      gsap.to([cursor, dot], { opacity: 1, duration: 0.2 });
      isVisibleRef.current = true;
    };
 
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
 
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
 
  return (
    <>
      {/* Outer Ring Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full border border-[#1c242d]/35 flex items-center justify-center text-center font-sans text-[8px] tracking-[0.2em] uppercase text-[#1c242d] font-semibold z-[99999] opacity-0"
        style={{
          width: '70px',
          height: '70px',
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      >
        {cursorText && <span className="pl-[0.2em]">{cursorText}</span>}
      </div>
 
      {/* Inner Dot Cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#1c242d] rounded-full z-[99999] opacity-0"
        style={{
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
