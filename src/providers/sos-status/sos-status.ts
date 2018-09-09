import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SosStatusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SosStatusProvider {
  public sosStatus: string[];

  constructor(public http: HttpClient) {
    console.log('Hello SosStatusProvider Provider');
    this.sosStatus = ['active', 'inactive'];
  }

  getSosStatus() {
    return this.sosStatus;
  }
}
