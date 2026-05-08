"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tag, X, ArrowRight } from 'lucide-react';
import promotions from '@/data/promotions.json';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (promotions.active) {
      // Show with a slight delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted || !promotions.active || !isVisible) return null;

  return (
    <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        {/* Decorative Background Glow */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/20 blur-3xl rounded-full transition-all duration-500 group-hover:scale-150" />
        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-white/10 blur-3xl rounded-full transition-all duration-500 group-hover:scale-150" />

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="bg-white text-black p-3 rounded-2xl shrink-0 shadow-xl">
            <Tag className="w-6 h-6" />
          </div>
          
          <div className="flex-1 pr-6">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider text-white mb-2">
              {promotions.badgeText}
            </span>
            <h3 className="text-lg font-bold text-white mb-1">
              {promotions.text}
            </h3>
            <p className="text-white/70 text-sm font-light mb-4">
              {promotions.subtext}
            </p>
            
            <Link 
              href={promotions.link}
              className="inline-flex items-center gap-2 text-sm font-bold text-white group/link"
            >
              Ambil Promo Sekarang
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
