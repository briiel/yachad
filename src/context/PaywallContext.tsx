'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Episode, ComicProduct } from '@/data/content';

interface PaywallContextType {
  isSubscriber: boolean;
  toggleSubscriber: () => void;
  setSubscriber: (val: boolean) => void;
  isPaywallOpen: boolean;
  paywallResource: string;
  openPaywall: (resourceTitle?: string) => void;
  closePaywall: () => void;
  activeQuiz: Episode | null;
  openQuiz: (ep: Episode) => void;
  closeQuiz: () => void;
  activeCraft: Episode | null;
  openCraft: (ep: Episode) => void;
  closeCraft: () => void;
  activeComic: ComicProduct | null;
  openComicCheckout: (comic: ComicProduct) => void;
  closeComicCheckout: () => void;
}

const PaywallContext = createContext<PaywallContextType | undefined>(undefined);

export function PaywallProvider({ children }: { children: ReactNode }) {
  const [isSubscriber, setIsSubscriberState] = useState<boolean>(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState<boolean>(false);
  const [paywallResource, setPaywallResource] = useState<string>('');
  const [activeQuiz, setActiveQuiz] = useState<Episode | null>(null);
  const [activeCraft, setActiveCraft] = useState<Episode | null>(null);
  const [activeComic, setActiveComic] = useState<ComicProduct | null>(null);

  // Initialize from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('yachad_is_subscriber');
      if (saved !== null) {
        setIsSubscriberState(saved === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  const setSubscriber = (val: boolean) => {
    setIsSubscriberState(val);
    try {
      localStorage.setItem('yachad_is_subscriber', String(val));
    } catch {
      // ignore
    }
  };

  const toggleSubscriber = () => {
    setSubscriber(!isSubscriber);
  };

  const openPaywall = (resourceTitle: string = '') => {
    setPaywallResource(resourceTitle);
    setIsPaywallOpen(true);
  };

  const closePaywall = () => {
    setIsPaywallOpen(false);
  };

  const openQuiz = (ep: Episode) => {
    if (!isSubscriber) {
      openPaywall(ep.title);
    } else {
      setActiveQuiz(ep);
    }
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
  };

  const openCraft = (ep: Episode) => {
    if (!isSubscriber) {
      openPaywall(ep.title);
    } else {
      setActiveCraft(ep);
    }
  };

  const closeCraft = () => {
    setActiveCraft(null);
  };

  const openComicCheckout = (comic: ComicProduct) => {
    setActiveComic(comic);
  };

  const closeComicCheckout = () => {
    setActiveComic(null);
  };

  return (
    <PaywallContext.Provider
      value={{
        isSubscriber,
        toggleSubscriber,
        setSubscriber,
        isPaywallOpen,
        paywallResource,
        openPaywall,
        closePaywall,
        activeQuiz,
        openQuiz,
        closeQuiz,
        activeCraft,
        openCraft,
        closeCraft,
        activeComic,
        openComicCheckout,
        closeComicCheckout,
      }}
    >
      {children}
    </PaywallContext.Provider>
  );
}

export function usePaywall() {
  const context = useContext(PaywallContext);
  if (!context) {
    throw new Error('usePaywall must be used within a PaywallProvider');
  }
  return context;
}
