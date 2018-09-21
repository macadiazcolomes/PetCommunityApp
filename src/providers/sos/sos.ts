import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SOS } from '../../models/sos';
import { User } from '../../models/user';
import { LoginProvider } from '../login/login';
import { UsersProvider } from '../users/users';

import { MONGODB_URL } from '../../providers/config';

/*
  Generated class for the SosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SosProvider {
  constructor(
    private usersprovider: UsersProvider,
    private login: LoginProvider,
    public http: HttpClient
  ) {
    console.log('Hello SosProvider Provider');
  }

  addSOS(sos: SOS): Promise<SOS> {
    console.log('[SosProvider] addSOS(' + JSON.stringify(sos) + ')');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/sos`;
          this.http
            .post(url, sos)
            .subscribe((sos: SOS) => resolve(sos), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  getSOS(sosId: string): Promise<SOS> {
    console.log('[SosProvider] getSOS(' + sosId + ')');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/sos/${sosId}`;
          this.http
            .get(url)
            .subscribe((sos: SOS) => resolve(sos), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  listCurrentSOS(): Promise<SOS[]> {
    console.log('[SosProvider] listCurrentSOS()');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/sos/current`;
          this.http
            .get(url)
            .subscribe((sos: SOS[]) => resolve(sos), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  listMySOS(): Promise<SOS[]> {
    console.log('[SosProvider] listMySOS()');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/sos/createdby`;
          this.http
            .get(url)
            .subscribe((sos: SOS[]) => resolve(sos), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  //lists all the sos where the user is helping out
  listHelpingOutSOS(): Promise<SOS[]> {
    console.log('[SosProvider] listHelpingOutSOS()');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/sos/helpedout`;
          this.http
            .get(url)
            .subscribe((sos: SOS[]) => resolve(sos), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  updateSOS(sos: SOS): Promise<SOS> {
    console.log('[SosProvider] updateSOS(' + JSON.stringify(sos) + ')');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/sos/${sos.id}`;
          this.http
            .put(url, sos)
            .subscribe((sos: SOS) => resolve(sos), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  removeSOS(sos: SOS): Promise<void> {
    console.log('[SosProvider] removeSOS(' + JSON.stringify(sos) + ')');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/sos/${sos.id}`;
          this.http.delete(url).subscribe(() => resolve(), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  //sosHelpers
  updateSOSHelper(sosId: string, doHelp: boolean): Promise<SOS> {
    console.log('[SosProvider] addSOSHelper(' + sosId + ')');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL + `/protected/users/${user.id}/sos/${sosId}/helper`;
          this.http
            .put(url, { doHelp: doHelp })
            .subscribe((sos: SOS) => resolve(sos), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
  /*addSOSHelper(sosID: string, userID: string): SOSHelper {
    let sosHelper: SOSHelper = {
      id: this.sosHelperID++,
      sosID: sosID,
      userID: userID,
    };
    this.soshelpers.push(sosHelper);
    return sosHelper;
  }*/

  //lists all the helpers (users) of a particular SOS
  listSOShelpers(sos: SOS): Promise<User[]> {
    let usersPromise: Promise<User>[];
    console.log('[SosProvider] listSOShelpers(' + sos.id + ')');
    return new Promise((resolve, reject) => {
      if (!sos.helpers) {
        return resolve();
      }
      usersPromise = sos.helpers.map((userId: string) => {
        return this.usersprovider.getUser(userId);
      });
      return Promise.all(usersPromise)
        .then((users: User[]) => {
          resolve(users);
        })
        .catch(err => reject(err));
    });
  }

  isUserHelpingOut(userId: string, sos: SOS): boolean {
    if (!sos.helpers) {
      return false;
    }
    return sos.helpers.indexOf(userId) > -1;
  }

  getEmptySOS() {
    let sos: SOS = {
      short_description: '',
      need: '',
      status: 'active',
      city: '',
      country: '',
      date: undefined,
      userID_creator: '',
      contact_name: '',
      contact_email: '',
    };

    return sos;
  }
}
