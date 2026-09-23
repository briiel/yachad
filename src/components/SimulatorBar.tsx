'use client';

import React from 'react';
import { usePaywall } from '@/context/PaywallContext';
import { TRANSLATIONS, Language } from '@/data/content';
import { ShieldAlert, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';

export default function SimulatorBar({ lang }: { lang: Language }) {
  const { isSubscriber, toggleSubscriber } = usePaywall();
  const t = TRANSLATIONS[lang].simulator;

  return (
    <aside
      aria-label={t.badge}
      className="sticky top-0 left-0 right-0 z-[1000] h-10 px-3 sm:px-6 flex items-center justify-between text-xs sm:text-sm font-medium bg-gradient-to-r from-[#071124] via-[#0d1d3d] to-[#071124] border-b border-sky-400/25 shadow-md backdrop-blur-md"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${isSubscriber ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-400 shadow-[0_0_8px_#fb7185]'
            }`}
        />
        <span className="text-slate-200 font-semibold truncate">
          <span className="sm:hidden">
            {isSubscriber
              ? (lang === 'he' ? 'מנוי פעיל' : 'Active Subscriber')
              : (lang === 'he' ? 'מצב אורח (נעול)' : 'Guest (Paywalled)')}
          </span>
          <span className="hidden sm:inline">
            {isSubscriber ? t.subscriberState : t.visitorState}
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={toggleSubscriber}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 min-h-[32px] rounded-full text-xs font-bold cursor-pointer transition-all active:scale-95 flex-shrink-0 bg-white/15 hover:bg-white/25 border border-white/25 text-white shadow-sm"
        title="Toggle subscriber status to test paywall"
        id="simulator-toggle-btn"
      >
        {isSubscriber ? (
          <>
            <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
            <span className="hidden xs:inline">{t.toggleToGuest}</span>
            <span className="xs:hidden">{lang === 'he' ? 'מצב אורח' : 'Guest'}</span>
            <ToggleRight size={16} className="text-emerald-400 flex-shrink-0" />
          </>
        ) : (
          <>
            <ShieldAlert size={14} className="text-rose-400 flex-shrink-0" />
            <span className="hidden xs:inline">{t.toggleToSub}</span>
            <span className="xs:hidden">{lang === 'he' ? 'מצב מנוי' : 'Subscribe'}</span>
            <ToggleLeft size={16} className="text-rose-400 flex-shrink-0" />
          </>
        )}
      </button>
    </aside>
  );
}
