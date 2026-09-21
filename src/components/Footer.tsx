'use client';

import React from 'react';
import Link from 'next/link';
import { TRANSLATIONS, Language } from '@/data/content';
import { Heart, Sparkles, Mail, Phone } from 'lucide-react';

export default function Footer({ lang }: { lang: Language }) {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="border-t border-amber-500/25 bg-slate-950/95 py-8 sm:py-12 px-4 sm:px-6 mt-16 text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Brand Logo in Footer */}
        <div className="flex items-center gap-2.5 text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
            <Sparkles size={18} />
          </div>
          <span className="font-extrabold text-base sm:text-lg text-white">
            {t.siteTitle}
          </span>
        </div>

        {/* Footer Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2.5 text-xs sm:text-sm font-semibold">
          <Link href={`/${lang}/subscription`} className="hover:text-amber-300 transition-colors py-1">
            {t.nav.subscription}
          </Link>
          <Link href={`/${lang}/videos`} className="hover:text-amber-300 transition-colors py-1">
            {t.nav.videos}
          </Link>
          <Link href={`/${lang}/quizzes-crafts`} className="hover:text-amber-300 transition-colors py-1">
            {t.nav.quizzesCrafts}
          </Link>
          <Link href={`/${lang}/shop`} className="hover:text-amber-300 transition-colors py-1">
            {t.nav.shop}
          </Link>
          <Link href={`/${lang}/contact`} className="hover:text-amber-300 transition-colors py-1">
            {t.nav.contact}
          </Link>
          <Link href={`/${lang}/contact#refund-policy`} className="hover:text-amber-300 transition-colors py-1">
            {t.contactPage.policy.header}
          </Link>
        </nav>

        {/* Direct Contact Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-xs sm:text-sm">
          <a
            href={`mailto:${t.contactPage.directSupport.emailVal}`}
            className="flex items-center gap-2 hover:text-amber-300 transition-colors py-1"
          >
            <Mail size={15} className="text-amber-400" />
            <span>{t.contactPage.directSupport.emailVal}</span>
          </a>
          <a
            href={`tel:${t.contactPage.directSupport.phoneVal.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 hover:text-amber-300 transition-colors py-1"
          >
            <Phone size={15} className="text-amber-400" />
            <span>{t.contactPage.directSupport.phoneVal}</span>
          </a>
        </div>

        {/* Copyright & Love Note */}
        <div className="text-[11px] sm:text-xs text-slate-500 pt-2 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>
            © {new Date().getFullYear()} {t.siteTitle} — {lang === 'he' ? 'כל הזכויות שמורות' : 'All Rights Reserved'}.
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-400">
            {lang === 'he' ? 'נוצר באהבה לילדי ישראל' : 'Made with love for Jewish children worldwide'}{' '}
            <Heart size={12} className="text-rose-500 fill-rose-500 inline" />
          </span>
        </div>
      </div>
    </footer>
  );
}
