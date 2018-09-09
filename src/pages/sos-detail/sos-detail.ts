import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
} from 'ionic-angular';

import { SOS } from '../../models/sos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  validateSOSStatus,
  validatePhoneNumber,
} from '../../shared/form-validators/custom-form-validation-functions';
import { SosStatusProvider } from '../../providers/sos-status/sos-status';
import { LoginProvider } from '../../providers/login/login';
import { User } from '../../models/user';
/**
 * Generated class for the SosDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sos-detail',
  templateUrl: 'sos-detail.html',
})
export class SosDetailPage {
  public mode: string = 'view';
  public sos: SOS;
  public SOSStatusList: string[] = [];

  public SOSDetailForm: FormGroup;
  public errorMessages: object;
  public SOSDetailSection: string = 'general';

  public SOSHelpersList: User[];
  private user: User;
  public isOwner: boolean = false;

  constructor(
    public login: LoginProvider,
    public actionSheetCtrl: ActionSheetController,
    public sosStatusProvider: SosStatusProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.mode = this.navParams.get('mode');
    this.sos = this.navParams.get('sos');
    this.SOSHelpersList = this.navParams.get('helpersList');

    this.user = login.getUser();

    this.isOwner = this.user.id === this.sos.userID_creator;

    this.SOSStatusList = this.sosStatusProvider.getSosStatus();

    this.initSOSDetailForm();
    this.initErrorMessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosDetailPage');
  }

  initSOSDetailForm() {
    this.SOSDetailForm = this.formBuilder.group({
      sosShortDescription: [
        this.sos.short_description,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      sosNeed: [
        this.sos.need,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      sosStatus: [
        this.sos.status,
        [Validators.required, validateSOSStatus(this.SOSStatusList)],
      ],
      sosCity: [this.sos.city],
      sosCountry: [this.sos.country],
      sosContactName: [
        this.sos.contact_name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      sosContactPhone: [this.sos.contact_phone, [validatePhoneNumber()]],
      sosContactEmail: [
        this.sos.contact_email,
        [Validators.required, Validators.email],
      ],
      sosNotes: [this.sos.notes],
    });
  }

  initErrorMessages() {
    const erBase: string = 'SOS_DETAIL.ERROR_MESSAGES.';
    this.errorMessages = {
      sosShortDescription: [
        { type: 'required', message: `${erBase}SOSSHORTDESCRIPTION.REQUIRED` },
        {
          type: 'minlength',
          message: `${erBase}SOSSHORTDESCRIPTION.MINLENGTH`,
        },
        {
          type: 'maxlength',
          message: `${erBase}SOSSHORTDESCRIPTION.MAXLENGTH`,
        },
      ],
      sosNeed: [
        { type: 'required', message: `${erBase}SOSNEED.REQUIRED` },
        { type: 'minlength', message: `${erBase}SOSNEED.MINLENGTH` },
        { type: 'maxlength', message: `${erBase}SOSNEED.MAXLENGTH` },
      ],
      sosStatus: [
        { type: 'required', message: `${erBase}SOSSTATUS.REQUIRED` },
        { type: 'invalid', message: `${erBase}SOSSTATUS.INVALID` },
      ],
      sosContactName: [
        { type: 'required', message: `${erBase}SOSCONTACTNAME.REQUIRED` },
        { type: 'minlength', message: `${erBase}SOSCONTACTNAME.MINLENGTH` },
        { type: 'maxlength', message: `${erBase}SOSCONTACTNAME.MAXLENGTH` },
      ],
      sosContactPhone: [
        { type: 'invalid', message: `${erBase}SOSCONTACTPHONE.INVALID` },
      ],
      sosContactEmail: [
        { type: 'required', message: `${erBase}SOSCONTACTEMAIL.REQUIRED` },
        { type: 'email', message: `${erBase}SOSCONTACTEMAIL.EMAIL` },
      ],
    };
  }

  close() {
    console.log('[SosDetailPage] close()');
    this.navCtrl.pop();
  }

  save() {}

  edit() {
    this.mode = 'edit';
  }
}
