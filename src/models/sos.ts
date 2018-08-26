import { Service } from './service';
import { SocialMedia } from './social-media';
export interface SOS {
  id?: number;
  short_description: string;
  need: string;
  status: string;
  image?: string;
  service?: Service;
  location: { lat: number; lng: number };
  city: string;
  country: string;
  notes?: string;
  social_media?: SocialMedia[];
}
