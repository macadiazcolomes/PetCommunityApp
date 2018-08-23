import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

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
          this.validateEqualsTo('userPassword'),
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

  validateEqualsTo(fieldName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;

      let isValid = control.root.value[fieldName] == input;
      if (!isValid) {
        return { mismatch: { isValid } };
      }
      return null;
    };
  }

  close() {
    console.log('[SignupPage] close()');
    this.navCtrl.pop();
  }
}
