'use client';

import { useState } from 'react';
import LenisProvider from '@/components/LenisProvider';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LenisProvider>
      {/* GPU Animated Film Grain / Noise Overlay */}
      <div className="noise-overlay" />

      {/* Cinematic Counting Loader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Primary Page Layout */}
      <main className="relative w-full min-h-screen bg-[#f5f6f8] flex flex-col">
        {/* Navigation bar (only displays content once loader completes) */}
        {isLoaded && <Navbar />}

        {/* Hero Section with Living Background and titles reveal */}
        <Hero active={isLoaded} />

        {/* Portfolio Works Horizontal scrolling showcase */}
        {isLoaded && (
          <>
            <About />
            <Gallery />
            <Footer />
          </>
        )}
      </main>
    </LenisProvider>
  );
}
