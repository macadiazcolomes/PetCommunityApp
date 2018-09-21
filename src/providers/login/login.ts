import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersProvider } from '../users/users';
import {
  MONGODB_URL,
  LOGIN_TOKEN_STORAGE_VAR,
  USERID_STORAGE_VAR,
} from '../../providers/config';
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
  private user: User;
  //private userId: string;

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
          //this.userId = data.userId;
          this.token = data.token;
          this.storage
            .set(LOGIN_TOKEN_STORAGE_VAR, this.token)
            .then(() => resolve())
            .catch(err => reject(err));
          this.storage
            .set(USERID_STORAGE_VAR, data.userId)
            .then(() => resolve())
            .catch(err => reject(err));
          this.users.getUser(data.userId).then(user => {
            this.user = user;
            resolve();
          });
        },
        err => reject(err)
      );
    });
  }

  logout(): Promise<void> {
    console.log(`[LoginProvider] logout()`);
    return new Promise((resolve, reject) => {
      this.token = undefined;
      this.user = undefined;
      this.storage
        .set(LOGIN_TOKEN_STORAGE_VAR, '')
        .then(() => resolve())
        .catch(err => reject(err));
      this.storage
        .set(USERID_STORAGE_VAR, '')
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
    userEmail: string,
    password: string,
    passwordConfirm: string
  ): Promise<void> {
    console.log(`[LoginProvider] forgotPasswordStep3()`);
    return new Promise((resolve, reject) => {
      let url = MONGODB_URL + `/forgot/step3`;
      this.http
        .post(url, {
          userEmail: userEmail,
          password: password,
          passwordConfirm: passwordConfirm,
        })
        .subscribe(() => resolve(), err => reject(err));
    });
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage
        .get(LOGIN_TOKEN_STORAGE_VAR)
        .then(token => {
          //console.log(' isLoggedIn token', token);
          resolve(!jwtHelper.isTokenExpired(token));
        })
        .catch(err => {
          //console.log('isLoggedIn error', err);
          reject(err);
        });
    });
  }

  getUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.user) {
        return resolve(this.user);
      }
      this.storage
        .get(USERID_STORAGE_VAR)
        .then(userId => {
          this.users
            .getUser(userId)
            .then(user => {
              this.user = user;
              resolve(user);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}
