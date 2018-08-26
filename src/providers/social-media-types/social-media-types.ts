import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SocialMediaTypes } from '../../models/social-media-types';

/*
  Generated class for the SocialMediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocialMediaTypesProvider {
  public socialMediaTypes: SocialMediaTypes[];

  constructor(public http: HttpClient) {
    console.log('Hello SocialMediaTypesProvider Provider');

    this.socialMediaTypes = [
      { title: 'Facebook', name: 'facebook' },
      { title: 'Twitter', name: 'twitter' },
      { title: 'Instagram', name: 'instagram' },
    ];
  }

  getSocialMediaTypes(): SocialMediaTypes[] {
    return this.socialMediaTypes;
  }
}
