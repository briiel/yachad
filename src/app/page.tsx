import React from 'react';
import Link from 'next/link';
import { Sparkles, BookOpen, Star } from 'lucide-react';

export const metadata = {
  title: 'Yachad - Holy Tales for Jewish Kids | יחד - סיפורי צדיקים לילדים',
  description: 'Welcome to Yachad - Inspiring holy tales, Jewish values, videos, quizzes, and crafts for children.',
};

export default function SplashPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 text-center relative overflow-hidden bg-[#060c18]">
      {/* Master Background */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-[center_top_5%] sm:bg-center bg-no-repeat scale-[1.01]"
        style={{ backgroundImage: "url('/images/yachad-bg.jpeg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#060c18]/65 via-[#091326]/75 to-[#060c18]/88 backdrop-blur-[2px] pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,rgba(6,12,24,0.6)_80%)] pointer-events-none" />

      {/* Hero Welcome Card */}
      <div className="w-full max-w-3xl px-6 py-10 sm:p-12 md:p-16 rounded-3xl sm:rounded-[36px] bg-[#091224]/85 border-2 border-amber-400/60 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(245,158,11,0.25)] backdrop-blur-2xl relative z-10 animate-fadeIn my-auto">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-5 sm:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.6)] border-2 border-white/40">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 sm:mb-3 bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          Yachad • Holy Tales for Jewish Kids
        </h1>

        <h2
          className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 text-amber-300"
          style={{ direction: 'rtl' }}
        >
          יחד • סיפורי צדיקים לילדים
        </h2>

        <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 sm:mb-8 text-slate-200 leading-relaxed">
          Welcome to our warm, magical sanctuary of inspiring stories, wholesome videos, interactive quizzes, and printable craft sheets for children.
        </p>

        <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10 text-amber-200 text-xs sm:text-base font-bold">
          <Star size={16} className="text-amber-400 fill-amber-400 flex-shrink-0" />
          <span>Please select your preferred language / אנא בחרו שפה:</span>
          <Star size={16} className="text-amber-400 fill-amber-400 flex-shrink-0" />
        </div>

        {/* Two distinct buttons: Left Button (English) and Right Button (Hebrew) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-lg mx-auto">
          {/* Left Button (Directs to English site) */}
          <Link
            href="/en/videos"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base sm:text-lg font-black bg-[#0c1c38]/80 hover:bg-[#132850]/90 border-2 border-sky-400/40 hover:border-sky-300 text-white shadow-xl hover:scale-[1.03] active:scale-95 transition-all"
            id="splash-english-btn"
          >
            <BookOpen size={22} className="text-sky-300" />
            <span>English (English)</span>
          </Link>

          {/* Right Button (Directs to Hebrew site) */}
          <Link
            href="/he/videos"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base sm:text-lg font-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-[0_10px_30px_rgba(245,158,11,0.5)] border-2 border-white/40 hover:scale-[1.03] active:scale-95 transition-all"
            id="splash-hebrew-btn"
          >
            <Sparkles size={22} />
            <span>עברית (Hebrew)</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
