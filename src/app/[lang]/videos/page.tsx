import React from 'react';
import { EPISODES, TRANSLATIONS, Language } from '@/data/content';
import VideoCard from '@/components/VideoCard';

export default async function VideosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang: Language = resolvedParams.lang === 'he' ? 'he' : 'en';
  const t = TRANSLATIONS[lang].videosPage;

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
          {t.headerTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {t.headerSubtitle}
        </p>
      </div>

      {/* Grid arrangement: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {EPISODES.map((ep) => (
          <VideoCard key={ep.id} episode={ep} lang={lang} />
        ))}
      </div>
    </div>
  );
}
