import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

import { validateEqualsTo } from '../../shared/form-validators/custom-form-validation-functions';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { UsersProvider } from '../../providers/users/users';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private signupForm: FormGroup;
  public errorMessages: object;

  constructor(
    private generalUtilities: GeneralUtilitiesProvider,
    private usersProvider: UsersProvider,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.initSignupForm();
    this.initErrorsessages();
  }

  initSignupForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          validateEqualsTo('password'),
        ],
      ],
    });
  }

  initErrorsessages() {
    const erBase: string = 'SIGNUP.ERROR_MESSAGES.';
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
        {
          type: 'registered',
          message: `${erBase}USEREMAIL.REGISTERED`,
        },
      ],
      password: [
        {
          type: 'required',
          message: `${erBase}USERPASSWORD.REQUIRED`,
        },
        {
          type: 'minlength',
          message: `${erBase}USERPASSWORD.MINLENGTH`,
        },
      ],
      passwordConfirm: [
        {
          type: 'required',
          message: `${erBase}USERPASSWORD.REQUIRED`,
        },
        {
          type: 'minlength',
          message: `${erBase}USERPASSWORD.MINLENGTH`,
        },
        {
          type: 'mismatch',
          message: `${erBase}USERPASSWORD.MISMATCH`,
        },
      ],
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  doCreateUser() {
    if (this.signupForm.valid) {
      let values = this.signupForm.value;
      let user: User = {
        name: values.name,
        email: values.email,
        password: values.password,
        sos_subscription: false,
      };
      let pswdConfirm = {
        confirm_password: values.passwordConfirm,
      };
      this.usersProvider
        .createUser(user, pswdConfirm)
        .then(() => {
          console.log('user created successfully');
          this.generalUtilities.presentToast('SIGNUP.OK_TOAST_MESSAGE', () =>
            this.navCtrl.setRoot('LoginPage')
          );
        })
        .catch(err =>
          this.generalUtilities.errorCatching(err, this.signupForm)
        );
    }
  }

  close() {
    console.log('[SignupPage] close()');
    this.navCtrl.pop();
  }
}
