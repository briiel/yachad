'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { TRANSLATIONS, Language } from '@/data/content';
import {
  Sparkles,
  Globe,
  Menu,
  X,
  CreditCard,
  Film,
  Music,
  HelpCircle,
  ShoppingBag,
  Mail,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export default function Header({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to switch language while preserving current sub-route
  const targetLang: Language = lang === 'en' ? 'he' : 'en';
  const currentSubRoute = pathname.replace(/^\/(en|he)/, '');
  const alternateUrl = `/${targetLang}${currentSubRoute || '/videos'}`;

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const logoSrc = lang === 'he' ? '/images/logo/logo-hebrew.jpeg' : '/images/logo/logo-english.jpeg';

  const navItems = [
    {
      href: `/${lang}/subscription`,
      label: t.nav.subscription,
      id: 'subscription',
      icon: CreditCard,
    },
    {
      href: `/${lang}/videos`,
      label: t.nav.videos,
      id: 'videos',
      icon: Film,
    },
    {
      href: `/${lang}/songs`,
      label: t.nav.songs,
      id: 'songs',
      icon: Music,
    },
    {
      href: `/${lang}/quizzes-crafts`,
      label: t.nav.quizzesCrafts,
      id: 'quizzes-crafts',
      icon: HelpCircle,
    },
    {
      href: `/${lang}/shop`,
      label: t.nav.shop,
      id: 'shop',
      icon: ShoppingBag,
    },
    {
      href: `/${lang}/contact`,
      label: t.nav.contact,
      id: 'contact',
      icon: Mail,
    },
  ];

  const ChevronIcon = lang === 'he' ? ChevronLeft : ChevronRight;

  return (
    <>
      <header className="sticky top-10 left-0 right-0 z-[900] h-18 sm:h-20 bg-[#081020]/85 backdrop-blur-xl border-b border-amber-400/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center transition-all">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand Official Logo & Title */}
          <Link href={`/${lang}/videos`} className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.4)] relative flex-shrink-0 group-hover:scale-105 transition-transform bg-slate-900">
              <Image
                src={logoSrc}
                alt={t.siteTitle}
                fill
                sizes="50px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base lg:text-lg font-black leading-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
                {t.siteTitle}
              </span>
              <span className="text-[10px] sm:text-xs text-sky-200/70 font-semibold hidden xs:inline-block">
                {t.siteSubtitle}
              </span>
            </div>
          </Link>

          {/* Desktop: Pinned 5 Main Navigation Links (hidden on screens < 1024px) */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2 xl:gap-3 list-none">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-amber-500/25 to-sky-500/15 border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'text-slate-200 hover:text-amber-300 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header Actions: Language Switcher & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher - visible on all screens */}
            <Link
              href={alternateUrl}
              className="flex items-center gap-1.5 text-xs sm:text-sm py-1.5 px-3 sm:px-4 rounded-xl bg-white/10 hover:bg-amber-500/15 border border-white/15 hover:border-amber-400/50 text-slate-200 hover:text-amber-300 font-bold transition-all shadow-sm"
              title={lang === 'en' ? 'החלף לעברית' : 'Switch to English'}
              id="header-lang-switch"
            >
              <Globe size={15} className="flex-shrink-0 text-amber-400" />
              <span className="hidden sm:inline">
                {lang === 'en' ? 'עברית (Hebrew)' : 'English (English)'}
              </span>
              <span className="sm:hidden font-bold">
                {lang === 'en' ? 'עב' : 'EN'}
              </span>
            </Link>

            {/* Mobile Hamburger Button - visible only on screens < 1024px */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all active:scale-95 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay & Panel */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[1100] lg:hidden animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel: Aligned right in Hebrew (RTL), left in English (LTR) */}
          <aside
            className={`fixed top-0 bottom-0 w-[82vw] max-w-[340px] bg-[#081020]/95 shadow-2xl backdrop-blur-2xl flex flex-col justify-between z-10 transition-transform duration-300 ease-out overflow-y-auto ${
              lang === 'he'
                ? 'right-0 border-l border-amber-400/30'
                : 'left-0 border-r border-amber-400/30'
            }`}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0d1a33]/70">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-400/50 shadow-md relative flex-shrink-0 bg-slate-900">
                    <Image
                      src={logoSrc}
                      alt={t.siteTitle}
                      fill
                      sizes="35px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-white leading-tight">
                      {t.siteTitle}
                    </span>
                    <span className="text-[10px] text-amber-300 font-medium">
                      {lang === 'he' ? 'תפריט ראשי' : 'Main Menu'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="p-3">
                <ul className="flex flex-col gap-1.5 list-none">
                  {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-amber-500/25 to-amber-600/15 text-amber-300 border border-amber-500/40 shadow-sm'
                              : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                isActive
                                  ? 'bg-amber-500/30 text-amber-300'
                                  : 'bg-white/5 text-slate-400'
                              }`}
                            >
                              <Icon size={18} />
                            </div>
                            <span className="text-base">{item.label}</span>
                          </div>
                          <ChevronIcon
                            size={16}
                            className={isActive ? 'text-amber-400' : 'text-slate-600'}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-white/10 bg-slate-900/60 space-y-3">
              <Link
                href={alternateUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-semibold text-sm transition-all shadow-sm"
              >
                <Globe size={18} />
                <span>
                  {lang === 'en'
                    ? 'החלף לעברית (Hebrew)'
                    : 'Switch to English (English)'}
                </span>
              </Link>

              <div className="text-center text-[11px] text-slate-400 pt-1">
                © {new Date().getFullYear()} {t.siteTitle}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
