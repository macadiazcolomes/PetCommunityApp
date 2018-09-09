import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AlertTypesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertTypesProvider {
  public alertTypes: string[];

  constructor(public http: HttpClient) {
    console.log('Hello AlertTypesProvider Provider');

    this.alertTypes = ['vaccines', 'vet', 'other'];
  }

  getAlertTypes() {
    return this.alertTypes;
  }
}
