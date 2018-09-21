import { SocialMedia } from './social-media';

export interface Pet {
  id?: string;
  name: string;
  species: string;
  avatar?: string;
  breed?: string;
  gender?: string;
  birthday?: Date;
  color?: string;
  neutered?: boolean;
  microchip?: string;
  permanent_home?: boolean;
  pass_away?: boolean;
  social_media?: SocialMedia[];
  alerts_qtys?: { vaccines: number; vet: number; other: number };
}
