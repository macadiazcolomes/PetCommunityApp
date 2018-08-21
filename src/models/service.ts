import { SocialMedia } from './social_media';

export interface Service {
  id?: number;
  business_name: string;
  type: string;
  phone: string;
  address: string;
  notes?: string;
  image?: string;
  social_media: SocialMedia[];
}
