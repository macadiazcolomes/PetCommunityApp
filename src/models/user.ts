import { SocialMedia } from './social-media';

export interface User {
  id?: string;
  email: string;
  password?: string;
  name: string;
  city?: string;
  country?: string;
  avatar?: string;
  sos_subscription: boolean;
  social_media?: SocialMedia[];
  pets?: string[];
  services?: string[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  push_notification_ids?: string[];
}
