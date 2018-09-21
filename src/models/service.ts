import { SocialMedia } from './social-media';

export interface Service {
  id?: string;
  business_name: string;
  type: string;
  phone: string;
  address?: string;
  notes?: string;
  image?: string;
  social_media?: SocialMedia[];
}
