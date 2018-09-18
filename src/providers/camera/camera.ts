import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {
  constructor(
    private androidPermissions: AndroidPermissions,
    private camera: Camera,
    public http: HttpClient
  ) {
    console.log('Hello CameraProvider Provider');
  }

  selectImage(): Promise<string> {
    console.log('[CameraProvider] selectImage()');

    return new Promise((resolve, reject) => {
      //permissions
      this.androidPermissions
        .checkPermission(this.androidPermissions.PERMISSION.CAMERA)
        .then(status => {
          console.log('camera permisions', status);
          if (status.hasPermission) {
            //do something
            this.baseSelectImage()
              .then((url: string) => {
                console.log('baseSelectImage result ok ' + url);
                resolve(url);
              })
              .catch(err => {
                console.log(
                  'baseSelectImage result ERR ' + JSON.stringify(err)
                );
                reject(err);
              });
          } else {
            //ask for permissions
            console.log('asking for permissions');
            this.androidPermissions
              .requestPermission(this.androidPermissions.PERMISSION.CAMERA)
              .then(status => {
                console.log('camera permisions 2', status.hasPermissions);
                if (status.hasPermission) {
                  //do something
                  this.baseSelectImage()
                    .then((url: string) => {
                      console.log('baseSelectImage result ok2 ' + url);
                      resolve(url);
                    })
                    .catch(err => {
                      console.log(
                        'baseSelectImage result ERR2 ' + JSON.stringify(err)
                      );
                      reject(err);
                    });
                }
              });
          }
        });
    });
  }

  captureImage(): Promise<string> {
    console.log('[CameraProvider] captureImage()');

    return new Promise((resolve, reject) => {
      //permissions
      this.androidPermissions
        .checkPermission(this.androidPermissions.PERMISSION.CAMERA)
        .then(status => {
          if (status.hasPermission) {
            //do something
            this.baseCaptureImage()
              .then((url: string) => {
                resolve(url);
              })
              .catch(err => {
                reject(err);
              });
          } else {
            //ask for permissions
            this.androidPermissions
              .requestPermission(this.androidPermissions.PERMISSION.CAMERA)
              .then(status => {
                if (status.hasPermission) {
                  //do something
                  this.baseCaptureImage()
                    .then((url: string) => {
                      resolve(url);
                    })
                    .catch(err => {
                      reject(err);
                    });
                }
              });
          }
        });
    });
  }

  private baseSelectImage(): Promise<string> {
    console.log('[CameraProvider] baseSelectImage()');
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: Math.min(window.innerWidth / 2, 400),
      targetHeight: Math.min(window.innerHeight / 2, 400),
      correctOrientation: true,
    };
    return new Promise((resolve, reject) => {
      this.camera
        .getPicture(options)
        .then(imageData => {
          console.log('getting the picture...');
          resolve('data:image/jpeg;base64,' + imageData);
        })
        .catch(err => {
          console.log('error getting picture... ' + JSON.stringify(err));
          reject(err);
        });
    });
  }

  private baseCaptureImage(): Promise<string> {
    console.log('[CameraProvider] captureImage()');
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: Math.min(window.innerWidth / 2, 400),
      targetHeight: Math.min(window.innerHeight / 2, 400),
      correctOrientation: true,
    };
    return new Promise((resolve, reject) => {
      this.camera
        .getPicture(options)
        .then(imageData => {
          console.log('getting the picture...');
          resolve('data:image/jpeg;base64,' + imageData);
        })
        .catch(err => {
          console.log('Error ' + JSON.stringify(err));
          reject(err);
        });
    });
  }
}
