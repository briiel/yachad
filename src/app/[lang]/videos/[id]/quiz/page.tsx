'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { EPISODES, EPISODE_QUIZZES, TRANSLATIONS, Language } from '@/data/content';
import { usePaywall } from '@/context/PaywallContext';
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  CheckCircle,
  Lock,
  Palette,
  Play,
  Sparkles,
  Check,
  X as CloseIcon,
  Award,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

export default function EpisodeQuizPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === 'he' ? 'he' : 'en';
  const episodeId = resolvedParams.id;
  const { isSubscriber } = usePaywall();

  const episode = EPISODES.find((ep) => ep.id === episodeId);
  if (!episode) {
    notFound();
  }

  const canAccess = isSubscriber || episode.isFree;
  const questions = EPISODE_QUIZZES[episode.id] || EPISODE_QUIZZES['ep-1'];
  const t = TRANSLATIONS[lang];

  const epTitle = lang === 'he' ? episode.hebrewTitle : episode.title;
  const epDesc = lang === 'he' ? episode.hebrewDescription : episode.description;
  const epBadge = lang === 'he' ? episode.hebrewBadge : episode.badge;

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (showResults) return; // lock selection when results are visible
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === questions.length;
  const BackIcon = lang === 'he' ? ArrowRight : ArrowLeft;

  return (
    <div className="w-full max-w-4xl mx-auto pb-16">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between gap-3 mb-6 sm:mb-8 flex-wrap no-print">
        <Link
          href={`/${lang}/videos`}
          className="inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:border-amber-400/50 transition-all shadow-sm"
        >
          <BackIcon size={16} />
          <span>{lang === 'he' ? 'חזרה לסרטונים' : 'Back to Videos'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {canAccess && (
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 hover:text-white transition-all shadow-sm cursor-pointer"
              title={lang === 'he' ? 'הורדה והדפסה של החידון כקובץ PDF' : 'Download & Print Quiz PDF'}
            >
              <BookOpen size={16} className="text-sky-300" />
              <span>{lang === 'he' ? 'הורדת חידון (PDF)' : 'Download Quiz (PDF)'}</span>
            </button>
          )}

          <Link
            href={`/${lang}/quizzes-crafts`}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:border-amber-400/50 transition-all shadow-sm"
          >
            <Sparkles size={16} className="text-amber-400" />
            <span>{lang === 'he' ? 'כל החידונים ויצירה' : 'All Quizzes & Crafts'}</span>
          </Link>
        </div>
      </nav>

      {/* Episode Header Banner */}
      <header className="bg-gradient-to-r from-[#0c1936]/95 via-[#091326]/90 to-[#0c1936]/95 border border-amber-400/40 rounded-3xl p-5 sm:p-6 mb-8 shadow-2xl backdrop-blur-xl">
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
              <span>{epBadge} • {lang === 'he' ? 'חידון תוכן אינטראקטיבי וקובץ להדפסה' : 'Interactive Torah Quiz & Printable Worksheet'}</span>
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
      {!canAccess ? (
        <section className="bg-gradient-to-br from-[#0d1b38] via-[#091326] to-[#060c18] border-2 border-amber-400/60 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/40 text-amber-300 flex items-center justify-center mx-auto mb-5 border-2 border-amber-400 shadow-xl">
            <Lock size={36} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            {t.paywall.modalTitle}
          </h2>

          <p className="max-w-md mx-auto mb-8 text-sm text-slate-300 leading-relaxed">
            {lang === 'he'
              ? `החידון האינטראקטיבי וקובץ ה-PDF עבור ״${epTitle}״ פתוחים למנויים פעילים בלבד. הצטרפו עכשיו כדי לפתוח את כל החידונים, הסרטונים ודפי היצירה!`
              : `The interactive quiz and printable PDF for "${epTitle}" are exclusively available to active subscribers. Join now to unlock all episode quizzes, videos, and printable crafts!`}
          </p>

          <Link
            href={`/${lang}/subscription`}
            className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl mb-4 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles size={20} />
            <span>{t.paywall.joinBtn}</span>
          </Link>
        </section>
      ) : (
        /* Unlocked Interactive Quiz Arena */
        <main className="bg-[#091326]/95 border border-amber-400/30 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Quiz Arena Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-3.5 text-center sm:text-start">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg font-black flex-shrink-0">
                <HelpCircle size={26} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {lang === 'he' ? 'חידון הסיפור והערכים' : 'Torah & Values Quiz'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  {lang === 'he'
                    ? 'בחרו את התשובה הנכונה ביותר לכל שאלה ולחצו ״בדוק תשובות״.'
                    : 'Select the best answer for each question and click "Check Answers".'}
                </p>
              </div>
            </div>

            {/* Answered Counter Badge */}
            <div className="py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-amber-300">
              {lang === 'he'
                ? `נענו ${Object.keys(selectedAnswers).length} מתוך ${questions.length}`
                : `${Object.keys(selectedAnswers).length} of ${questions.length} answered`}
            </div>
          </div>

          {/* Questions List */}
          <div className="flex flex-col gap-8 mb-8">
            {questions.map((item, qIdx) => {
              const questionText = lang === 'he' ? item.hebrewQuestion : item.question;
              const options = lang === 'he' ? item.hebrewOptions : item.options;
              const chosen = selectedAnswers[qIdx];
              const isCorrect = chosen === item.correctIndex;

              return (
                <article
                  key={qIdx}
                  className="rounded-2xl bg-[#060c18]/80 border border-sky-400/20 p-5 sm:p-7 shadow-lg transition-all"
                >
                  {/* Question Title & Number Pill */}
                  <div className="flex items-start gap-3.5 mb-5">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h3 className="font-black text-base sm:text-lg text-white leading-snug">
                      {questionText}
                    </h3>
                  </div>

                  {/* Options: Modern 2x2 Grid on sm+, 1 col on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {options.map((opt, optIdx) => {
                      const isSelected = chosen === optIdx;

                      let cardStyle =
                        'bg-[#0b162f]/80 border-sky-400/25 text-slate-200 hover:bg-[#0f1f42] hover:border-amber-400/50 hover:shadow-md';
                      let letterStyle =
                        'bg-slate-700/60 border-slate-600 text-slate-300 font-bold';
                      let statusIcon = null;

                      if (showResults) {
                        if (optIdx === item.correctIndex) {
                          cardStyle =
                            'bg-emerald-950/70 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400';
                          letterStyle = 'bg-emerald-500 text-slate-950 border-emerald-400 font-black';
                          statusIcon = (
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center flex-shrink-0">
                              <Check size={14} strokeWidth={3} />
                            </div>
                          );
                        } else if (isSelected && !isCorrect) {
                          cardStyle =
                            'bg-rose-950/70 border-rose-400 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.3)] ring-1 ring-rose-400';
                          letterStyle = 'bg-rose-500 text-white border-rose-400 font-black';
                          statusIcon = (
                            <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center flex-shrink-0">
                              <CloseIcon size={14} strokeWidth={3} />
                            </div>
                          );
                        }
                      } else if (isSelected) {
                        cardStyle =
                          'bg-amber-500/15 border-amber-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/60';
                        letterStyle = 'bg-amber-500 text-slate-950 border-amber-400 font-black';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          disabled={showResults}
                          className={`flex items-center justify-between gap-3.5 p-4 rounded-xl border text-start text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] ${cardStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs flex-shrink-0 transition-colors ${letterStyle}`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </div>
                          {statusIcon}
                        </button>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Results Celebration Card */}
          {showResults && (
            <section
              className={`p-6 sm:p-8 rounded-2xl text-center mb-8 border-2 shadow-2xl transition-all animate-fadeIn ${
                score === questions.length
                  ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-emerald-950/80 border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.3)]'
                  : 'bg-gradient-to-br from-amber-950/80 via-slate-900 to-indigo-950/80 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.3)]'
              }`}
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg bg-amber-400/20 text-amber-300 border-2 border-amber-400">
                <Award size={36} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {lang === 'he'
                  ? `הציון שלך: ${score} מתוך ${questions.length} נכונות!`
                  : `Your Score: ${score} of ${questions.length} Correct!`}
              </h3>

              <p className="text-sm sm:text-base font-bold text-amber-200 max-w-md mx-auto mb-6">
                {score === questions.length
                  ? (lang === 'he'
                      ? '✨ כל הכבוד! יישר כוח עצום, ענית נכון על כל השאלות!'
                      : '✨ Yasher Koach! Outstanding work, you answered every question correctly!')
                  : (lang === 'he'
                      ? '👏 עבודה מצוינת! למדתם יפה על מידותיו הנעלות של הצדיק.'
                      : '👏 Wonderful effort! You learned deeply about the holy tzaddik.')}
              </p>

              <button
                type="button"
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
              >
                <RotateCcw size={16} />
                <span>{lang === 'he' ? 'נסה שוב' : 'Try Again'}</span>
              </button>
            </section>
          )}

          {/* Actions Bottom Bar */}
          <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div>
              {!showResults ? (
                <button
                  type="button"
                  className={`inline-flex items-center justify-center gap-2.5 py-3.5 px-8 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl transition-all cursor-pointer ${
                    !allAnswered ? 'opacity-85' : 'hover:scale-105 active:scale-95'
                  }`}
                  onClick={() => setShowResults(true)}
                  id="check-answers-btn"
                >
                  <CheckCircle size={20} />
                  <span>{lang === 'he' ? 'בדוק תשובות' : 'Check Answers'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
                >
                  <RotateCcw size={18} />
                  <span>{lang === 'he' ? 'איפוס חידון' : 'Reset Quiz'}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
              <Link
                href={`/${lang}/videos/${episode.id}/craft`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/50 text-amber-300 transition-all active:scale-95 shadow-md"
              >
                <Palette size={17} />
                <span>{lang === 'he' ? 'דף היצירה של הפרק' : 'Craft Sheet'}</span>
              </Link>

              <Link
                href={`/${lang}/videos`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-95"
              >
                <Play size={16} />
                <span>{lang === 'he' ? 'חזרה לסרטונים' : 'Videos'}</span>
              </Link>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}
