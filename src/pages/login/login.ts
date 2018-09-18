import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { LoginProvider } from '../../providers/login/login';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public errorMessages: Object;

  //test
  public test_date: Date;

  constructor(
    private generalUtilities: GeneralUtilitiesProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private login: LoginProvider
  ) {
    this.initLoginForm();
    this.initErrorMessages();

    this.test_date = new Date();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  initErrorMessages() {
    const erBase: string = 'LOGIN.ERROR_MESSAGES.';
    this.errorMessages = {
      email: [
        { type: 'required', message: `${erBase}EMAIL.REQUIRED` },
        { type: 'email', message: `${erBase}EMAIL.EMAIL` },
      ],
      password: [
        { type: 'required', message: `${erBase}PASSWORD.REQUIRED` },
        { type: 'minlength', message: `${erBase}PASSWORD.MINLENGTH` },
        { type: 'incorrect', message: `${erBase}PASSWORD.INCORRECT` }, //server side
      ],
    };
  }

  doLogin() {
    console.log('[LoginPage] doLogin()');
    let values = this.loginForm.value;
    this.login
      .login(values.email.toLowerCase(), values.password)
      .then(() => {
        this.navCtrl.setRoot('MenuPage');
      })
      .catch(err => {
        this.generalUtilities.errorCatching(err, this.loginForm);
        /*if (err.error.type) {
          if (err.error.type === 'form') {
            let control: AbstractControl = this.loginForm.get(
              err.error.control
            );
            let val: ValidationErrors = err.error.data;
            control.setErrors(val);
          } else if (err.error.type === 'toast') {
            this.presentToast(err.error.data);
          }
        }*/
      });
  }

  doSignup() {
    console.log('[LoginPage] doSignup()');
    this.navCtrl.push('SignupPage');
  }

  doForgot() {
    console.log('[LoginPage] doForgot()');
    this.navCtrl.push('ForgotPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
