import React, { useState, useEffect } from 'react';
import { CustomerInquiry, GalleryItem, ServicePackage } from './types';
import {
  getStoredGallery,
  saveStoredGallery,
  getStoredInquiries,
  saveStoredInquiries,
  getStoredPackages,
  saveStoredPackages,
  getAdminPin,
  setAdminPin,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BengaliAestheticBanner } from './components/BengaliAestheticBanner';
import { PortfolioGallery } from './components/PortfolioGallery';
import { PackagesSection } from './components/PackagesSection';
import { CostEstimator } from './components/CostEstimator';
import { BookingForm } from './components/BookingForm';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { BengaliBiyeBariLoader } from './components/BengaliBiyeBariLoader';
import { BiyeBariBackground } from './components/BiyeBariBackground';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [adminPin, setPinState] = useState<string>('1234');
  const [isAdminActive, setIsAdminActive] = useState(false);

  // Booking pre-fill state
  const [prefilledBookingData, setPrefilledBookingData] = useState<{
    eventType?: string;
    venueArea?: string;
    estimatedBudget?: string;
    packageSelected?: string;
    notes?: string;
  }>({});

  // Initialize storage
  useEffect(() => {
    const loadedGallery = getStoredGallery();
    const loadedInquiries = getStoredInquiries();
    const loadedPackages = getStoredPackages();
    const loadedPin = getAdminPin();

    setGalleryItems(loadedGallery);
    setInquiries(loadedInquiries);
    setPackages(loadedPackages);
    setPinState(loadedPin);
  }, []);

  // Handlers for state updates with localStorage sync
  const handleUpdateInquiries = (newInquiries: CustomerInquiry[]) => {
    setInquiries(newInquiries);
    saveStoredInquiries(newInquiries);
  };

  const handleUpdateGallery = (newGallery: GalleryItem[]) => {
    setGalleryItems(newGallery);
    saveStoredGallery(newGallery);
  };

  const handleUpdatePackages = (newPackages: ServicePackage[]) => {
    setPackages(newPackages);
    saveStoredPackages(newPackages);
  };

  const handleUpdatePin = (newPin: string) => {
    setPinState(newPin);
    setAdminPin(newPin);
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectGalleryItemForBooking = (item: GalleryItem) => {
    setPrefilledBookingData({
      eventType: item.title,
      venueArea: item.locationTag,
      estimatedBudget: `Starting ₹${item.priceStarting.toLocaleString('en-IN')}`,
      notes: `Interested in setup: ${item.title} (${item.features.join(', ')})`,
    });
    scrollToBooking();
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    setPrefilledBookingData({
      eventType: pkg.name,
      packageSelected: pkg.name,
      estimatedBudget: `₹${pkg.price.toLocaleString('en-IN')}`,
      notes: `Selected Package: ${pkg.name} (Deposit: ₹${pkg.depositAmount.toLocaleString('en-IN')})`,
    });
    scrollToBooking();
  };

  const handleApplyEstimate = (details: {
    eventType: string;
    venueArea: string;
    estimatedBudget: string;
    notes: string;
  }) => {
    setPrefilledBookingData({
      eventType: details.eventType,
      venueArea: details.venueArea,
      estimatedBudget: details.estimatedBudget,
      notes: details.notes,
    });
    scrollToBooking();
  };

  const handleNewInquiryCreated = (newInquiry: CustomerInquiry) => {
    const updated = [newInquiry, ...inquiries];
    handleUpdateInquiries(updated);
  };

  // If owner is in admin mode, show the full admin dashboard
  if (isAdminActive) {
    return (
      <AdminDashboard
        inquiries={inquiries}
        galleryItems={galleryItems}
        packages={packages}
        onUpdateInquiries={handleUpdateInquiries}
        onUpdateGallery={handleUpdateGallery}
        onUpdatePackages={handleUpdatePackages}
        onCloseAdmin={() => setIsAdminActive(false)}
        adminPin={adminPin}
        onUpdatePin={handleUpdatePin}
      />
    );
  }

  return (
    <>
      {/* 1. Bengali Biye Bari Opening / Loading Page */}
      {isLoading && (
        <BengaliBiyeBariLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Main Luxury Website with Bengali Biye Bari Ambient Theme */}
      <div className="min-h-screen flex flex-col bg-[#0c0908] text-[#f7f3ed] selection:bg-[#d97706] selection:text-white relative">
        {/* Bengali Biye Bari Background Layer */}
        <BiyeBariBackground />

        {/* Top Navbar */}
        <div className="relative z-40">
          <Navbar
            onOpenAdmin={() => setIsAdminActive(true)}
            isAdminActive={isAdminActive}
            onBookClick={scrollToBooking}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 relative z-10">
          {/* Hero Section */}
          <Hero
            onExploreGallery={() => {
              const el = document.getElementById('portfolio');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onBookClick={scrollToBooking}
          />

          {/* Bengali Cultural Aesthetic & Heritage Section */}
          <BengaliAestheticBanner />

          {/* Portfolio Gallery Section */}
          <PortfolioGallery
            items={galleryItems}
            onSelectForBooking={handleSelectGalleryItemForBooking}
          />

          {/* Packages & Pricing Section */}
          <PackagesSection
            packages={packages}
            onSelectPackage={handleSelectPackage}
          />

          {/* Instant Cost & Add-on Estimator */}
          <CostEstimator
            onApplyEstimateToBooking={handleApplyEstimate}
          />

          {/* Direct Booking & Date Reservation Form */}
          <BookingForm
            prefilledData={prefilledBookingData}
            onNewInquiryCreated={handleNewInquiryCreated}
          />

          {/* Testimonials */}
          <Testimonials />
        </main>

        {/* Footer */}
        <div className="relative z-10">
          <Footer onOpenAdmin={() => setIsAdminActive(true)} />
        </div>
      </div>
    </>
  );
}
