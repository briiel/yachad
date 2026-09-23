'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePaywall } from '@/context/PaywallContext';
import { TRANSLATIONS, Language } from '@/data/content';
import { Lock, X, CheckCircle2, Sparkles } from 'lucide-react';

export default function PaywallModal({ lang }: { lang: Language }) {
  const { isPaywallOpen, closePaywall, paywallResource } = usePaywall();
  const t = TRANSLATIONS[lang].paywall;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePaywall();
    };
    if (isPaywallOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaywallOpen, closePaywall]);

  if (!isPaywallOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] bg-[#060c18]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn overscroll-contain"
      onClick={closePaywall}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-gradient-to-br from-[#0d1b38] via-[#091326] to-[#060c18] border-2 border-amber-400/70 rounded-3xl p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(245,158,11,0.25)] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closePaywall}
          className="absolute top-3.5 sm:top-4 end-3.5 sm:end-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-rose-600 border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label={t.close}
        >
          <X size={18} />
        </button>

        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/40 border-2 border-amber-400 text-amber-300 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg">
          <Lock size={32} className="sm:w-9 sm:h-9" />
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
          {t.modalTitle}
        </h2>

        <p className="text-xs sm:text-sm text-slate-200 mb-6 leading-relaxed max-w-sm mx-auto">
          {paywallResource ? (
            <>
              <strong className="text-amber-300">&ldquo;{paywallResource}&rdquo;</strong> — {t.modalSubtitle}
            </>
          ) : (
            t.modalSubtitle
          )}
        </p>

        <div className="bg-[#050914]/60 border border-sky-400/20 rounded-2xl p-4 mb-6 text-start space-y-2.5">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>{t.feature1}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>{t.feature2}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>{t.feature3}</span>
          </div>
        </div>

        <Link
          href={`/${lang}/subscription`}
          onClick={closePaywall}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl transition-transform hover:scale-[1.02] active:scale-95"
          id="paywall-subscribe-btn"
        >
          <Sparkles size={20} />
          <span>{t.joinBtn}</span>
        </Link>

        <div className="mt-4 text-xs text-slate-400">
          <span>{t.alreadySubscribed} </span>
          <span className="text-amber-300 font-bold cursor-pointer hover:underline">{t.loginHint}</span>
        </div>
      </div>
    </div>
  );
}
