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
  date: number;
  userID_creator: number;
  contact_name: string;
  contact_phone?: string;
  contact_email: string;
}
