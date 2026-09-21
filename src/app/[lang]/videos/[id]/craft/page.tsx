'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { EPISODES, TRANSLATIONS, Language } from '@/data/content';
import { usePaywall } from '@/context/PaywallContext';
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  Download,
  Lock,
  HelpCircle,
  Sparkles,
  Play,
  Maximize2,
  X,
  FileCheck,
  Palette,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

export default function EpisodeCraftPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === 'he' ? 'he' : 'en';
  const episodeId = resolvedParams.id;
  const { isSubscriber } = usePaywall();

  const [previewZoom, setPreviewZoom] = useState(false);

  const episode = EPISODES.find((ep) => ep.id === episodeId);
  if (!episode) {
    notFound();
  }

  const t = TRANSLATIONS[lang];
  const epTitle = lang === 'he' ? episode.hebrewTitle : episode.title;
  const epDesc = lang === 'he' ? episode.hebrewDescription : episode.description;
  const epBadge = lang === 'he' ? episode.hebrewBadge : episode.badge;

  const BackIcon = lang === 'he' ? ArrowRight : ArrowLeft;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-16">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between gap-3 mb-6 sm:mb-8 flex-wrap">
        <Link
          href={`/${lang}/videos`}
          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:border-amber-400/50 transition-all shadow-sm"
        >
          <BackIcon size={16} />
          <span>{lang === 'he' ? 'חזרה לסרטונים' : 'Back to Videos'}</span>
        </Link>

        <Link
          href={`/${lang}/quizzes-crafts`}
          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:border-amber-400/50 transition-all shadow-sm"
        >
          <BookOpen size={16} className="text-amber-400" />
          <span>{lang === 'he' ? 'כל החידונים ודפי היצירה' : 'All Quizzes & Crafts'}</span>
        </Link>
      </nav>

      {/* Episode Header Banner */}
      <header className="bg-gradient-to-r from-slate-900/95 via-indigo-950/80 to-slate-900/95 border border-amber-500/40 rounded-3xl p-5 sm:p-6 mb-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
          <div className="w-28 h-28 sm:w-32 sm:h-24 relative rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border-2 border-amber-400/50">
            <Image
              src={episode.thumbnail}
              alt={epTitle}
              fill
              sizes="140px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 text-center sm:text-start min-w-0">
            <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-2">
              <Sparkles size={14} />
              <span>{epBadge} • {lang === 'he' ? 'דף יצירה וצביעה מוכן להדפסה' : 'Printable Craft & Activity Studio'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
              {epTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {epDesc}
            </p>
          </div>
        </div>
      </header>

      {/* Paywall Check */}
      {!isSubscriber ? (
        <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border-2 border-amber-400/60 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/40 text-amber-300 flex items-center justify-center mx-auto mb-5 border-2 border-amber-400 shadow-xl">
            <Lock size={36} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            {t.paywall.modalTitle}
          </h2>

          <p className="max-w-md mx-auto mb-8 text-sm text-slate-300 leading-relaxed">
            {lang === 'he'
              ? `דפי היצירה והצביעה עבור ״${epTitle}״ פתוחים להורדה ולהדפסה למנויים פעילים בלבד. הצטרפו עכשיו כדי לקבל גישה לכל דפי הפעילות!`
              : `The printable craft and coloring sheets for "${epTitle}" are exclusively available to active subscribers. Join now to download and print all sheets!`}
          </p>

          <Link
            href={`/${lang}/subscription`}
            className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl mb-4 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles size={20} />
            <span>{t.paywall.joinBtn}</span>
          </Link>

          <div className="text-xs text-slate-400 mt-2">
            {lang === 'he'
              ? '💡 הערת בדיקה לפרוטוטייפ: ניתן להפעיל ״מצב מנוי״ בסרגל העליון כדי להוריד ולהדפיס את דף היצירה.'
              : '💡 Prototype testing tip: Switch to "Subscriber View" in the top bar to preview and print the craft sheet.'}
          </div>
        </section>
      ) : (
        /* Unlocked Craft Studio: 2-Column Balanced Layout on Desktop */
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols on lg): Physical Paper Canvas Easel */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-[420px] bg-white rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-amber-400/70 transition-transform duration-300 hover:scale-[1.01]">
              {/* Paper Format Tag */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200 text-slate-600 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <FileCheck size={14} className="text-amber-600" />
                  <span>{lang === 'he' ? 'דף צביעה תקני (A4 / Letter)' : 'Standard Printable (A4 / Letter)'}</span>
                </span>
                <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                  300 DPI
                </span>
              </div>

              {/* Coloring Sheet Image */}
              <div className="relative w-full aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                <Image
                  src="/images/craft_sheet_1.jpg"
                  alt={`${epTitle} Craft Sheet`}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-contain"
                  priority
                />

                {/* Hover overlay to expand */}
                <button
                  type="button"
                  onClick={() => setPreviewZoom(true)}
                  className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-xs cursor-pointer"
                >
                  <Maximize2 size={18} />
                  <span>{lang === 'he' ? 'לחץ לתצוגה מוגדלת' : 'Click to Enlarge Preview'}</span>
                </button>
              </div>

              {/* Bottom Print Hint */}
              <p className="text-center text-[11px] text-slate-500 pt-3 font-medium">
                {lang === 'he'
                  ? 'מיועד להדפסה ישירה בכל מדפסת ביתית סטנדרטית'
                  : 'Ready to print on any standard home printer'}
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols on lg): Workshop Controls & Activity Guide */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 1. Print & Download Hub Card */}
            <div className="bg-slate-900/95 border border-amber-500/35 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
                  <Palette size={22} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {lang === 'he' ? 'הדפסה והורדת דף היצירה' : 'Print & Download Workshop'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {lang === 'he'
                      ? 'הדפיסו את הדף ישירות או הורידו קובץ תמונה באיכות גבוהה.'
                      : 'Print the craft sheet directly or save high-resolution file for later.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  id="print-sheet-btn"
                >
                  <Printer size={19} />
                  <span>{lang === 'he' ? 'הדפס דף יצירה עכשיו' : 'Print Craft Sheet Now'}</span>
                </button>

                <a
                  href="/images/craft_sheet_1.jpg"
                  download={`craft-sheet-${episode.id}.jpg`}
                  className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm sm:text-base bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:border-amber-400/50 transition-all shadow-sm cursor-pointer"
                  id="download-jpg-btn"
                >
                  <Download size={19} className="text-amber-300" />
                  <span>{lang === 'he' ? 'הורד קובץ JPG איכותי' : 'Download High-Res JPG'}</span>
                </a>
              </div>

              {/* Print Tips */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
                <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  {lang === 'he'
                    ? 'טיפ להדפסה: ודאו שהמדפסת מוגדרת על גודל נייר Letter או A4 במצב לאורך (Portrait) לקבלת תוצאה מושלמת.'
                    : 'Print Tip: Ensure printer settings are set to Letter or A4 in Portrait mode for the best fit.'}
                </span>
              </div>
            </div>

            {/* 2. Activity Guide & Story Connection */}
            <div className="bg-slate-900/90 border border-slate-700/60 rounded-3xl p-6 sm:p-7 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <span>{lang === 'he' ? 'על פעילות היצירה והערכים' : 'About this Craft & Values'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {lang === 'he'
                  ? `דף היצירה מלווה את פרק ״${epTitle}״. בזמן שהילדים צובעים ומעטרים את הדף, זוהי הזדמנות נפלאה לשוחח איתם על חסד, צדקה, ואהבת ישראל המוצגים בסיפור.`
                  : `This craft sheet accompanies "${epTitle}". As children color and decorate the page, parents have a wonderful opportunity to discuss the values of loving-kindness, tzedakah, and faith demonstrated in the story.`}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1 font-medium">
                    {lang === 'he' ? 'גילאים מומלצים' : 'Recommended Ages'}
                  </span>
                  <strong className="text-white font-bold">
                    {lang === 'he' ? 'גילאי 4-10' : 'Ages 4 - 10'}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1 font-medium">
                    {lang === 'he' ? 'ציוד מומלץ' : 'Recommended Supplies'}
                  </span>
                  <strong className="text-white font-bold">
                    {lang === 'he' ? 'טושים, צבעי פנדה, מדבקות' : 'Crayons, Markers, Stickers'}
                  </strong>
                </div>
              </div>
            </div>

            {/* 3. Next Activity Navigation Card */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-amber-600/10 border border-amber-500/30">
              <div className="text-center sm:text-start">
                <h4 className="text-sm font-bold text-white">
                  {lang === 'he' ? 'סיימתם לצבוע?' : 'Finished Coloring?'}
                </h4>
                <p className="text-xs text-amber-200/80">
                  {lang === 'he' ? 'בדקו כמה זכרתם מהסיפור בחידון הפרק!' : 'Test what you remember in the episode quiz!'}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/${lang}/videos/${episode.id}/quiz`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-300 transition-all active:scale-95"
                >
                  <HelpCircle size={16} />
                  <span>{lang === 'he' ? 'לחידון הפרק' : 'Take Quiz'}</span>
                </Link>

                <Link
                  href={`/${lang}/videos`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-95"
                >
                  <Play size={15} />
                  <span>{lang === 'he' ? 'לסרטונים' : 'Videos'}</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Full Size Preview Modal */}
      {previewZoom && (
        <div
          className="fixed inset-0 z-[2500] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPreviewZoom(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] bg-white rounded-3xl p-5 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewZoom(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl border border-white/20 hover:bg-rose-600 transition-colors cursor-pointer z-10"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            <div className="relative w-full aspect-[3/4] max-h-[75vh]">
              <Image
                src="/images/craft_sheet_1.jpg"
                alt={`${epTitle} Craft Sheet`}
                fill
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 mt-4 py-3 px-8 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-md cursor-pointer"
            >
              <Printer size={18} />
              <span>{lang === 'he' ? 'הדפס דף יצירה' : 'Print Craft Sheet'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
