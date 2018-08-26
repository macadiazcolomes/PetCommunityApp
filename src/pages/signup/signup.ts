import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

import { validateEqualsTo } from '../../shared/form-validators/custom-form-validation-functions';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
  private user: User;
  private signupForm: FormGroup;
  private passwordConfirm: string;
  private errorMessages: object;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user = {
      name: '',
      email: '',
      password: '',
      sos_subscription: false,
    };
    this.initSignupForm();
    this.initErrorsessages();
  }

  initSignupForm() {
    this.signupForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      userPasswordConfirm: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          validateEqualsTo('userPassword'),
        ],
      ],
    });
  }

  initErrorsessages() {
    const erBase: string = 'SIGNUP.ERROR_MESSAGES.';
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
          type: 'required',
          message: `${erBase}USERPASSWORD.REQUIRED`,
        },
        {
          type: 'minlength',
          message: `${erBase}USERPASSWORD.MINLENGTH`,
        },
      ],
      userPasswordConfirm: [
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

  close() {
    console.log('[SignupPage] close()');
    this.navCtrl.pop();
  }
}
