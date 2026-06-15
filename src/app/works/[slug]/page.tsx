'use client';

import { use, useEffect, useRef, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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

const slugsList = ['ascend-performance', 'the-frozen-apex', 'chronicles-of-dust'];

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

// 15 portrait fitness reels for the Gym Campaign
const gymReelsData = [
  {
    id: 1,
    title: 'REEL 01 / 15',
    duration: '0:30',
    label: 'ASCEND PERFORMANCE',
    src: 'https://res.cloudinary.com/dsvedhehi/video/upload/v1781445978/PITAMPURA_11_MARCH_3_rxmzep.mov',
    poster: '/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png',
    subtitle: 'THE THRESHOLD',
  },
  {
    id: 2,
    title: 'REEL 02 / 15',
    duration: '0:35',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-on-a-treadmill-40150-large.mp4',
    poster: '/images/verse_film_mountain.png',
    subtitle: 'REPETITION',
  },
  {
    id: 3,
    title: 'REEL 03 / 15',
    duration: '0:30',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-boxer-practicing-punches-in-a-dimly-lit-gym-42617-large.mp4',
    poster: '/images/ChatGPT Image Jun 13, 2026, 07_16_04 PM.png',
    subtitle: 'RAW FORCE',
  },
  {
    id: 4,
    title: 'REEL 04 / 15',
    duration: '0:28',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-doing-yoga-outdoors-in-the-morning-42284-large.mp4',
    poster: '/images/verse_film_mountain.png',
    subtitle: 'FOCUS / BALANCE',
  },
  {
    id: 5,
    title: 'REEL 05 / 15',
    duration: '0:32',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-pushups-on-a-fitness-mat-42289-large.mp4',
    poster: '/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png',
    subtitle: 'GRAVITATIONAL WEIGHT',
  },
  {
    id: 6,
    title: 'REEL 06 / 15',
    duration: '0:30',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-female-athlete-doing-stretching-exercises-42294-large.mp4',
    poster: '/images/ChatGPT Image Jun 13, 2026, 07_16_04 PM.png',
    subtitle: 'TENSION / MOTION',
  },
  {
    id: 7,
    title: 'REEL 07 / 15',
    duration: '0:35',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-plank-exercise-in-a-sunny-room-40153-large.mp4',
    poster: '/images/verse_film_mountain.png',
    subtitle: 'ISOMETRIC HOLD',
  },
  {
    id: 8,
    title: 'REEL 08 / 15',
    duration: '0:40',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-running-on-the-beach-in-the-morning-41558-large.mp4',
    poster: '/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png',
    subtitle: 'THE RIDGE RUN',
  },
  {
    id: 9,
    title: 'REEL 09 / 15',
    duration: '0:30',
    label: 'ASCEND PERFORMANCE',
    src: 'https://res.cloudinary.com/dsvedhehi/video/upload/v1781445978/PITAMPURA_11_MARCH_3_rxmzep.mov',
    poster: '/images/ChatGPT Image Jun 13, 2026, 07_16_04 PM.png',
    subtitle: 'ENDURANCE',
  },
  {
    id: 10,
    title: 'REEL 10 / 15',
    duration: '0:35',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-on-a-treadmill-40150-large.mp4',
    poster: '/images/verse_film_mountain.png',
    subtitle: 'MINDSET',
  },
  {
    id: 11,
    title: 'REEL 11 / 15',
    duration: '0:30',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-boxer-practicing-punches-in-a-dimly-lit-gym-42617-large.mp4',
    poster: '/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png',
    subtitle: 'VELOCITY',
  },
  {
    id: 12,
    title: 'REEL 12 / 15',
    duration: '0:28',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-doing-yoga-outdoors-in-the-morning-42284-large.mp4',
    poster: '/images/verse_film_mountain.png',
    subtitle: 'FLEXIBILITY',
  },
  {
    id: 13,
    title: 'REEL 13 / 15',
    duration: '0:32',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-pushups-on-a-fitness-mat-42289-large.mp4',
    poster: '/images/ChatGPT Image Jun 13, 2026, 07_16_04 PM.png',
    subtitle: 'STABILITY',
  },
  {
    id: 14,
    title: 'REEL 14 / 15',
    duration: '0:30',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-female-athlete-doing-stretching-exercises-42294-large.mp4',
    poster: '/images/verse_film_mountain.png',
    subtitle: 'MOMENTUM',
  },
  {
    id: 15,
    title: 'REEL 15 / 15',
    duration: '0:35',
    label: 'ASCEND PERFORMANCE',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-plank-exercise-in-a-sunny-room-40153-large.mp4',
    poster: '/images/ChatGPT Image Jun 13, 2026, 07_50_21 PM.png',
    subtitle: 'EXERTION',
  }
];

// Luxury minimal portfolio grid card for Gym Reels
const GymReelCard = memo(function GymReelCard({
  reel,
  index,
  isHovered,
  isUnmuted,
  onHoverChange,
  onSoundToggle,
}: {
  reel: typeof gymReelsData[0];
  index: number;
  isHovered: boolean;
  isUnmuted: boolean;
  onHoverChange: (index: number | null) => void;
  onSoundToggle: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isUnmuted;
    }
  }, [isUnmuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Playback failed or was interrupted:", err);
            setIsPlaying(false);
          });
      } else {
        setIsPlaying(true);
      }
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => onHoverChange(index)}
      onMouseLeave={() => onHoverChange(null)}
      className="relative w-full aspect-[9/16] bg-[#f5f5f3] rounded-[16px] overflow-hidden select-none will-change-transform group flex items-center justify-center"
      style={{
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isHovered 
          ? '0 12px 40px rgba(28, 36, 45, 0.04)' 
          : '0 4px 20px rgba(28, 36, 45, 0.015)',
        transform: isHovered ? 'scale(1.015)' : 'scale(1)',
        filter: isHovered ? 'brightness(1.03)' : 'brightness(1)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Lazy Loaded Video Preview */}
      {isIntersecting && (
        <video
          ref={videoRef}
          src={reel.src}
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain bg-[#f5f5f3] rounded-[16px] pointer-events-none will-change-opacity"
          style={{
            opacity: isHovered && isPlaying ? 0.85 : 0,
            transition: 'opacity 200ms cubic-bezier(0.25, 1, 0.5, 1)',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      )}

      {/* Poster Image (cross-fades if video is not ready/loaded) */}
      <img
        src={reel.poster}
        alt={reel.subtitle}
        className="absolute inset-0 w-full h-full object-contain bg-[#f5f5f3] rounded-[16px] z-0 pointer-events-none will-change-opacity"
        style={{
          opacity: isHovered && isPlaying ? 0 : 0.85,
          transition: 'opacity 200ms cubic-bezier(0.25, 1, 0.5, 1)',
          transform: 'translate3d(0, 0, 0)',
        }}
        loading="lazy"
      />

      {/* Minimal animated speaker icon in bottom-right corner */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSoundToggle(index);
        }}
        className="absolute bottom-5 right-5 z-20 w-7 h-7 rounded-full flex items-center justify-center border border-black/10 hover:border-black/30 bg-white/40 hover:bg-white/80 backdrop-blur-md text-black/60 hover:text-black transition-all duration-300 ease-out lg:opacity-0 lg:translate-y-1 lg:pointer-events-none group-hover:lg:opacity-100 group-hover:lg:translate-y-0 group-hover:lg:pointer-events-auto active:scale-90"
        aria-label={isUnmuted ? "Mute audio" : "Unmute audio"}
      >
        {isUnmuted ? (
          <Volume2 className="w-3.5 h-3.5 text-black transition-transform duration-300" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-black/60 transition-transform duration-300" />
        )}
      </button>

      {/* Metadata headers */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[#1c242d]/50 font-mono text-[8px] uppercase tracking-widest z-20">
        <span>{reel.title}</span>
        <span>{reel.duration}</span>
      </div>

      {/* Subtitles (Left) */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-0.5 text-left z-20 text-[#1c242d]">
        <span className="font-poppins text-[7px] font-bold tracking-[0.2em] text-[#1c242d]/45 uppercase">
          {reel.label}
        </span>
        <h3 className="font-syne text-[11px] font-extrabold uppercase tracking-wide leading-none text-[#1c242d]">
          {reel.subtitle}
        </h3>
      </div>
    </div>
  );
});

// Gym Reels Archive Page Main Render
function GymReelsArchive() {
  const [unmutedReelIndex, setUnmutedReelIndex] = useState<number | null>(null);
  const [hoveredReelIndex, setHoveredReelIndex] = useState<number | null>(null);

  const handleHoverChange = useCallback((index: number | null) => {
    setHoveredReelIndex(index);
  }, []);

  const handleSoundToggle = useCallback((index: number) => {
    setUnmutedReelIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen w-full bg-[#f5f6f8] flex flex-col justify-between select-none overflow-x-hidden"
    >
      {/* Fixed Luxury Navigation Header */}
      <header className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto font-syne text-[11px] font-extrabold tracking-[0.25em] text-[#1c242d] uppercase hover:opacity-75 transition-opacity"
        >
          VERSEFILM
        </Link>
        <Link
          href="/"
          className="ml-auto flex items-center justify-center border border-black/10 hover:border-black/20 rounded-full p-3 transition-all pointer-events-auto bg-[#f5f6f8]/85 backdrop-blur-md group hover:bg-black/5"
        >
          <X className="w-4 h-4 text-black/55 group-hover:text-black transition-transform duration-300 group-hover:rotate-90" />
        </Link>
      </header>

      {/* Main Content Layout */}
      <main className="w-full flex-grow flex flex-col items-center">
        {/* Apple-level Centered Typography Section */}
        <section className="w-full max-w-4xl mx-auto px-6 pt-48 pb-20 text-center flex flex-col items-center justify-center">
          <h1 className="font-syne text-[clamp(2.2rem,6.5vw,4.8rem)] font-extrabold tracking-tighter uppercase leading-[0.92] text-[#1c242d] select-none">
            ASCEND<br />PERFORMANCE
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[10px] font-poppins font-bold tracking-[0.25em] text-[#6B7280] uppercase">
            <span>Fitness Campaign</span>
            <span className="hidden sm:inline text-black/15">•</span>
            <span>15 Reels</span>
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
                isUnmuted={unmutedReelIndex === idx}
                onHoverChange={handleHoverChange}
                onSoundToggle={handleSoundToggle}
              />
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  if (slug === 'ascend-performance') {
    return <GymReelsArchive />;
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
      {/* Top Floating Header */}
      <div className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto font-syne text-[11px] font-extrabold tracking-[0.25em] text-[#1c242d] uppercase hover:opacity-70 transition-opacity"
        >
          VERSEFILM
        </Link>
        <Link
          href="/"
          className="ml-auto flex items-center justify-center border border-black/10 hover:border-black/20 rounded-full p-3 transition-all pointer-events-auto bg-[#f5f6f8]/85 backdrop-blur-md group hover:bg-black/5"
        >
          <X className="w-4 h-4 text-black/55 group-hover:text-black" />
        </Link>
      </div>

      {/* Main Container */}
      <div className="w-full flex-grow flex flex-col items-center">
        
        {/* SECTION 1: HERO CONTAINER */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
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

      {/* SECTION 8: NEXT PROJECT (Footer redirect) */}
      <div className="w-full border-t border-black/[0.06] bg-[#f0f2f5] py-20 md:py-32 px-6 md:px-14 shrink-0 text-center animate-fade-in">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="font-poppins text-[8px] font-bold tracking-[0.25em] uppercase text-[#6B7280]">
            UP NEXT
          </span>
          <Link
            href={`/works/${nextSlug}`}
            className="group relative flex flex-col items-center gap-2 cursor-pointer py-2"
          >
            <h2 className="font-syne text-[clamp(1.5rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tighter text-[#1c242d] group-hover:opacity-75 transition-opacity">
              {nextProject.title}
            </h2>
            <span className="font-poppins text-[9px] tracking-[0.2em] font-bold uppercase text-[#6B7280] group-hover:text-[#1c242d] transition-colors mt-2 font-poppins">
              VIEW PROJECT →
            </span>
          </Link>
        </div>
      </div>


    </motion.div>
  );
}
