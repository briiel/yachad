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
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat scale-[1.02]"
        style={{ backgroundImage: "url('/images/master_background.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(11,17,32,0.65)_0%,rgba(9,14,26,0.88)_75%,rgba(6,9,17,0.96)_100%)] backdrop-blur-[2px] pointer-events-none" />

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
