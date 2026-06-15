'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function LivingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLCanvasElement>(null); // Floating Dust Particles (Canvas)
  const layer3Ref = useRef<HTMLDivElement>(null); // Filmmaker Silhouette Image

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ----------------------------------------------------
    // LAYER 2: Canvas Particle System
    // ----------------------------------------------------
    const canvas = layer2Ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    interface DustParticle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
    }

    const particleCount = 4;
    const particles: DustParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.3 + 0.1,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        alpha: Math.random() * 0.02 + 0.005,
        baseAlpha: Math.random() * 0.02 + 0.005,
        pulseSpeed: Math.random() * 0.0005 + 0.0002,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animateParticles = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      particles.forEach((p) => {
        p.x += p.vx + mouseX * 0.05;
        p.y += p.vy + mouseY * 0.05;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        p.alpha = p.baseAlpha + Math.sin(Date.now() * p.pulseSpeed) * 0.008;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        grad.addColorStop(0, `rgba(92, 107, 125, ${Math.max(0, p.alpha)})`);
        grad.addColorStop(1, 'rgba(92, 107, 125, 0)');
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // ----------------------------------------------------
    // GSAP Parallax Setup (using quickTo for high performance)
    // ----------------------------------------------------
    const l3X = gsap.quickTo(layer3Ref.current, 'x', { duration: 0.9, ease: 'power2.out' });
    const l3Y = gsap.quickTo(layer3Ref.current, 'y', { duration: 0.9, ease: 'power2.out' });

    const onMouseMoveParallax = (e: MouseEvent) => {
      if (!isVisible) return;
      const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

      l3X(xPercent * -5); // Silhouette moves slightly opposite
      l3Y(yPercent * -5);
    };
    window.addEventListener('mousemove', onMouseMoveParallax);

    // ----------------------------------------------------
    // Intersection Observer: Pause background loops when off-screen
    // ----------------------------------------------------
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        if (!animationFrameId) {
          animateParticles();
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      }
    }, { threshold: 0.01 });

    // ScrollTrigger to slide the canvas and image down slightly (yPercent: 4) and reduce opacity smoothly
    let rAFId = 0;
    let bgScrollTween: gsap.core.Tween | null = null;

    const initScrollTrigger = () => {
      if (!document.getElementById('works')) {
        rAFId = requestAnimationFrame(initScrollTrigger);
        return;
      }
      bgScrollTween = gsap.to(containerRef.current, {
        yPercent: 4,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '#works',
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        }
      });
    };

    initScrollTrigger();

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', onMouseMoveParallax);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (rAFId) {
        cancelAnimationFrame(rAFId);
      }
      clearTimeout(resizeTimeout);
      if (bgScrollTween) {
        bgScrollTween.scrollTrigger?.kill();
        bgScrollTween.kill();
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-gradient-to-br from-[#eef2f5] via-[#e2e7ec] to-[#d5dde3] pointer-events-none"
    >
      {/* Gentle top-left luminosity glow (Apple Keynote style highlight) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75)_0%,transparent_55%)] z-[1]" />

      {/* LAYER 6: Ambient Haze (Diffuse editorial layout backdrop - softer cold grey transition) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e2e7ec]/10 to-[#f5f6f8]/75 z-[1] bg-haze-layer" />

      {/* LAYER 2: Floating Dust Particles (HTML5 Canvas - dark specs - placed behind silhouette) */}
      <canvas
        ref={layer2Ref}
        className="absolute inset-0 w-full h-full z-[3] mix-blend-multiply pointer-events-none bg-atmosphere-layer"
      />

      {/* LAYER 3: Main Filmmaker Image (Full screen background with soft cinematic blend mask) */}
      <div
        ref={layer3Ref}
        className="absolute -inset-[15px] z-[2] will-change-transform bg-silhouette-layer"
        style={{
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 20%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 20%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)',
        }}
      >
        <Image
          src="/images/filmmaker_hero.png"
          alt="VERSEFLIM Filmmaker Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[88%_center] sm:object-[90%_center] lg:object-[92%_center] opacity-[0.3] mix-blend-multiply"
        />
      </div>

      {/* Subtle vignette on top of the environment */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(9,13,22,0.025)_100%)] z-[6] pointer-events-none" />

      {/* Bottom transition gradient to works section */}
      <div className="absolute bottom-0 left-0 right-0 h-[12vh] bg-gradient-to-t from-[#f5f6f8] to-transparent z-[9] pointer-events-none" />
    </div>
  );
}

export default React.memo(LivingBackground);
