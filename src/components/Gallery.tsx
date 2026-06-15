'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX } from 'lucide-react';

interface ProjectCardProps {
  p: any;
  index: number;
}

function ProjectCard({ p, index }: ProjectCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.muted = isMuted;
      video.play().catch((err) => {
        console.error("Playback failed: ", err);
      });
    } else {
      video.pause();
      // Smooth reset: set back to 0 without jarring transitions
      video.currentTime = 0;
    }
  }, [isHovered]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering navigation to project page
    setIsMuted((prev) => !prev);
  };

  const handleCardClick = () => {
    router.push(`/works/${p.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-5xl flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-14 group select-none cursor-pointer transition-all duration-700 ease-out"
    >
      {/* 16:9 Cinematic Video Slot */}
      <div
        className="w-full md:w-[58%] aspect-[16/9] bg-zinc-950 rounded-[20px] relative overflow-hidden transition-all duration-700 ease-out shadow-sm group-hover:shadow-2xl group-hover:scale-[1.01] group-hover:brightness-[1.03]"
        style={{
          boxShadow: '0 25px 55px -15px rgba(28, 36, 45, 0.08)',
        }}
      >
        {/* Poster Image */}
        <img
          src={p.poster}
          alt={p.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out z-0 rounded-[20px] ${isHovered ? 'opacity-0' : 'opacity-80'}`}
        />

        {/* Video Preview */}
        <video
          ref={videoRef}
          src={p.video}
          playsInline
          loop
          preload="metadata"
          muted={isMuted}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out z-0 rounded-[20px] ${isHovered ? 'opacity-80' : 'opacity-0'}`}
        />

        {/* Frosted Glass Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none z-10 rounded-[20px]" />

        {/* Viewfinder corner ticks */}
        <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/20 pointer-events-none group-hover:border-white/40 transition-colors duration-500" />
        <span className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/20 pointer-events-none group-hover:border-white/40 transition-colors duration-500" />
        <span className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/20 pointer-events-none group-hover:border-white/40 transition-colors duration-500" />
        <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/20 pointer-events-none group-hover:border-white/40 transition-colors duration-500" />

        {/* Elegant Sound Toggle Button */}
        {isHovered && (
          <button
            onClick={handleSoundToggle}
            className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white/80" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-white" />
            )}
          </button>
        )}

        {/* Slide number */}
        <span className="absolute top-5 left-5 font-syne text-[10px] font-bold text-white/40 tracking-[0.2em] z-10">
          0{index + 1}
        </span>

        {/* Aspect ratio */}
        <span className="absolute bottom-5 left-5 font-poppins text-[8px] text-white/30 tracking-[0.15em] border border-white/10 px-2 py-0.5 rounded z-10">
          {p.aspect}
        </span>
      </div>

      {/* Project Details */}
      <div className="w-full md:w-[42%] text-[#1c242d] flex flex-col items-start transition-transform duration-500 ease-out group-hover:translate-x-1">
        <span className="font-poppins text-[8px] tracking-[0.2em] text-[#6B7280] uppercase mb-2">
          {p.meta}
        </span>
        <h3 className="font-syne text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-3 text-[#1c242d]">
          {p.title}
        </h3>
        <p className="font-poppins text-[11px] md:text-[12px] font-light text-black leading-relaxed tracking-wider mb-5 whitespace-pre-line">
          {p.desc}
        </p>
        
        {/* Subtle Luxury Underlined CTA */}
        <div className="mt-2 relative">
          <span className="text-[9px] tracking-[0.25em] font-bold uppercase text-[#1c242d]/60 group-hover:text-[#1c242d] transition-colors duration-300 pb-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#1c242d] group-hover:after:w-full after:transition-all after:duration-500 after:ease-out">
            VIEW PROJECT →
          </span>
        </div>
      </div>
    </div>
  );
}

interface GalleryProps {
  activeProject?: any;
  setActiveProject?: (project: any) => void;
}

export default function Gallery({ activeProject, setActiveProject }: GalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'ASCEND PERFORMANCE',
      category: 'Fitness Campaign',
      meta: '2026 / FITNESS / COMMERCIAL',
      year: '2026',
      role: 'Director & Editor',
      desc: "A cinematic fitness campaign exploring discipline,\nmovement and relentless progression.\n\nStrength isn't announced.\nIt's earned through repetition.",
      aspect: '16:9',
      duration: '3m 45s',
      color: 'from-slate-200/40 via-[#eaeef3]/50 to-slate-300/40',
      slug: 'ascend-performance',
      video: 'https://res.cloudinary.com/dsvedhehi/video/upload/v1781445978/PITAMPURA_11_MARCH_3_rxmzep.mov',
      poster: '/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png',
    },
    {
      id: 2,
      title: 'THE FROZEN APEX',
      category: 'Documentary Short',
      meta: '2026 / DOCUMENTARY / SHORT',
      year: '2026',
      role: 'Director & DP',
      desc: 'Chronicles the journey of extreme alpine climbers in sub-zero conditions, capturing the psychological boundaries of height and isolation.',
      aspect: '2.39:1',
      duration: '12m 45s',
      color: 'from-slate-300/40 via-[#e2e7ec]/50 to-slate-400/40',
      slug: 'the-frozen-apex',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-thick-snow-covered-forest-42006-large.mp4',
      poster: '/images/verse_film_mountain.png',
    },
    {
      id: 3,
      title: 'CHRONICLES OF DUST',
      category: 'Narrative Short',
      meta: '2026 / NARRATIVE / SHORT',
      year: '2026',
      role: 'Director',
      desc: 'A minimal dystopian short depicting wind, gravel, and concrete structures as the final remnants of memory in an empty landscape.',
      aspect: '1.85:1',
      duration: '8m 30s',
      color: 'from-[#cbd5e1]/30 via-[#e2e8f0]/40 to-[#94a3b8]/30',
      slug: 'chronicles-of-dust',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-a-dry-desert-41617-large.mp4',
      poster: '/images/ChatGPT Image Jun 13, 2026, 07_16_04 PM.png',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          scrollContainerRef.current,
          { translateX: 0 },
          {
            translateX: '-300vw',
            ease: 'none',
            scrollTrigger: {
              trigger: triggerRef.current,
              pin: scrollContainerRef.current,
              scrub: 1,
              start: 'top top',
              end: () => `+=${(triggerRef.current?.offsetHeight ?? 0) - window.innerHeight}`,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Mobile/Tablet layout: animate cards fading in and sliding up as they scroll into view
      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray('.project-card-container');
        cards.forEach((card: any) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 45 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div id="works" ref={triggerRef} className="relative z-20">
      <div className="h-auto lg:h-[400vh] relative">
        <div
          ref={scrollContainerRef}
          className="w-full lg:w-[400vw] h-auto lg:h-screen flex flex-col lg:flex-row items-stretch lg:items-center overflow-visible lg:overflow-hidden bg-[#f5f6f8]"
          style={{ willChange: 'transform' }}
        >
          {/* Slide 1: Section Title */}
          <div className="w-full lg:w-screen h-auto lg:h-full flex flex-col justify-center px-6 md:px-14 lg:px-20 py-16 lg:py-0 text-[#1c242d] shrink-0">
            <span className="font-poppins text-[9px] font-bold tracking-[0.25em] text-[#6B7280] uppercase mb-3.5">
              01 / SHOWCASE
            </span>
            <h2 className="font-syne text-[clamp(1.5rem,6.5vw,3.2rem)] lg:text-[6.2vw] font-extrabold uppercase leading-none tracking-tighter max-w-2xl select-none">
              SELECTED<br />FILMOGRAPHY.
            </h2>
            <p className="font-poppins text-[11px] md:text-[12px] font-light text-black max-w-xs mt-6 leading-relaxed tracking-wider">
              A curated archive of narrative shorts, commercial campaigns, and installation projects directing the atmospheric boundaries of light and spatial depth.
            </p>
          </div>

          {/* Project Slides */}
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className="w-full lg:w-screen h-auto lg:h-full flex flex-col justify-center items-center px-6 md:px-14 lg:px-20 py-16 lg:py-0 shrink-0 project-card-container"
            >
              <ProjectCard p={p} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
