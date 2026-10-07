import React, { useState } from 'react';
import { CustomerInquiry, GalleryItem, InquiryStatus, ServicePackage, CategoryId } from '../types';
import {
  ShieldCheck,
  Users,
  Image as ImageIcon,
  Tag,
  Phone,
  MessageCircle,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle,
  Calendar,
  Lock,
  Unlock,
  KeyRound,
  Download,
} from 'lucide-react';
import heroProposalImg from '@/src/assets/images/hero_kolkata_proposal_1791392792894.jpg';
import cabanaImg from '@/src/assets/images/decor_cabana_candlelight_1791392809948.jpg';
import mandapImg from '@/src/assets/images/decor_bengali_royal_mandap_1791392823123.jpg';
import carBootImg from '@/src/assets/images/decor_car_boot_surprise_1791392837409.jpg';
import floralRingImg from '@/src/assets/images/decor_floral_ring_ceremony_1791392847957.jpg';

interface AdminDashboardProps {
  inquiries: CustomerInquiry[];
  galleryItems: GalleryItem[];
  packages: ServicePackage[];
  onUpdateInquiries: (inquiries: CustomerInquiry[]) => void;
  onUpdateGallery: (items: GalleryItem[]) => void;
  onUpdatePackages: (packages: ServicePackage[]) => void;
  onCloseAdmin: () => void;
  adminPin: string;
  onUpdatePin: (newPin: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  inquiries,
  galleryItems,
  packages,
  onUpdateInquiries,
  onUpdateGallery,
  onUpdatePackages,
  onCloseAdmin,
  adminPin,
  onUpdatePin,
}) => {
  // Authentication gate
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default opened when user enters, but PIN prompt available
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'gallery' | 'packages' | 'settings'>('inquiries');

  // Inquiry management state
  const [inquirySearch, setInquirySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Add gallery item modal / form state
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleBengali, setNewTitleBengali] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryId>('proposals');
  const [newImage, setNewImage] = useState(heroProposalImg);
  const [newPrice, setNewPrice] = useState('5999');
  const [newDescription, setNewDescription] = useState('');
  const [newLocationTag, setNewLocationTag] = useState('Salt Lake, Kolkata');
  const [newFeatures, setNewFeatures] = useState('Rose Petal Runway, Ambient Fairy Lights, Candle Holders');

  // Add manual inquiry state
  const [isAddingInquiry, setIsAddingInquiry] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEvent, setManualEvent] = useState('Proposal "Marry Me" Letters');
  const [manualDate, setManualDate] = useState('');
  const [manualVenue, setManualVenue] = useState('New Town, Kolkata');

  // Change PIN state
  const [newPinInput, setNewPinInput] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  const verifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === adminPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  const handleStatusChange = (inquiryId: string, newStatus: InquiryStatus) => {
    const updated = inquiries.map((inq) =>
      inq.id === inquiryId ? { ...inq, status: newStatus } : inq
    );
    onUpdateInquiries(updated);
  };

  const handleSaveNotes = (inquiryId: string) => {
    const updated = inquiries.map((inq) =>
      inq.id === inquiryId ? { ...inq, adminNotes: tempNotes } : inq
    );
    onUpdateInquiries(updated);
    setEditingNotesId(null);
  };

  const handleDeleteInquiry = (inquiryId: string) => {
    if (confirm('Are you sure you want to delete this customer inquiry?')) {
      const updated = inquiries.filter((inq) => inq.id !== inquiryId);
      onUpdateInquiries(updated);
    }
  };

  const handleAddInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInq: CustomerInquiry = {
      id: `inq-manual-${Date.now()}`,
      customerName: manualName.trim(),
      phone: manualPhone.replace(/\D/g, ''),
      eventType: manualEvent,
      preferredDate: manualDate || new Date().toISOString().split('T')[0],
      venueArea: manualVenue,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      adminNotes: 'Direct phone booking added by owner.',
    };
    onUpdateInquiries([newInq, ...inquiries]);
    setIsAddingInquiry(false);
    setManualName('');
    setManualPhone('');
  };

  const handleDeleteGalleryItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this image from the portfolio?')) {
      const updated = galleryItems.filter((item) => item.id !== itemId);
      onUpdateGallery(updated);
    }
  };

  const handleAddGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const featArray = newFeatures
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const newItem: GalleryItem = {
      id: `gal-custom-${Date.now()}`,
      title: newTitle.trim(),
      titleBengali: newTitleBengali.trim() || newTitle.trim(),
      category: newCategory,
      image: newImage,
      priceStarting: parseInt(newPrice, 10) || 4999,
      description: newDescription.trim() || 'Custom luxury decor crafted by Anvarli Decorators.',
      features: featArray.length > 0 ? featArray : ['Premium Fresh Florals', 'Ambient Lighting', 'On-Site Team'],
      locationTag: newLocationTag.trim(),
      popular: false,
    };

    onUpdateGallery([newItem, ...galleryItems]);
    setIsAddingImage(false);
    setNewTitle('');
    setNewTitleBengali('');
    setNewDescription('');
  };

  const handleUpdatePackagePrice = (packageId: string, newPrice: number) => {
    const updated = packages.map((p) =>
      p.id === packageId ? { ...p, price: newPrice } : p
    );
    onUpdatePackages(updated);
  };

  const exportInquiriesCSV = () => {
    const headers = ['ID', 'Customer Name', 'Phone', 'Event', 'Date', 'Location', 'Budget', 'Status', 'Notes'];
    const rows = inquiries.map((inq) => [
      inq.id,
      `"${inq.customerName}"`,
      `"${inq.phone}"`,
      `"${inq.eventType}"`,
      inq.preferredDate,
      `"${inq.venueArea}"`,
      `"${inq.estimatedBudget || ''}"`,
      inq.status,
      `"${inq.adminNotes || inq.specialNotes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `anvarli_decorators_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchSearch =
      inq.customerName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.phone.includes(inquirySearch) ||
      inq.venueArea.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Calculate Metrics
  const totalInquiries = inquiries.length;
  const newLeads = inquiries.filter((i) => i.status === 'new').length;
  const confirmedLeads = inquiries.filter((i) => i.status === 'confirmed').length;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0c0908] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#18110e] border border-[#3e271c] rounded-2xl p-6 sm:p-8 text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-amber-950 border border-amber-600/40 text-amber-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">Anvarli Owner Portal</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Enter Owner PIN to manage bookings, images, and pricing. (Default: 1234)
            </p>
          </div>

          <form onSubmit={verifyPin} className="space-y-4">
            <input
              type="password"
              maxLength={6}
              placeholder="Enter PIN (e.g. 1234)"
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              className="w-full bg-[#100b09] border border-[#3c251a] focus:border-amber-500 rounded-xl px-4 py-3 text-center text-lg tracking-widest text-white outline-none"
              autoFocus
            />

            {pinError && <p className="text-xs text-rose-400">{pinError}</p>}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCloseAdmin}
                className="flex-1 py-2.5 rounded-xl bg-[#261a15] text-neutral-300 text-xs font-medium"
              >
                Back to Site
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs"
              >
                Unlock Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0908] text-neutral-200 pb-20">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-[#160f0c] border-b border-[#362218] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white font-brand">
              ANVARLI OWNER DASHBOARD
            </h1>
            <p className="text-[11px] text-amber-400/90 font-mono">
              Direct Business Line: 7865824463 • Kolkata
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-2 rounded-lg bg-[#221611] hover:bg-[#2c1d17] text-neutral-400 hover:text-white transition-colors"
            title="Lock Dashboard"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={onCloseAdmin}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-rose-700 hover:from-amber-500 hover:to-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Metric Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#17100d] border border-[#311f17] flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400">Total Leads</p>
              <p className="text-2xl font-bold font-mono text-white tabular-nums mt-0.5">{totalInquiries}</p>
            </div>
            <Users className="w-6 h-6 text-amber-400 opacity-60" />
          </div>

          <div className="p-4 rounded-xl bg-[#17100d] border border-[#311f17] flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-amber-400">Pending Action</p>
              <p className="text-2xl font-bold font-mono text-amber-300 tabular-nums mt-0.5">{newLeads}</p>
            </div>
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          </div>

          <div className="p-4 rounded-xl bg-[#17100d] border border-[#311f17] flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-emerald-400">Confirmed Slots</p>
              <p className="text-2xl font-bold font-mono text-emerald-300 tabular-nums mt-0.5">{confirmedLeads}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-emerald-400 opacity-60" />
          </div>

          <div className="p-4 rounded-xl bg-[#17100d] border border-[#311f17] flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-400">Gallery Items</p>
              <p className="text-2xl font-bold font-mono text-white tabular-nums mt-0.5">{galleryItems.length}</p>
            </div>
            <ImageIcon className="w-6 h-6 text-rose-400 opacity-60" />
          </div>
        </div>

        {/* Tab Controls (Functional segmented buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#18110e] rounded-xl border border-[#332017] w-fit overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-gradient-to-r from-amber-600 to-rose-700 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customer Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-amber-600 to-rose-700 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Manage Gallery &amp; Photos ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'packages'
                ? 'bg-gradient-to-r from-amber-600 to-rose-700 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Package Rates ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-amber-600 to-rose-700 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Security &amp; PIN</span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {/* Filter and Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#150f0c] p-4 rounded-xl border border-[#311f17]">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by client name, phone, area..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full bg-[#1e130f] border border-[#3a251b] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 outline-none"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#1e130f] border border-[#3a251b] rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New (Uncontacted)</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingInquiry(true)}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Walk-in Booking</span>
                </button>

                <button
                  onClick={exportInquiriesCSV}
                  className="px-3 py-1.5 rounded-lg bg-[#221611] hover:bg-[#2e1d17] text-neutral-300 border border-[#3d271d] text-xs flex items-center gap-1"
                  title="Export to CSV Spreadsheet"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table / Cards */}
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-12 bg-[#150f0c] rounded-xl border border-[#2d1c15] text-neutral-400 text-xs">
                No matching inquiries found.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-4 sm:p-5 rounded-xl border transition-all ${
                      inq.status === 'new'
                        ? 'bg-[#22140e] border-amber-600/70 shadow-md ring-1 ring-amber-500/30'
                        : inq.status === 'confirmed'
                        ? 'bg-[#121c16] border-emerald-800/60'
                        : 'bg-[#150f0c] border-[#311f17]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            inq.status === 'new'
                              ? 'bg-amber-400 animate-pulse'
                              : inq.status === 'confirmed'
                              ? 'bg-emerald-400'
                              : inq.status === 'completed'
                              ? 'bg-blue-400'
                              : 'bg-neutral-500'
                          }`}
                        />
                        <h3 className="text-sm font-bold text-white font-display">
                          {inq.customerName}
                        </h3>
                        <span className="text-xs text-neutral-400 font-mono">
                          (+91 {inq.phone})
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Status:</span>
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                          className={`text-xs font-semibold rounded-md px-2.5 py-1 border outline-none ${
                            inq.status === 'new'
                              ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                              : inq.status === 'confirmed'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                              : inq.status === 'completed'
                              ? 'bg-blue-950/80 text-blue-300 border-blue-700'
                              : 'bg-neutral-900 text-neutral-300 border-neutral-700'
                          }`}
                        >
                          <option value="new">New (Needs Call)</option>
                          <option value="contacted">Contacted</option>
                          <option value="confirmed">Confirmed / Paid Advance</option>
                          <option value="completed">Completed Successfully</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Inquiry Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs text-neutral-300">
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Occasion</span>
                        <span className="font-medium text-amber-200">{inq.eventType}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-neutral-400 block">Event Date &amp; Location</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-rose-400" />
                          <span className="font-medium text-neutral-200">{inq.preferredDate}</span>
                          <span className="text-neutral-500">•</span>
                          <span className="text-neutral-300 truncate">{inq.venueArea}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-neutral-400 block">Quote / Estimate</span>
                        <span className="font-mono font-bold text-amber-400">
                          {inq.estimatedBudget || 'Standard Package'}
                        </span>
                      </div>
                    </div>

                    {/* Customer Notes */}
                    {inq.specialNotes && (
                      <div className="mt-3 p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-neutral-300">
                        <span className="text-amber-400/90 font-semibold">Client Instructions: </span>
                        {inq.specialNotes}
                      </div>
                    )}

                    {/* Admin Private Notes & Action Buttons */}
                    <div className="mt-3 pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        {editingNotesId === inq.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              placeholder="Add private note (e.g. ₹1500 advance received via GPay)..."
                              className="flex-1 bg-[#100a08] border border-amber-600/60 rounded px-2.5 py-1 text-xs text-white outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveNotes(inq.id)}
                              className="px-2.5 py-1 bg-amber-500 text-black text-xs font-bold rounded"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="text-xs text-neutral-400 hover:text-white"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingNotesId(inq.id);
                              setTempNotes(inq.adminNotes || '');
                            }}
                            className="text-xs text-neutral-400 hover:text-amber-300 cursor-pointer flex items-center gap-1.5"
                          >
                            <span>📝</span>
                            <span>{inq.adminNotes ? inq.adminNotes : 'Click to add internal note / payment details...'}</span>
                          </div>
                        )}
                      </div>

                      {/* Contact Actions */}
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${inq.phone}`}
                          className="px-3 py-1.5 rounded-lg bg-[#271811] hover:bg-[#382218] text-amber-300 border border-[#442b1f] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>Call Client</span>
                        </a>

                        <a
                          href={`https://wa.me/91${inq.phone}?text=${encodeURIComponent(
                            `Hello ${inq.customerName}, this is Anvarli Decorators regarding your inquiry for ${inq.eventType} on ${inq.preferredDate}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#0e271a] hover:bg-[#153926] text-emerald-300 border border-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GALLERY & PHOTO MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#150f0c] p-4 rounded-xl border border-[#311f17]">
              <div>
                <h3 className="text-sm font-bold text-white">Portfolio Showcase Items</h3>
                <p className="text-xs text-neutral-400">
                  Add photos, edit starting prices, or remove outdated setups.
                </p>
              </div>

              <button
                onClick={() => setIsAddingImage(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Creation</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#150f0c] border border-[#311f17] rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <button
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-900 text-white border border-white/20 transition-colors"
                        title="Delete this image"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[11px] font-mono text-amber-300">
                      ₹{item.priceStarting.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-white font-display line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bengali text-rose-300/80 line-clamp-1">
                        {item.titleBengali}
                      </p>
                    </div>

                    <div className="text-[11px] text-neutral-400 border-t border-white/5 pt-2">
                      <span>Location: </span>
                      <strong className="text-neutral-300">{item.locationTag}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PACKAGE PRICING */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="bg-[#150f0c] p-4 rounded-xl border border-[#311f17]">
              <h3 className="text-sm font-bold text-white">Live Package Pricing</h3>
              <p className="text-xs text-neutral-400">
                Instantly adjust package rates shown on the website and estimator.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-[#150f0c] border border-[#311f17] rounded-xl p-5 space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-base font-bold font-display text-white">{pkg.name}</h4>
                    <p className="text-xs font-bengali text-rose-300 mt-0.5">{pkg.tagBengali}</p>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{pkg.subtitle}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <label className="block text-[11px] text-neutral-400">Current Price (₹)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={pkg.price}
                        onChange={(e) =>
                          handleUpdatePackagePrice(pkg.id, parseInt(e.target.value, 10) || 0)
                        }
                        className="bg-[#1e130f] border border-[#3e271c] focus:border-amber-500 rounded-lg px-3 py-1.5 text-sm font-mono text-amber-300 font-bold outline-none w-36"
                      />
                      <span className="text-xs text-neutral-500">Auto-saved</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & PIN */}
        {activeTab === 'settings' && (
          <div className="max-w-md bg-[#150f0c] border border-[#311f17] rounded-2xl p-6 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white font-display">Owner Security PIN</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Change the PIN required to access this dashboard. Keep it confidential.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs text-neutral-300">Set New PIN (4-6 digits)</label>
              <input
                type="password"
                maxLength={6}
                placeholder="e.g. 7865"
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value)}
                className="w-full bg-[#1e130f] border border-[#3e271c] focus:border-amber-500 rounded-xl px-4 py-2.5 text-white font-mono text-center tracking-widest outline-none"
              />

              {pinSuccessMsg && (
                <p className="text-xs text-emerald-400">{pinSuccessMsg}</p>
              )}

              <button
                onClick={() => {
                  if (newPinInput.length >= 4) {
                    onUpdatePin(newPinInput);
                    setPinSuccessMsg('PIN updated successfully!');
                    setTimeout(() => setPinSuccessMsg(''), 3000);
                  } else {
                    alert('PIN must be at least 4 digits');
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs transition-colors"
              >
                Save New PIN
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD GALLERY ITEM */}
      {isAddingImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#18110e] border border-[#3e271c] rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#302018]">
              <h3 className="text-base font-bold font-display text-white">Add New Portfolio Image</h3>
              <button
                onClick={() => setIsAddingImage(false)}
                className="text-neutral-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddGallerySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Candlelight Princep Ghat Riverfront Proposal"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Bengali Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. প্রিন্সেপ ঘাট ক্যান্ডেললাইট প্রপোজাল"
                  value={newTitleBengali}
                  onChange={(e) => setNewTitleBengali(e.target.value)}
                  className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-white outline-none font-bengali"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CategoryId)}
                    className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                  >
                    <option value="proposals">Luxury Proposals ("Marry Me")</option>
                    <option value="cabana">Boho Cabana</option>
                    <option value="bengali-wedding">Bengali Biye Mandap</option>
                    <option value="haldi-sangeet">Gaye Holud &amp; Ring Stage</option>
                    <option value="car-room">Car Boot &amp; Surprises</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Starting Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>

              {/* Photo Preset Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Select Photo Asset</label>
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {[heroProposalImg, cabanaImg, mandapImg, carBootImg, floralRingImg].map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setNewImage(img)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 cursor-pointer ${
                        newImage === img ? 'border-amber-500 scale-105' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={img} alt="Preset" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or enter custom image URL"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-neutral-300 outline-none truncate"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Location Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Salt Lake & New Town"
                  value={newLocationTag}
                  onChange={(e) => setNewLocationTag(e.target.value)}
                  className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Features (comma separated)</label>
                <input
                  type="text"
                  value={newFeatures}
                  onChange={(e) => setNewFeatures(e.target.value)}
                  className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-[#100a08] border border-[#382319] rounded-lg p-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingImage(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#271a15] text-neutral-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-xs"
                >
                  Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD MANUAL INQUIRY */}
      {isAddingInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#18110e] border border-[#3e271c] rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#302018]">
              <h3 className="text-base font-bold font-display text-white">Record Offline / Call Booking</h3>
              <button
                onClick={() => setIsAddingInquiry(false)}
                className="text-neutral-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddInquirySubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohit Chatterjee"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="9830123456"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-white font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Occasion / Setup</label>
                <input
                  type="text"
                  value={manualEvent}
                  onChange={(e) => setManualEvent(e.target.value)}
                  className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Target Date</label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-1.5 text-xs text-white outline-none [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Kolkata Venue</label>
                  <input
                    type="text"
                    value={manualVenue}
                    onChange={(e) => setManualVenue(e.target.value)}
                    className="w-full bg-[#100a08] border border-[#382319] rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingInquiry(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#271a15] text-neutral-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
