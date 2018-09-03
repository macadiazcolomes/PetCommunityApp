import { SocialMedia } from '../../models/social-media';
import { SocialMediaTypes } from '../../models/social-media-types';
import { Validators } from '@angular/forms';
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

export function createSocialMediaGroup(smT: SocialMediaTypes[]) {
  let sm2 = {};
  smT.forEach(sm => {
    //sm2[sm.name] = '';
    sm2[sm.name] = [
      '',
      [
        Validators.pattern(
          '(?:(?:(?:ht|f)tp)s?://)?[\\w_-]+(?:\\.[\\w_-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?'
        ),
      ],
    ];
  });
  return sm2;
}
