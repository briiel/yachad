'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePaywall } from '@/context/PaywallContext';
import { TRANSLATIONS, Language } from '@/data/content';
import { X, CheckCircle, Sparkles, ShoppingBag } from 'lucide-react';

export default function InteractiveResourceModal({ lang }: { lang: Language }) {
  const { activeComic, closeComicCheckout } = usePaywall();
  const [purchaseStep, setPurchaseStep] = useState<'idle' | 'success'>('idle');
  const t = TRANSLATIONS[lang];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeComicCheckout();
    };
    if (activeComic) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeComic, closeComicCheckout]);

  // Comic Book Checkout Modal
  if (activeComic) {
    const comicTitle = lang === 'he' ? activeComic.hebrewTitle : activeComic.title;
    const priceDisplay = lang === 'he' ? `₪${activeComic.priceILS}` : `$${activeComic.priceUSD}`;

    return (
      <div
        className="fixed inset-0 z-[2000] bg-[#060c18]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn overscroll-contain"
        onClick={closeComicCheckout}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto bg-gradient-to-br from-[#0d1b38] via-[#091326] to-[#060c18] border-2 border-amber-400/70 rounded-3xl p-5 sm:p-8 shadow-2xl text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeComicCheckout}
            className="absolute top-3.5 sm:top-4 end-3.5 sm:end-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-rose-600 border border-white/15 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-amber-400 shadow-md">
            <ShoppingBag size={28} />
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white mb-2">
            {t.shopPage.checkoutTitle}
          </h3>

          {purchaseStep === 'idle' ? (
            <>
              <div className="bg-black/40 border border-white/10 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 my-4 sm:my-5 text-start">
                <div className="w-14 h-20 relative rounded-lg overflow-hidden flex-shrink-0 border border-white/15 shadow-md">
                  <Image
                    src={activeComic.image}
                    alt={comicTitle}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-white truncate">{comicTitle}</h4>
                  <p className="text-lg sm:text-xl font-black text-amber-300 mt-1">
                    {priceDisplay}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-black text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                onClick={() => setPurchaseStep('success')}
                id="confirm-buy-comic-btn"
              >
                <Sparkles size={18} />
                <span>{t.shopPage.confirmBuy}</span>
              </button>
            </>
          ) : (
            <div className="py-4 px-2">
              <CheckCircle size={48} className="text-emerald-400 mx-auto mb-3" />
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                {lang === 'he' ? 'הרכישה הושלמה בהצלחה!' : 'Order Placed Successfully!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                {lang === 'he'
                  ? 'אישור הזמנה נשלח לדוא״ל שלך. תודה שתמכת בהפצת סיפורי קודש!'
                  : 'A confirmation has been sent to your email. Thank you for supporting holy tales for kids!'}
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center py-2.5 px-6 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
                onClick={() => {
                  setPurchaseStep('idle');
                  closeComicCheckout();
                }}
              >
                <span>{lang === 'he' ? 'סגור' : 'Close'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
