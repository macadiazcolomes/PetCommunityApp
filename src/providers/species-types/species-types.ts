import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SpeciesTypes } from '../../models/species-types';

/*
  Generated class for the SpeciesTypesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpeciesTypesProvider {
  public speciesTypes: SpeciesTypes[];

  constructor(public http: HttpClient) {
    console.log('Hello SpeciesTypesProvider Provider');

    this.speciesTypes = [
      { code: 'cat', description: 'Cat' },
      { code: 'dog', description: 'Dog' },
      { code: 'other', description: 'Other' },
    ];
  }

  getSpeciesTypes() {
    return this.speciesTypes;
  }
}
