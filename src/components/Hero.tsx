import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import heroProposalImg from '@/src/assets/images/hero_kolkata_proposal_1791392792894.jpg';
import biyeBariImg from '@/src/assets/images/biye_bari_illumination_1791394487510.jpg';
import { PHONE_NUMBER } from '../utils/storage';

interface HeroProps {
  onExploreGallery: () => void;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGallery, onBookClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-alpana-pattern">
      {/* Background Bengali Biye Bari Lighting Scrim */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={biyeBariImg}
          alt="Kolkata Wedding Celebration Lighting"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 filter blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0908]/90 via-[#0c0908]/50 to-[#0c0908]" />
      </div>

      {/* Ambient Bengali Warm Lighting Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amber-600/20 via-rose-600/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-900/25 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text Column: Proposition & Cultural Tone */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Cultural Bengali Seal & Tagline */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#1e130f] border border-amber-900/60 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-bengali text-amber-300 text-xs sm:text-sm tracking-wide">
                কলকাতার প্রিমিয়াম রোমান্টিক প্রপোজাল ও বিবাহ ডেকোরেশন
              </span>
            </div>

            {/* Primary Headline with Enhanced Luminosity & Brightness */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.15] text-balance drop-shadow-[0_2px_25px_rgba(0,0,0,0.9)]">
              Where Forever Begins Under the Lights of{' '}
              <span className="bg-gradient-to-r from-yellow-200 via-amber-300 to-amber-400 bg-clip-text text-transparent italic drop-shadow-[0_0_30px_rgba(245,158,11,0.7)] font-extrabold">
                Kolkata
              </span>
            </h1>

            {/* Sub-proposition with crisp clear contrast */}
            <p className="text-base sm:text-lg text-neutral-100 leading-relaxed font-sans max-w-2xl drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)]">
              Turn your dream proposal, rooftop cabana date, or Bengali wedding into pure magic. 
              From 4ft glowing &ldquo;MARRY ME&rdquo; marquee letters to fragrant Rajnigandha mandaps, 
              <strong className="text-amber-300 font-bold"> Anvarli Decorators</strong> crafts breathless moments across Kolkata &amp; Howrah.
            </p>

            {/* Trust points: High-Visibility Glowing Badges with Pure White High-Contrast Text */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2.5 bg-[#180e0a]/95 p-3 rounded-xl border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)]">
                <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0 stroke-[2.5] drop-shadow-[0_0_8px_#fde047]" />
                <span className="font-black text-white text-xs sm:text-sm tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  Same-Day Booking
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#180e0a]/95 p-3 rounded-xl border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)]">
                <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0 stroke-[2.5] drop-shadow-[0_0_8px_#fde047]" />
                <span className="font-black text-white text-xs sm:text-sm tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  Fresh Dutch Roses
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#180e0a]/95 p-3 rounded-xl border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)]">
                <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0 stroke-[2.5] drop-shadow-[0_0_8px_#fde047]" />
                <span className="font-black text-white text-xs sm:text-sm tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  No Travel Fee in City
                </span>
              </div>
            </div>

            {/* Action Buttons: Ultra-Bright Text and Radiant Glowing Surfaces */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onBookClick}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-600 to-rose-700 hover:from-amber-400 hover:via-rose-500 hover:to-rose-600 text-white font-black text-sm sm:text-base shadow-[0_0_35px_rgba(245,158,11,0.7)] hover:shadow-[0_0_50px_rgba(245,158,11,0.9)] border-2 border-amber-300 transition-all flex items-center gap-2.5 group active:scale-[0.98] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse drop-shadow-[0_0_6px_#fde047]" />
                <span className="tracking-wide text-white font-black drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  Book Proposal Setup
                </span>
                <ArrowRight className="w-4 h-4 text-yellow-300 group-hover:translate-x-1.5 transition-transform stroke-[3]" />
              </button>

              <button
                onClick={onExploreGallery}
                className="px-6 py-3.5 rounded-xl bg-[#24140e]/95 hover:bg-[#341d14] text-white border-2 border-amber-300 hover:border-yellow-300 shadow-[0_0_20px_rgba(245,158,11,0.35)] text-sm sm:text-base font-black transition-all drop-shadow-[0_1px_4px_rgba(0,0,0,1)]"
              >
                View 2026 Portfolio
              </button>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-yellow-300 bg-[#1c0f0a]/95 border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:bg-[#28150e] text-sm sm:text-base font-black transition-all drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#fde047] animate-ping" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>

            {/* Adjacency Proof: Bright High-Contrast Ratings & Metric Texts */}
            <div className="p-4 rounded-2xl bg-[#160b07]/95 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.3)] flex items-center justify-between gap-4 text-xs">
              <div className="text-left flex-1">
                <span className="font-black text-yellow-300 text-2xl font-mono tabular-nums block drop-shadow-[0_0_14px_rgba(253,224,71,0.85)]">
                  480+
                </span>
                <p className="text-white font-extrabold text-xs sm:text-sm mt-1 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  Proposals Decorated
                </p>
              </div>
              <div className="h-10 w-px bg-amber-400/60" />
              <div className="text-left flex-1">
                <span className="font-black text-yellow-300 text-2xl font-mono tabular-nums block drop-shadow-[0_0_14px_rgba(250,204,21,0.9)]">
                  4.9★
                </span>
                <p className="text-white font-extrabold text-xs sm:text-sm mt-1 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  Google Rating
                </p>
              </div>
              <div className="h-10 w-px bg-amber-400/60" />
              <div className="text-left flex-1">
                <span className="font-black text-emerald-300 text-2xl font-mono tabular-nums block drop-shadow-[0_0_14px_rgba(110,231,183,0.9)]">
                  100%
                </span>
                <p className="text-white font-extrabold text-xs sm:text-sm mt-1 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                  On-Time Surprise
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Depth Card with Parallax Tilt Effect */}
          <div
            className="lg:col-span-5 perspective-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative rounded-2xl p-2 bg-gradient-to-b from-[#382319] via-[#201511] to-[#120c0a] border border-[#4d3224] shadow-[0_20px_50px_rgba(0,0,0,0.85)] preserve-3d transition-transform duration-200 ease-out"
              style={{
                transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
              }}
            >
              {/* Image Container with Luxury Scrim */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
                <img
                  src={heroProposalImg}
                  alt="Luxury rooftop proposal in Kolkata with MARRY ME marquee letters"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Scrim Overlay with Bengali Artistic Touch */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-amber-500/40 text-[11px] text-amber-300 font-medium mb-1.5 w-fit">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                    <span>Signature Kolkata Skyline Setup</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-tight">
                    Twilight Rooftop &ldquo;Marry Me&rdquo; Grandeur
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                    4ft warm marquee letters, 1,200+ rose petals aisle, hurricane glass candles &amp; starlit canopy.
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/10">
                    <div className="text-amber-300 font-semibold font-mono tabular-nums">
                      Starts ₹6,999 <span className="line-through text-neutral-500 text-[11px]">₹9,499</span>
                    </div>
                    <span className="text-rose-400 font-bengali text-xs">
                      সবচেয়ে জনপ্রিয়
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating 3D Accent Badge */}
              <div
                className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#1a110d] border border-amber-600/50 p-3 sm:p-3.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3 transition-transform"
                style={{
                  transform: `translateZ(30px)`,
                }}
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Kolkata Fast Dispatch</p>
                  <p className="text-xs font-semibold text-neutral-100">Same-Day Slots Open</p>
                  <p className="text-[10px] text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-rose-500" />
                    <span>Salt Lake • New Town • Howrah</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
