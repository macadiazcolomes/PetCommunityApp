import { SocialMedia } from './social-media';
import { User } from './user';

export interface Pet {
  id?: number;
  name: string;
  species: string;
  breed?: string;
  gender?: string;
  birthday?: number;
  color?: string;
  neutered?: boolean;
  microchip?: string;
  permanent_home?: boolean;
  pass_away?: boolean;
  social_media?: SocialMedia[];
}
