import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  FabContainer,
} from 'ionic-angular';

import { User } from '../../models/user';
import { SocialMediaTypes } from '../../models/social-media-types';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';

import {
  validateEqualsTo,
  validateCity,
} from '../../shared/form-validators/custom-form-validation-functions';

import { createSocialMediaGroup } from '../../shared/functions/social-media-format';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocationProvider } from '../../providers/location/location';
import { CameraProvider } from '../../providers/camera/camera';
import { TranslateService } from '@ngx-translate/core';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { UsersProvider } from '../../providers/users/users';
import { LoginProvider } from '../../providers/login/login';
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

  public geoCity: string;
  public geoCountry: string;

  //translation vars
  private alert_title: string;
  private alert_message: string;
  private alert_cancel_btn: string;
  private alert_ok_btn: string;

  @ViewChild('fab')
  fab: FabContainer;

  constructor(
    private login: LoginProvider,
    private usersProvider: UsersProvider,
    private generalUtilities: GeneralUtilitiesProvider,
    private cameraProvider: CameraProvider,
    private translate: TranslateService,
    public alertCtrl: AlertController,
    private locationProvider: LocationProvider,
    private smTypes: SocialMediaTypesProvider,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    //translations
    translate
      .get('USER.CITY_ALERT_TITLE')
      .subscribe((text: string) => (this.alert_title = text));
    translate
      .get('USER.CITY_ALERT_MESSAGE')
      .subscribe((text: string) => (this.alert_message = text));
    translate
      .get('USER.CITY_ALERT_CANCEL_BTN')
      .subscribe((text: string) => (this.alert_cancel_btn = text));
    translate
      .get('USER.CITY_ALERT_OK_BTN')
      .subscribe((text: string) => (this.alert_ok_btn = text));

    this.mode = this.navParams.get('mode');
    this.user = this.navParams.get('user');

    console.log('user', this.user);

    this.smT = this.smTypes.getSocialMediaTypes();

    this.initUserProfileForm();
    this.initErrorMessages();
    this.initFormValueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');

    if (this.mode == 'edit') {
      //getting city and country
      this.getCityAndCountry();
    }
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter UserPage');
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

  initUserProfileForm() {
    this.userProfileForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.minLength(4)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      passwordConfirm: [
        '',
        [Validators.minLength(6), validateEqualsTo('password')],
      ],
      city: [this.user.city || '', [Validators.required, validateCity()]], //Once here the city and country are required values
      country: [this.user.country || '', [Validators.required]],
      social_media: this.formBuilder.group(
        createSocialMediaGroup(this.smT, this.user.social_media)
      ),
    });
    console.log('initUserProfileForm()', this.userProfileForm);
  }

  initErrorMessages() {
    const erBase: string = 'USER.ERROR_MESSAGES.';
    this.errorMessages = {
      name: [
        {
          type: 'required',
          message: `${erBase}USERNAME.REQUIRED`,
        },
        {
          type: 'minlength',
          message: `${erBase}USERNAME.MINLENGTH`,
        },
      ],
      email: [
        {
          type: 'required',
          message: `${erBase}USEREMAIL.REQUIRED`,
        },
        {
          type: 'email',
          message: `${erBase}USEREMAIL.EMAIL`,
        },
      ],
      password: [
        {
          type: 'minlength',
          message: `${erBase}USERPASSWORD.MINLENGTH`,
        },
      ],
      passwordConfirm: [
        {
          type: 'minlength',
          message: `${erBase}USERPASSWORD.MINLENGTH`,
        },
        {
          type: 'mismatch',
          message: `${erBase}USERPASSWORD.MISMATCH`,
        },
        {
          type: 'required',
          message: `${erBase}USERPASSWORD.REQUIRED`,
        },
      ],
      city: [
        {
          type: 'required',
          message: `${erBase}USERCITY.REQUIRED`,
        },
        {
          type: 'invalid',
          message: `${erBase}USERCITY.INVALID`,
        },
      ],
      country: [
        {
          type: 'required',
          message: `${erBase}USERCOUNTRY.REQUIRED`,
        },
      ],
    };
  }

  initFormValueChanges() {
    this.userProfileForm.get('password').valueChanges.subscribe(password => {
      this.userProfileForm
        .get('passwordConfirm')
        .setValidators([
          Validators.required,
          Validators.minLength(6),
          validateEqualsTo('password'),
        ]);
      this.userProfileForm.get('passwordConfirm').markAsDirty();
      this.userProfileForm.get('passwordConfirm').updateValueAndValidity();
    });
  }

  getCityAndCountry() {
    this.locationProvider
      .getCityAndCountryFromLocation()
      .then(result => {
        console.log('get city successfully');
        this.geoCity = result.city;
        this.geoCountry = result.country;

        if (!this.user.city) {
          this.userProfileForm.controls['city'].setValue(this.geoCity);
          this.userProfileForm.controls['country'].setValue(this.geoCountry);
        } else if (this.user.city !== this.geoCity) {
          //show alert asking to change city
          this.showCityAlert();
        }
      })
      .catch(err => {
        console.log('Error getting city: ' + JSON.stringify(err));
      });
  }

  showCityAlert() {
    let alert = this.alertCtrl.create({
      title: this.alert_title,
      message: this.alert_message,
      buttons: [
        {
          text: this.alert_cancel_btn,
          handler: () => console.log('Cancel clicked'),
        },
        {
          text: this.alert_ok_btn,
          handler: () => {
            console.log('Ok clicked');
            this.userProfileForm.controls['city'].setValue(this.geoCity);
            this.userProfileForm.controls['country'].setValue(this.geoCountry);
          },
        },
      ],
    });
    alert.present();
  }

  selectAvatar() {
    console.log('[UserPage] selectAvatar()');
    this.fab.close();
    this.cameraProvider
      .selectImage()
      .then((url: string) => {
        console.log('[UserPage] selectAvatar() RESPONSE OK ' + url);
        //this.test = this.sanitizer.bypassSecurityTrustUrl(url);
        this.user.avatar = url;
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  captureAvatar() {
    console.log('[UserPage] captureAvatar()');
    this.fab.close();
    this.cameraProvider
      .captureImage()
      .then((url: string) => {
        this.user.avatar = url;
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  edit() {
    this.mode = 'edit';
    this.getCityAndCountry();
  }

  doSaveChanges() {
    //clone
    let values = Object.assign({}, this.userProfileForm.value);
    //validate city if changed
    if (
      (this.user.city || '') !== values.city ||
      (this.user.country || '') !== values.country
    ) {
      let cityName = values.city + ', ' + values.country;
      this.locationProvider
        .getLocationFromCityName(cityName)
        .then(locations => {
          console.log('city and country validation ok');
        })
        .catch(err => {
          console.log('city and country invalid', err);
          this.userProfileForm.get('city').setErrors({ invalid: true });
          return;
        });
    }

    if (this.userProfileForm.valid) {
      var updatedUser: User;
      if (values.password === '') {
        delete values.password;
      }
      //this value is only needed for validation, is not a property of user. So, we delete it
      delete values.passwordConfirm;

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

      //create the updated user object with all the values...
      updatedUser = Object.assign({}, this.user, values);

      //we update the user in the database
      this.usersProvider
        .updateUser(updatedUser)
        .then((user: User) => {
          console.log('user updated succesfully');
          this.navCtrl.pop();
        })
        .catch(err => {
          console.error('user udate error', err);
          this.generalUtilities.errorCatching(err, this.userProfileForm);
        });
    }
  }

  close() {
    console.log('[UserPage] close()');
    this.navCtrl.pop();
  }
}
