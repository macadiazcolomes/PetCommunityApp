import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = {
      name: '',
      email: '',
      password: '',
      sos_subscription: false,
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
