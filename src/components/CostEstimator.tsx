import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { createWhatsAppBookingUrl } from '../utils/storage';

interface CostEstimatorProps {
  onApplyEstimateToBooking: (details: {
    eventType: string;
    venueArea: string;
    estimatedBudget: string;
    notes: string;
  }) => void;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

const EVENT_BASE_OPTIONS = [
  { id: 'proposal-marquee', name: 'Proposal "Marry Me" (4ft Letters)', basePrice: 6999 },
  { id: 'cabana-date', name: 'Boho Cabana & Candlelight Date', basePrice: 4499 },
  { id: 'car-boot', name: 'Secret Car Boot Surprise', basePrice: 2999 },
  { id: 'floral-ring', name: 'Floral Ring & Ring Ceremony Stage', basePrice: 8499 },
  { id: 'bengali-mandap', name: 'Royal Bengali Biye & Mandap', basePrice: 24999 },
];

const VENUE_MULTIPLIERS = [
  { id: 'rooftop', name: 'Rooftop Terrace / Open Air', fee: 0 },
  { id: 'hotel', name: 'Hotel Suite / Banquet Hall', fee: 0 },
  { id: 'home', name: 'Home Living Room / Bedroom', fee: 0 },
  { id: 'lawn', name: 'Private Garden / Eco Park Lawn', fee: 500 },
  { id: 'waterfront', name: 'Princep Ghat / Ganges Boat', fee: 1000 },
];

const AVAILABLE_ADDONS: AddOn[] = [
  { id: 'cold-pyro', name: 'Cold Sparklers (2 Safe Pyros for Ring Moment)', price: 1500, description: 'Safe indoor/outdoor cold flame sparklers' },
  { id: 'guitarist', name: 'Live Romantic Guitarist (30 Mins)', price: 2500, description: 'Live performance of your special love song' },
  { id: 'dry-ice', name: 'Low Fog / Dry Ice Cloud Effect', price: 2000, description: 'Walking on clouds effect during proposal' },
  { id: 'polaroid', name: 'Polaroid Instant Camera (10 Keepsake Prints)', price: 800, description: 'Take instant memories home in an album' },
  { id: 'cake-bouquet', name: 'Dutch Rose Bouquet & Truffle Cake (0.5kg)', price: 1200, description: 'Fresh delivery right to the venue' },
];

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyEstimateToBooking }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>('proposal-marquee');
  const [selectedVenueId, setSelectedVenueId] = useState<string>('rooftop');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['cold-pyro']);

  const selectedEvent = EVENT_BASE_OPTIONS.find((e) => e.id === selectedEventId) || EVENT_BASE_OPTIONS[0];
  const selectedVenue = VENUE_MULTIPLIERS.find((v) => v.id === selectedVenueId) || VENUE_MULTIPLIERS[0];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = AVAILABLE_ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const grandTotal = selectedEvent.basePrice + selectedVenue.fee + addonsTotal;
  const advanceRequired = Math.round(grandTotal * 0.25);

  const handleApply = () => {
    const addonNames = selectedAddons
      .map((id) => AVAILABLE_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    onApplyEstimateToBooking({
      eventType: selectedEvent.name,
      venueArea: selectedVenue.name,
      estimatedBudget: `₹${grandTotal.toLocaleString('en-IN')}`,
      notes: `Add-ons selected: ${addonNames || 'None'}`,
    });
  };

  const handleWhatsApp = () => {
    const addonNames = selectedAddons
      .map((id) => AVAILABLE_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const url = createWhatsAppBookingUrl({
      eventType: selectedEvent.name,
      venueArea: selectedVenue.name,
      customNotes: `Online Estimator Quote: Approx ₹${grandTotal.toLocaleString('en-IN')} (Add-ons: ${addonNames || 'None'})`,
    });
    window.open(url, '_blank');
  };

  return (
    <section id="estimator" className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#150f0c] rounded-3xl border border-[#38241a] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/10 blur-[90px] pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Kolkata Quotation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-100">
            Instant Cost &amp; Add-on Estimator
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans">
            Customize your dream setup with authentic items and get an immediate transparent price estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Base Event Type */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5">
                1. Select Occasion / Setup Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {EVENT_BASE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedEventId(item.id)}
                    className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                      selectedEventId === item.id
                        ? 'bg-[#2a170f] border-amber-500 text-neutral-100 shadow-md ring-1 ring-amber-500/50'
                        : 'bg-[#1b120e] border-[#311f17] text-neutral-300 hover:border-amber-700/50'
                    }`}
                  >
                    <span className="font-semibold line-clamp-1">{item.name}</span>
                    <span className="text-[11px] font-mono text-amber-400 mt-1 font-bold">
                      Starts ₹{item.basePrice.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Venue Setting */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5">
                2. Venue Location Type in Kolkata
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {VENUE_MULTIPLIERS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVenueId(v.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                      selectedVenueId === v.id
                        ? 'bg-[#2a170f] border-amber-500 text-neutral-100 shadow-md ring-1 ring-amber-500/50'
                        : 'bg-[#1b120e] border-[#311f17] text-neutral-300 hover:border-amber-700/50'
                    }`}
                  >
                    <span className="block font-medium truncate">{v.name}</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      {v.fee === 0 ? 'No extra setup fee' : `+₹${v.fee} permit/logistics`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Luxury Add-ons */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5">
                3. Romantic &amp; Celebration Add-ons (Optional)
              </label>
              <div className="space-y-2">
                {AVAILABLE_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#29160e] border-amber-500/80 text-white'
                          : 'bg-[#1b120e] border-[#311f17] text-neutral-300 hover:border-[#42291e]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-amber-500 border-amber-500 text-black'
                              : 'border-neutral-600 bg-black/40'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold">{addon.name}</p>
                          <p className="text-[10px] text-neutral-400">{addon.description}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400 whitespace-nowrap pl-2">
                        +₹{addon.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Breakdown & Action Card: Right Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#1f1410] rounded-2xl border border-[#42291e] p-6 space-y-5 sticky top-20 shadow-xl">
            <h3 className="text-base font-bold font-display text-neutral-100 pb-2 border-b border-[#362218]">
              Estimated Breakdown
            </h3>

            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Base Theme</span>
                <span className="font-mono font-semibold text-neutral-200">
                  ₹{selectedEvent.basePrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Venue Factor</span>
                <span className="font-mono font-semibold text-neutral-200">
                  {selectedVenue.fee > 0 ? `+₹${selectedVenue.fee.toLocaleString('en-IN')}` : 'Included'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Add-ons ({selectedAddons.length})</span>
                <span className="font-mono font-semibold text-neutral-200">
                  +₹{addonsTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#362218]">
                <span className="text-neutral-400">Mullick Ghat Fresh Flowers</span>
                <span className="text-emerald-400 font-semibold">Included Daily</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Kolkata Travel &amp; Dismantling</span>
                <span className="text-emerald-400 font-semibold">100% Free</span>
              </div>
            </div>

            {/* Total Display */}
            <div className="p-4 rounded-xl bg-[#281811] border border-amber-600/40 text-center space-y-1">
              <p className="text-[11px] uppercase tracking-wider text-neutral-400">Estimated Total Cost</p>
              <div className="text-3xl font-mono font-bold text-amber-300 tabular-nums">
                ₹{grandTotal.toLocaleString('en-IN')}
              </div>
              <p className="text-[10px] text-amber-400/90 font-medium">
                Only ~₹{advanceRequired.toLocaleString('en-IN')} advance required to book slot
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleApply}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
              >
                <span>Apply to Booking Form</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-2.5 px-4 rounded-xl bg-[#13271b] hover:bg-[#1a3826] text-emerald-300 border border-emerald-800/60 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Send Estimate to WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
