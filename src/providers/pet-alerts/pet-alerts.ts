import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Alert } from '../../models/alert';
import { LoginProvider } from '../login/login';

/*
  Generated class for the PetAlertsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PetAlertsProvider {
  private id: number = 0;
  private petAlerts: Alert[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello PetAlertsProvider Provider');

    this.addPetAlert({
      type: 'vaccine',
      name: 'Triple',
      date: 1538458827,
    });
    this.addPetAlert({
      type: 'vaccine',
      name: 'FeLV',
      date: 1538458827,
    });
  }

  listPetAlerts(alertType: string): Alert[] {
    return this.petAlerts;
  }

  addPetAlert(alert: Alert): Alert {
    alert.id = this.id++;
    this.petAlerts.push(alert);
    return alert;
  }

  updatePetAlert(alert: Alert): Alert {
    let index = this.petAlerts.findIndex(_petAlert => _petAlert === alert);
    if (index != -1) {
      this.petAlerts[index] = alert;
      return alert;
    }
  }
  removePetAlert(alert: Alert): boolean {
    let index = this.petAlerts.findIndex(_alert => _alert.id === alert.id);
    if (index !== -1) this.petAlerts.splice(index, 1);
    return index !== -1;
  }
}
