import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/pet';
import { Alert } from '../../models/alert';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { validateServiceID } from '../../shared/form-validators/custom-form-validation-functions';
import { Service } from '../../models/service';
import { SavedServicesProvider } from '../../providers/services/saved';
/**
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

  constructor(
    public savedServiceProvider: SavedServicesProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.pet = this.navParams.get('pet');
    this.alert = this.navParams.get('alert');
    this.mode = this.navParams.get('mode');

    this.serviceList = this.savedServiceProvider.listServices();

    this.initPetAlertDetailForm();
    this.initErrorMessage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPetsAlertDetailPage');
  }

  initPetAlertDetailForm() {
    this.petAlertDetailForm = this.formBuilder.group({
      alertName: [
        this.alert.name,
        [Validators.required, Validators.minLength(3)],
      ],
      alertDate: [this.alert.date, [Validators.required]],
      alertService: [this.alert.service, [validateServiceID()]],
      alertNotes: [this.alert.notes, [Validators.maxLength(500)]],
      alertReminder: [this.alert.reminder || false],
      alertReminderTime: [this.alert.reminder_time],
    });
  }

  initErrorMessage() {
    const erBase: string = 'ALERT_DETAIL.ERROR_MESSAGES.';
    this.errorMessages = {
      alertName: [
        { type: 'required', message: `${erBase}ALERTNAME.REQUIRED` },
        { type: 'minlength', message: `${erBase}ALERTNAME.MINLENGTH` },
      ],
      alertDate: [{ type: 'required', message: `${erBase}ALERTDATE.REQUIRED` }],
      alertService: [
        { type: 'invalid', message: `${erBase}ALERTSERVICE.INVALID` },
      ],
      alertNotes: [
        { type: 'maxlength', message: `${erBase}ALERTNOTES.MAXLENGTH` },
      ],
    };
  }

  close() {
    this.navCtrl.pop();
  }

  save() {}

  edit() {
    this.mode = 'edit';
  }
}
