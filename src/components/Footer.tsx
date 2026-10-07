import React from 'react';
import { Phone, MessageCircle, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { PHONE_NUMBER } from '../utils/storage';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#080504] border-t border-[#261711] text-neutral-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#1f130e]">
          {/* Brand info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-brand font-bold text-lg text-amber-200 tracking-wider">
              ANVARLI DECORATORS
            </span>
            <p className="font-bengali text-xs text-rose-300/80">
              কলকাতার সেরা রোমান্টিক প্রপোজাল ও শুভ পরিণয় ডেকোরেশন
            </p>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Crafting breathtaking moments across Kolkata and Howrah. Specializing in luxury rooftop proposals, &ldquo;MARRY ME&rdquo; marquees, bohemian candlelit cabanas, and royal Bengali wedding mandaps.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-300 font-mono">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Kolkata &amp; Howrah • 24/7 Service • Zero Travel Surcharge</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li>
                <a href="#portfolio" className="hover:text-amber-300 transition-colors">
                  Portfolio Gallery
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-300 transition-colors">
                  Packages &amp; Rates
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-300 transition-colors">
                  Instant Cost Calculator
                </a>
              </li>
              <li>
                <a href="#bengali-vibe" className="hover:text-amber-300 transition-colors">
                  Bengali Heritage Tradition
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-300 transition-colors">
                  Client Testimonials
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-amber-300 transition-colors">
                  Direct Date Reservation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct & Owner Action (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Direct Booking Contact
            </h4>
            <p className="text-xs text-neutral-400">
              Call or message on WhatsApp anytime for urgent same-day bookings or customized wedding quotations:
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#140d0a] border border-[#2d1b14] hover:border-amber-600/60 text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="font-mono font-bold text-sm tabular-nums">+91 {PHONE_NUMBER}</span>
              </a>

              <a
                href={`https://wa.me/91${PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0d1d13] border border-emerald-900/60 hover:border-emerald-600 text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-xs">WhatsApp Direct Chat</span>
              </a>
            </div>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-amber-400 pt-2 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner Dashboard Login</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} Anvarli Decorators. All rights reserved.</p>
          <p className="flex items-center gap-1 text-neutral-400">
            Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Kolkata&apos;s timeless love stories
          </p>
        </div>
      </div>
    </footer>
  );
};
