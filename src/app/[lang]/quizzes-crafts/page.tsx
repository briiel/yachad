'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EPISODES, TRANSLATIONS, Language, Episode } from '@/data/content';
import { usePaywall } from '@/context/PaywallContext';
import { FileText, Palette, Lock, Sparkles, Download, CheckCircle2 } from 'lucide-react';

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
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 mb-2.5">
          <FileText size={14} />
          <span>{lang === 'he' ? 'דפי פעילות, חידונים ודפי צביעה' : 'Activity Worksheets & Coloring Studios'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-white via-sky-100 to-amber-300 bg-clip-text text-transparent">
          {t.headerTitle}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
          {t.headerSubtitle}
        </p>
      </div>

      {/* Responsive Activity Cards: Compact Horizontal Format on Both Mobile & Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-6">
        {EPISODES.map((ep: Episode) => {
          const title = lang === 'he' ? ep.hebrewTitle : ep.title;
          const desc = lang === 'he' ? ep.hebrewDescription : ep.description;
          const badge = lang === 'he' ? ep.hebrewBadge : ep.badge;
          const canAccess = isSubscriber || ep.isFree;
          const quizUrl = `/${lang}/videos/${ep.id}/quiz`;
          const craftUrl = `/${lang}/videos/${ep.id}/craft`;

          return (
            <div
              key={ep.id}
              className="flex flex-row items-stretch bg-[#091326]/75 border border-sky-400/25 hover:border-amber-400/50 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              {/* Compact Thumbnail (Refined width for mobile to keep background visible) */}
              <div className="relative w-24 min-[360px]:w-28 sm:w-44 md:w-48 flex-shrink-0 overflow-hidden bg-black select-none">
                <Image
                  src={ep.thumbnail}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 115px, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

                {/* Badge overlay on thumbnail */}
                <div className="absolute top-2 start-2 z-10">
                  {ep.isFree ? (
                    <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-md text-[10px] font-bold bg-emerald-500 text-white shadow-md">
                      <Sparkles size={10} />
                      <span>{t.freeBadge || 'Free'}</span>
                    </span>
                  ) : !canAccess ? (
                    <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-md text-[10px] font-bold bg-rose-500 text-white shadow-md">
                      <Lock size={10} />
                      <span className="hidden min-[360px]:inline">{lang === 'he' ? 'מנויים' : 'Locked'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-md text-[10px] font-semibold bg-[#060c18]/85 text-slate-200 border border-white/10">
                      {badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center gap-1.5 text-sky-300 text-[11px] font-bold mb-1">
                    <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{badge} • {t.badge}</span>
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-white mb-1 leading-snug line-clamp-1">
                    {title}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {desc}
                  </p>
                </div>

                {/* Action Buttons: Clear distinct styling from video cards */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 mt-auto">
                  {/* Button 1: Quiz Link */}
                  <Link
                    href={canAccess ? quizUrl : `/${lang}/subscription`}
                    onClick={(e) => {
                      if (!canAccess) {
                        e.preventDefault();
                        openPaywall(title);
                      }
                    }}
                    className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 min-h-[40px] rounded-xl text-[11px] sm:text-xs font-bold bg-[#0e2246] hover:bg-[#16356e] border border-sky-400/40 text-sky-200 hover:text-white transition-all active:scale-95 text-center shadow-sm"
                    title={t.downloadQuizPdf || 'Download Quiz PDF'}
                  >
                    <Download size={13} className="text-sky-300 flex-shrink-0" />
                    <span className="truncate hidden sm:inline">{t.downloadQuizPdf || t.quizBtn}</span>
                    <span className="truncate sm:hidden">{t.quizBtn}</span>
                    {!canAccess && <Lock size={11} className="text-rose-400 flex-shrink-0" />}
                  </Link>

                  {/* Button 2: Craft Sheets */}
                  <Link
                    href={canAccess ? craftUrl : `/${lang}/subscription`}
                    onClick={(e) => {
                      if (!canAccess) {
                        e.preventDefault();
                        openPaywall(title);
                      }
                    }}
                    className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 min-h-[40px] rounded-xl text-[11px] sm:text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 hover:text-amber-200 transition-all active:scale-95 text-center shadow-sm"
                  >
                    <Palette size={13} className="text-amber-400 flex-shrink-0" />
                    <span className="truncate">{t.craftBtn}</span>
                    {!canAccess && <Lock size={11} className="text-rose-400 flex-shrink-0" />}
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
