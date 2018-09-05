export interface SOS {
  id?: number;
  short_description: string;
  need: string;
  status: string;
  image?: string;
  location: { lat: number; lng: number };
  city: string;
  country: string;
  notes?: string;
}
