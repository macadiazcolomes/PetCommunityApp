import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  FabContainer,
  NavParams,
  ActionSheetController,
  ViewController,
} from 'ionic-angular';

import { SOS } from '../../models/sos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {
  validateSOSStatus,
  validatePhoneNumber,
} from '../../shared/form-validators/custom-form-validation-functions';
import { SosStatusProvider } from '../../providers/sos-status/sos-status';
import { SosProvider } from '../../providers/sos/sos';
import { LoginProvider } from '../../providers/login/login';
import { User } from '../../models/user';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { CameraProvider } from '../../providers/camera/camera';

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

  @ViewChild('fab')
  fab: FabContainer;

  constructor(
    private sosProvider: SosProvider,
    private viewCtrl: ViewController,
    private cameraProvider: CameraProvider,
    private generalUtilities: GeneralUtilitiesProvider,
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

    this.login
      .getUser()
      .then((user: User) => {
        this.user = user;
        this.isOwner = this.user.id === this.sos.userID_creator.toString();
      })
      .catch(err => this.generalUtilities.errorCatching(err));

    this.SOSStatusList = this.sosStatusProvider.getSosStatus();

    this.initSOSDetailForm();
    this.initErrorMessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosDetailPage');
  }

  ionViewCanEnter() {
    console.log('ionViewCanEnter ' + this.login.isLoggedIn());
    let canEnter: boolean;
    this.login
      .isLoggedIn()
      .then((value: boolean) => {
        canEnter = value;
      })
      .catch(err => {
        canEnter = false;
      });

    return canEnter;
  }

  initSOSDetailForm() {
    this.SOSDetailForm = this.formBuilder.group({
      short_description: [
        this.sos.short_description,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      need: [
        this.sos.need,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      status: [
        this.sos.status,
        [Validators.required, validateSOSStatus(this.SOSStatusList)],
      ],
      city: [this.sos.city],
      country: [this.sos.country],
      contact_name: [
        this.sos.contact_name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      contact_phone: [this.sos.contact_phone, [validatePhoneNumber()]],
      contact_email: [
        this.sos.contact_email,
        [Validators.required, Validators.email],
      ],
      notes: [this.sos.notes],
    });
  }

  initErrorMessages() {
    const erBase: string = 'SOS_DETAIL.ERROR_MESSAGES.';
    this.errorMessages = {
      short_description: [
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
      need: [
        { type: 'required', message: `${erBase}SOSNEED.REQUIRED` },
        { type: 'minlength', message: `${erBase}SOSNEED.MINLENGTH` },
        { type: 'maxlength', message: `${erBase}SOSNEED.MAXLENGTH` },
      ],
      status: [
        { type: 'required', message: `${erBase}SOSSTATUS.REQUIRED` },
        { type: 'invalid', message: `${erBase}SOSSTATUS.INVALID` },
      ],
      contact_name: [
        { type: 'required', message: `${erBase}SOSCONTACTNAME.REQUIRED` },
        { type: 'minlength', message: `${erBase}SOSCONTACTNAME.MINLENGTH` },
        { type: 'maxlength', message: `${erBase}SOSCONTACTNAME.MAXLENGTH` },
      ],
      contact_phone: [
        { type: 'invalid', message: `${erBase}SOSCONTACTPHONE.INVALID` },
      ],
      contact_email: [
        { type: 'required', message: `${erBase}SOSCONTACTEMAIL.REQUIRED` },
        { type: 'email', message: `${erBase}SOSCONTACTEMAIL.EMAIL` },
      ],
    };
  }

  selectAvatar() {
    console.log('[SosDetailPage] selectAvatar()');
    this.fab.close();
    this.cameraProvider
      .selectImage()
      .then((url: string) => {
        console.log('[SosDetailPage] selectAvatar() RESPONSE OK ' + url);
        //this.test = this.sanitizer.bypassSecurityTrustUrl(url);
        this.sos.image = url;
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  captureAvatar() {
    console.log('[SosDetailPage] captureAvatar()');
    this.fab.close();
    this.cameraProvider
      .captureImage()
      .then((url: string) => {
        this.sos.image = url;
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  close() {
    console.log('[SosDetailPage] close()');
    this.viewCtrl.dismiss();
  }

  doSaveChanges() {
    let values = this.SOSDetailForm.value;
    if (this.SOSDetailForm.valid) {
      let updatedSOS: SOS;

      updatedSOS = Object.assign({}, this.sos, values);
      updatedSOS.userID_creator = this.user.id;
      updatedSOS.country = this.user.country;
      updatedSOS.city = this.user.city;

      if (this.mode === 'add') {
        this.sosProvider
          .addSOS(updatedSOS)
          .then((sos: SOS) => {
            console.log('SOS has been created successfully');
            this.viewCtrl.dismiss(sos);
          })
          .catch(err => {
            console.log('Error creating SOS');
            this.generalUtilities.errorCatching(err);
          });
      } else if (this.mode === 'edit') {
        this.sosProvider
          .updateSOS(updatedSOS)
          .then((sos: SOS) => {
            console.log('SOS has been updated successfully');
            this.viewCtrl.dismiss(sos);
          })
          .catch(err => {
            console.log('Error updated SOS');
            this.generalUtilities.errorCatching(err);
          });
      }
    }
  }

  edit() {
    this.mode = 'edit';
  }
}