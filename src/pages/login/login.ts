import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginProvider } from '../../providers/login/login';

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
  user: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private login: LoginProvider
  ) {}

  doLogin() {
    console.log('[LoginPage] doLogin()');
    if (this.login.login(this.user, this.password)) {
      this.navCtrl.setRoot('MenuPage');
    }
  }

  signup() {
    console.log('[LoginPage] signup()');
    this.navCtrl.push('SignupPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
