import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import bgBiyeBariImg from '@/src/assets/images/bg_bengali_biye_bari_1791394335377.jpg';

interface BiyeBariLoaderProps {
  onLoadingComplete: () => void;
}

export const BiyeBariLoader: React.FC<BiyeBariLoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleFinish();
          return 100;
        }
        // Smooth progression
        const step = Math.floor(Math.random() * 8) + 5;
        const next = Math.min(prev + step, 100);
        if (next === 100) {
          setTimeout(handleFinish, 400);
        }
        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  const handleFinish = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onLoadingComplete();
    }, 600);
  };

  // Play auspicious chime note via Web Audio API
  const playAuspiciousChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.3); // G5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Bengali Biye Bari Atmosphere */}
      <div className="absolute inset-0 bg-[#0e0405]">
        <img
          src={bgBiyeBariImg}
          alt="Bengali Biye Bari Ambiance"
          className="w-full h-full object-cover object-center opacity-45 scale-105 animate-pulse duration-[8000ms]"
        />
        {/* Deep Crimson & Royal Marigold Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180306]/90 via-[#120204]/90 to-[#0a0203]/95" />
      </div>

      {/* Decorative Hanging Fairy Lights (Tuni Lights) Strand at Top */}
      <div className="absolute top-0 left-0 right-0 h-16 flex justify-around items-start pointer-events-none px-4 z-10">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center"
            style={{ marginTop: `${(i % 3) * 6}px` }}
          >
            <div className="w-px h-3 bg-neutral-600/60" />
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                i % 3 === 0
                  ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]'
                  : i % 3 === 1
                  ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'
                  : 'bg-yellow-300 shadow-[0_0_8px_#fde047]'
              } animate-biye-twinkle`}
              style={{ animationDelay: `${(i * 0.25).toFixed(2)}s` }}
            />
          </div>
        ))}
      </div>

      {/* Main Festive Portal Card */}
      <div className="relative z-20 max-w-lg w-full mx-4 text-center space-y-6 p-6 sm:p-10 rounded-3xl bg-[#1a0508]/85 border border-[#4d141e]/90 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
        
        {/* Auspicious Bengali Calligraphy Seal */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-700/50 text-rose-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-bengali tracking-wider">শুভ বিবাহ • প্রেমের প্রস্তাব</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-amber-100 tracking-wider font-brand">
            ANVARLI DECORATORS
          </h2>
          <p className="font-bengali text-xs sm:text-sm text-amber-300/90 font-medium">
            কলকাতার ঐতিহ্যবাহী বিয়ে বাড়ি ও রাজকীয় ডেকোরেশন
          </p>
        </div>

        {/* Central Bengali Mandala / Diya Icon */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
          {/* Rotating Alpana Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/50 animate-alpana-spin" />
          <div className="absolute inset-2 rounded-full border border-rose-600/40" />

          {/* Glowing Auspicious Brass Diya */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Diya Flame */}
            <div className="w-6 h-8 bg-gradient-to-t from-rose-500 via-amber-400 to-yellow-200 rounded-full animate-diya-flicker shadow-[0_0_20px_#f59e0b]" />
            {/* Brass Diya Base */}
            <div className="w-12 h-4 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-b-full border-t border-amber-300 shadow-md mt-[-2px]" />
            <div className="w-6 h-1.5 bg-amber-800 rounded-full mt-0.5" />
          </div>

          {/* Floating Rose Petals / Lotus dots */}
          <span className="absolute top-1 left-8 w-2 h-2 rounded-full bg-rose-500/80 blur-[0.5px]" />
          <span className="absolute bottom-2 right-8 w-2 h-2 rounded-full bg-amber-400/80 blur-[0.5px]" />
        </div>

        {/* Traditional Welcome Note */}
        <p className="text-xs text-neutral-300 leading-relaxed font-sans max-w-sm mx-auto">
          রজনীগন্ধার সুবাস আর আলোকমালায় সাজিয়ে তুলছি আপনার জীবনের বিশেষ মুহূর্ত...
        </p>

        {/* Progress Bar with Royal Red and Gold Fill */}
        <div className="space-y-2">
          <div className="w-full bg-[#2d0a10] h-2 rounded-full overflow-hidden border border-[#591422] p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-300 rounded-full transition-all duration-200 ease-out shadow-[0_0_12px_#f59e0b]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span className="font-bengali text-amber-300">শুভ আগমন...</span>
            <span className="text-amber-400 font-bold tabular-nums">{progress}%</span>
          </div>
        </div>

        {/* Instant Enter Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              playAuspiciousChime();
              handleFinish();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-rose-600 to-rose-700 hover:from-amber-500 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-[0_4px_20px_rgba(225,29,72,0.4)] transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
            <span>সরাসরি প্রবেশ করুন (Enter Site)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="text-[10px] text-neutral-500 font-mono">
          Direct Contact: +91 7865824463 • Kolkata
        </div>
      </div>
    </div>
  );
};
