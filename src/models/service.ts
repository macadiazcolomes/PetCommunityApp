import { SocialMedia } from './social-media';

export interface Service {
  id?: number;
  business_name: string;
  type: string;
  phone: string;
  address?: string;
  notes?: string;
  image?: string;
  social_media?: SocialMedia[];
}
