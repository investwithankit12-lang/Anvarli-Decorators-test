import React, { useState } from 'react';
import { Phone, MessageCircle, ShieldCheck, Menu, X, Sparkles } from 'lucide-react';
import { PHONE_NUMBER } from '../utils/storage';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminActive: boolean;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isAdminActive, onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0c0908]/90 border-b border-[#2d221c]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#"
            className="flex items-center gap-2 group text-amber-200 font-brand font-bold text-base sm:text-lg tracking-wider whitespace-nowrap"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_12px_#f59e0b] group-hover:scale-125 transition-transform" />
            <span className="bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent">
              ANVARLI DECORATORS
            </span>
          </a>

          {/* Zone 2: Navigation Links (Clean text, 1-2 word labels) */}
          <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-neutral-300">
            <a href="#portfolio" className="hover:text-amber-300 transition-colors">
              Portfolio
            </a>
            <a href="#packages" className="hover:text-amber-300 transition-colors">
              Packages
            </a>
            <a href="#estimator" className="hover:text-amber-300 transition-colors">
              Estimator
            </a>
            <a href="#bengali-vibe" className="hover:text-amber-300 transition-colors">
              Heritage
            </a>
            <a href="#reviews" className="hover:text-amber-300 transition-colors">
              Reviews
            </a>
            <a href="#booking" className="hover:text-amber-300 transition-colors">
              Book Setup
            </a>
          </nav>

          {/* Zone 3: Primary Actions (Direct Call / WhatsApp / Admin) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenAdmin}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 border transition-all whitespace-nowrap ${
                isAdminActive
                  ? 'bg-amber-500 text-black border-amber-400 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#1a1412] text-neutral-300 border-[#3d2d24] hover:border-amber-500/60 hover:text-white'
              }`}
              title="Owner Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isAdminActive ? 'Exit Admin' : 'Owner Portal'}</span>
              <span className="sm:hidden">Owner</span>
            </button>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#1f1612] text-amber-300 border border-amber-900/60 hover:border-amber-600 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <button
              onClick={onBookClick}
              className="px-3.5 py-1.5 text-xs font-extrabold rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-amber-200/80 transition-all whitespace-nowrap flex items-center gap-1 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              <span>Inquire Now</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#120d0b] border-b border-[#2d221c] px-4 pt-3 pb-4 space-y-2 text-sm text-neutral-300">
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-md hover:bg-[#201612] hover:text-amber-300"
            >
              Portfolio Gallery
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-md hover:bg-[#201612] hover:text-amber-300"
            >
              Service Packages & Rates
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-md hover:bg-[#201612] hover:text-amber-300"
            >
              Instant Cost Calculator
            </a>
            <a
              href="#bengali-vibe"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-md hover:bg-[#201612] hover:text-amber-300"
            >
              Bengali Wedding & Tradition
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-md hover:bg-[#201612] hover:text-amber-300"
            >
              Couple Testimonials
            </a>
            <a
              href="#booking"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="block py-2 px-3 rounded-md text-amber-400 font-medium hover:bg-[#201612]"
            >
              Direct Booking Form
            </a>
            <div className="pt-2 border-t border-[#261914] flex items-center justify-between">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
              <a
                href={`https://wa.me/91${PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Quick Action Bottom Bar (Strictly < 15% viewport height) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#0c0908]/95 backdrop-blur-lg border-t border-[#38261e] px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-8px_20px_rgba(0,0,0,0.7)]">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#1f1511] text-amber-300 border border-amber-900/60 text-xs font-semibold active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call 7865824463</span>
        </a>

        <a
          href={`https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent('Hello Anvarli Decorators! I want to inquire about a proposal/event setup in Kolkata.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#0e2a1b] text-emerald-300 border border-emerald-900/80 text-xs font-semibold active:scale-95 transition-transform"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onBookClick}
          className="flex-1 flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-slate-950 text-xs font-black shadow-[0_0_18px_rgba(245,158,11,0.6)] border border-amber-200/80 active:scale-95 transition-transform"
        >
          <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
          <span>Book Setup</span>
        </button>
      </div>
    </>
  );
};
