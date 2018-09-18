import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../models/user';
import { MONGODB_URL } from '../../providers/config';

import { socialMediaFormat } from '../../shared/functions/social-media-format';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { SocialMediaTypes } from '../../models/social-media-types';
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UsersProvider {
  private socialMediaTypes: SocialMediaTypes[];

  constructor(
    private SMTypesProvider: SocialMediaTypesProvider,
    public http: HttpClient
  ) {
    console.log('Hello UsersProvider Provider');
    this.socialMediaTypes = this.SMTypesProvider.getSocialMediaTypes();
  }

  createUser(user: User, confirm_password): Promise<User> {
    let data = { ...user, ...confirm_password };
    console.log('[UsersProvider] createUser(' + JSON.stringify(user) + ')');
    return new Promise((resolve, reject) => {
      let url = MONGODB_URL + '/users';
      this.http.post(url, data).subscribe(
        (user: User) => {
          resolve(user);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  deleteUser(user: User): Promise<void> {
    console.log('[UsersProvider] deleteUser(' + JSON.stringify(user) + ')');
    return new Promise((resolve, reject) => {
      let url = MONGODB_URL + `/protected/users/${user.id}`;
      this.http.delete(url).subscribe(() => resolve(), err => reject(err));
    });
  }

  updateUser(user: User): Promise<User> {
    console.log('[UsersProvider] updateUser(' + JSON.stringify(user) + ')');
    return new Promise((resolve, reject) => {
      let url = MONGODB_URL + `/protected/users/${user.id}`;
      this.http
        .put(url, user)
        .subscribe((user: User) => resolve(user), err => reject(err));
    });
  }
  updateUserSOSSubscription(
    userId: string,
    subscription: boolean
  ): Promise<void> {
    console.log(
      '[UsersProvider] updateUserSOSSubscription(' + subscription + ')'
    );
    return new Promise((resolve, reject) => {
      let user = { id: userId, sos_subscription: subscription };
      let url = MONGODB_URL + `/protected/users/${user.id}`;
      this.http
        .put(url, user)
        .subscribe((user: User) => resolve(), err => reject(err));
    });
  }

  getUser(userId: string): Promise<User> {
    console.log('[UsersProvider] getUser(' + userId + ')');
    return new Promise((resolve, reject) => {
      let url = MONGODB_URL + `/protected/users/${userId}`;
      this.http.get(url).subscribe(
        (user: User) => {
          user.social_media = socialMediaFormat(
            user.social_media,
            this.socialMediaTypes
          );
          resolve(user);
        },
        err => reject(err)
      );
    });
  }
}
