import React from 'react';
import { TESTIMONIALS } from '../data/initialData';
import { Star, MapPin, Quote, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#261913]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Real Celebrations in Kolkata</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-100">
          Couples Who Said &ldquo;Yes!&rdquo;
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 font-sans">
          Over 480 proposals, weddings, and anniversaries brought to life with passion, punctuality, and pure elegance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#140e0b] border border-[#302018] flex flex-col justify-between space-y-4 hover:border-amber-600/50 transition-colors relative"
          >
            <Quote className="w-8 h-8 text-amber-700/30 absolute top-4 right-4 pointer-events-none" />

            <div className="space-y-3">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>

              {item.quoteBengali && (
                <p className="text-xs font-bengali text-rose-300/80 pt-1 border-t border-[#281b15]">
                  {item.quoteBengali}
                </p>
              )}
            </div>

            {/* Author */}
            <div className="pt-3 border-t border-[#261a14] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800 border border-amber-600/40">
                <img
                  src={item.image}
                  alt={item.names}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-100 font-display">{item.names}</p>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                  <MapPin className="w-2.5 h-2.5 text-rose-400" />
                  <span>{item.area}</span>
                  <span>•</span>
                  <span className="text-amber-400">{item.occasion}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Adjacency Trust Card */}
      <div className="mt-10 p-5 rounded-2xl bg-[#1a110e] border border-[#362218] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950 flex items-center justify-center text-amber-400 border border-amber-800/60 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-100">100% On-Time Secret Setup Guarantee</h4>
            <p className="text-xs text-neutral-400">If our setup is not 100% ready by your requested surprise time, we refund your advance.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-300 font-mono">Owner Direct:</span>
          <span className="text-sm font-bold text-amber-300 font-mono tabular-nums">7865824463</span>
        </div>
      </div>
    </section>
  );
};
