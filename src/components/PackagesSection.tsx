import React from 'react';
import { ServicePackage } from '../types';
import { Sparkles, Check, Heart, ArrowRight } from 'lucide-react';

interface PackagesSectionProps {
  packages: ServicePackage[];
  onSelectPackage: (pkg: ServicePackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ packages, onSelectPackage }) => {
  return (
    <section id="packages" className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-[#0c0908]/90 via-[#140c09]/80 to-[#0c0908]/90 border-t border-[#261913]">
      {/* Ambient festive lighting orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Kolkata Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-100">
            Tailored Experiences &amp; Pricing
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-sans">
            No hidden charges or last-minute surprises. Complete setup, fresh flowers, lighting, and pack-up handled smoothly by Anvarli Decorators.
          </p>
        </div>

        {/* Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-[#281711] via-[#1c110d] to-[#120b08] border-2 border-amber-500/80 shadow-[0_10px_40px_rgba(245,158,11,0.2)] md:-translate-y-2'
                  : 'bg-[#150f0c] border border-[#302018] hover:border-amber-700/60 shadow-lg'
              }`}
            >
              {/* Popular Crown */}
              {pkg.isPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-rose-600 text-black font-bold text-[11px] px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow">
                  ★ Most Popular in Kolkata
                </div>
              )}

              {/* Top Banner Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150f0c] via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="font-bengali text-xs text-amber-300 font-medium bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {pkg.tagBengali}
                  </span>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-display text-neutral-100">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {pkg.subtitle}
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-4 p-3.5 rounded-xl bg-[#1e130f] border border-[#382319] flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-neutral-500 line-through font-mono tabular-nums">
                          ₹{pkg.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                        Advance to Lock: ₹{pkg.depositAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-neutral-400 block">Same-Day Slot</span>
                      <span className="text-[11px] text-amber-400 font-medium">Free Kolkata Travel</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-5 space-y-2.5">
                    <p className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider">
                      Setup Inclusions:
                    </p>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Venue Recommendation */}
                  <div className="mt-4 pt-3 border-t border-[#2d1c14] text-[11px] text-neutral-400">
                    <span className="text-amber-400/90 font-medium">Ideal For: </span>
                    {pkg.idealFor}
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group ${
                      pkg.isPopular
                        ? 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white shadow-lg'
                        : 'bg-[#261711] hover:bg-[#331f17] text-amber-300 border border-[#482c1f]'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current opacity-70" />
                    <span>Reserve Package</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
