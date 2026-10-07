import React from 'react';
import { Sparkles, Flame, Flower2, HeartHandshake } from 'lucide-react';
import mandapImg from '@/src/assets/images/decor_bengali_royal_mandap_1791392823123.jpg';

export const BengaliAestheticBanner: React.FC = () => {
  return (
    <section id="bengali-vibe" className="py-16 bg-gradient-to-b from-[#120b09] via-[#1a0e0b] to-[#120b09] border-y border-[#3d271e]/70 relative overflow-hidden">
      {/* Real Bengali Wedding Mandap Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={mandapImg}
          alt="Bengali Wedding Mandap Tradition"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120b09] via-[#120b09]/80 to-[#120b09]" />
        <div className="absolute inset-0 bg-alpana-pattern opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bengali">খাঁটি ঐতিহ্য ও আধুনিক লাক্সারির মেলবন্ধন</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-100">
            Bengali Soul, Royal Elegance
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
            From vintage North Kolkata &lsquo;Bonedi Bari&rsquo; charm to modern Salt Lake &amp; New Town rooftop magic — Anvarli Decorators blends sacred Bengali traditions with world-class romantic design.
          </p>
        </div>

        {/* 4 Cultural Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {/* 1. Rajnigandha & Genda Phool */}
          <div className="p-5 rounded-xl bg-[#1d120e]/90 border border-[#3e271d] hover:border-amber-600/50 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-amber-950/70 border border-amber-800/50 flex items-center justify-center text-amber-300 mb-3.5 group-hover:scale-110 transition-transform">
              <Flower2 className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-100 font-display">
              রজনীগন্ধা ও খাঁটি গাঁদা ফুল
            </h3>
            <p className="text-xs text-amber-300/80 font-medium mt-0.5">Fresh Botanical Fragrance</p>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              We source fragrant tuberose (Rajnigandha) and Dutch roses daily from Mullick Ghat, ensuring your mandap and proposal path smell heavenly.
            </p>
          </div>

          {/* 2. Shuvo Porinoy & Alpana Artistry */}
          <div className="p-5 rounded-xl bg-[#1d120e]/90 border border-[#3e271d] hover:border-amber-600/50 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-rose-950/70 border border-rose-800/50 flex items-center justify-center text-rose-300 mb-3.5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-100 font-display">
              হাতে আঁকা আলপনা ও শুভ পরিণয়
            </h3>
            <p className="text-xs text-rose-300/80 font-medium mt-0.5">Handcrafted Motifs</p>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Intricate white rice-paste inspired alpana floor designs, terracotta kulos, and auspicious Bengali marriage insignia crafted with precision.
            </p>
          </div>

          {/* 3. Brass Urlis & Diya Illumination */}
          <div className="p-5 rounded-xl bg-[#1d120e]/90 border border-[#3e271d] hover:border-amber-600/50 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-amber-950/70 border border-amber-800/50 flex items-center justify-center text-amber-300 mb-3.5 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-100 font-display">
              পিতলের উরলি ও পদ্ম ফুলের প্রদীপ
            </h3>
            <p className="text-xs text-amber-300/80 font-medium mt-0.5">Sacred Candlelit Aura</p>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Antique brass vessels with floating red water lilies, lotus buds, and warm earthen lamps creating timeless, cinematic photo memories.
            </p>
          </div>

          {/* 4. Complete Peace of Mind */}
          <div className="p-5 rounded-xl bg-[#1d120e]/90 border border-[#3e271d] hover:border-amber-600/50 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/70 border border-emerald-800/50 flex items-center justify-center text-emerald-300 mb-3.5 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-100 font-display">
              অনভরলী টিম গ্যারান্টি
            </h3>
            <p className="text-xs text-emerald-300/80 font-medium mt-0.5">Flawless Secret Execution</p>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Direct master decorators on-site. We reach 2 hours early, test every light and candle, and clean up completely after your special night.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
