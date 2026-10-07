import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CustomerInquiry } from '../types';
import { Sparkles, Calendar, MapPin, Phone, User, MessageSquare, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { KOLKATA_SERVICE_AREAS } from '../data/initialData';
import { PHONE_NUMBER, createWhatsAppBookingUrl } from '../utils/storage';

interface BookingFormProps {
  prefilledData?: {
    eventType?: string;
    venueArea?: string;
    estimatedBudget?: string;
    packageSelected?: string;
    notes?: string;
  };
  onNewInquiryCreated: (inquiry: CustomerInquiry) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ prefilledData, onNewInquiryCreated }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('Twilight "Marry Me" Marquee Grandeur');
  const [preferredDate, setPreferredDate] = useState('');
  const [venueArea, setVenueArea] = useState('Salt Lake (All Sectors)');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastInquiry, setLastInquiry] = useState<CustomerInquiry | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle pre-fills from Gallery or Estimator
  useEffect(() => {
    if (prefilledData) {
      if (prefilledData.eventType) setEventType(prefilledData.eventType);
      if (prefilledData.venueArea) {
        // If it matches an area or use as custom
        const match = KOLKATA_SERVICE_AREAS.find((a) =>
          prefilledData.venueArea?.toLowerCase().includes(a.toLowerCase().split(' ')[0])
        );
        if (match) setVenueArea(match);
      }
      if (prefilledData.notes) setSpecialNotes(prefilledData.notes);
    }
  }, [prefilledData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!preferredDate) {
      setErrorMessage('Please select your preferred event date.');
      return;
    }

    const newInquiry: CustomerInquiry = {
      id: `inq-${Date.now()}`,
      customerName: customerName.trim(),
      phone: cleanPhone,
      email: email.trim() || undefined,
      eventType,
      preferredDate,
      venueArea,
      packageSelected: prefilledData?.packageSelected || eventType,
      estimatedBudget: prefilledData?.estimatedBudget,
      specialNotes: specialNotes.trim() || undefined,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    onNewInquiryCreated(newInquiry);
    setLastInquiry(newInquiry);
    setIsSubmitted(true);

    // Trigger romantic celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#e11d48', '#fbbf24', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="booking" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-b from-[#18100d] via-[#150e0b] to-[#0f0907] rounded-3xl border border-[#3e271c] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 blur-[100px] pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Your Special Moment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-100">
            Direct Inquiry &amp; Date Reservation
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans">
            Tell us your date and venue in Kolkata. Our lead decorator will confirm availability and send your itemized proposal within 30 minutes.
          </p>
        </div>

        {isSubmitted && lastInquiry ? (
          <div className="bg-[#1e130f] border border-amber-600/40 rounded-2xl p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-display text-white">
                Inquiry Received, {lastInquiry.customerName}! 🌹
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                Your request has been logged in Anvarli Decorators’ system for <strong>{lastInquiry.preferredDate}</strong> at <strong>{lastInquiry.venueArea}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#281812] border border-[#402619] max-w-md mx-auto text-left text-xs space-y-1.5 text-neutral-300">
              <p><strong className="text-amber-400">Occasion:</strong> {lastInquiry.eventType}</p>
              <p><strong className="text-amber-400">Phone:</strong> +91 {lastInquiry.phone}</p>
              {lastInquiry.estimatedBudget && (
                <p><strong className="text-amber-400">Estimate:</strong> {lastInquiry.estimatedBudget}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
              <a
                href={createWhatsAppBookingUrl({
                  customerName: lastInquiry.customerName,
                  phone: lastInquiry.phone,
                  eventType: lastInquiry.eventType,
                  preferredDate: lastInquiry.preferredDate,
                  venueArea: lastInquiry.venueArea,
                  customNotes: lastInquiry.specialNotes,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl bg-[#122e1e] hover:bg-[#1a442c] text-emerald-300 border border-emerald-700/60 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Confirm on WhatsApp Instantly</span>
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="py-3 px-5 rounded-xl bg-[#2b1710] hover:bg-[#381e15] text-amber-300 border border-amber-800/60 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Anvarli: {PHONE_NUMBER}</span>
              </a>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setCustomerName('');
                setPhone('');
                setSpecialNotes('');
              }}
              className="text-xs text-neutral-400 hover:text-white underline pt-2 block mx-auto"
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Your Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subhashish Roy"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#1e130f] border border-[#3e271c] focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phone Number (Call/WhatsApp) *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm text-neutral-400 font-mono">+91</span>
                  <input
                    type="tel"
                    required
                    placeholder="98301 23456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1e130f] border border-[#3e271c] focus:border-amber-500 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-neutral-500 outline-none font-mono transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Event Type */}
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Occasion Type *
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-[#1e130f] border border-[#3e271c] focus:border-amber-500 rounded-xl px-3 py-3 text-xs sm:text-sm text-white outline-none transition-colors"
                >
                  <option value='Twilight "Marry Me" Marquee Grandeur'>Proposal ("Marry Me" Letters)</option>
                  <option value="Boho Candlelit Cabana & Dinner Romance">Boho Cabana &amp; Candlelight Date</option>
                  <option value="Secret Car Boot Midnight Surprise">Car Boot Midnight Surprise</option>
                  <option value="Shuvo Bibaho Royal Mandap & Stage">Bengali Biye &amp; Royal Mandap</option>
                  <option value="Gaye Holud & Ring Ceremony Sunshine Glow">Gaye Holud &amp; Ring Ceremony</option>
                  <option value="Custom Surprise / Anniversary Decor">Other Custom Decor</option>
                </select>
              </div>

              {/* Preferred Date */}
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Target Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#1e130f] border border-[#3e271c] focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors [color-scheme:dark]"
                />
              </div>

              {/* Venue Area in Kolkata */}
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kolkata Location *</span>
                </label>
                <select
                  value={venueArea}
                  onChange={(e) => setVenueArea(e.target.value)}
                  className="w-full bg-[#1e130f] border border-[#3e271c] focus:border-amber-500 rounded-xl px-3 py-3 text-xs sm:text-sm text-white outline-none transition-colors"
                >
                  {KOLKATA_SERVICE_AREAS.map((area, i) => (
                    <option key={i} value={area}>
                      {area}
                    </option>
                  ))}
                  <option value="Other Area (Kolkata Suburban)">Other Area (Kolkata Suburban)</option>
                </select>
              </div>
            </div>

            {/* Special Instructions & Secret Surprise Timing */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Special Surprise Notes (Timing, partner&apos;s preferences, songs)</span>
              </label>
              <textarea
                rows={3}
                placeholder="e.g. It is a surprise rooftop proposal. Setup needs to be ready by 6:00 PM before she arrives. She prefers red roses over balloons."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full bg-[#1e130f] border border-[#3e271c] focus:border-amber-500 rounded-xl p-4 text-sm text-white placeholder-neutral-500 outline-none transition-colors"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct inquiry reaches Anvarli Decorators ({PHONE_NUMBER}) immediately.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-rose-600 to-rose-700 hover:from-amber-500 hover:to-rose-600 text-white font-bold text-sm shadow-[0_4px_25px_rgba(225,29,72,0.35)] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Submit &amp; Check Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
