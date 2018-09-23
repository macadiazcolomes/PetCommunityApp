import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from 'ionic-angular';
import { Pet } from '../../models/pet';
import { Alert } from '../../models/alert';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { validateServiceID } from '../../shared/form-validators/custom-form-validation-functions';
import { Service } from '../../models/service';
import { SavedServicesProvider } from '../../providers/services/saved';
import { PetAlertsProvider } from '../../providers/pet-alerts/pet-alerts';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { DateFormatProvider } from '../../providers/date-format/date-format';
import { LoginProvider } from '../../providers/login/login';
import * as moment from 'moment';
import 'moment/locale/es';
/**
 *
 * Generated class for the MyPetsAlertDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-pets-alert-detail',
  templateUrl: 'my-pets-alert-detail.html',
})
export class MyPetsAlertDetailPage {
  public pet: Pet;
  public alert: Alert;
  public mode: string = 'view';
  public serviceList: Service[];

  public petAlertDetailForm: FormGroup;
  public errorMessages: object;
  public dateformat: string;

  public localdate: string;

  constructor(
    private login: LoginProvider,
    private viewCtrl: ViewController,
    private dateFormatProvider: DateFormatProvider,
    private generalUtilities: GeneralUtilitiesProvider,
    public petsAlertProvider: PetAlertsProvider,
    public savedServiceProvider: SavedServicesProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    console.log('constructor MyPetsAlertDetailPage');
    this.localdate = moment().format();

    this.initialization();
  }

  initialization() {
    this.pet = this.navParams.get('pet');
    this.alert = this.navParams.get('alert');
    this.mode = this.navParams.get('mode');
    console.log(
      'initialization MyPetsAlertDetailPage',
      this.pet,
      this.alert,
      this.mode
    );
    this.dateformat = this.dateFormatProvider.getDateFormat(true);

    this.savedServiceProvider
      .listServices()
      .then((services: Service[]) => {
        this.serviceList = services;
      })
      .catch(err => this.generalUtilities.errorCatching(err));
    this.initPetAlertDetailForm();
    this.initErrorMessage();
    this.initFormValueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPetsAlertDetailPage');
  }

  ionViewCanEnter() {
    console.log('ionViewCanEnter ' + this.login.isLoggedIn());
    let canEnter: boolean;
    this.login
      .isLoggedIn()
      .then((value: boolean) => {
        canEnter = value;
        if (!canEnter) {
          this.navCtrl.setRoot('LoginPage');
        }
      })
      .catch(err => {
        canEnter = false;
        this.navCtrl.setRoot('LoginPage');
      });

    return canEnter;
  }

  initPetAlertDetailForm() {
    this.petAlertDetailForm = this.formBuilder.group({
      name: [this.alert.name, [Validators.required, Validators.minLength(3)]],
      date: [moment(this.alert.date).format(), [Validators.required]],
      service: [this.alert.service, [validateServiceID()]],
      notes: [this.alert.notes, [Validators.maxLength(500)]],
      reminder: [this.alert.reminder || false],
      reminder_time: [this.alert.reminder_time],
    });
  }

  initErrorMessage() {
    const erBase: string = 'ALERT_DETAIL.ERROR_MESSAGES.';
    this.errorMessages = {
      name: [
        { type: 'required', message: `${erBase}ALERTNAME.REQUIRED` },
        { type: 'minlength', message: `${erBase}ALERTNAME.MINLENGTH` },
      ],
      date: [{ type: 'required', message: `${erBase}ALERTDATE.REQUIRED` }],
      service: [{ type: 'invalid', message: `${erBase}ALERTSERVICE.INVALID` }],
      notes: [{ type: 'maxlength', message: `${erBase}ALERTNOTES.MAXLENGTH` }],
    };
  }

  initFormValueChanges() {
    this.petAlertDetailForm.get('reminder').valueChanges.subscribe(reminder => {
      let reminder_time: AbstractControl = this.petAlertDetailForm.get(
        'reminder_time'
      );
      if (reminder) {
        if (!this.alert.reminder) {
          reminder_time.setValue(moment().format());
        }
      } else {
        reminder_time.setValue(null);
      }
      this.petAlertDetailForm.updateValueAndValidity();
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  doSaveChanges() {
    let values = this.petAlertDetailForm.value;
    console.log('antes de guardar la alerta', values);
    if (this.petAlertDetailForm.valid) {
      let updatedAlert: Alert;

      updatedAlert = Object.assign({}, this.alert, values);
      if (updatedAlert.reminder) {
        updatedAlert.reminder_id = new Date(updatedAlert.date).getTime();
      } else {
        if (updatedAlert.reminder_id) {
          delete updatedAlert.reminder_id;
        }
      }
      console.log('alerta lista para guardar', updatedAlert);

      //database
      if (this.mode === 'add') {
        this.petsAlertProvider
          .addPetAlert(this.pet, updatedAlert)
          .then(alert => {
            console.log('alert created successfully');
            this.viewCtrl.dismiss(alert);
          })
          .catch(err => this.generalUtilities.errorCatching(err));
      } else if (this.mode === 'edit') {
        this.petsAlertProvider
          .updatePetAlert(this.pet, updatedAlert)
          .then(alert => {
            console.log('alert updated successfully');
            if (updatedAlert.reminder) {
            } else if (this.alert.reminder_id) {
              //TODO CANCEL PUSH NOTIFICATION
            }

            this.viewCtrl.dismiss(alert);
          })
          .catch(err => this.generalUtilities.errorCatching(err));
      }
    }
  }

  edit() {
    this.mode = 'edit';
  }
}
