import { SocialMedia } from './social_media';

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  birthday?: number;
  city?: string;
  country?: string;
  avatar?: string;
  sos_subscription: boolean;
  social_media?: SocialMedia[];
}
