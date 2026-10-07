import React, { useState } from 'react';
import { CategoryId, GalleryItem } from '../types';
import { Sparkles, MapPin, Check, Eye, X, ArrowUpRight, Heart } from 'lucide-react';

interface PortfolioGalleryProps {
  items: GalleryItem[];
  onSelectForBooking: (item: GalleryItem) => void;
  isAdmin?: boolean;
  onDeleteItem?: (id: string) => void;
}

const CATEGORIES: { id: CategoryId; label: string; labelBengali: string }[] = [
  { id: 'all', label: 'All Portfolio', labelBengali: 'সকল ডেকোরেশন' },
  { id: 'proposals', label: 'Proposals ("Marry Me")', labelBengali: 'রোমান্টিক প্রপোজাল' },
  { id: 'cabana', label: 'Boho Cabana', labelBengali: 'ক্যান্ডেললাইট কাবানা' },
  { id: 'bengali-wedding', label: 'Bengali Biye Mandap', labelBengali: 'বিবাহ ও মণ্ডপ' },
  { id: 'haldi-sangeet', label: 'Gaye Holud & Rings', labelBengali: 'গায়ে হলুদ ও আংটি' },
  { id: 'car-room', label: 'Car Boot & Surprises', labelBengali: 'কার বুট সারপ্রাইজ' },
];

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items,
  onSelectForBooking,
  isAdmin = false,
  onDeleteItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="portfolio" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Real Works in Kolkata</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-100">
          Signature Portfolio &amp; Creations
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 font-sans">
          Browse real setups delivered by Anvarli Decorators across rooftop terraces, banquet halls, and outdoor waterfronts in Kolkata.
        </p>
      </div>

      {/* Filter Tabs (Functional segmented buttons) */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-amber-600 to-rose-700 text-white font-semibold shadow-md'
                : 'bg-[#18110e] text-neutral-300 hover:text-white hover:bg-[#241814] border border-[#302019]'
            }`}
          >
            <span>{cat.label}</span>
            <span className="text-[10px] opacity-75 font-bengali hidden sm:inline">
              ({cat.labelBengali})
            </span>
          </button>
        ))}
      </div>

      {/* Grid: 3D hover cards with single elevation */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-neutral-400 bg-[#16100d] rounded-2xl border border-[#2e1f18]">
          <p className="text-sm">No items found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-[#150f0c] border border-[#2e1f18] hover:border-amber-600/60 transition-all duration-300 flex flex-col card-3d-hover"
            >
              {/* Media Container with Safe Fallback */}
              <div
                className="relative aspect-[4/3] overflow-hidden bg-[#1e1410] cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Floating Tags (Clean typography, no pill sandwich) */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-300 font-semibold border border-amber-500/30 font-mono tabular-nums">
                    From ₹{item.priceStarting.toLocaleString('en-IN')}
                  </span>
                  {item.popular && (
                    <span className="px-2 py-0.5 rounded bg-rose-600/90 text-white text-[11px] font-medium shadow">
                      Most Booked
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
                  <div className="flex items-center gap-1 text-[11px] text-amber-200/90">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{item.locationTag}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                    }}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors"
                    title="View setup in full screen"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-100 font-display group-hover:text-amber-200 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="font-bengali text-xs text-rose-300/80 mt-0.5">
                    {item.titleBengali}
                  </p>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Key Inclusions snippet */}
                <div className="space-y-1.5 pt-2 border-t border-[#261a14]">
                  {item.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                  {item.features.length > 3 && (
                    <p className="text-[10px] text-neutral-400 pl-5">
                      +{item.features.length - 3} more luxury items included
                    </p>
                  )}
                </div>

                {/* Action button */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectForBooking(item)}
                    className="flex-1 py-2.5 px-3 rounded-lg bg-[#241712] hover:bg-gradient-to-r hover:from-amber-600 hover:to-rose-600 hover:text-white text-amber-300 border border-[#402a1f] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 group/btn"
                  >
                    <span>Book This Setup</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  {isAdmin && onDeleteItem && (
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs transition-colors"
                      title="Remove image from gallery"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#140e0b] border border-[#3e271c] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="md:w-1/2 relative bg-black aspect-video md:aspect-auto">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                  <span>Price starting from</span>
                  <span className="text-base font-bold text-amber-300">
                    ₹{selectedItem.priceStarting.toLocaleString('en-IN')}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-neutral-100 mt-1">
                  {selectedItem.title}
                </h3>
                <p className="font-bengali text-sm text-rose-300 mt-0.5">
                  {selectedItem.titleBengali}
                </p>

                <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                    Included in this setup:
                  </p>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {selectedItem.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-[#1f1511] border border-[#33221b] text-xs text-neutral-300">
                  <span className="text-amber-400 font-medium">Service Coverage: </span>
                  Free delivery &amp; same-day setup in Salt Lake, New Town, Topsia, South Kolkata &amp; Howrah.
                </div>
              </div>

              <div className="pt-4 border-t border-[#291b15] flex gap-2">
                <button
                  onClick={() => {
                    const itemToBook = selectedItem;
                    setSelectedItem(null);
                    onSelectForBooking(itemToBook);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-rose-700 hover:from-amber-500 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>Inquire This Exact Look</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
