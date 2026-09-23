'use client';

import React, { useState, use } from 'react';
import { TRANSLATIONS, Language } from '@/data/content';
import { usePaywall } from '@/context/PaywallContext';
import {
  Mail,
  Phone,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  User,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Shield,
  BadgeCheck,
  XCircle,
  AlertCircle,
} from 'lucide-react';

export default function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === 'he' ? 'he' : 'en';
  const t = TRANSLATIONS[lang].contactPage;
  const { isSubscriber, setSubscriber } = usePaywall();

  const [submitted, setSubmitted] = useState(false);
  const [instantCancelStatus, setInstantCancelStatus] = useState<'idle' | 'success' | 'no_sub'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: t.form.subjects[0],
    message: '',
  });

  const handleInstantCancel = () => {
    if (isSubscriber) {
      setSubscriber(false);
      setInstantCancelStatus('success');
    } else {
      setInstantCancelStatus('no_sub');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-16">
      {/* Page Header */}
      <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-3">
          <Sparkles size={14} />
          <span>{lang === 'he' ? 'שירות לקוחות ותמיכה למשפחות' : 'Family Care & Customer Support'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
          {t.headerTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.headerSubtitle}
        </p>
      </header>

      {/* Main 2-Column Balanced Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
        {/* Left Column (7 Cols on lg): Inquiry Form */}
        <div className="lg:col-span-7 bg-[#091326]/95 border border-amber-400/35 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
              <MessageSquare size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {t.form.title}
              </h2>
              <p className="text-xs sm:text-sm text-sky-200/70">
                {lang === 'he'
                  ? 'מלאו את פרטי הפנייה ונחזור אליכם בהקדם האפשרי'
                  : 'Fill in your details below and our team will respond shortly'}
              </p>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Full Name field */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5"
                  htmlFor="fullName-field"
                >
                  <User size={15} />
                  <span>{t.form.fullName}</span>
                </label>
                <input
                  id="fullName-field"
                  type="text"
                  required
                  placeholder={lang === 'he' ? 'ישראל ישראלי' : 'Sarah Cohen'}
                  className="w-full py-3 px-4 rounded-xl bg-[#060c18]/80 border border-sky-400/30 text-white text-base placeholder-slate-400 focus:border-amber-400 focus:bg-[#09152b] focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              {/* Email address field */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5"
                  htmlFor="email-field"
                >
                  <Mail size={15} />
                  <span>{t.form.email}</span>
                </label>
                <input
                  id="email-field"
                  type="email"
                  required
                  placeholder="parent@example.com"
                  className="w-full py-3 px-4 rounded-xl bg-[#060c18]/80 border border-sky-400/30 text-white text-base placeholder-slate-400 focus:border-amber-400 focus:bg-[#09152b] focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Inquiry Subject dropdown */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5"
                  htmlFor="subject-field"
                >
                  <HelpCircle size={15} />
                  <span>{t.form.subject}</span>
                </label>
                <select
                  id="subject-field"
                  className="w-full py-3 px-4 rounded-xl bg-[#060c18]/80 border border-sky-400/30 text-white text-base focus:border-amber-400 focus:bg-[#09152b] focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  {t.form.subjects.map((sub, idx) => (
                    <option key={idx} value={sub} className="bg-[#091326] text-white">
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message body */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5"
                  htmlFor="message-field"
                >
                  <MessageSquare size={15} />
                  <span>{t.form.message}</span>
                </label>
                <textarea
                  id="message-field"
                  rows={4}
                  required
                  placeholder={
                    lang === 'he'
                      ? 'כיצד נוכל לעזור למשפחתכם? נשמח לענות על כל שאלה או בקשה.'
                      : 'How can our family care team assist you with subscriptions or stories?'
                  }
                  className="w-full py-3 px-4 rounded-xl bg-[#060c18]/80 border border-sky-400/30 text-white text-base placeholder-slate-400 focus:border-amber-400 focus:bg-[#09152b] focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all shadow-inner"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl transition-transform hover:scale-[1.01] active:scale-95 cursor-pointer mt-3"
                id="contact-submit-btn"
              >
                <Send size={18} />
                <span>{t.form.submitBtn}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 px-2 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-400">
                <CheckCircle2 size={38} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                {lang === 'he' ? 'פנייתך נשלחה בהצלחה!' : 'Message Sent Successfully!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-sm mx-auto leading-relaxed">
                {t.form.successMsg}
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center py-2.5 px-6 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
                onClick={() => setSubmitted(false)}
              >
                <span>{lang === 'he' ? 'שלח הודעה נוספת' : 'Send Another Inquiry'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column (5 Cols on lg): Direct Channels, Help Topics & Trust Seal */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Direct Support Channels Card */}
          <div className="bg-[#091326]/95 border border-amber-400/35 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl backdrop-blur-xl">
            <h2 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-amber-400" />
              <span>{t.directSupport.title}</span>
            </h2>

            <div className="space-y-3.5">
              {/* Dedicated Support Email */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#060c18]/70 border border-sky-400/20 hover:border-amber-400/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
                  <Mail size={19} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-sky-200/70 font-medium">
                    {t.directSupport.emailLabel}
                  </div>
                  <a
                    href={`mailto:${t.directSupport.emailVal}`}
                    className="text-sm font-bold text-white hover:text-amber-300 transition-colors truncate block mt-0.5"
                  >
                    {t.directSupport.emailVal}
                  </a>
                </div>
              </div>

              {/* WhatsApp / Phone Customer Service line */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#060c18]/70 border border-sky-400/20 hover:border-amber-400/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
                  <Phone size={19} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-sky-200/70 font-medium">
                    {t.directSupport.phoneLabel}
                  </div>
                  <a
                    href={`tel:${t.directSupport.phoneVal.replace(/\s+/g, '')}`}
                    className="text-sm font-bold text-white hover:text-amber-300 transition-colors block mt-0.5"
                  >
                    {t.directSupport.phoneVal}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#060c18]/70 border border-sky-400/20">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
                  <Clock size={19} />
                </div>
                <div>
                  <div className="text-xs text-sky-200/70 font-medium">
                    {lang === 'he' ? 'שעות פעילות המוקד' : 'Support Hours'}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">
                    {t.directSupport.hours}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Support Topics Card */}
          <div className="bg-[#091326]/90 border border-sky-400/20 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <HelpCircle size={16} className="text-amber-400" />
              <span>{lang === 'he' ? 'נושאים נפוצים לפנייה' : 'Common Assistance Topics'}</span>
            </h3>

            <ul className="space-y-2.5 text-xs text-slate-200 list-none mb-5">
              <li className="flex items-center gap-2.5">
                <BadgeCheck size={16} className="text-emerald-400 flex-shrink-0" />
                <span>{lang === 'he' ? 'ניהול מנויים, שינוי מסלול או ביטולים' : 'Subscription management, upgrades, or billing'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <BadgeCheck size={16} className="text-emerald-400 flex-shrink-0" />
                <span>{lang === 'he' ? 'רישיונות קבוצתיים לבתי ספר וגני ילדים' : 'School, Cheder & Classroom group licenses'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <BadgeCheck size={16} className="text-emerald-400 flex-shrink-0" />
                <span>{lang === 'he' ? 'הצעות לסיפורי צדיקים ומשוב תכנים' : 'Suggestions for new holy tales & feedback'}</span>
              </li>
            </ul>

            {/* Instant Automated Cancellation Tool */}
            <div className="pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs mb-1">
                  <XCircle size={15} />
                  <span>{t.instantCancellation.title}</span>
                </div>
                <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
                  {t.instantCancellation.desc}
                </p>

                {instantCancelStatus === 'idle' ? (
                  <button
                    type="button"
                    onClick={handleInstantCancel}
                    className="w-full py-2.5 px-3 min-h-[40px] rounded-xl text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-200 hover:text-white transition-all cursor-pointer text-center"
                    id="contact-instant-cancel-btn"
                  >
                    {t.instantCancellation.actionBtn}
                  </button>
                ) : instantCancelStatus === 'success' ? (
                  <div className="text-[11px] text-emerald-300 bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-400/40 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="flex-shrink-0" />
                    <span>{lang === 'he' ? 'המנוי שלך בוטל באופן מיידי במערכת! לא יבוצעו חיובים נוספים.' : 'Your subscription has been cancelled immediately! No further charges will occur.'}</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-300 bg-amber-950/50 p-2.5 rounded-xl border border-amber-400/40 font-semibold flex items-center gap-1.5">
                    <AlertCircle size={15} className="flex-shrink-0" />
                    <span>{t.instantCancellation.alreadyCancelled}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Family Trust & Safe Environment Guarantee */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#0c1a35]/70 to-[#060c18]/85 border border-amber-400/35 flex items-start gap-3 shadow-lg">
            <ShieldCheck size={26} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {lang === 'he' ? 'סביבה בטוחה ונקייה לילדים' : '100% Safe, Kosher & Ad-Free'}
              </h4>
              <p className="text-[11px] sm:text-xs text-amber-200/90 mt-0.5 leading-relaxed">
                {lang === 'he'
                  ? 'כל התכנים בפלטפורמה נבדקו בקפידה ומותאמים לחינוך יהודי שורשי בסביבה נקייה מפרסומות.'
                  : 'Every episode, quiz, and craft sheet is carefully curated to uphold timeless Jewish values in a safe, ad-free environment.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Section: Clear section covering terms, returns, and order cancellations */}
      <section
        className="bg-[#091326]/90 border border-amber-400/30 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl backdrop-blur-xl"
        id="refund-policy"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
            <Shield size={22} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {t.policy.header}
            </h2>
            <p className="text-xs sm:text-sm text-amber-300 font-bold">
              {t.policy.sectionTitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10 mt-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>{lang === 'he' ? 'ביטול מנוי בכל עת' : 'Cancel Anytime'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.policy.text1}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>{lang === 'he' ? 'הגנה על תוכן דיגיטלי' : 'Digital Content Terms'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.policy.text2}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>{lang === 'he' ? 'תאימות שערי תשלום' : 'Payment Compliance'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.policy.text3}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
