import { SocialMedia } from './social-media';

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  city?: string;
  country?: string;
  avatar?: string;
  sos_subscription: boolean;
  social_media?: SocialMedia[];
  pets?: string[];
  services?: string[];
}
