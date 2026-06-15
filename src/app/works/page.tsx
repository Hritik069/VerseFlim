'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LenisProvider from '@/components/LenisProvider';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

export default function WorksPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <LenisProvider>
      {/* GPU Animated Film Grain / Noise Overlay */}
      <div className="noise-overlay" />

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
          className="ml-auto flex items-center justify-center gap-2 border border-black/10 hover:border-black/20 rounded-full px-4 py-2.5 transition-all pointer-events-auto bg-[#f5f6f8]/85 backdrop-blur-md group hover:bg-black/5 text-[#1c242d]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-black/55 group-hover:text-black transition-transform group-hover:-translate-x-0.5" />
          <span className="font-poppins text-[9px] font-bold tracking-[0.15em] uppercase text-black/70 group-hover:text-black">
            Home
          </span>
        </Link>
      </div>

      <main className="relative w-full min-h-screen bg-[#f5f6f8] flex flex-col">
        {isMounted && (
          <>
            <Gallery />
            <Footer />
          </>
        )}
      </main>
    </LenisProvider>
  );
}
