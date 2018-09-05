import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../models/user';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
  }

  getUserBasicInfo(userID: string): User {
    //find user
    let user: User = {
      id: 3,
      email: 'b@b.com',
      name: 'User 3',
      password: '',
      sos_subscription: true,
    };
    return user;
  }
}
