import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Service } from '../../models/service';
import { LoginProvider } from '../login/login';

import { socialMediaFormat } from '../../shared/functions/social-media-format';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { SocialMediaTypes } from '../../models/social-media-types';

@Injectable()
export class SavedServicesProvider {
  private id: number = 0;
  private services: Service[] = [];
  private socialMediaTypes: SocialMediaTypes[];

  constructor(
    private SMTypesProvider: SocialMediaTypesProvider,
    public http: HttpClient,
    private login: LoginProvider
  ) {
    this.socialMediaTypes = this.SMTypesProvider.getSocialMediaTypes();

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
  }

  addService(service: Service) {
    service.id = (this.id++).toString();
    this.services.push(service);
    return service;
  }

  listServices(): Service[] {
    return this.services.map(service => {
      return {
        id: service.id,
        business_name: service.business_name,
        type: service.type,
        phone: service.phone,
        address: service.address,
        notes: service.notes,
        image: service.image,
        social_media: socialMediaFormat(
          service.social_media,
          this.socialMediaTypes
        ),
      };
    });
  }

  updateService(service: Service): Service {
    let index = this.services.findIndex(_service => _service.id === service.id);
    if (index !== -1) {
      this.services[index] = service;
      return service;
    }
  }

  removeService(service: Service): boolean {
    let index = this.services.findIndex(_service => _service.id === service.id);
    if (index !== -1) this.services.splice(index, 1);
    return index !== -1;
  }
}
