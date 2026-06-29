'use client';

import { use, useEffect, useRef, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

// Database of projects with high-end editorial details
const projectsData: Record<string, any> = {
  'ascend-performance': {
    title: 'ASCEND PERFORMANCE',
    meta: '2026 / FITNESS / COMMERCIAL',
    year: '2026',
    client: 'Ascend Athletics',
    category: 'Fitness / Commercial Campaign',
    services: 'Cinematography / Direction / Editorial',
    duration: '3m 45s',
    aspect: '16:9',
    location: 'Reykjavik, Iceland',
    desc: "A cinematic fitness campaign exploring discipline, movement and relentless progression. Strength isn't announced. It's earned through repetition.",
    heroImage: '/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png',
    videoUrl: 'https://res.cloudinary.com/dsvedhehi/video/upload/v1781445978/PITAMPURA_11_MARCH_3_rxmzep.mov',
    frame1: '/images/ChatGPT Image Jun 13, 2026, 07_16_04 PM.png',
    frame2: '/images/verse_film_mountain.png',
    role: 'Director & Editor',
    overviewTitle: 'A pursuit of physical limit and visual weight.',
    overviewDesc1: 'Every shot in ASCEND PERFORMANCE was mapped around concrete geometry and natural atmosphere. The basalt pillars of the shoreline serve as a silent background to raw physical execution.',
    overviewDesc2: 'We wanted to capture strength not as an explosive act, but as a repetitive, meditative process. The cinematography relies on slow camera movements, long lenses, and heavy shadows to convey structural scale.',
    behindDesc: 'Filmed on location in Iceland over two weeks, utilizing ambient light and portable power systems to maintain environmental integrity.',
    videoGallery1: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-on-a-treadmill-40150-large.mp4',
    videoGallery2: 'https://assets.mixkit.co/videos/preview/mixkit-boxer-practicing-punches-in-a-dimly-lit-gym-42617-large.mp4',
    credits: {
      producer: 'Verseflim Studio',
      sound: 'Discipline Sound Lab',
      colorist: 'Alabaster Stone Lab'
    }
  },
  'elevate-apparel': {
    title: 'ELEVATE APPAREL',
    meta: '2026 / CLOTHING / EDITORIAL',
    year: '2026',
    client: 'Elevate Apparel',
    category: 'Fashion Campaign',
    services: 'Creative Direction / Photography / Editing',
    duration: '1m 24s',
    aspect: '16:9',
    location: 'Mumbai, India',
    desc: "A contemporary clothing campaign focused on movement, texture and modern silhouettes, blending editorial storytelling with commercial fashion imagery.",
    heroImage: 'https://res.cloudinary.com/dsvedhehi/image/upload/v1782749321/IMG_20240403_190046_278_a381nc.webp',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-silver-makeup-40409-large.mp4',
    role: 'Creative Direction / Photography / Editing',
  },
  'the-frozen-apex': {
    title: 'THE FROZEN APEX',
    meta: '2026 / DOCUMENTARY / SHORT',
    year: '2026',
    client: 'Apex Alpine Club',
    category: 'Documentary Short',
    services: 'Direction / Drone Cinematography / Sound Design',
    duration: '12m 45s',
    aspect: '2.39:1',
    location: 'Zermatt, Switzerland',
    desc: 'Chronicles the journey of extreme alpine climbers in sub-zero conditions, capturing the psychological boundaries of height and isolation.',
    heroImage: '/images/verse_film_mountain.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-thick-snow-covered-forest-42006-large.mp4',
    frame1: '/images/ChatGPT Image Jun 13, 2026, 07_16_04 PM.png',
    frame2: '/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png',
    role: 'Director & DP',
    overviewTitle: 'At the boundary of oxygen and height.',
    overviewDesc1: 'The Frozen Apex follows two mountaineers as they attempt a winter traverse of the north face of the Matterhorn in a lightweight Alpine style.',
    overviewDesc2: 'Every frame was captured using specialized sub-zero drone rigs and mirrorless setups, ensuring maximum durability under extreme physical strain.',
    behindDesc: 'A production crew of three followed the climbers up to 4000m, operating in temperatures down to -25°C to capture high-altitude alpine cinematography.',
    videoGallery1: 'https://assets.mixkit.co/videos/preview/mixkit-snow-falling-on-pine-trees-43229-large.mp4',
    videoGallery2: 'https://assets.mixkit.co/videos/preview/mixkit-man-climbing-a-snowy-mountain-41530-large.mp4',
    credits: {
      producer: 'Alpine Ventures',
      sound: 'Resonance Lab',
      colorist: 'Cold Tone Studio'
    }
  },
  'chronicles-of-dust': {
    title: 'CHRONICLES OF DUST',
    meta: '2026 / NARRATIVE / SHORT',
    year: '2026',
    client: 'Independent Release',
    category: 'Narrative Short',
    services: 'Screenplay / Direction / Soundscapes',
    duration: '8m 30s',
    aspect: '1.85:1',
    location: 'Mojave Desert, USA',
    desc: 'A minimal dystopian short depicting wind, gravel, and concrete structures as the final remnants of memory in an empty landscape.',
    heroImage: '/images/ChatGPT Image Jun 13, 2026, 07_16_04 PM.png',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-a-dry-desert-41617-large.mp4',
    frame1: '/images/verse_film_mountain.png',
    frame2: '/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png',
    role: 'Director',
    overviewTitle: 'Memory in an empty landscape.',
    overviewDesc1: 'Chronicles of Dust explores the relationship between concrete ruins and natural erosion in the post-industrial desert expanse.',
    overviewDesc2: 'Utilizing stark black-and-white visual ratios and high-frequency sound textures, the film creates a silent monologue of geological time.',
    behindDesc: 'Shot entirely on a high-resolution monochrome digital sensor over six days in the remote desert, utilizing solar power for equipment charging.',
    videoGallery1: 'https://assets.mixkit.co/videos/preview/mixkit-wind-blowing-dust-across-a-road-41618-large.mp4',
    videoGallery2: 'https://assets.mixkit.co/videos/preview/mixkit-dune-in-the-desert-with-strong-wind-41619-large.mp4',
    credits: {
      producer: 'Dust & Stone Films',
      sound: 'Atmosphere Sound Lab',
      colorist: 'Desert Hue Lab'
    }
  }
};

const slugsList = ['ascend-performance', 'elevate-apparel', 'the-frozen-apex', 'chronicles-of-dust'];

// Case study lazy video loaderr
function CaseStudyVideo({ src, poster }: { src: string; poster: string }) {
  const [loadVideo, setLoadVideo] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={videoRef}
      id="cinematic-video" 
      className="w-full h-[60vh] md:h-screen relative overflow-hidden bg-black flex items-center justify-center select-none"
    >
      {loadVideo ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 select-none pointer-events-none will-change-transform"
        />
      ) : (
        <img
          src={poster}
          alt="Video Poster"
          className="absolute inset-0 w-full h-full object-cover opacity-80 select-none pointer-events-none will-change-transform"
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_35%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Viewfinder ticks */}
      <span className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/20 pointer-events-none" />
      <span className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white/20 pointer-events-none" />
      <span className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white/20 pointer-events-none" />
      <span className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/20 pointer-events-none" />
    </div>
  );
}

// Gallery lazy video loader
function GalleryVideo({ src, poster, caption }: { src: string; poster: string; caption: string }) {
  const [loadVideo, setLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-start gap-4 w-full">
      <div className="w-full aspect-[16/9] bg-zinc-950 overflow-hidden relative rounded shadow-md select-none">
        {loadVideo ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-85 hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        ) : (
          <img
            src={poster}
            alt={caption}
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />
        )}
      </div>
      <span className="font-poppins text-[8px] font-bold tracking-[0.2em] uppercase text-[#6B7280]">
        {caption}
      </span>
    </div>
  );
}

// 6 Cloudinary fitness reels for the Gym Campaign
const gymReelsData = [
  {
    id: 1,
    title: "Vault Rohini — March 02",
    src: "https://res.cloudinary.com/dsvedhehi/video/upload/f_mp4,q_auto/v1781511239/Vault_rohini_2_MARCH_2_lkcz0a.mov",
  },
  {
    id: 2,
    title: "Vault Pitampura 01",
    src: "https://res.cloudinary.com/dsvedhehi/video/upload/f_mp4,q_auto/v1781511271/VAULT_PITAMPURA_1_soni14.mp4",
  },
  {
    id: 3,
    title: "Vault Rohini — March 24",
    src: "https://res.cloudinary.com/dsvedhehi/video/upload/f_mp4,q_auto/v1781511253/VAULT_ROHINI_24_MARCH_2_fohaij.mov",
  },
  {
    id: 4,
    title: "Vault Rohini 04",
    src: "https://res.cloudinary.com/dsvedhehi/video/upload/f_mp4,q_auto/v1781511268/VAULT_ROHINI_4_hhuwdq.mp4",
  },
  {
    id: 5,
    title: "Vault Rohini — May 22",
    src: "https://res.cloudinary.com/dsvedhehi/video/upload/f_mp4,q_auto/v1781511253/VAULT_ROHINI_22_MAY_1_1_z5agyx.mp4",
  },
  {
    id: 6,
    title: "Vault Dwarka Sec 7",
    src: "https://res.cloudinary.com/dsvedhehi/video/upload/f_mp4,q_auto/v1781511373/vault_dwarka_sec_7_CC_df0tnt.mov",
  },
];

// Helper to generate a dynamic poster URL from Cloudinary video sources
const getPosterUrl = (src: string) => {
  return src
    .replace(/\.(mov|mp4)$/i, '.jpg')
    .replace('/upload/f_mp4,q_auto/', '/upload/f_auto,q_auto/')
    .replace('/upload/', '/upload/so_0/');
};

// Luxury minimal portfolio grid card for Gym Reels
const GymReelCard = memo(function GymReelCard({
  reel,
  index,
  isHovered,
  isMuted,
  videoRef,
  onHoverChange,
  onMuteToggle,
}: {
  reel: typeof gymReelsData[0];
  index: number;
  isHovered: boolean;
  isMuted: boolean;
  videoRef: (el: HTMLVideoElement | null) => void;
  onHoverChange: (index: number | null) => void;
  onMuteToggle: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [duration, setDuration] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  // Sync ref to parent dynamically
  const setRefs = useCallback((node: HTMLVideoElement | null) => {
    localVideoRef.current = node;
    videoRef(node);
  }, [videoRef]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: '200px' }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Sync volume & mute properties when isMuted changes
  useEffect(() => {
    const video = localVideoRef.current;
    if (video) {
      video.muted = isMuted;
      video.defaultMuted = isMuted;
      video.volume = isMuted ? 0 : 1;
    }
  }, [isMuted]);

  useEffect(() => {
    const video = localVideoRef.current;
    if (!video || hasError) return;

    if (isHovered) {
      video.currentTime = 0;
      video.muted = isMuted;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video playing
          })
          .catch((err) => {
            console.warn("Playback failed or was interrupted:", err);
          });
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered, hasError]);

  const handleLoadedMetadata = () => {
    const video = localVideoRef.current;
    if (video && video.duration) {
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }
  };

  const handleVideoError = useCallback((e: any) => {
    console.warn(`Source codec is unsupported or video failed to load for: ${reel.title}. URL: ${reel.src}`, e);
    setHasError(true);
  }, [reel.title, reel.src]);

  const posterUrl = getPosterUrl(reel.src);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => onHoverChange(index)}
      onMouseLeave={() => onHoverChange(null)}
      className="relative w-full aspect-[9/16] bg-zinc-950 rounded-[16px] overflow-hidden select-none will-change-transform group flex items-center justify-center cursor-pointer"
      style={{
        transition: 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 300ms cubic-bezier(0.25, 1, 0.5, 1)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered 
          ? '0 12px 30px rgba(0, 0, 0, 0.15)' 
          : '0 4px 10px rgba(0, 0, 0, 0.05)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Lazy Loaded Video or Fallback Image */}
      {isIntersecting && !hasError ? (
        <video
          ref={setRefs}
          playsInline
          loop
          preload="metadata"
          muted={isMuted}
          controlsList="nodownload noplaybackrate nofullscreen"
          disablePictureInPicture
          poster={posterUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover rounded-[16px] pointer-events-none"
        >
          <source src={reel.src} onError={handleVideoError} />
        </video>
      ) : (
        <img
          src={posterUrl}
          alt={reel.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover rounded-[16px] pointer-events-none"
        />
      )}

      {/* Subtle Black Gradient Overlay from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10 rounded-[16px]" />

      {/* Minimal animated speaker icon in bottom-right corner */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMuteToggle();
        }}
        className="absolute bottom-4 right-4 z-20 w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all duration-300 ease-out lg:opacity-0 lg:translate-y-1 lg:pointer-events-none group-hover:lg:opacity-100 group-hover:lg:translate-y-0 group-hover:lg:pointer-events-auto active:scale-90"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {!isMuted ? (
          <Volume2 className="w-3.5 h-3.5 text-white transition-transform duration-300" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-white/70 transition-transform duration-300" />
        )}
      </button>

      {/* Title & Duration Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end pointer-events-none text-white select-none">
        <div className="flex flex-col gap-0.5 text-left">
          <span className="font-poppins text-[8px] font-bold tracking-[0.25em] text-white/50 uppercase">
            REEL 0{index + 1}
          </span>
          <h3 className="font-syne text-[10px] font-extrabold uppercase tracking-wide leading-none text-white/90">
            {reel.title}
          </h3>
        </div>
        {duration && (
          <span className="font-mono text-[9px] text-white/60 tracking-wider">
            {duration}
          </span>
        )}
      </div>
    </div>
  );
});

// Gym Reels Archive Page Main Render
function GymReelsArchive() {
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredReelIndex, setHoveredReelIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleHoverChange = useCallback((index: number | null) => {
    setHoveredReelIndex(index);
  }, []);

  const handleMuteToggle = useCallback(() => {
    setIsMuted((prevMute) => {
      const newMute = !prevMute;
      // Immediately update all currently mounted video elements
      videoRefs.current.forEach((video) => {
        if (video) {
          video.muted = newMute;
          video.defaultMuted = newMute;
          video.volume = newMute ? 0 : 1;
        }
      });
      return newMute;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen w-full bg-[#f5f6f8] flex flex-col justify-between select-none overflow-x-hidden"
    >
      {/* Minimal Header */}
      <header className="w-full max-w-[1280px] mx-auto px-8 md:px-24 lg:px-32 pt-8 pb-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-syne text-[11px] font-extrabold tracking-[0.25em] text-[#1c242d] uppercase hover:opacity-75 transition-opacity"
        >
          VERSEFILM
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center border border-black/10 hover:border-black/20 rounded-full p-2.5 transition-all bg-[#f5f6f8]/85 backdrop-blur-md group hover:bg-black/5"
        >
          <X className="w-4 h-4 text-black/55 group-hover:text-black transition-transform duration-300 group-hover:rotate-90" />
        </Link>
      </header>

      {/* Main Content Layout */}
      <main className="w-full flex-grow flex flex-col items-center">
        {/* Apple-level Centered Typography Section */}
        <section className="w-full max-w-4xl mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center justify-center">
          <h1 className="font-syne text-[clamp(2.2rem,6.5vw,4.8rem)] font-extrabold tracking-tighter uppercase leading-[0.92] text-[#1c242d] select-none">
            ASCEND<br />PERFORMANCE
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[10px] font-poppins font-bold tracking-[0.25em] text-[#6B7280] uppercase">
            <span>Fitness Campaign</span>
            <span className="hidden sm:inline text-black/15">•</span>
            <span>6 Reels</span>
            <span className="hidden sm:inline text-black/15">•</span>
            <span>2026</span>
          </div>
        </section>

        {/* 3-Columns Grid Layout */}
        <section className="w-full max-w-[1280px] mx-auto px-8 md:px-24 lg:px-32 pb-44">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {gymReelsData.map((reel, idx) => (
              <GymReelCard
                key={reel.id}
                reel={reel}
                index={idx}
                isHovered={hoveredReelIndex === idx}
                isMuted={isMuted}
                videoRef={(el) => {
                  videoRefs.current[idx] = el;
                }}
                onHoverChange={handleHoverChange}
                onMuteToggle={handleMuteToggle}
              />
            ))}
          </div>
        </section>
      </main>

      {/* NEXT PROJECT NAVIGATION — Gym Reels Archive */}
      {(() => {
        const ascendIndex = slugsList.indexOf('ascend-performance');
        const nextReelSlug = slugsList[(ascendIndex + 1) % slugsList.length];
        const nextReelProject = projectsData[nextReelSlug];
        return (
          <div className="w-full border-t border-black/[0.07] shrink-0">
            <Link
              href={`/works/${nextReelSlug}`}
              className="group w-full flex items-center justify-between px-8 md:px-24 lg:px-32 py-10 md:py-14 hover:bg-black/[0.02] transition-colors duration-300 cursor-pointer"
            >
              {/* Left: label + title */}
              <div className="flex flex-col gap-2">
                <span className="font-poppins text-[8px] font-bold tracking-[0.3em] uppercase text-[#6B7280] transition-opacity duration-300">
                  NEXT PROJECT
                </span>
                <h2
                  className="font-syne text-[clamp(1.4rem,4vw,3rem)] font-extrabold uppercase leading-none tracking-tighter text-[#1c242d] transition-all duration-300 ease-out group-hover:opacity-70 group-hover:translate-x-[5px]"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {nextReelProject.title}
                </h2>
              </div>
              {/* Right: arrow */}
              <span
                className="font-syne text-[clamp(1.4rem,4vw,3rem)] font-light text-[#1c242d]/40 transition-all duration-300 ease-out group-hover:text-[#1c242d] group-hover:translate-x-[6px]"
                style={{ willChange: 'transform, opacity' }}
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>
        );
      })()}
    </motion.div>
  );
}

function ElevateVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => console.log(err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-8">
      <div 
        className="w-full aspect-[16/9] relative overflow-hidden bg-black rounded-[24px] shadow-2xl group cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.01]"
        />
        
        {/* Cinematic tick boundaries */}
        <span className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/20 pointer-events-none" />
        <span className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white/20 pointer-events-none" />
        <span className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white/20 pointer-events-none" />
        <span className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/20 pointer-events-none" />

        {/* Dynamic Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Indicators at the bottom */}
        <div className="absolute bottom-6 left-8 right-8 flex justify-between items-center text-white/70 font-poppins text-[10px] tracking-widest z-10 pointer-events-none uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>EDITORIAL VIDEO</span>
          </div>
          <div>
            {isPlaying ? 'PLAYING' : 'PAUSED'} / {isMuted ? 'MUTED' : 'UNMUTED'}
          </div>
        </div>
      </div>
    </div>
  );
}

const elevateImages = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749321/IMG_20240403_190046_278_a381nc.webp",
    size: 'wide',
    aspect: '16 / 9',
    caption: "Clothing Campaign 01",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749321/IMG_20240403_190046_322_fbhv1r.webp",
    size: 'lg-portrait',
    aspect: '3 / 4',
    caption: "Clothing Campaign 02",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749321/IMG_20240403_190046_220_qf3hbk.webp",
    size: 'tall',
    aspect: '9 / 16',
    caption: "Clothing Campaign 03",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749321/IMG_20240403_190046_360_vsexm5.webp",
    size: 'sm-portrait',
    aspect: '3 / 4',
    caption: "Clothing Campaign 04",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749321/IMG_20240403_190046_238_fxcvu7.webp",
    size: 'square',
    aspect: '1 / 1',
    caption: "Clothing Campaign 05",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749320/IMG_20240403_180529_667_uejqtf.webp",
    size: 'lg-landscape',
    aspect: '3 / 2',
    caption: "Clothing Campaign 06",
  },
  {
    id: 7,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749320/IMG_20240403_180529_389_eddzbp.webp",
    size: 'lg-portrait',
    aspect: '3 / 4',
    caption: "Clothing Campaign 07",
  },
  {
    id: 8,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749320/IMG_20240403_190046_178_ret6qw.webp",
    size: 'sm-portrait',
    aspect: '3 / 4',
    caption: "Clothing Campaign 08",
  },
  {
    id: 9,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749320/IMG_20240403_180529_499_hb6qq2.webp",
    size: 'wide',
    aspect: '16 / 9',
    caption: "Clothing Campaign 09",
  },
  {
    id: 10,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749320/IMG_20240403_180529_625_qrzuqw.webp",
    size: 'square',
    aspect: '1 / 1',
    caption: "Clothing Campaign 10",
  },
  {
    id: 11,
    url: "https://res.cloudinary.com/dsvedhehi/image/upload/v1782749320/IMG_20240403_180529_537_zmdgcq.webp",
    size: 'tall',
    aspect: '9 / 16',
    caption: "Clothing Campaign 11",
  },
];

function ElevateApparel() {
  const project = projectsData['elevate-apparel'];
  const [activeImgIndex, setActiveImgIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveImgIndex(index);
  };

  const closeLightbox = () => {
    setActiveImgIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImgIndex !== null) {
      setActiveImgIndex((activeImgIndex + 1) % elevateImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImgIndex !== null) {
      setActiveImgIndex((activeImgIndex - 1 + elevateImages.length) % elevateImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImgIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImgIndex]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as any
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full bg-[#f5f6f8] flex flex-col justify-between select-none overflow-x-hidden will-change-transform will-change-opacity"
    >
      {/* Minimal Header */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-14 pt-8 pb-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-syne text-[11px] font-extrabold tracking-[0.25em] text-[#1c242d] uppercase hover:opacity-70 transition-opacity"
        >
          VERSEFILM
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center border border-black/10 hover:border-black/20 rounded-full p-2.5 transition-all bg-[#f5f6f8]/85 backdrop-blur-md group hover:bg-black/5"
        >
          <X className="w-4 h-4 text-black/55 group-hover:text-black" />
        </Link>
      </header>

      {/* Main Container */}
      <div className="w-full flex-grow flex flex-col items-center">
        
        {/* HERO CONTAINER */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 pt-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="flex items-center gap-4 text-[9px] font-poppins font-bold tracking-[0.25em] text-[#6B7280] uppercase">
              <span>{project.year}</span>
              <span>•</span>
              <span>Clothing</span>
              <span>•</span>
              <span>Editorial Campaign</span>
            </div>
            <h1 className="font-syne text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tighter mt-4 mb-8 text-[#1c242d] select-none whitespace-pre-line">
              {project.title.replace(' ', '\n')}
            </h1>
            <p className="font-poppins text-[13px] md:text-[15px] font-light text-black leading-relaxed tracking-wider mb-8 max-w-xl">
              {project.desc}
            </p>
            
            {/* Minimal Underlined CTA */}
            <button
              onClick={() => {
                const element = document.getElementById('cinematic-video-elevate');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-2 font-poppins text-[10px] font-bold tracking-[0.25em] uppercase text-[#1c242d] pb-1 cursor-pointer"
            >
              <span>WATCH FILM →</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1c242d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 w-full flex flex-col items-stretch text-left font-poppins text-[10px] uppercase text-[#6B7280] font-bold mt-2 lg:mt-6">
            <h2 className="text-[10px] tracking-[0.2em] font-extrabold text-[#6B7280] border-b border-black/[0.06] pb-4 mb-6 uppercase font-poppins">
              PROJECT INFORMATION
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-baseline text-[9px] tracking-wider font-poppins border-b border-black/[0.03] pb-3">
                <span className="text-[#6B7280] font-medium tracking-wider">Category</span>
                <span className="text-[#1c242d] font-bold tracking-widest text-right">{project.category}</span>
              </div>
              <div className="flex justify-between items-baseline text-[9px] tracking-wider font-poppins border-b border-black/[0.03] pb-3">
                <span className="text-[#6B7280] font-medium tracking-wider">Media</span>
                <span className="text-[#1c242d] font-bold tracking-widest text-right">1 Film / 11 Editorial Images</span>
              </div>
              <div className="flex justify-between items-baseline text-[9px] tracking-wider font-poppins">
                <span className="text-[#6B7280] font-medium tracking-wider">Role</span>
                <span className="text-[#1c242d] font-bold tracking-widest text-right">{project.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* FULLSCREEN CINEMATIC VIDEO */}
        <div id="cinematic-video-elevate" className="w-full">
          <ElevateVideo src={project.videoUrl} poster={project.heroImage} />
        </div>

        {/* EDITORIAL GALLERY HEADER */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 pt-24 pb-12 flex flex-col items-start text-left">
          <span className="font-poppins text-[9px] font-bold tracking-[0.25em] text-[#6B7280] uppercase">
            01 / EDITORIAL GALLERY
          </span>
          <h2 className="font-syne text-[clamp(1.4rem,4vw,2.5rem)] font-extrabold uppercase leading-none tracking-tighter text-[#1c242d] mt-2 select-none">
            movement, texture & silhouette
          </h2>
        </div>

        {/* EDITORIAL GALLERY MASONRY */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 pb-32">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {elevateImages.map((img, index) => (
              <motion.div
                key={img.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                onClick={() => openLightbox(index)}
                className="break-inside-avoid mb-8 group relative overflow-hidden bg-zinc-950 rounded-[20px] cursor-pointer"
                style={{ aspectRatio: img.aspect }}
              >
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex flex-col gap-0.5 text-left text-white pointer-events-none">
                    <span className="font-poppins text-[8px] font-bold tracking-[0.25em] text-white/50 uppercase">
                      FRAME 0{index + 1}
                    </span>
                    <h3 className="font-syne text-[10px] font-extrabold uppercase tracking-wide leading-none text-white/90">
                      {img.caption}
                    </h3>
                  </div>
                </div>

                {/* Viewfinder ticks on hover */}
                <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/0 group-hover:border-white/25 pointer-events-none transition-colors duration-500" />
                <span className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/0 group-hover:border-white/25 pointer-events-none transition-colors duration-500" />
                <span className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/0 group-hover:border-white/25 pointer-events-none transition-colors duration-500" />
                <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/0 group-hover:border-white/25 pointer-events-none transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* NEXT PROJECT FOOTER */}
      <div className="w-full border-t border-black/[0.07] shrink-0">
        <Link
          href={`/works/the-frozen-apex`}
          className="group w-full flex items-center justify-between px-6 md:px-14 py-10 md:py-14 hover:bg-black/[0.02] transition-colors duration-300 cursor-pointer"
        >
          <div className="flex flex-col gap-2">
            <span className="font-poppins text-[8px] font-bold tracking-[0.3em] uppercase text-[#6B7280]">
              NEXT PROJECT
            </span>
            <h2
              className="font-syne text-[clamp(1.4rem,4vw,3rem)] font-extrabold uppercase leading-none tracking-tighter text-[#1c242d] transition-all duration-300 ease-out group-hover:opacity-70 group-hover:translate-x-[5px]"
              style={{ willChange: 'transform, opacity' }}
            >
              THE FROZEN APEX
            </h2>
          </div>
          <span
            className="font-syne text-[clamp(1.4rem,4vw,3rem)] font-light text-[#1c242d]/40 transition-all duration-300 ease-out group-hover:text-[#1c242d] group-hover:translate-x-[6px]"
            style={{ willChange: 'transform, opacity' }}
            aria-hidden="true"
          >
            &rarr;
          </span>
        </Link>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between items-center p-6 md:p-12 cursor-zoom-out select-none"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 border border-white/10 hover:border-white/30 rounded-full p-3 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white transition-all cursor-pointer z-55 group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Left Control */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 border border-white/10 hover:border-white/30 rounded-full p-4 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white transition-all cursor-pointer z-55 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image Container */}
            <div className="flex-grow flex items-center justify-center max-w-5xl max-h-[80vh] relative w-full h-full pointer-events-none mt-12 md:mt-0">
              <motion.div
                key={activeImgIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={elevateImages[activeImgIndex].url}
                  alt={elevateImages[activeImgIndex].caption}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>

            {/* Right Control */}
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 border border-white/10 hover:border-white/30 rounded-full p-4 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white transition-all cursor-pointer z-55 active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Info and Counter */}
            <div className="flex flex-col items-center gap-2 text-white font-poppins pointer-events-none text-center pb-2">
              <span className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
                IMAGE {activeImgIndex + 1} / {elevateImages.length}
              </span>
              <p className="text-xs tracking-wider font-light text-white/80 uppercase">
                {elevateImages[activeImgIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  if (slug === 'ascend-performance') {
    return <GymReelsArchive />;
  }

  if (slug === 'elevate-apparel') {
    return <ElevateApparel />;
  }

  const project = projectsData[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] flex flex-col items-center justify-center p-6 text-black font-poppins">
        <h1 className="font-syne text-3xl font-extrabold uppercase tracking-tight mb-4">Project Not Found</h1>
        <Link href="/" className="text-[10px] tracking-[0.2em] font-bold uppercase underline">
          Return to Archive
        </Link>
      </div>
    );
  }

  const currentIndex = slugsList.indexOf(slug);
  const nextSlug = slugsList[(currentIndex + 1) % slugsList.length];
  const nextProject = projectsData[nextSlug];

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full bg-[#f5f6f8] flex flex-col justify-between select-none overflow-x-hidden will-change-transform will-change-opacity"
    >
      {/* Minimal Header */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-14 pt-8 pb-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-syne text-[11px] font-extrabold tracking-[0.25em] text-[#1c242d] uppercase hover:opacity-70 transition-opacity"
        >
          VERSEFILM
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center border border-black/10 hover:border-black/20 rounded-full p-2.5 transition-all bg-[#f5f6f8]/85 backdrop-blur-md group hover:bg-black/5"
        >
          <X className="w-4 h-4 text-black/55 group-hover:text-black" />
        </Link>
      </header>

      {/* Main Container */}
      <div className="w-full flex-grow flex flex-col items-center">
        
        {/* SECTION 1: HERO CONTAINER */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 pt-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Meta, Title, Description, CTA) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="font-poppins text-[9px] font-bold tracking-[0.25em] text-[#6B7280] uppercase">
              {project.meta}
            </span>
            <h1 className="font-syne text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tighter mt-4 mb-8 text-[#1c242d] select-none whitespace-pre-line">
              {project.title.replace(' ', '\n')}
            </h1>
            <p className="font-poppins text-[13px] md:text-[15px] font-light text-black leading-relaxed tracking-wider mb-8 max-w-xl">
              {project.desc}
            </p>
            
            {/* Minimal Underlined CTA */}
            <button
              onClick={() => {
                const element = document.getElementById('cinematic-video');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-2 font-poppins text-[10px] font-bold tracking-[0.25em] uppercase text-[#1c242d] pb-1 cursor-pointer"
            >
              <span>WATCH FILM →</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1c242d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
            </button>
          </div>

          {/* Right Column (Clean spec details, unboxed layout) */}
          <div className="lg:col-span-5 w-full flex flex-col items-stretch text-left font-poppins text-[10px] uppercase text-[#6B7280] font-bold mt-2 lg:mt-6">
            <h2 className="text-[10px] tracking-[0.2em] font-extrabold text-[#6B7280] border-b border-black/[0.06] pb-4 mb-6 uppercase font-poppins">
              PROJECT INFORMATION
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Client', value: project.client },
                { label: 'Category', value: project.category },
                { label: 'Services', value: project.services },
                { label: 'Duration', value: project.duration },
                { label: 'Aspect Ratio', value: project.aspect },
                { label: 'Location', value: project.location },
                { label: 'Year', value: project.year },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-baseline text-[9px] tracking-wider font-poppins">
                  <span className="text-[#6B7280] font-medium tracking-wider">{item.label}</span>
                  <span className="text-[#1c242d] font-bold tracking-widest text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: FULLSCREEN CINEMATIC VIDEO */}
        <CaseStudyVideo src={project.videoUrl} poster={project.heroImage} />

        {/* SECTION 3: PROJECT OVERVIEW */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 text-left">
            <span className="font-poppins text-[9px] font-bold tracking-[0.25em] text-[#6B7280] uppercase">
              01 / OVERVIEW
            </span>
          </div>
          <div className="lg:col-span-8 text-left flex flex-col items-start">
            <h3 className="font-syne text-2xl md:text-3xl lg:text-[2.2vw] font-light leading-[1.28] tracking-tight text-[#1c242d] mb-8 select-none font-syne">
              {project.overviewTitle}
            </h3>
            <div className="max-w-[580px] flex flex-col gap-6 text-[14px] md:text-[15px] font-light leading-[1.65] tracking-wide font-poppins text-black">
              <p>{project.overviewDesc1}</p>
              <p>{project.overviewDesc2}</p>
            </div>
          </div>
        </div>

        {/* SECTION 4: BEHIND THE PROJECT */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-black/[0.04]">
          <div className="lg:col-span-4 text-left">
            <span className="font-poppins text-[9px] font-bold tracking-[0.25em] text-[#6B7280] uppercase">
              02 / BEHIND THE PROJECT
            </span>
          </div>
          <div className="lg:col-span-8 text-left flex flex-col items-start gap-8">
            <p className="font-poppins text-[13px] md:text-[15px] font-light text-black leading-relaxed tracking-wider max-w-xl">
              {project.behindDesc}
            </p>
            <div className="w-full aspect-[21/9] bg-zinc-900 overflow-hidden relative rounded select-none">
              <img
                src={project.frame1}
                alt="Behind the Scenes"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: VIDEO GALLERY */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24 border-t border-black/[0.04]">
          <div className="flex flex-col items-start mb-12 text-left">
            <span className="font-poppins text-[9px] font-bold tracking-[0.25em] text-[#6B7280] uppercase">
              03 / VIDEO GALLERY
            </span>
          </div>

          {project.videoGallery1 && project.videoGallery2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
              <GalleryVideo src={project.videoGallery1} poster={project.frame1} caption="CUT 01 // DETAILS" />
              <GalleryVideo src={project.videoGallery2} poster={project.frame2} caption="CUT 02 // OUTLINE" />
            </div>
          )}
        </div>

        {/* SECTION 6: SELECTED FRAMES */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-24 md:py-36 border-t border-black/[0.04]">
          <div className="flex flex-col items-start mb-12 text-left">
            <span className="font-poppins text-[9px] font-bold tracking-[0.25em] text-[#6B7280] uppercase">
              04 / SELECTED FRAMES
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
            {[
              { img: project.frame1, caption: 'FRAME 01 // COMPOSITION' },
              { img: project.frame2, caption: 'FRAME 02 // ENVIRONMENT' },
            ].map((frame, idx) => (
              <div key={idx} className="flex flex-col items-start gap-4 w-full">
                <div className="w-full aspect-[16/9] bg-zinc-900 overflow-hidden relative rounded select-none animate-fade-in">
                  <img
                    src={frame.img}
                    alt={frame.caption}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 hover:scale-[1.02] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                <span className="font-poppins text-[8px] font-bold tracking-[0.2em] uppercase text-[#6B7280]">
                  {frame.caption}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: CREDITS */}
        {project.credits && (
          <div className="w-full max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-24 border-t border-black/[0.04] grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fade-in">
            <div className="lg:col-span-4 text-left">
              <span className="font-poppins text-[9px] font-bold tracking-[0.25em] text-[#6B7280] uppercase">
                05 / CREDITS
              </span>
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 text-left font-poppins text-[9px] tracking-wider uppercase text-[#6B7280]">
              <div>
                <span className="font-medium text-[#6B7280]/60 block mb-2">PRODUCER</span>
                <span className="font-bold text-[#1c242d]">{project.credits.producer}</span>
              </div>
              <div>
                <span className="font-medium text-[#6B7280]/60 block mb-2">SOUND DESIGN</span>
                <span className="font-bold text-[#1c242d]">{project.credits.sound}</span>
              </div>
              <div>
                <span className="font-medium text-[#6B7280]/60 block mb-2">COLORIST</span>
                <span className="font-bold text-[#1c242d]">{project.credits.colorist}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* SECTION 8: NEXT PROJECT — editorial navigation */}
      <div className="w-full border-t border-black/[0.07] shrink-0">
        <Link
          href={`/works/${nextSlug}`}
          className="group w-full flex items-center justify-between px-6 md:px-14 py-10 md:py-14 hover:bg-black/[0.02] transition-colors duration-300 cursor-pointer"
        >
          {/* Left: label + title */}
          <div className="flex flex-col gap-2">
            <span className="font-poppins text-[8px] font-bold tracking-[0.3em] uppercase text-[#6B7280]">
              NEXT PROJECT
            </span>
            <h2
              className="font-syne text-[clamp(1.4rem,4vw,3rem)] font-extrabold uppercase leading-none tracking-tighter text-[#1c242d] transition-all duration-300 ease-out group-hover:opacity-70 group-hover:translate-x-[5px]"
              style={{ willChange: 'transform, opacity' }}
            >
              {nextProject.title}
            </h2>
          </div>
          {/* Right: arrow */}
          <span
            className="font-syne text-[clamp(1.4rem,4vw,3rem)] font-light text-[#1c242d]/40 transition-all duration-300 ease-out group-hover:text-[#1c242d] group-hover:translate-x-[6px]"
            style={{ willChange: 'transform, opacity' }}
            aria-hidden="true"
          >
            &rarr;
          </span>
        </Link>
      </div>


    </motion.div>
  );
}
