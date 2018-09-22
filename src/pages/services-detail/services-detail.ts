import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  FabContainer,
  NavParams,
  ViewController,
} from 'ionic-angular';

import { Service } from '../../models/service';
import {
  validateServiceType,
  validatePhoneNumber,
} from '../../shared/form-validators/custom-form-validation-functions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { SocialMediaTypes } from '../../models/social-media-types';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { SavedServicesProvider } from '../../providers/services/saved';
import { createSocialMediaGroup } from '../../shared/functions/social-media-format';
import { serviceTypesList } from '../../shared/variables/variables';
import { CameraProvider } from '../../providers/camera/camera';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the ServicesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services-detail',
  templateUrl: 'services-detail.html',
})
export class ServicesDetailPage {
  public service: Service;
  public mode: string = 'view';
  public serviceDetailForm: FormGroup;
  public smT: SocialMediaTypes[];
  public serviceTypes: string[];
  public errorMessages: object;

  @ViewChild('fab')
  fab: FabContainer;

  constructor(
    private cameraProvider: CameraProvider,
    private login: LoginProvider,
    private savedServiceProvider: SavedServicesProvider,
    private viewCtrl: ViewController,
    private generalUtilities: GeneralUtilitiesProvider,
    private smTypes: SocialMediaTypesProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.mode = this.navParams.get('mode');
    this.service = this.navParams.get('service');
    this.smT = this.smTypes.getSocialMediaTypes();
    this.serviceTypes = serviceTypesList;
    this.initServiceDetailForm();
    this.initErrorMessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesDetailPage');
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

  initServiceDetailForm() {
    this.serviceDetailForm = this.formBuilder.group({
      business_name: [
        this.service.business_name,
        [Validators.required, Validators.minLength(3)],
      ],
      type: [this.service.type, [Validators.required, validateServiceType()]],
      phone: [this.service.phone, [Validators.required, validatePhoneNumber()]],
      address: [this.service.address || '', [Validators.maxLength(150)]],
      notes: [this.service.notes || '', [Validators.maxLength(500)]],
      social_media: this.formBuilder.group(
        createSocialMediaGroup(this.smT, this.service.social_media)
      ),
    });
  }

  initErrorMessages() {
    const erBase: string = 'SERVICE_DETAIL.ERROR_MESSAGES.';
    this.errorMessages = {
      business_name: [
        { type: 'required', message: `${erBase}SERVICEBUSINESSNAME.REQUIRED` },
        {
          type: 'minlength',
          message: `${erBase}SERVICEBUSINESSNAME.MINLENGTH`,
        },
      ],
      type: [
        { type: 'required', message: `${erBase}SERVICETYPE.REQUIRED` },
        { type: 'invalid', message: `${erBase}SERVICETYPE.INVALID` },
      ],
      phone: [
        { type: 'required', message: `${erBase}SERVICEPHONE.REQUIRED` },
        { type: 'invalid', message: `${erBase}SERVICEPHONE.INVALID` },
      ],
      address: [
        { type: 'maxlength', message: `${erBase}SERVICEADDRESS.MAXLENGTH` },
      ],
      notes: [
        { type: 'maxlength', message: `${erBase}SERVICENOTES.MAXLENGTH` },
      ],
    };
  }

  selectAvatar() {
    console.log('[MyPetsProfilePage] selectAvatar()');
    this.fab.close();
    this.cameraProvider
      .selectImage()
      .then((url: string) => {
        console.log('[MyPetsProfilePage] selectAvatar() RESPONSE OK ' + url);
        //this.test = this.sanitizer.bypassSecurityTrustUrl(url);
        this.service.image = url;
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  captureAvatar() {
    console.log('[MyPetsProfilePage] captureAvatar()');
    this.fab.close();
    this.cameraProvider
      .captureImage()
      .then((url: string) => {
        this.service.image = url;
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  close() {
    console.log('[ServiceDetailPage] close()');
    this.viewCtrl.dismiss();
  }

  doSaveChanges() {
    let values = this.serviceDetailForm.value;
    if (this.serviceDetailForm.valid) {
      let updatedService: Service;

      //delete all the social media that hs not being set.
      for (const socialMedia in values.social_media) {
        console.log('socialmedia iterator', socialMedia);
        if (values.social_media[socialMedia] === '') {
          delete values.social_media[socialMedia];
        }
      }
      if (Object.keys(values.social_media).length === 0) {
        delete values.social_media;
      }

      //CREATE updated service
      updatedService = Object.assign({}, this.service, values);

      //database
      if (this.mode === 'add') {
        this.savedServiceProvider
          .addService(updatedService)
          .then((service: Service) => {
            console.log('service has been created successfully');
            this.viewCtrl.dismiss(service);
          })
          .catch(err => {
            console.log('service create error');
            this.generalUtilities.errorCatching(err);
          });
      } else if (this.mode === 'edit') {
        this.savedServiceProvider
          .updateService(updatedService)
          .then((service: Service) => {
            console.log('service has been updated successfully');
            this.viewCtrl.dismiss(service);
          })
          .catch(err => {
            console.log('service update error');
            this.generalUtilities.errorCatching(err);
          });
      }
    }
  }

  edit() {
    this.mode = 'edit';
  }
}
