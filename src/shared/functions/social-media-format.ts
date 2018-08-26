import { SocialMedia } from '../../models/social-media';
import { SocialMediaTypes } from '../../models/social-media-types';
export function socialMediaFormat(
  socialMedia: SocialMedia[] | undefined,
  types: SocialMediaTypes[]
) {
  let sm: SocialMedia[] = types.map(s => {
    let url: string;
    if (socialMedia === undefined || socialMedia[s.name] === undefined) {
      url = '';
    } else {
      url = socialMedia[s.name];
    }
    return {
      type: s.name,
      url: url,
    };
  });
  return sm;
}
