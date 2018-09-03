import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Service } from '../../models/service';

@Injectable()
export class SearchServicesProvider {
  private services: Service[] = [];

  constructor(public http: HttpClient) {
    this.addService({
      business_name: 'Veterinaria El canelo',
      phone: '+56 9 5124 7745',
      type: 'veterinary_care',
    });

    this.addService({
      business_name: 'Veterinaria Animal Vida',
      phone: '+56 9 7455 1254',
      address: 'Calle 1, San Antonio',
      type: 'veterinary_care',
    });

    this.addService({
      business_name: 'Veterinaria Animal Help',
      phone: '+56 9 4456 2244',
      address: 'Calle 44, Llolleo,  San Antonio',
      type: 'veterinary_care',
    });
  }

  findServices(type: string, locationType: string, location: string) {
    return this.services;
  }

  addService(service: Service) {
    this.services.push(service);
    return service;
  }
}
