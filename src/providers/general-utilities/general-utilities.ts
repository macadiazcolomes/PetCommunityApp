import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/*
  Generated class for the GeneralUtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeneralUtilitiesProvider {
  constructor(
    private translate: TranslateService,
    private toastCtrl: ToastController,
    private http: HttpClient
  ) {
    console.log('Hello GeneralUtilitiesProvider Provider');
  }

  errorCatching(err, form?: FormGroup) {
    console.log('Error!', err);
    if (!err.error) {
      this.presentToast('SERVER_ERRORS.GENERIC');
    } else if (err.error.type) {
      if (err.error.type === 'form') {
        let control: AbstractControl = form.get(err.error.control);
        let val: ValidationErrors = err.error.data;
        control.setErrors(val);
      } else if (err.error.type === 'toast') {
        this.presentToast(err.error.data);
      }
    } else {
      //console.log('Error', err.message);
      this.presentToast('SERVER_ERRORS.GENERIC');
    }
  }

  presentToast(message: string, onDidDismiss?: Function) {
    let translatedMessage: string;
    this.translate
      .get(message)
      .subscribe((text: string) => (translatedMessage = text));

    let toast = this.toastCtrl.create({
      message: translatedMessage,
      duration: 2500,
      position: 'top',
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      if (onDidDismiss) {
        onDidDismiss();
      }
    });

    toast.present();
  }
}
