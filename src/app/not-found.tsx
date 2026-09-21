import React from 'react';
import Link from 'next/link';
import { Sparkles, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-center bg-slate-950 text-white relative">
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-4 border border-amber-400">
          <Sparkles size={32} />
        </div>
        <h1 className="text-3xl font-black mb-2">Page Not Found</h1>
        <h2 className="text-xl font-bold text-amber-300 mb-4" style={{ direction: 'rtl' }}>
          הדף המבוקש לא נמצא
        </h2>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <Home size={18} />
          <span>Return Home / חזרה לדף הראשי</span>
        </Link>
      </div>
    </main>
  );
}
