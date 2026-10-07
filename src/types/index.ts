export type CategoryId = 
  | 'all'
  | 'proposals'
  | 'cabana'
  | 'bengali-wedding'
  | 'haldi-sangeet'
  | 'car-room';

export interface GalleryItem {
  id: string;
  title: string;
  titleBengali: string;
  category: CategoryId;
  image: string;
  priceStarting: number;
  description: string;
  features: string[];
  locationTag: string;
  popular?: boolean;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagBengali: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  depositAmount: number;
  features: string[];
  idealFor: string;
  image: string;
  isPopular?: boolean;
}

export type InquiryStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';

export interface CustomerInquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  eventType: string;
  preferredDate: string;
  venueArea: string;
  packageSelected?: string;
  estimatedBudget?: string;
  specialNotes?: string;
  status: InquiryStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface TestimonialItem {
  id: string;
  names: string;
  area: string;
  occasion: string;
  quote: string;
  quoteBengali?: string;
  rating: number;
  date: string;
  image: string;
}
