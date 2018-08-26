import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { SocialMediaTypes } from '../../models/social-media-types';

import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';

import {
  validateEqualsTo,
  validateCity,
} from '../../shared/form-validators/custom-form-validation-functions';

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
  public title: string = 'User details';
  public userProfileForm: FormGroup;
  public mode: string = 'view';
  public user: User;

  private smT: SocialMediaTypes[];

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
      social_media: this.createSocialMediaGroup(),
    });
  }

  createSocialMediaGroup() {
    let sm2 = {};
    this.smT.forEach(sm => {
      sm2[sm.name] = '';
    });
    return this.formBuilder.group(sm2);
  }

  close() {
    console.log('[UserPage] close()');
    this.navCtrl.pop();
  }
}
