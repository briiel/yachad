'use client';

import React, { useState, useRef, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SONGS, TRANSLATIONS, Language, Song } from '@/data/content';
import { usePaywall } from '@/context/PaywallContext';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Lock,
  Sparkles,
  Music,
  CheckCircle2,
  Radio,
  Repeat,
  Heart,
} from 'lucide-react';

export default function SongsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = use(params);
  const lang: Language = resolvedParams.lang === 'he' ? 'he' : 'en';
  const t = TRANSLATIONS[lang].songsPage;
  const { isSubscriber, openPaywall } = usePaywall();

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [continuousAutoplay, setContinuousAutoplay] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong: Song = SONGS[currentTrackIndex] || SONGS[0];
  const canAccessCurrent = isSubscriber || currentSong.isFree;

  const currentTitle = lang === 'he' ? currentSong.hebrewTitle : currentSong.title;
  const currentLyrics = lang === 'he' ? currentSong.hebrewLyricsHighlight : currentSong.lyricsHighlight;

  // Sync play/pause with audio ref
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && canAccessCurrent) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex, canAccessCurrent]);

  const handleTogglePlay = () => {
    if (!canAccessCurrent) {
      openPaywall(currentTitle);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleSelectTrack = (index: number) => {
    const selected = SONGS[index];
    const canAccess = isSubscriber || selected.isFree;

    if (!canAccess) {
      const title = lang === 'he' ? selected.hebrewTitle : selected.title;
      openPaywall(title);
      return;
    }

    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % SONGS.length;
    handleSelectTrack(nextIdx);
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + SONGS.length) % SONGS.length;
    handleSelectTrack(prevIdx);
  };

  // Continuous Autoplay when song finishes
  const handleTrackEnded = () => {
    if (continuousAutoplay) {
      const nextIdx = (currentTrackIndex + 1) % SONGS.length;
      const nextSong = SONGS[nextIdx];
      const canAccessNext = isSubscriber || nextSong.isFree;

      if (canAccessNext) {
        setCurrentTrackIndex(nextIdx);
        setIsPlaying(true);
        setCurrentTime(0);
      } else {
        // Pauses at locked track and opens paywall
        setIsPlaying(false);
        const title = lang === 'he' ? nextSong.hebrewTitle : nextSong.title;
        openPaywall(title);
      }
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || sec === 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-16">
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleTrackEnded}
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-3">
          <Music size={14} />
          <span>{lang === 'he' ? 'שירי הסיפורים והפרקים המקוריים' : 'Original Holy Tale Audio Tracks'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
          {t.headerTitle}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
          {t.headerSubtitle}
        </p>
      </div>

      {/* Featured Now-Playing Audio Player Station */}
      <div className="bg-[#091326]/85 border-2 border-amber-400/50 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl mb-10 sm:mb-12 transition-all">
        {/* Top Controls Bar: Now Playing Badge & Continuous Autoplay Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider">
              {t.nowPlaying} • #{currentTrackIndex + 1}
            </span>
          </div>

          {/* Continuous Autoplay Toggle Switch */}
          <div className="flex items-center gap-3 bg-white/5 py-1.5 px-3.5 rounded-2xl border border-white/10">
            <Radio size={16} className={continuousAutoplay ? 'text-amber-400' : 'text-slate-400'} />
            <div className="flex flex-col text-start">
              <span className="text-xs font-bold text-white leading-tight">
                {t.continuousAutoplay}
              </span>
              <span className="text-[10px] text-slate-400 hidden xs:inline">
                {t.continuousAutoplayDesc}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setContinuousAutoplay(!continuousAutoplay)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ms-2 ${
                continuousAutoplay ? 'bg-amber-500' : 'bg-slate-700'
              }`}
              title="Toggle continuous autoplay"
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  continuousAutoplay ? (lang === 'he' ? 'left-1' : 'right-1') : (lang === 'he' ? 'right-1' : 'left-1')
                }`}
              />
            </button>
          </div>
        </div>

        {/* Player Core: Art & Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Track Album Art */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/60 group">
              <Image
                src={currentSong.thumbnail}
                alt={currentTitle}
                fill
                sizes="220px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {currentSong.isFree ? (
                <div className="absolute top-2.5 start-2.5 py-0.5 px-2.5 rounded-md text-[11px] font-black bg-emerald-500 text-white shadow-md flex items-center gap-1">
                  <Sparkles size={11} />
                  <span>{t.freeTrack}</span>
                </div>
              ) : (
                <div className="absolute top-2.5 start-2.5 py-0.5 px-2.5 rounded-md text-[11px] font-black bg-rose-500 text-white shadow-md flex items-center gap-1">
                  <Lock size={11} />
                  <span>{t.subscribersOnly}</span>
                </div>
              )}
            </div>
          </div>

          {/* Player Details & Playback Transport */}
          <div className="md:col-span-8 flex flex-col justify-center">
            <div className="mb-4 text-center md:text-start">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1.5 leading-tight">
                {currentTitle}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200/90 italic font-medium">
                "{currentLyrics}"
              </p>
            </div>

            {/* Scrubber Bar & Timers */}
            <div className="space-y-1.5 mb-6">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleScrubberChange}
                disabled={!canAccessCurrent}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>{formatSeconds(currentTime)}</span>
                <span>{formatSeconds(duration) || currentSong.duration}</span>
              </div>
            </div>

            {/* Playback Buttons Bar */}
            <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6">
              {/* Previous Track */}
              <button
                type="button"
                onClick={handlePrevTrack}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                title={t.prevTrack}
              >
                <SkipBack size={20} />
              </button>

              {/* Main Play / Pause Button */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black flex items-center justify-center shadow-[0_10px_25px_rgba(245,158,11,0.5)] border-2 border-white/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title={isPlaying ? t.pauseTrack : t.playTrack}
              >
                {!canAccessCurrent ? (
                  <Lock size={24} className="text-slate-950" />
                ) : isPlaying ? (
                  <Pause size={26} className="text-slate-950" />
                ) : (
                  <Play size={28} className="text-slate-950 fill-slate-950 ml-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                type="button"
                onClick={handleNextTrack}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
                title={t.nextTrack}
              >
                <SkipForward size={20} />
              </button>

              {/* Mute / Unmute */}
              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer ms-2"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Audio Playlist */}
      <section className="bg-[#091326]/80 border border-amber-400/30 rounded-3xl p-5 sm:p-8 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Music size={18} className="text-amber-400" />
            <span>{t.trackListTitle}</span>
          </h2>
          <span className="text-xs text-sky-200/70 font-semibold">
            {SONGS.length} {lang === 'he' ? 'שירים' : 'tracks'}
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {SONGS.map((song: Song, idx: number) => {
            const isCurrent = currentTrackIndex === idx;
            const songTitle = lang === 'he' ? song.hebrewTitle : song.title;
            const canAccess = isSubscriber || song.isFree;

            return (
              <div
                key={song.id}
                onClick={() => handleSelectTrack(idx)}
                className={`flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${
                  isCurrent
                    ? 'bg-amber-500/20 border-2 border-amber-400/70 shadow-md'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                {/* Left: Track #, Thumb, Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 text-center font-bold text-xs text-amber-300 font-mono">
                    {isCurrent && isPlaying ? (
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    ) : (
                      idx + 1
                    )}
                  </div>

                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/15 bg-black">
                    <Image
                      src={song.thumbnail}
                      alt={songTitle}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? 'text-amber-300' : 'text-white'}`}>
                      {songTitle}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate hidden xs:block">
                      {lang === 'he' ? song.hebrewLyricsHighlight : song.lyricsHighlight}
                    </p>
                  </div>
                </div>

                {/* Right: Badge & Play / Lock Indicator */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {song.isFree ? (
                    <span className="py-0.5 px-2 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                      {t.freeTrack}
                    </span>
                  ) : !canAccess ? (
                    <span className="py-0.5 px-2 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-400/40 flex items-center gap-1">
                      <Lock size={10} />
                      <span className="hidden sm:inline">{t.subscribersOnly}</span>
                    </span>
                  ) : null}

                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    {song.duration}
                  </span>

                  <button
                    type="button"
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCurrent && isPlaying
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                    title={isCurrent && isPlaying ? t.pauseTrack : t.playTrack}
                  >
                    {!canAccess ? (
                      <Lock size={14} className="text-rose-400" />
                    ) : isCurrent && isPlaying ? (
                      <Pause size={14} />
                    ) : (
                      <Play size={14} className="ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
