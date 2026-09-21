'use client';

import React, { use, useRef } from 'react';
import Image from 'next/image';
import { COMIC_PRODUCTS, TRANSLATIONS, Language, ComicProduct } from '@/data/content';
import { usePaywall } from '@/context/PaywallContext';
import { Sparkles, ShoppingCart, ArrowDown, BookOpen } from 'lucide-react';

export default function ShopPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === 'he' ? 'he' : 'en';
  const t = TRANSLATIONS[lang].shopPage;
  const { openComicCheckout } = usePaywall();

  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

      {/* Category Landing Screen: Featured Category Banner/Card */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 p-6 sm:p-10 md:p-12 rounded-3xl mb-12 sm:mb-16 border-2 border-amber-400/60 bg-gradient-to-br from-[#0c1936]/90 via-[#0a1326]/95 to-[#060c18]/95 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(245,158,11,0.2)] backdrop-blur-xl">
        <div className="text-center md:text-start max-w-xl">
          <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-3 sm:mb-4">
            <Sparkles size={14} />
            <span>{t.featuredCategory.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            {t.featuredCategory.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
            {t.featuredCategory.subtitle}
          </p>

          <button
            type="button"
            onClick={scrollToCatalog}
            className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl font-black text-sm sm:text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            id="browse-comic-collection-btn"
          >
            <BookOpen size={18} />
            <span>{t.featuredCategory.btnText}</span>
            <ArrowDown size={16} />
          </button>
        </div>

        {/* Comic collection cover graphic */}
        <div className="w-48 sm:w-56 md:w-64 aspect-[3/4] relative flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/70 hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/comics_cover.jpg"
            alt={t.featuredCategory.title}
            fill
            sizes="(max-width: 768px) 200px, 260px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Product Catalog Screen */}
      <section ref={catalogRef} id="product-catalog-section">
        <div className="mb-6 sm:mb-8 text-center md:text-start">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5">
            {t.catalogTitle}
          </h3>
          <p className="text-xs sm:text-sm text-sky-200/70">
            {t.catalogSubtitle}
          </p>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMIC_PRODUCTS.map((item: ComicProduct) => {
            const title = lang === 'he' ? item.hebrewTitle : item.title;
            const desc = lang === 'he' ? item.hebrewDescription : item.description;
            const price = lang === 'he' ? `₪${item.priceILS}` : `$${item.priceUSD}`;
            const buyButtonText = lang === 'he' ? `קנה עכשיו - ₪${item.priceILS}` : `Buy Now - $${item.priceUSD}`;

            return (
              <div
                key={item.id}
                className="flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#091326]/85 border border-amber-400/30 hover:border-amber-400/60 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-[3/4] bg-slate-950 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-white mb-1.5 leading-snug">
                      {title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <span className="text-lg sm:text-xl font-black text-amber-300">
                      {price}
                    </span>

                    {/* Purchase Button */}
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0"
                      onClick={() => openComicCheckout(item)}
                    >
                      <ShoppingCart size={15} />
                      <span>{buyButtonText}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
