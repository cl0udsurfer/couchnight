import { Booking, Listing } from '../../../lib/types';

export enum ListingsFilter {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
}

export interface ListingArgs {
  id: string;
}

export interface ListingBookingsArgs {
  limit: number;
  page: number;
}

export interface ListingBookingsData {
  total: number;
  result: Booking[];
}

export interface ListingsArgs {
  location: string | null;
  filter: ListingsFilter;
  limit: number;
  page: number;
}

export interface ListingsData {
  region: string | null;
  location: { lat: number | null; lng: number | null };
  total: number;
  result: Listing[];
}

export interface ListingsQuery {
  country?: string;
  admin?: string;
  city?: string;
}

export interface HostListingInput {
  title: string;
  description: string;
  guests: number;
  image: string;
  address: string;
  location: { lat: number; lng: number };
  price: number;
  wifi: boolean;
  parking: boolean;
  pool: boolean;
  airCon: boolean;
}

export interface HostListingArgs {
  input: HostListingInput;
}
