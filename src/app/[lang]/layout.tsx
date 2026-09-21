import React from 'react';
import SimulatorBar from '@/components/SimulatorBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaywallModal from '@/components/PaywallModal';
import InteractiveResourceModal from '@/components/InteractiveResourceModal';
import { Language } from '@/data/content';

export default async function BilingualLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang: Language = resolvedParams.lang === 'he' ? 'he' : 'en';

  return (
    <div dir={lang === 'he' ? 'rtl' : 'ltr'} lang={lang} className="min-h-screen relative text-slate-100 flex flex-col justify-between overflow-x-hidden">
      {/* Consistent master background layer */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-[center_top_8%] sm:bg-center bg-no-repeat scale-[1.01]"
        style={{ backgroundImage: "url('/images/yachad-bg.jpeg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#070c18]/72 via-[#0a1326]/80 to-[#060c18]/92 backdrop-blur-[2px] pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12)_0%,transparent_60%)] pointer-events-none" />

      {/* Prototype simulator top switcher */}
      <SimulatorBar lang={lang} />

      {/* Pinned Main Navigation Header */}
      <Header lang={lang} />

      {/* Main Page Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {children}
      </main>

      {/* Policy and direct support footer */}
      <Footer lang={lang} />

      {/* Content Paywall Modal (Blocking Overlay) */}
      <PaywallModal lang={lang} />

      {/* Interactive Resources (Quiz, Craft Sheets, Comic Checkout) */}
      <InteractiveResourceModal lang={lang} />
    </div>
  );
}
