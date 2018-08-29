import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { SocialMediaTypes } from '../../models/social-media-types';

import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';

import {
  validateEqualsTo,
  validateCity,
} from '../../shared/form-validators/custom-form-validation-functions';

import { createSocialMediaGroup } from '../../shared/functions/social-media-format';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public userProfileForm: FormGroup;
  public mode: string = 'view';
  private user: User;

  private smT: SocialMediaTypes[];
  public errorMessages: object;

  constructor(
    private smTypes: SocialMediaTypesProvider,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.mode = this.navParams.get('mode');
    this.user = this.navParams.get('user');

    this.smT = this.smTypes.getSocialMediaTypes();

    this.initUserProfileForm();
    this.initErrorMessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  initUserProfileForm() {
    this.userProfileForm = this.formBuilder.group({
      userName: [
        this.user.name,
        [Validators.required, Validators.minLength(4)],
      ],
      userEmail: [this.user.email, [Validators.required, Validators.email]],
      userPassword: ['', [Validators.minLength(6)]],
      userPasswordConfirm: [
        '',
        [Validators.minLength(6), validateEqualsTo('userPassword')],
      ],
      userCity: [this.user.city || '', [Validators.required, validateCity()]], //Once here the city and country are required values
      userCountry: [this.user.country || '', [Validators.required]],
      social_media: this.formBuilder.group(createSocialMediaGroup(this.smT)),
    });
  }

  initErrorMessages() {
    const erBase: string = 'USER.ERROR_MESSAGES.';
    this.errorMessages = {
      userName: [
        {
          type: 'required',
          message: `${erBase}USERNAME.REQUIRED`,
        },
        {
          type: 'minlength',
          message: `${erBase}USERNAME.MINLENGTH`,
        },
      ],
      userEmail: [
        {
          type: 'required',
          message: `${erBase}USEREMAIL.REQUIRED`,
        },
        {
          type: 'email',
          message: `${erBase}USEREMAIL.EMAIL`,
        },
      ],
      userPassword: [
        {
          type: 'minlength',
          message: `${erBase}USERPASSWORD.MINLENGTH`,
        },
      ],
      userPasswordConfirm: [
        {
          type: 'minlength',
          message: `${erBase}USERPASSWORD.MINLENGTH`,
        },
        {
          type: 'mismatch',
          message: `${erBase}USERPASSWORD.MISMATCH`,
        },
      ],
      userCity: [
        {
          type: 'required',
          message: `${erBase}USERCITY.REQUIRED`,
        },
        {
          type: 'invalid',
          message: `${erBase}USERCITY.INVALID`,
        },
      ],
      userCountry: [
        {
          type: 'required',
          message: `${erBase}USERCOUNTRY.REQUIRED`,
        },
      ],
    };
  }

  edit() {
    this.mode = 'edit';
  }

  close() {
    console.log('[UserPage] close()');
    this.navCtrl.pop();
  }
}
