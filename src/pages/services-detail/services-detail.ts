import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Service } from '../../models/service';
import {
  validateServiceType,
  validatePhoneNumber,
} from '../../shared/form-validators/custom-form-validation-functions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { SocialMediaTypes } from '../../models/social-media-types';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';

import { createSocialMediaGroup } from '../../shared/functions/social-media-format';
import { serviceTypesList } from '../../shared/variables/variables';
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

  constructor(
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

  initServiceDetailForm() {
    this.serviceDetailForm = this.formBuilder.group({
      serviceBusinessName: [
        this.service.business_name,
        [Validators.required, Validators.minLength(3)],
      ],
      serviceType: [
        this.service.type,
        [Validators.required, validateServiceType()],
      ],
      servicePhone: [
        this.service.phone,
        [Validators.required, validatePhoneNumber()],
      ],
      serviceAddress: [this.service.address || '', [Validators.maxLength(150)]],
      serviceNotes: [this.service.notes || '', [Validators.maxLength(500)]],
      social_media: this.formBuilder.group(createSocialMediaGroup(this.smT)),
    });
  }

  initErrorMessages() {
    const erBase: string = 'SERVICE_DETAIL.ERROR_MESSAGES.';
    this.errorMessages = {
      serviceBusinessName: [
        { type: 'required', message: `${erBase}SERVICEBUSINESSNAME.REQUIRED` },
        {
          type: 'minlength',
          message: `${erBase}SERVICEBUSINESSNAME.MINLENGTH`,
        },
      ],
      serviceType: [
        { type: 'required', message: `${erBase}SERVICETYPE.REQUIRED` },
        { type: 'invalid', message: `${erBase}SERVICETYPE.INVALID` },
      ],
      servicePhone: [
        { type: 'required', message: `${erBase}SERVICEPHONE.REQUIRED` },
        { type: 'invalid', message: `${erBase}SERVICEPHONE.INVALID` },
      ],
      serviceAddress: [
        { type: 'maxlength', message: `${erBase}SERVICEADDRESS.MAXLENGTH` },
      ],
      serviceNotes: [
        { type: 'maxlength', message: `${erBase}SERVICENOTES.MAXLENGTH` },
      ],
    };
  }

  close() {
    console.log('[ServiceDetailPage] close()');
    this.navCtrl.pop();
  }

  save() {}

  edit() {
    this.mode = 'edit';
  }
}
