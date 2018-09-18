import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersProvider } from '../users/users';
import { MONGODB_URL, LOGIN_TOKEN_STORAGE_VAR } from '../../providers/config';
import { TranslateService } from '@ngx-translate/core';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const jwtHelper = new JwtHelperService();

@Injectable()
export class LoginProvider {
  private token: string;
  //private user: User;
  private userId: string;

  constructor(
    public translate: TranslateService,
    public users: UsersProvider,
    public storage: Storage,
    public http: HttpClient
  ) {
    console.log('[LoginProvider] constructor()');
  }

  login(user: string, password: string): Promise<void> {
    console.log(`[LoginProvider] login( ${user}, ${password})`);
    return new Promise((resolve, reject) => {
      let url = MONGODB_URL + `/sessions`;
      this.http.post(url, { email: user, password: password }).subscribe(
        (data: { userId: string; token: string }) => {
          this.userId = data.userId;
          this.token = data.token;
          this.storage
            .set(LOGIN_TOKEN_STORAGE_VAR, this.token)
            .then(() => resolve())
            .catch(err => reject(err));
        },
        err => reject(err)
      );
    });
  }

  logout(): Promise<void> {
    console.log(`[LoginProvider] logout()`);
    return new Promise((resolve, reject) => {
      this.token = null;
      this.userId = null;
      this.storage
        .set(LOGIN_TOKEN_STORAGE_VAR, '')
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  forgotPasswordStep1(userEmail: string): Promise<void> {
    console.log(`[LoginProvider] forgotPasswordStep1()`);
    return new Promise((resolve, reject) => {
      let url = MONGODB_URL + `/forgot/step1`;

      this.http
        .post(url, {
          userEmail: userEmail,
          userLang: this.translate.currentLang,
        })
        .subscribe(() => resolve(), err => reject(err));
    });
  }

  forgotPasswordStep2(userEmail: string, userCode: string): Promise<void> {
    console.log(`[LoginProvider] forgotPasswordStep2()`);
    return new Promise((resolve, reject) => {
      let url = MONGODB_URL + `/forgot/step2`;
      this.http
        .post(url, { userEmail: userEmail, userCode: userCode })
        .subscribe(() => resolve(), err => reject(err));
    });
  }

  forgotPasswordStep3(
    password: string,
    passwordConfirm: string
  ): Promise<void> {
    console.log(`[LoginProvider] forgotPasswordStep3()`);
    return new Promise((resolve, reject) => {
      let url = MONGODB_URL + `/forgot/step3`;
      this.http
        .post(url, { password: password, passwordConfirm: passwordConfirm })
        .subscribe(() => resolve(), err => reject(err));
    });
  }

  isLoggedIn() {
    return this.storage.get(LOGIN_TOKEN_STORAGE_VAR).then(token => {
      return !jwtHelper.isTokenExpired(token);
    });
  }

  getUser(): Promise<User> {
    return this.users.getUser(this.userId);
  }
}
