import React, { useState, useEffect } from 'react';
import biyeBariImg from '@/src/assets/images/biye_bari_illumination_1791394487510.jpg';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';

interface BengaliBiyeBariLoaderProps {
  onComplete: () => void;
}

export const BengaliBiyeBariLoader: React.FC<BengaliBiyeBariLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Auto-transition smoothly into the website without requiring button click
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 650);
          return 100;
        }
        const step = Math.floor(Math.random() * 16) + 12;
        return Math.min(prev + step, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background: Bengali Biye Bari Illumination with Luxury Scrim */}
      <div className="absolute inset-0 bg-[#0a0605]">
        <img
          src={biyeBariImg}
          alt="Bengali Biye Bari Wedding House Illumination"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Warm Golden & Alta Red Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0605] via-[#150a07]/75 to-[#0a0605]" />
        <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-[#0a0605]/90" />
      </div>

      {/* Hanging Kolkata Biye Bari Fairy Lights String Top Border */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none overflow-hidden flex justify-between px-2 sm:px-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-px bg-amber-400/40 h-6 sm:h-9" />
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                i % 3 === 0
                  ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]'
                  : i % 3 === 1
                  ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-yellow-300 shadow-[0_0_10px_#fde047]'
              } animate-fairy-flicker`}
              style={{ animationDelay: `${(i * 0.15).toFixed(2)}s` }}
            />
          </div>
        ))}
      </div>

      {/* Top Right Quick Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 z-20 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-amber-200/90 hover:text-white border border-amber-900/60 text-xs font-medium backdrop-blur-md transition-all flex items-center gap-1.5"
      >
        <span>Skip / স্কিপ করুন</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Centerpiece Wedding Card */}
      <div className="relative z-10 max-w-lg w-full mx-4 p-7 sm:p-10 rounded-3xl bg-[#140b08]/90 border border-[#4d2f21] shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-xl text-center space-y-6">
        {/* Auspicious Shonkho & Diya Cultural Motif Lockup */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-500/60" />
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 via-rose-600 to-amber-800 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <div className="w-full h-full rounded-full bg-[#170c08] flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-500/60" />
        </div>

        {/* Bengali Traditional Welcome Headline */}
        <div className="space-y-1.5">
          <p className="font-bengali text-rose-300 text-sm sm:text-base font-semibold tracking-wider">
            🌸 শুভ বিবাহ ও প্রেমের পদার্পণ 🌸
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-brand font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 tracking-wider">
            ANVARLI DECORATORS
          </h1>
          <p className="text-xs text-neutral-300 font-sans tracking-wide">
            Kolkata&apos;s Premier Wedding &amp; Romantic Proposal Decorator
          </p>
        </div>

        {/* Bengali Biye Bari Welcome Quote */}
        <div className="p-3.5 rounded-2xl bg-[#20100a]/90 border border-[#422417] text-left space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>বিয়ে বাড়ি ও উৎসবের আলোয় স্বাগতম</span>
          </div>
          <p className="text-xs text-neutral-300 font-bengali leading-relaxed">
            রজনীগন্ধার সুবাস, রত্নখচিত আলপনা আর হাজারো আলোকমালায় সাজছে আপনার স্বপ্ন।
          </p>
        </div>

        {/* Auto Progress Bar & Marigold Blossom Indicator */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-mono text-amber-300/90 px-1">
            <span className="font-sans text-[11px] text-neutral-300">
              {progress < 40
                ? 'রজনীগন্ধা ও গাঁদার মালা গাঁথা হচ্ছে...'
                : progress < 85
                ? 'আলোকসজ্জা ও মণ্ডপ প্রস্তুত হচ্ছে...'
                : 'স্বাগতম — দ্বার উন্মোচিত হচ্ছে...'}
            </span>
            <span className="tabular-nums font-bold text-amber-400">{progress}%</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-[#27140e] overflow-hidden p-0.5 border border-[#3e2216]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 transition-all duration-150 ease-out shadow-[0_0_12px_#f59e0b]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>Direct Booking: +91 7865824463 (Kolkata &amp; Howrah)</span>
        </div>
      </div>
    </div>
  );
};
