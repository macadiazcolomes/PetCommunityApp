import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Alert } from '../../models/alert';
import { LoginProvider } from '../login/login';
import { MONGODB_URL } from '../../providers/config';
import { User } from '../../models/user';
import { Pet } from '../../models/pet';

/*
  Generated class for the PetAlertsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PetAlertsProvider {
  constructor(private login: LoginProvider, public http: HttpClient) {
    console.log('Hello PetAlertsProvider Provider');
  }

  getEmptyPetAlert(type: string): Alert {
    return {
      type: type,
      name: '',
      date: new Date(),
    };
  }

  listPetAlerts(pet: Pet, alertType: string): Promise<Alert[]> {
    console.log('[PetAlertsProvider] listPetAlerts()');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL +
            `/protected/users/${user.id}/pets/${pet.id}/alerts/t/${alertType}`;
          this.http.get(url).subscribe(
            (alerts: Alert[]) => {
              resolve(alerts);
            },
            err => reject(err)
          );
        })
        .catch(err => reject(err));
    });
  }

  addPetAlert(pet: Pet, alert: Alert): Promise<Alert> {
    console.log(
      '[PetAlertsProvider] addPetAlert(' + JSON.stringify(alert) + ')'
    );
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL + `/protected/users/${user.id}/pets/${pet.id}/alerts`;
          this.http
            .post(url, alert)
            .subscribe((alert: Alert) => resolve(alert), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  updatePetAlert(pet: Pet, alert: Alert): Promise<Alert> {
    console.log(
      '[PetAlertsProvider] updatePetAlert(' + JSON.stringify(alert) + ')'
    );
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL +
            `/protected/users/${user.id}/pets/${pet.id}/alerts/${alert.id}`;
          this.http
            .put(url, alert)
            .subscribe((alert: Alert) => resolve(alert), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
  removePetAlert(pet: Pet, alert: Alert): Promise<void> {
    console.log(
      '[PetAlertsProvider] updatePetAlert(' + JSON.stringify(alert) + ')'
    );
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL +
            `/protected/users/${user.id}/pets/${pet.id}/alerts/${alert.id}`;
          this.http.delete(url).subscribe(() => resolve(), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}
