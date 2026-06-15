'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SoundToggle from './SoundToggle';

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 140 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.32);
    y.set(distanceY * 0.32);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function Navbar({ isHidden }: { isHidden?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const [isContactInView, setIsContactInView] = useState(false);
  const lastScrollY = useRef(0);
  const [isEntranceDone, setIsEntranceDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntranceDone(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Immediately show navbar when leaving contact section
          setIsScrollHidden(false);
        }
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    );

    observer.observe(contactSection);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Disable normal scroll-direction logic while Contact section is active
      if (isContactInView) return;

      // Only apply scroll-direction hide/show logic on mobile/tablet viewports (< 1024px)
      if (window.innerWidth >= 1024 || isMenuOpen) {
        setIsScrollHidden(false);
        return;
      }

      const currentScrollY = window.scrollY;

      // Prevent triggering at extreme top bounds (bounces)
      if (currentScrollY <= 15) {
        setIsScrollHidden(false);
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN -> Hide navbar
        setIsScrollHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP -> Display navbar
        setIsScrollHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Isolate body scroll when mobile menu is active
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isMenuOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Auto-close menu if screen resizing reaches desktop breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileLinkClick = (id: string) => {
    setIsMenuOpen(false);
    // Short timeout allows menu fade transition to start before scrolling triggers
    setTimeout(() => {
      handleScrollTo(id);
    }, 350);
  };

  const finalHidden = isHidden || isScrollHidden || isContactInView;

  // Hamburger lines motion variants
  const line1Variants = {
    closed: { rotate: 0, y: -4 },
    opened: { rotate: 45, y: 0 },
  };
  const line2Variants = {
    closed: { opacity: 1, scale: 1 },
    opened: { opacity: 0, scale: 0 },
  };
  const line3Variants = {
    closed: { rotate: 0, y: 4 },
    opened: { rotate: -45, y: 0 },
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20, scale: 0.96 }}
        animate={{
          opacity: finalHidden && !isMenuOpen ? 0 : 1,
          y: finalHidden && !isMenuOpen ? -20 : 0,
          scale: finalHidden && !isMenuOpen ? 0.96 : 1,
        }}
        transition={{
          duration: isEntranceDone ? 0.3 : 0.8,
          delay: isEntranceDone ? 0 : 1.1,
          ease: isEntranceDone ? [0.22, 1, 0.36, 1] : 'easeOut',
        }}
        className="fixed top-0 lg:top-6 left-0 right-0 z-40 px-6 lg:px-12 py-4 lg:py-0 bg-[#f5f6f8]/85 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-black/[0.03] lg:border-none shadow-[0_8px_32px_rgba(28,36,45,0.012)] lg:shadow-none flex justify-between items-center pointer-events-auto lg:pointer-events-none"
      >
        {/* Brand Logo */}
        <div className={`transition-all duration-500 ${finalHidden && !isMenuOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}>
          <MagneticButton>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-syne text-[11px] font-extrabold tracking-[0.25em] text-[#1c242d] uppercase lg:cursor-none w-full text-left bg-transparent border-none p-0 outline-none cursor-none"
              data-cursor="Home"
            >
              VERSEFLIM
            </button>
          </MagneticButton>
        </div>

        {/* Floating Center Dock (Desktop Only - >= 1024px) */}
        <div className={`hidden lg:flex gap-9 items-center bg-black/[0.03] border border-black/[0.04] px-7 py-2.5 rounded-full backdrop-blur-md transition-all duration-500 ${finalHidden ? 'pointer-events-none' : 'pointer-events-auto'}`}>
          <MagneticButton>
            <button
              onClick={() => handleScrollTo('about')}
              className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] hover:tracking-[0.24em] text-[#5c6b7d] hover:text-[#1c242d] transition-all duration-500 ease-out lg:cursor-none px-2.5 py-1.5"
              data-cursor="Studio"
            >
              About
            </button>
          </MagneticButton>
          <MagneticButton>
            <button
              onClick={() => handleScrollTo('works')}
              className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] hover:tracking-[0.24em] text-[#5c6b7d] hover:text-[#1c242d] transition-all duration-500 ease-out lg:cursor-none px-2.5 py-1.5"
              data-cursor="Works"
            >
              Works
            </button>
          </MagneticButton>
          <MagneticButton>
            <button
              onClick={() => handleScrollTo('contact')}
              className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] hover:tracking-[0.24em] text-[#5c6b7d] hover:text-[#1c242d] transition-all duration-500 ease-out lg:cursor-none px-2.5 py-1.5"
              data-cursor="Say Hi"
            >
              Contact
            </button>
          </MagneticButton>
        </div>

          {/* Right Dock: Sound Controller & Hamburger Trigger */}
          <div className={`flex items-center gap-3.5 transition-all duration-500 ${finalHidden && !isMenuOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            <MagneticButton>
              <SoundToggle />
            </MagneticButton>

            {/* Premium Hamburger Menu Button (Displays on mobile/tablet screens < 1024px) */}
            <div className="lg:hidden">
              <MagneticButton>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center border border-black/10 bg-black/[0.03] hover:bg-black/[0.06] hover:border-black/20 backdrop-blur-md text-[#1c242d] rounded-full p-2.5 transition-all outline-none lg:cursor-none active:scale-[0.95]"
                  data-cursor={isMenuOpen ? "Close" : "Menu"}
                >
                  <div className="w-4 h-4 flex flex-col justify-center items-center relative">
                    <motion.span
                      variants={line1Variants}
                      animate={isMenuOpen ? 'opened' : 'closed'}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="absolute w-4 h-[1.5px] bg-[#1c242d]"
                    />
                    <motion.span
                      variants={line2Variants}
                      animate={isMenuOpen ? 'opened' : 'closed'}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="absolute w-4 h-[1.5px] bg-[#1c242d]"
                    />
                    <motion.span
                      variants={line3Variants}
                      animate={isMenuOpen ? 'opened' : 'closed'}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="absolute w-4 h-[1.5px] bg-[#1c242d]"
                    />
                  </div>
                </button>
              </MagneticButton>
            </div>
          </div>
      </motion.nav>

      {/* Fullscreen Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-[100dvh] bg-[#f5f6f8]/98 backdrop-blur-xl z-30 flex flex-col justify-between p-8 pt-28 text-[#1c242d] lg:hidden pointer-events-auto"
          >
            {/* Navigation Section */}
            <div className="flex flex-col items-start gap-8 mt-6">
              <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-[#1c242d]/45 uppercase">
                INDEX SYSTEM
              </span>
              
              <div className="flex flex-col gap-6 w-full">
                {[
                  { label: 'About', id: 'about', num: '01' },
                  { label: 'Works', id: 'works', num: '02' },
                  { label: 'Contact', id: 'contact', num: '03' },
                ].map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.45, ease: 'easeOut' }}
                  >
                    <button
                      onClick={() => handleMobileLinkClick(item.id)}
                      className="font-syne text-4xl font-extrabold uppercase tracking-tight text-[#1c242d] hover:text-[#5c6b7d] flex items-baseline gap-4 cursor-none w-full text-left bg-transparent border-none p-0 outline-none"
                    >
                      <span className="font-mono text-xs text-[#1c242d]/35 font-semibold tracking-widest">{item.num}</span>
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Credit & Contacts Footer */}
            <div className="flex flex-col gap-6 border-t border-black/[0.06] pt-8 mt-auto text-[8px] tracking-[0.2em] uppercase font-bold text-[#5c6b7d]">
              <div className="grid grid-cols-2 gap-6 w-full">
                <div>
                  <span className="text-[#1c242d]/35 block mb-1.5 font-semibold">Email</span>
                  <a href="mailto:studio@verseflim.com" className="font-extrabold text-[#1c242d] cursor-none block">
                    studio@verseflim.com
                  </a>
                </div>
                <div>
                  <span className="text-[#1c242d]/35 block mb-1.5 font-semibold">Location</span>
                  <span className="text-[#1c242d] block font-extrabold">
                    Geneva Operating Worldwide
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
