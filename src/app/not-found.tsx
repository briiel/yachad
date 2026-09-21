import React from 'react';
import Link from 'next/link';
import { Sparkles, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-center text-white relative overflow-hidden bg-[#060c18]">
      {/* Consistent Background */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat scale-[1.01]"
        style={{ backgroundImage: "url('/images/yachad-bg.jpeg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#060c18]/70 via-[#0a1326]/80 to-[#060c18]/92 backdrop-blur-[2px] pointer-events-none" />

      <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#091224]/85 border-2 border-amber-400/50 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.2)] backdrop-blur-xl relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-lg">
          <Sparkles size={32} />
        </div>
        <h1 className="text-3xl font-black mb-2 text-white">Page Not Found</h1>
        <h2 className="text-xl font-bold text-amber-300 mb-4" style={{ direction: 'rtl' }}>
          הדף המבוקש לא נמצא
        </h2>
        <p className="text-sm text-slate-200 mb-6 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <Home size={18} />
          <span>Return Home / חזרה לדף הראשי</span>
        </Link>
      </div>
    </main>
  );
}
