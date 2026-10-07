import { CustomerInquiry, GalleryItem, ServicePackage } from '../types';
import { INITIAL_GALLERY_ITEMS, INITIAL_INQUIRIES, SERVICE_PACKAGES } from '../data/initialData';

const STORAGE_KEYS = {
  GALLERY: 'anvarli_gallery_items_v1',
  INQUIRIES: 'anvarli_customer_inquiries_v1',
  PACKAGES: 'anvarli_service_packages_v1',
  ADMIN_PIN: 'anvarli_admin_pin_v1',
};

export const PHONE_NUMBER = '7865824463';
export const PHONE_NUMBER_INTL = '+917865824463';

export function getStoredGallery(): GalleryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!raw) return INITIAL_GALLERY_ITEMS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_GALLERY_ITEMS;
  }
}

export function saveStoredGallery(items: GalleryItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save gallery', e);
  }
}

export function getStoredInquiries(): CustomerInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) return INITIAL_INQUIRIES;
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
  }
}

export function saveStoredInquiries(inquiries: CustomerInquiry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  } catch (e) {
    console.error('Failed to save inquiries', e);
  }
}

export function getStoredPackages(): ServicePackage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    if (!raw) return SERVICE_PACKAGES;
    return JSON.parse(raw);
  } catch {
    return SERVICE_PACKAGES;
  }
}

export function saveStoredPackages(packages: ServicePackage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  } catch (e) {
    console.error('Failed to save packages', e);
  }
}

export function getAdminPin(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || '1234';
  } catch {
    return '1234';
  }
}

export function setAdminPin(pin: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, pin);
  } catch (e) {
    console.error('Failed to save admin pin', e);
  }
}

export function createWhatsAppBookingUrl(data: {
  customerName?: string;
  phone?: string;
  eventType?: string;
  preferredDate?: string;
  venueArea?: string;
  packageSelected?: string;
  customNotes?: string;
}): string {
  const parts = [
    `Namaskar Anvarli Decorators! 🌹`,
    `I would like to book / inquire about a decoration setup in Kolkata.`,
    ``,
    data.customerName ? `👤 Name: ${data.customerName}` : null,
    data.phone ? `📞 Phone: ${data.phone}` : null,
    data.eventType ? `🎉 Event: ${data.eventType}` : null,
    data.packageSelected ? `📦 Package: ${data.packageSelected}` : null,
    data.preferredDate ? `📅 Preferred Date: ${data.preferredDate}` : null,
    data.venueArea ? `📍 Kolkata Location: ${data.venueArea}` : null,
    data.customNotes ? `📝 Notes: ${data.customNotes}` : null,
    ``,
    `Please share availability and final quote. Thank you!`
  ].filter(line => line !== null);

  const text = encodeURIComponent(parts.join('\n'));
  return `https://wa.me/917865824463?text=${text}`;
}
