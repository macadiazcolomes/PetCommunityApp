import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { validateEqualsTo } from '../../shared/form-validators/custom-form-validation-functions';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { LoginProvider } from '../../providers/login/login';
/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  public resetPassForm: FormGroup;
  public errorMessages: Object;
  public resetPassFormButtonClicked: boolean = false;

  public validateCodeForm: FormGroup;
  public errorMessagesCodeForm: object;

  public changePasswordForm: FormGroup;
  public errorMessagesPasswordForm: object;
  /*
  step1: Email,
  step2: Code,
  step3: Reset password
  */
  public step: string = 'step1';

  public userEmail: string;
  public showSpinner: boolean = false;

  constructor(
    private generalUtilities: GeneralUtilitiesProvider,
    public login: LoginProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.initResetPassForm();
    this.initErrorMessages();

    this.initValidateCodeForm();
    this.initErrorMessagesCodeForm();

    this.initChangePasswordForm();
    this.initErrorMessagesPasswordForm();
  }

  //step 1
  initResetPassForm() {
    this.resetPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  initErrorMessages() {
    const erBase: string = 'FORGOT.STEP1_ERROR_MESSAGES.';
    this.errorMessages = {
      email: [
        { type: 'required', message: `${erBase}EMAIL.REQUIRED` },
        { type: 'email', message: `${erBase}EMAIL.EMAIL` },
        { type: 'notexists', message: `${erBase}EMAIL.NOTEXISTS` }, //server side
      ],
    };
  }

  //step2
  initValidateCodeForm() {
    this.validateCodeForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });
  }

  initErrorMessagesCodeForm() {
    const erBase: string = 'FORGOT.STEP2_ERROR_MESSAGES.';
    this.errorMessagesCodeForm = {
      code: [
        { type: 'required', message: `${erBase}CODE.REQUIRED` },
        { type: 'invalid', message: `${erBase}CODE.INVALID` }, //server side
      ],
    };
  }

  //step3
  initChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
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

  initErrorMessagesPasswordForm() {
    const erBase: string = 'FORGOT.STEP3_ERROR_MESSAGES.';
    this.errorMessagesPasswordForm = {
      password: [
        { type: 'required', message: `${erBase}PASSWORD.REQUIRED` },
        { type: 'minlength', message: `${erBase}PASSWORD.MINLENGTH` },
      ],
      passwordConfirm: [
        { type: 'required', message: `${erBase}PASSWORD.REQUIRED` },
        { type: 'minlength', message: `${erBase}PASSWORD.MINLENGTH` },
        { type: 'mismatch', message: `${erBase}PASSWORD.MISMATCH` },
      ],
    };
  }

  doSendEmail() {
    this.resetPassFormButtonClicked = true;
    var userEmail: string = this.resetPassForm.value.email;
    this.showSpinner = true;
    this.login
      .forgotPasswordStep1(userEmail)
      .then(() => {
        //toast and then step 2
        this.userEmail = userEmail;
        this.showSpinner = false;
        this.generalUtilities.presentToast(
          'FORGOT.STEP1_OK_TOAST_MESSAGE',
          () => {
            this.step = 'step2';
          }
        );
      })
      .catch(err => {
        this.showSpinner = false;
        this.resetPassFormButtonClicked = false;
        this.generalUtilities.errorCatching(err, this.resetPassForm);
      });
  }

  doValidateCode() {
    var userCode: string = this.validateCodeForm.value.code;
    this.login
      .forgotPasswordStep2(this.userEmail, userCode)
      .then(() => (this.step = 'step3'))
      .catch(err =>
        this.generalUtilities.errorCatching(err, this.validateCodeForm)
      );
  }

  doChangePassword() {
    var password: string = this.changePasswordForm.value.password;
    var passwordConfirm: string = this.changePasswordForm.value.passwordConfirm;

    this.login
      .forgotPasswordStep3(password, passwordConfirm)
      .then(() => this.navCtrl.setRoot('LoginPage'))
      .catch(err =>
        this.generalUtilities.errorCatching(err, this.changePasswordForm)
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }
}
