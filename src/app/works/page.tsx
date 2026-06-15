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
          className="flex items-center justify-center gap-2 border border-black/10 hover:border-black/20 rounded-full px-4 py-2.5 transition-all bg-[#f5f6f8]/85 backdrop-blur-md group hover:bg-black/5 text-[#1c242d]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-black/55 group-hover:text-black transition-transform group-hover:-translate-x-0.5" />
          <span className="font-poppins text-[9px] font-bold tracking-[0.15em] uppercase text-black/70 group-hover:text-black">
            Home
          </span>
        </Link>
      </header>

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
