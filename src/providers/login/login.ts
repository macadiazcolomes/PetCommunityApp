import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { socialMediaFormat } from '../../shared/functions/social-media-format';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { SocialMediaTypes } from '../../models/social-media-types';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  private user: User;
  private socialMediaTypes: SocialMediaTypes[];

  constructor(
    private SMTypesProvider: SocialMediaTypesProvider,
    public http: HttpClient
  ) {
    this.socialMediaTypes = this.SMTypesProvider.getSocialMediaTypes();

    this.user = {
      id: 1,
      email: 'user@user.com',
      password: '123',
      name: 'Some User',
      city: 'San Antonio',
      country: 'Chile',
      sos_subscription: false,
    };

    this.user.social_media = socialMediaFormat(
      this.user.social_media,
      this.socialMediaTypes
    );
  }

  login(user: string, password: string): boolean {
    return true;
  }

  getUser(): User {
    return this.user;
  }
}
