'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRequestRef = useRef<number | null>(null);
  const loopRequestRef = useRef<number | null>(null);

  // Helper to fade audio volume smoothly using requestAnimationFrame
  const fadeAudio = (targetVolume: number, durationMs: number, onComplete?: () => void) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const startVolume = audio.volume;
    const startTime = performance.now();

    if (fadeRequestRef.current !== null) {
      cancelAnimationFrame(fadeRequestRef.current);
    }

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      audio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (progress < 1) {
        fadeRequestRef.current = requestAnimationFrame(animate);
      } else {
        fadeRequestRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeRequestRef.current = requestAnimationFrame(animate);
  };

  // High-frequency check for seamless 60-second virtual loop boundary
  const startLoopCheck = () => {
    if (loopRequestRef.current !== null) {
      cancelAnimationFrame(loopRequestRef.current);
    }

    const checkLoop = () => {
      if (!audioRef.current) return;
      const audio = audioRef.current;
      
      // Virtual loop trim: check if currentTime reaches 60.0s, and reset to 0
      if (audio.currentTime >= 60.0) {
        audio.currentTime = 0;
      }

      if (!audio.paused) {
        loopRequestRef.current = requestAnimationFrame(checkLoop);
      } else {
        loopRequestRef.current = null;
      }
    };

    loopRequestRef.current = requestAnimationFrame(checkLoop);
  };

  const handleToggle = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isMuted) {
      // Sound ON: Play from the start, fade in to 18% volume over 1.35 seconds
      localStorage.setItem('sound_preference', 'on');
      audio.currentTime = 0;
      audio.volume = 0;
      
      audio.play().then(() => {
        setIsMuted(false);
        fadeAudio(0.18, 1350); // Smooth fade in to 18% over 1.35s
        startLoopCheck();
      }).catch((err) => {
        console.error('Playback failed:', err);
      });
    } else {
      // Sound OFF: Fade out to 0 over 1.35 seconds, then pause, preserving playhead position
      localStorage.setItem('sound_preference', 'off');
      setIsMuted(true);
      
      fadeAudio(0.0, 1350, () => {
        audio.pause();
      });
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create a single persistent Audio instance
    const audio = new Audio('/leberch-meditation-ambience-262905.mp3.mpeg');
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    // Restore previous sound preference respecting autoplay policies
    const savedPreference = localStorage.getItem('sound_preference');
    if (savedPreference === 'on') {
      audio.play().then(() => {
        setIsMuted(false);
        fadeAudio(0.18, 1350);
        startLoopCheck();
      }).catch((err) => {
        console.log('Autoplay blocked on mount:', err);
        setIsMuted(true);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (fadeRequestRef.current !== null) {
        cancelAnimationFrame(fadeRequestRef.current);
      }
      if (loopRequestRef.current !== null) {
        cancelAnimationFrame(loopRequestRef.current);
      }
    };
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/10 bg-black/[0.03] backdrop-blur-md text-[#1c242d] font-medium text-[10px] tracking-[0.15em] uppercase transition-all duration-300 hover:border-black/20 hover:bg-black/[0.06] active:scale-[0.98] group lg:cursor-none"
      data-cursor="Sound"
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="flex items-end justify-between w-3.5 h-2.5">
            <span className="w-[1.5px] h-2.5 bg-[#1c242d] rounded-full animate-sound-bar-1" />
            <span className="w-[1.5px] h-2.5 bg-[#1c242d] rounded-full animate-sound-bar-2" />
            <span className="w-[1.5px] h-2.5 bg-[#1c242d] rounded-full animate-sound-bar-3" />
            <span className="w-[1.5px] h-2.5 bg-[#1c242d] rounded-full animate-sound-bar-4" />
          </div>
        )}
      </div>
      <span className="opacity-60 group-hover:opacity-100 transition-opacity font-semibold">
        {isMuted ? 'Sound Off' : 'Sound On'}
      </span>
    </button>
  );
}
