import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Service } from '../../models/service';
import { LocationProvider } from '../../providers/location/location';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { SocialMediaTypes } from '../../models/social-media-types';
import { socialMediaFormat } from '../../shared/functions/social-media-format';

@Injectable()
export class SearchServicesProvider {
  private socialMediaTypes: SocialMediaTypes[];
  constructor(
    private SMTypesProvider: SocialMediaTypesProvider,
    private locationProvider: LocationProvider,
    public http: HttpClient
  ) {
    console.log('constructor SearchServicesProvider');
    this.socialMediaTypes = this.SMTypesProvider.getSocialMediaTypes();
  }

  findServices(type: string): Promise<Service[]> {
    return new Promise((resolve, reject) => {
      var promise = new Promise<Service[]>((resolve, reject) => {
        this.locationProvider
          .getlocation()
          .then(
            (locationCoordenates: { longitude: number; latitude: number }) => {
              //TODO call google places
              let service = new google.maps.places.PlacesService(
                document.createElement('div')
              );
              //console.log('service', service);
              let request = {
                location: new google.maps.LatLng(
                  locationCoordenates.latitude,
                  locationCoordenates.longitude
                ),
                radius: 50000,
                type: type,
              };

              //console.log('request', request);

              service.nearbySearch(request, (results, status) => {
                //console.log('Google places..', status, results);

                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  let services: Service[] = results.map(
                    (result: google.maps.places.PlaceResult) => {
                      let service: Service = {
                        business_name: result.name,
                        type: type,
                        phone: result.international_phone_number,
                      };
                      if (result.vicinity) service.address = result.vicinity;
                      if (result.photos) {
                        service.image = result.photos[0].getUrl({
                          maxHeight: 400,
                          maxWidth: 400,
                        });
                      }

                      return service;
                    }
                  );
                  resolve(services);
                } else {
                  reject(status);
                }
              });
            }
          )
          .catch(err => reject(err));
      });

      promise
        .then((services: Service[]) => {
          let servicesSM: Service[] = services.map((service: Service) => {
            service.social_media = socialMediaFormat(
              service.social_media,
              this.SMTypesProvider.getSocialMediaTypes()
            );
            return service;
          });

          //console.log('SERVICES', servicesSM);
          resolve(servicesSM);
        })
        .catch(err => reject(err));
    });
  }
}
