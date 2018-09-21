import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Service } from '../../models/service';
import { LoginProvider } from '../login/login';
import { MONGODB_URL } from '../../providers/config';

import { socialMediaFormat } from '../../shared/functions/social-media-format';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { SocialMediaTypes } from '../../models/social-media-types';
import { User } from '../../models/user';

@Injectable()
export class SavedServicesProvider {
  private socialMediaTypes: SocialMediaTypes[];

  constructor(
    private SMTypesProvider: SocialMediaTypesProvider,
    public http: HttpClient,
    private login: LoginProvider
  ) {
    this.socialMediaTypes = this.SMTypesProvider.getSocialMediaTypes();
  }

  addService(service: Service): Promise<Service> {
    console.log(
      '[SavedServicesProvider] addService(' + JSON.stringify(service) + ')'
    );
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/services`;
          this.http
            .post(url, service)
            .subscribe(
              (service: Service) => resolve(service),
              err => reject(err)
            );
        })
        .catch(err => reject(err));
    });
  }

  listServices(): Promise<Service[]> {
    console.log('[SavedServicesProvider] listServices()');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/services`;
          this.http.get(url).subscribe(
            (services: Service[]) => {
              let serviceObj = services.map(service => {
                service.social_media = socialMediaFormat(
                  service.social_media,
                  this.socialMediaTypes
                );

                return service;
              });
              resolve(serviceObj);
            },
            err => reject(err)
          );
        })
        .catch(err => reject(err));
    });
  }

  updateService(service: Service): Promise<Service> {
    console.log(
      '[SavedServicesProvider] updateService(' + JSON.stringify(service) + ')'
    );
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL + `/protected/users/${user.id}/services/${service.id}`;
          this.http
            .put(url, service)
            .subscribe(
              (service: Service) => resolve(service),
              err => reject(err)
            );
        })
        .catch(err => reject(err));
    });
  }

  removeService(service: Service): Promise<void> {
    console.log(
      '[SavedServicesProvider] removeService(' + JSON.stringify(service) + ')'
    );

    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL + `/protected/users/${user.id}/services/${service.id}`;
          this.http.delete(url).subscribe(() => resolve(), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  getEmptyService() {
    let service: Service = {
      business_name: '',
      type: '',
      phone: '',
    };
    service.social_media = socialMediaFormat(
      service.social_media,
      this.socialMediaTypes
    );
    return service;
  }
}
