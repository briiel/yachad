'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Episode, TRANSLATIONS, Language } from '@/data/content';
import { usePaywall } from '@/context/PaywallContext';
import { Play, Pause, Lock, Volume2, VolumeX, HelpCircle, Palette, Maximize, Sparkles } from 'lucide-react';

export default function VideoCard({
  episode,
  lang,
}: {
  episode: Episode;
  lang: Language;
}) {
  const { isSubscriber, openPaywall } = usePaywall();
  const t = TRANSLATIONS[lang].videosPage;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const canAccess = isSubscriber || episode.isFree;

  const title = lang === 'he' ? episode.hebrewTitle : episode.title;
  const desc = lang === 'he' ? episode.hebrewDescription : episode.description;
  const badge = lang === 'he' ? episode.hebrewBadge : episode.badge;

  const handlePlayClick = () => {
    if (!canAccess) {
      openPaywall(title);
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !canAccess) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newRatio = Math.max(0, Math.min(1, clickX / width));
    videoRef.current.currentTime = newRatio * videoRef.current.duration;
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const quizUrl = `/${lang}/videos/${episode.id}/quiz`;
  const craftUrl = `/${lang}/videos/${episode.id}/craft`;

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-[#091326]/75 border border-amber-400/30 hover:border-amber-400/60 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group">
      {/* 1. Embedded Video Player with clean playback controls */}
      <div className="relative w-full aspect-video bg-black overflow-hidden select-none">
        {canAccess && isPlaying ? (
          <video
            ref={videoRef}
            src={episode.videoUrl}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
            autoPlay
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={episode.thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
          </div>
        )}

        {/* Top Badges Bar: Free status or Lock indicator & Duration */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-20 flex items-center justify-between gap-1.5 pointer-events-none">
          {episode.isFree ? (
            <div className="flex items-center gap-1.5 py-0.5 sm:py-1 px-2 sm:px-2.5 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-500 text-white shadow-lg backdrop-blur-md pointer-events-auto flex-shrink-0">
              <Sparkles size={12} />
              <span>{t.freeBadge || 'Free Episode'}</span>
            </div>
          ) : !canAccess ? (
            <div className="flex items-center gap-1.5 py-0.5 sm:py-1 px-2 sm:px-2.5 rounded-full text-[11px] sm:text-xs font-bold bg-rose-500 text-white shadow-lg backdrop-blur-md pointer-events-auto flex-shrink-0">
              <Lock size={12} />
              <span>{t.subscribersOnlyBadge}</span>
            </div>
          ) : (
            <div />
          )}

          <div className="py-0.5 sm:py-1 px-2 sm:px-2.5 rounded-full text-[11px] sm:text-xs font-semibold bg-[#060c18]/85 text-slate-200 backdrop-blur-md border border-white/15 pointer-events-auto flex-shrink-0">
            {badge} • {episode.duration}
          </div>
        </div>

        {/* Big Center Play / Lock trigger button */}
        {(!canAccess || !isPlaying) && (
          <button
            type="button"
            className="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black border-2 border-white/40"
            onClick={handlePlayClick}
            aria-label={isPlaying ? t.pauseVideo : t.watchVideo}
          >
            {!canAccess ? (
              <Lock size={20} className="sm:w-6 sm:h-6 text-slate-950" />
            ) : (
              <Play size={22} className="sm:w-7 sm:h-7 text-slate-950 fill-slate-950 ml-0.5" />
            )}
          </button>
        )}

        {/* Clean playback controls bar */}
        {canAccess && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2 sm:p-3 flex items-center gap-2 sm:gap-3 z-20">
            <button
              type="button"
              className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center text-white hover:text-amber-400 transition-colors cursor-pointer"
              onClick={handlePlayClick}
              title={isPlaying ? t.pauseVideo : t.watchVideo}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            </button>

            <div
              className="flex-1 py-2 cursor-pointer flex items-center"
              onClick={handleProgressClick}
            >
              <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center text-white hover:text-amber-400 transition-colors cursor-pointer"
              onClick={handleMuteToggle}
              title="Mute/Unmute"
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            <button
              type="button"
              className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center text-white hover:text-amber-400 transition-colors cursor-pointer"
              onClick={handleFullscreen}
              title="Fullscreen"
            >
              <Maximize size={17} />
            </button>
          </div>
        )}
      </div>

      {/* Video Info Content - Responsive & Compact */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between text-start">
        <div className="flex-1 flex flex-col justify-start">
          <div className="min-h-[2.5rem] sm:min-h-[3.25rem] flex items-start mb-1.5">
            <h3 className="text-base sm:text-lg lg:text-xl font-black text-white leading-snug line-clamp-2">
              {title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
            {desc}
          </p>
        </div>

        {/* Two action buttons positioned directly beneath each player */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2.5 border-t border-white/10 mt-auto">
          {/* Button 1 (Quiz link - Azure / Sky theme) */}
          <Link
            href={canAccess ? quizUrl : `/${lang}/subscription`}
            onClick={(e) => {
              if (!canAccess) {
                e.preventDefault();
                openPaywall(title);
              }
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 sm:px-3 min-h-[42px] rounded-xl text-xs sm:text-sm font-bold bg-[#0c1c38]/90 hover:bg-[#122850] border border-sky-400/40 text-sky-200 hover:text-white transition-all active:scale-95 text-center shadow-sm"
          >
            <HelpCircle size={15} className="text-sky-300 flex-shrink-0" />
            <span className="truncate">{t.quizBtn}</span>
            {!canAccess && <Lock size={12} className="text-rose-400 flex-shrink-0" />}
          </Link>

          {/* Button 2 (Craft Sheets link - Gold / Amber theme) */}
          <Link
            href={canAccess ? craftUrl : `/${lang}/subscription`}
            onClick={(e) => {
              if (!canAccess) {
                e.preventDefault();
                openPaywall(title);
              }
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 sm:px-3 min-h-[42px] rounded-xl text-xs sm:text-sm font-bold bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-300 hover:text-amber-200 transition-all active:scale-95 text-center shadow-sm"
          >
            <Palette size={15} className="text-amber-400 flex-shrink-0" />
            <span className="truncate">{t.craftBtn}</span>
            {!canAccess && <Lock size={12} className="text-rose-400 flex-shrink-0" />}
          </Link>
        </div>
      </div>
    </div>
  );
}
