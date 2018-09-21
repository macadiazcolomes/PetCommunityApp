export interface SOS {
  id?: string;
  short_description: string;
  need: string;
  status: string;
  image?: string;
  location?: { lat: number; lng: number };
  city: string;
  country: string;
  notes?: string;
  date: Date;
  userID_creator: string;
  contact_name: string;
  contact_phone?: string;
  contact_email: string;
  helpers?: string[];
}
