import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderOptions,
  NativeGeocoderForwardResult,
} from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { stat } from 'fs';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  private geoLocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  private nativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  constructor(
    private androidPermissions: AndroidPermissions,
    private geo: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public http: HttpClient
  ) {
    console.log('Hello LocationProvider Provider');
  }

  getlocation(): Promise<{ latitude: number; longitude: number }> {
    console.log('[LocationProvider getLocation()]');
    return new Promise((resolve, reject) => {
      //check permissions
      this.androidPermissions
        .checkPermission(
          this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
        )
        .then(status => {
          if (status.hasPermission) {
            //do shomething
            this.geo
              .getCurrentPosition(this.geoLocationOptions)
              .then(position => {
                resolve({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              })
              .catch(err => {
                console.log(err);
                reject({ desc: 'error 1', error: err });
              });
          } else {
            this.androidPermissions
              .requestPermission(
                this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
              )
              .then(status => {
                //do de same  shomething
                if (status.hasPermission) {
                  this.geo
                    .getCurrentPosition(this.geoLocationOptions)
                    .then(position => {
                      resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      reject({ desc: 'error 2', error: err });
                    });
                } else {
                  reject({ desc: 'status', error: status });
                }
              });
          }
        });

      /*this.androidPermissions
        .requestPermissions([
          this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
          this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
        ])
        .then(data => {
          this.geo
            .getCurrentPosition(this.geoLocationOptions)
            .then(position => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });*/
    });
  }

  getCityAndCountryFromLocation(
    lat?: number,
    lng?: number
  ): Promise<{ city: string; country: string }> {
    return new Promise((resolve, reject) => {
      if (lat && lng) {
        this.nativeGeocoder
          .reverseGeocode(lat, lng, this.nativeGeocoderOptions)
          .then((result: NativeGeocoderReverseResult[]) => {
            resolve({
              city: result[0].locality,
              country: result[0].countryName,
            });
          })
          .catch(err => {
            reject({ desc: 'error 3', error: err });
          });
      } else {
        this.getlocation()
          .then(location => {
            this.nativeGeocoder
              .reverseGeocode(
                location.latitude,
                location.longitude,
                this.nativeGeocoderOptions
              )
              .then((result: NativeGeocoderReverseResult[]) => {
                resolve({
                  city: result[0].locality,
                  country: result[0].countryName,
                });
              })
              .catch(err => {
                reject({ desc: 'error 3', error: err });
              });
          })
          .catch(err => {
            reject({ desc: 'error 4', error: err });
          });
      }
    });
  }

  getLocationFromCityName(
    city: string
  ): Promise<NativeGeocoderForwardResult[]> {
    return new Promise((resolve, reject) => {
      this.nativeGeocoder
        .forwardGeocode(city, this.nativeGeocoderOptions)
        .then((coordenates: NativeGeocoderForwardResult[]) => {
          resolve(coordenates);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
