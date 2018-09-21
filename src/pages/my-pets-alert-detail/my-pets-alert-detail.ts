import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from 'ionic-angular';
import { Pet } from '../../models/pet';
import { Alert } from '../../models/alert';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { validateServiceID } from '../../shared/form-validators/custom-form-validation-functions';
import { Service } from '../../models/service';
import { SavedServicesProvider } from '../../providers/services/saved';
import { PetAlertsProvider } from '../../providers/pet-alerts/pet-alerts';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { DateFormatProvider } from '../../providers/date-format/date-format';
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

  constructor(
    private viewCtrl: ViewController,
    private dateFormatProvider: DateFormatProvider,
    private generalUtilities: GeneralUtilitiesProvider,
    public petsAlertProvider: PetAlertsProvider,
    public savedServiceProvider: SavedServicesProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.pet = this.navParams.get('pet');
    this.alert = this.navParams.get('alert');
    this.mode = this.navParams.get('mode');

    this.dateformat = this.dateFormatProvider.getDateFormat(true);

    this.savedServiceProvider
      .listServices()
      .then((services: Service[]) => {
        this.serviceList = services;
      })
      .catch(err => this.generalUtilities.errorCatching(err));
    this.initPetAlertDetailForm();
    this.initErrorMessage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPetsAlertDetailPage');
  }

  initPetAlertDetailForm() {
    this.petAlertDetailForm = this.formBuilder.group({
      name: [this.alert.name, [Validators.required, Validators.minLength(3)]],
      date: [this.alert.date, [Validators.required]],
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

  close() {
    this.viewCtrl.dismiss();
  }

  doSaveChanges() {
    let values = this.petAlertDetailForm.value;
    if (this.petAlertDetailForm.valid) {
      let updatedAlert: Alert;
      updatedAlert = Object.assign({}, this.alert, values);

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
          .then(pet => {
            console.log('alert updated successfully');
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
