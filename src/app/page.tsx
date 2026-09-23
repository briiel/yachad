'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Sparkles } from 'lucide-react';

export default function SplashPage() {
  const [activeHover, setActiveHover] = useState<'none' | 'en' | 'he'>('none');

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center relative overflow-hidden bg-[#050a14]">
      {/* Master Background (Crisp & Sharp - Blur removed) */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-[center_top_6%] sm:bg-center bg-no-repeat scale-[1.01]"
        style={{ backgroundImage: "url('/images/yachad-bg.jpeg')" }}
      />
      {/* Light balanced gradient to retain background sharpness and vibrancy */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#050a14]/40 via-[#071022]/55 to-[#050a14]/75 pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Container - No extra text, only the image and the 2 language buttons */}
      <div className="w-full max-w-2xl flex flex-col items-center justify-center relative z-10 animate-fadeIn my-auto">
        {/* Prominent Official Artwork Image Container */}
        <div className="w-full aspect-[16/9] max-w-xl relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(245,158,11,0.35)] border-2 border-amber-400/70 mb-5 sm:mb-8 group transition-transform duration-300 hover:scale-[1.01]">
          {/* Hebrew Version Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${activeHover === 'en' ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
          >
            <Image
              src="/images/logo/logo-hebrew.jpeg"
              alt="יחד - סיפורי צדיקים לילדים"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 95vw, 650px"
            />
          </div>

          {/* English Version Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${activeHover === 'en' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
          >
            <Image
              src="/images/logo/logo-english.jpeg"
              alt="Yachad - Holy Tales for Jewish Children"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 95vw, 650px"
            />
          </div>

          {/* Soft inner glow overlay */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl pointer-events-none" />
        </div>

        {/* Two Language Selection Buttons Placed Right Below the Image */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-lg mx-auto">
          {/* Left Button: English (Directs to English site) */}
          <Link
            href="/en/videos"
            onMouseEnter={() => setActiveHover('en')}
            onMouseLeave={() => setActiveHover('none')}
            onFocus={() => setActiveHover('en')}
            onBlur={() => setActiveHover('none')}
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl text-base sm:text-lg font-black bg-[#09152b]/90 hover:bg-[#0f2347] border-2 border-sky-400/50 hover:border-sky-300 text-white shadow-xl hover:scale-[1.03] active:scale-95 transition-all backdrop-blur-md"
            id="splash-english-btn"
          >
            <BookOpen size={22} className="text-sky-300 flex-shrink-0" />
            <span>English (English)</span>
          </Link>

          {/* Right Button: Hebrew (Directs to Hebrew site) */}
          <Link
            href="/he/videos"
            onMouseEnter={() => setActiveHover('he')}
            onMouseLeave={() => setActiveHover('none')}
            onFocus={() => setActiveHover('he')}
            onBlur={() => setActiveHover('none')}
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl text-base sm:text-lg font-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-[0_10px_30px_rgba(245,158,11,0.45)] border-2 border-white/50 hover:scale-[1.03] active:scale-95 transition-all"
            id="splash-hebrew-btn"
          >
            <Sparkles size={22} className="flex-shrink-0" />
            <span>עברית (Hebrew)</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
