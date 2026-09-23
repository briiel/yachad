'use client';

import React, { useState, useRef, use } from 'react';
import Link from 'next/link';
import { TRANSLATIONS, Language } from '@/data/content';
import { usePaywall } from '@/context/PaywallContext';
import {
  Check,
  Sparkles,
  ShieldCheck,
  Info,
  ExternalLink,
  ArrowDown,
  XCircle,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  CreditCard,
  RotateCcw,
} from 'lucide-react';

export default function SubscriptionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === 'he' ? 'he' : 'en';
  const t = TRANSLATIONS[lang].subscriptionPage;
  const { isSubscriber, setSubscriber } = usePaywall();

  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    children: '2',
    cityState: '',
  });

  const formRef = useRef<HTMLDivElement>(null);

  const handleJoinClick = () => {
    setShowForm(true);
    setCancelSuccessMsg(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setSubscriber(true);
    setCancelSuccessMsg(false);
  };

  const handleExecuteInstantCancel = () => {
    setSubscriber(false);
    setShowCancelModal(false);
    setCancelSuccessMsg(true);
    setFormSubmitted(false);
    setShowForm(false);
  };

  return (
    <div className="w-full">
      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
          {t.headerTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.headerSubtitle}
        </p>
      </div>

      {/* Immediate Automated Cancellation Success Alert */}
      {cancelSuccessMsg && (
        <div className="max-w-lg mx-auto mb-8 p-5 rounded-2xl bg-rose-950/60 border-2 border-rose-500/60 shadow-xl backdrop-blur-md animate-fadeIn text-center">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3 border border-rose-400">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="text-lg font-black text-white mb-1.5">
            {t.manage.cancelledTitle}
          </h3>
          <p className="text-xs sm:text-sm text-rose-200 leading-relaxed mb-4">
            {t.manage.cancelledMsg}
          </p>
          <button
            type="button"
            onClick={() => {
              setSubscriber(true);
              setCancelSuccessMsg(false);
            }}
            className="inline-flex items-center gap-2 py-2 px-5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
          >
            <RotateCcw size={15} />
            <span>{t.manage.resubscribeBtn}</span>
          </button>
        </div>
      )}

      {/* When user has an ACTIVE subscription: Show Active Membership Dashboard */}
      {isSubscriber ? (
        <div className="max-w-lg mx-auto mb-12 sm:mb-16">
          <div className="relative bg-[#091326]/90 border-2 border-emerald-400/60 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(52,211,153,0.2)] backdrop-blur-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black text-xs py-1.5 px-5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
              <span>{t.manage.activeBadge}</span>
            </div>

            <div className="text-center mt-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-400/40 shadow-inner">
                <ShieldCheck size={36} />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                {t.manage.activeTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.manage.activeSubtitle}
              </p>
            </div>

            {/* Plan Details Card */}
            <div className="p-4 rounded-2xl bg-[#060c18]/70 border border-emerald-500/30 mb-6 space-y-2.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-400">{lang === 'he' ? 'תוכנית נוכחית:' : 'Current Plan:'}</span>
                <span className="font-bold text-white">{t.card.planName}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-400">{lang === 'he' ? 'תעריף חודשי:' : 'Monthly Rate:'}</span>
                <span className="font-black text-amber-300">{t.card.price} {t.card.priceFrequency}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-white/10">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar size={14} className="text-emerald-400" />
                  <span>{t.manage.nextBilling}</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 py-0.5 px-2 rounded">
                  {lang === 'he' ? 'פעיל' : 'Active'}
                </span>
              </div>
            </div>

            {/* Action Buttons: Browse library or Cancel Subscription */}
            <div className="flex flex-col gap-3">
              <Link
                href={`/${lang}/videos`}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                <span>{lang === 'he' ? 'מעבר לספריית הסרטונים והשירים' : 'Explore Videos & Songs'}</span>
              </Link>

              {/* Automated Instant Cancellation Button */}
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-rose-300 hover:text-white bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/35 transition-all cursor-pointer"
                id="cancel-subscription-btn"
              >
                <XCircle size={16} />
                <span>{t.manage.cancelBtn}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* When NOT Subscribed: Show Pricing Card */
        <div className="max-w-lg mx-auto mb-12 sm:mb-16">
          <div className="relative bg-[#091326]/90 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(245,158,11,0.2)] backdrop-blur-xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-xs py-1.5 px-5 rounded-full shadow-lg whitespace-nowrap">
              {lang === 'he' ? 'המסלול המומלץ למשפחות' : 'Most Popular Choice'}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white text-center mt-3 mb-3">
              {t.card.planName}
            </h2>

            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-4xl sm:text-5xl font-black text-amber-300">
                {t.card.price}
              </span>
              <span className="text-sm sm:text-base text-slate-300 font-bold">
                {t.card.priceFrequency}
              </span>
            </div>

            <div className="text-center text-xs sm:text-sm text-amber-200/90 mb-6 font-semibold">
              {t.card.subCaption}
            </div>

            {/* Core Value Propositions */}
            <ul className="flex flex-col gap-3.5 mb-8 list-none">
              {t.card.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mt-0.5 border border-emerald-400/40">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Pricing Card Action Button */}
            <button
              type="button"
              onClick={handleJoinClick}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              id="join-now-btn"
            >
              <Sparkles size={20} />
              <span>{t.card.actionBtn}</span>
              <ArrowDown size={18} />
            </button>

            {/* Future Extension Slot */}
            <div className="mt-8 pt-6 border-t border-white/10 bg-[#060c18]/40 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 rounded-b-3xl">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="py-0.5 px-2.5 rounded-md text-[11px] font-black bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {t.premiumSlot.badge}
                </span>
                <span className="text-sm font-bold text-white">
                  {t.premiumSlot.title}
                </span>
              </div>
              <div className="text-base font-black text-amber-300 mb-1">
                {t.premiumSlot.price}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.premiumSlot.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subscriber Intake Form */}
      {showForm && !isSubscriber && (
        <div
          className="max-w-xl mx-auto bg-[#091326]/95 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl mb-14 animate-fadeIn"
          ref={formRef}
          id="intake-form-section"
        >
          {!formSubmitted ? (
            <>
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-300 mb-3 border border-amber-400/40">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  {t.form.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200">
                  {t.form.subtitle}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Email address field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm font-bold text-amber-300" htmlFor="email-field">
                    {t.form.email}
                  </label>
                  <input
                    id="email-field"
                    name="email"
                    type="email"
                    required
                    placeholder="family@example.com"
                    className="w-full py-3 px-4 rounded-xl bg-[#060c18]/80 border border-sky-400/30 text-white text-base placeholder-slate-400 focus:border-amber-400 focus:bg-[#09152b] focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Phone number field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm font-bold text-amber-300" htmlFor="phone-field">
                    {t.form.phone}
                  </label>
                  <input
                    id="phone-field"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full py-3 px-4 rounded-xl bg-[#060c18]/80 border border-sky-400/30 text-white text-base placeholder-slate-400 focus:border-amber-400 focus:bg-[#09152b] focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Number of children in the family field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm font-bold text-amber-300" htmlFor="children-field">
                    {t.form.children}
                  </label>
                  <select
                    id="children-field"
                    name="children"
                    className="w-full py-3 px-4 rounded-xl bg-[#060c18]/80 border border-sky-400/30 text-white text-base focus:border-amber-400 focus:bg-[#09152b] focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                    value={formData.children}
                    onChange={handleInputChange}
                  >
                    <option value="1" className="bg-[#091326] text-white">1</option>
                    <option value="2" className="bg-[#091326] text-white">2</option>
                    <option value="3" className="bg-[#091326] text-white">3</option>
                    <option value="4" className="bg-[#091326] text-white">4</option>
                    <option value="5+" className="bg-[#091326] text-white">5+</option>
                  </select>
                </div>

                {/* City & State field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs sm:text-sm font-bold text-amber-300" htmlFor="cityState-field">
                    {t.form.cityState}
                  </label>
                  <input
                    id="cityState-field"
                    name="cityState"
                    type="text"
                    required
                    placeholder="Brooklyn, NY"
                    className="w-full py-3 px-4 rounded-xl bg-[#060c18]/80 border border-sky-400/30 text-white text-base placeholder-slate-400 focus:border-amber-400 focus:bg-[#09152b] focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                    value={formData.cityState}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit & Proceed Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl mt-4 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  id="submit-proceed-btn"
                >
                  <ExternalLink size={20} />
                  <span>{t.form.submitBtn}</span>
                </button>

                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 flex items-center gap-2.5 text-xs text-sky-300">
                    <Info size={18} className="flex-shrink-0" />
                    <span>{t.form.developerNote}</span>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="text-center py-6 sm:py-8 px-2 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-400">
                <Check size={36} strokeWidth={3} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                {t.form.successTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed max-w-md mx-auto">
                {t.form.successMsg}
              </p>
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-emerald-300 text-xs sm:text-sm mb-6 max-w-md mx-auto">
                ✨ {lang === 'he' ? 'מצב מנוי הופעל! כל הסרטונים, השירים והפעילויות כעת פתוחים עבורך.' : 'Active Subscriber mode is now enabled! All videos, songs, and craft sheets are unlocked.'}
              </div>
              <Link
                href={`/${lang}/videos`}
                className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-black text-sm sm:text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>{lang === 'he' ? 'מעבר לספריית הסרטונים' : 'Go to Video Library'}</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal for Instant Subscription Cancellation */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#091326] border-2 border-rose-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 border-2 border-rose-500">
              <AlertTriangle size={32} />
            </div>

            <h3 className="text-xl font-black text-white mb-2">
              {t.manage.confirmTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              {t.manage.confirmText}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleExecuteInstantCancel}
                className="w-full py-3 px-4 rounded-xl font-black text-sm bg-rose-600 hover:bg-rose-500 text-white shadow-lg active:scale-95 transition-all cursor-pointer"
                id="confirm-cancel-now-btn"
              >
                {t.manage.confirmYes}
              </button>

              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 active:scale-95 transition-all cursor-pointer"
              >
                {t.manage.confirmNo}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
