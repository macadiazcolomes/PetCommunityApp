import { SocialMedia } from './social-media';
import { User } from './user';

export interface Pet {
  id?: number;
  name: string;
  species: string;
  owner: User;
  breed?: string;
  gender?: string;
  birthday?: number;
  color?: string;
  neutered?: boolean;
  microchip?: string;
  social_media?: SocialMedia[];
}
