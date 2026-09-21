'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EPISODES, TRANSLATIONS, Language, Episode } from '@/data/content';
import { usePaywall } from '@/context/PaywallContext';
import { HelpCircle, Palette, Lock, Sparkles } from 'lucide-react';

export default function QuizzesCraftsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === 'he' ? 'he' : 'en';
  const t = TRANSLATIONS[lang].quizzesCraftsPage;
  const { isSubscriber, openPaywall } = usePaywall();

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
          {t.headerTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.headerSubtitle}
        </p>
      </div>

      {/* Responsive Grid: 1 col on mobile/tablet, 2 cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {EPISODES.map((ep: Episode) => {
          const title = lang === 'he' ? ep.hebrewTitle : ep.title;
          const desc = lang === 'he' ? ep.hebrewDescription : ep.description;
          const badge = lang === 'he' ? ep.hebrewBadge : ep.badge;
          const quizUrl = `/${lang}/videos/${ep.id}/quiz`;
          const craftUrl = `/${lang}/videos/${ep.id}/craft`;

          return (
            <div
              key={ep.id}
              className="flex flex-col sm:flex-row bg-slate-900/85 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-48 sm:w-48 sm:h-auto flex-shrink-0 overflow-hidden bg-black">
                <Image
                  src={ep.thumbnail}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, 220px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2.5 start-2.5 bg-black/75 text-white text-xs font-bold py-0.5 px-2 rounded-md backdrop-blur-sm border border-white/10 z-10">
                  {badge}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1.5">
                    <Sparkles size={13} />
                    <span>{t.badge}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white mb-1.5 leading-snug min-h-[1.75rem] sm:min-h-[2rem] line-clamp-1">
                    {title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4 min-h-[2.5rem] sm:min-h-[2.75rem]">
                    {desc}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 mt-auto">
                  <Link
                    href={isSubscriber ? quizUrl : `/${lang}/subscription`}
                    onClick={(e) => {
                      if (!isSubscriber) {
                        e.preventDefault();
                        openPaywall(title);
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-95 text-center shadow-sm"
                  >
                    <HelpCircle size={15} className="text-amber-400 flex-shrink-0" />
                    <span className="truncate">{t.quizBtn}</span>
                    {!isSubscriber && <Lock size={12} className="text-rose-400 flex-shrink-0" />}
                  </Link>

                  <Link
                    href={isSubscriber ? craftUrl : `/${lang}/subscription`}
                    onClick={(e) => {
                      if (!isSubscriber) {
                        e.preventDefault();
                        openPaywall(title);
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/50 text-amber-300 transition-all active:scale-95 text-center shadow-sm"
                  >
                    <Palette size={15} className="text-amber-400 flex-shrink-0" />
                    <span className="truncate">{t.craftBtn}</span>
                    {!isSubscriber && <Lock size={12} className="text-rose-400 flex-shrink-0" />}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
