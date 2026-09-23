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
      {/* Consistent master background layer - Sharp, Clear & Unblurred */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-[center_top_6%] sm:bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/yachad-bg.jpeg')" }}
      />
      {/* Subtle non-blur overlay to preserve vividness and sharpness of the character artwork */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#060c18]/35 via-[#081224]/45 to-[#060c18]/60 pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,10,20,0.55)_100%)] pointer-events-none" />

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
