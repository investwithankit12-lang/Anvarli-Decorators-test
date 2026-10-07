import React from 'react';
import biyeBariImg from '@/src/assets/images/biye_bari_illumination_1791394487510.jpg';
import mandapImg from '@/src/assets/images/decor_bengali_royal_mandap_1791392823123.jpg';

export const BiyeBariBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Bengali Biye Bari Night Illumination Backdrop (Prominently visible wedding house facade) */}
      <div className="absolute inset-0">
        <img
          src={biyeBariImg}
          alt="Bengali Wedding House Atmosphere"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top opacity-35"
        />
        {/* Secondary lower blend with royal Bengali mandap ambiance */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 opacity-25">
          <img
            src={mandapImg}
            alt="Royal Bengali Wedding Mandap Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        {/* Sophisticated Luxury Dark Red & Amber Scrim Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0908]/90 via-[#0c0908]/80 to-[#0c0908]/95" />
        <div className="absolute inset-0 bg-radial from-amber-600/10 via-rose-900/10 to-[#0c0908]/90" />
      </div>

      {/* 2. Hanging Kolkata Biye Bari Fairy Light Festoon Strings across top */}
      <div className="absolute top-0 left-0 right-0 h-14 flex justify-between px-2 sm:px-6 z-10 opacity-90">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-px bg-amber-400/40"
              style={{ height: `${(i % 5) * 5 + 8}px` }}
            />
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                i % 4 === 0
                  ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]'
                  : i % 4 === 1
                  ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'
                  : i % 4 === 2
                  ? 'bg-yellow-300 shadow-[0_0_10px_#fde047]'
                  : 'bg-orange-400 shadow-[0_0_10px_#fb923c]'
              } animate-fairy-flicker`}
              style={{ animationDelay: `${(i * 0.12).toFixed(2)}s` }}
            />
          </div>
        ))}
      </div>

      {/* 3. Golden Marigold & Red Alta Border Toran at Top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-rose-600 to-amber-500 opacity-95 shadow-[0_2px_15px_rgba(245,158,11,0.7)]" />

      {/* 4. Ambient Wedding Warmth Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-600/15 rounded-full blur-[140px]" />
      <div className="absolute top-2/3 -right-32 w-96 h-96 bg-rose-600/15 rounded-full blur-[140px]" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px]" />
    </div>
  );
};
