import { Component } from '@angular/core';
import {
  AlertController,
  ModalController,
  IonicPage,
  NavController,
  NavParams,
} from 'ionic-angular';

import { User } from '../../models/user';
import { LoginProvider } from '../../providers/login/login';

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  private rootPage: string = 'TabsMainPage';
  public user: User;

  //translation vars
  private alert_title: string;
  private alert_message: string;
  private alert_cancel_btn: string;
  private alert_ok_btn: string;

  constructor(
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private login: LoginProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user = this.login.getUser();

    //translations
    translate
      .get('MENU.DELETE_ACCOUNT_ALERT_TITLE')
      .subscribe((text: string) => (this.alert_title = text));
    translate
      .get('MENU.DELETE_ACCOUNT_ALERT_MESSAGE')
      .subscribe((text: string) => (this.alert_message = text));
    translate
      .get('MENU.DELETE_ACCOUNT_ALERT_CANCEL_BTN')
      .subscribe((text: string) => (this.alert_cancel_btn = text));
    translate
      .get('MENU.DELETE_ACCOUNT_ALERT_OK_BTN')
      .subscribe((text: string) => (this.alert_ok_btn = text));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  doExit() {
    console.log('[MenuPage] doExit()');
    this.navCtrl.setRoot('LoginPage');
  }

  doViewUser() {
    console.log('[MenuPage] doViewUser()');
    let dlg = this.modalCtrl.create('UserPage', {
      mode: 'view',
      user: this.user,
    });
    dlg.onDidDismiss(data => (this.user = this.login.getUser()));
    dlg.present();
  }

  doEditUser() {
    console.log('[MenuPage] doEditUser()');
    let dlg = this.modalCtrl.create('UserPage', {
      mode: 'edit',
      user: this.user,
    });
    dlg.onDidDismiss(data => (this.user = this.login.getUser()));
    dlg.present();
  }

  doDeleteUser() {
    console.log('[MenuPage] doDeleteUser()');
    this.deleteAlert();
  }

  deleteAlert() {
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
          handler: () => console.log('Ok clicked'),
        },
      ],
    });
    alert.present();
  }
}
