import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  private user: User;

  constructor(public http: HttpClient) {
    this.user = {
      id: 1,
      email: 'user@user.com',
      password: '123',
      name: 'Some User',
      city: 'San Antonio',
      country: 'Chile',
      sos_subscription: false,
    };
  }

  login(user: string, password: string): boolean {
    return true;
  }

  getUser(): User {
    return this.user;
  }
}
