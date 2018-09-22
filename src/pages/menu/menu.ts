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
import { UsersProvider } from '../../providers/users/users';
import { TranslateService } from '@ngx-translate/core';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';

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
    private generalUtilities: GeneralUtilitiesProvider,
    private users: UsersProvider,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private login: LoginProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.login
      .getUser()
      .then((user: User) => (this.user = user))
      .catch(err => console.log(err));

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

  doLogout() {
    console.log('[MenuPage] doLogout()');
    this.login
      .logout()
      .then(() => {
        this.navCtrl.setRoot('LoginPage');
      })
      .catch(err => {
        //console.log(JSON.stringify(err));
        this.generalUtilities.errorCatching(err);
      });
  }

  doViewUser() {
    console.log('[MenuPage] doViewUser()');
    let dlg = this.modalCtrl.create('UserPage', {
      mode: 'view',
      user: this.user,
    });
    dlg.onDidDismiss(data => {
      this.login
        .getUser()
        .then((user: User) => (this.user = user))
        .catch(err => this.generalUtilities.errorCatching(err));
    });
    dlg.present();
  }

  doChangeSOSSubscription(sos_subscription: boolean) {
    if (sos_subscription !== this.user.sos_subscription) {
      console.log(
        '[MenuPage] doChangeSOSSubscription(' + sos_subscription + ')'
      );
      this.users
        .updateUserSOSSubscription(this.user.id, sos_subscription)
        .then(() => {
          console.log('sos subscription change successfully');
          this.user.sos_subscription = sos_subscription;
        })
        .catch(err => this.generalUtilities.errorCatching(err));
    }
  }

  doEditUser() {
    console.log('[MenuPage] doEditUser()');
    let dlg = this.modalCtrl.create('UserPage', {
      mode: 'edit',
      user: this.user,
    });
    dlg.onDidDismiss(data => {
      this.login
        .getUser()
        .then((user: User) => (this.user = user))
        .catch(err => this.generalUtilities.errorCatching(err));
    });
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
          handler: () => {
            console.log('Ok clicked');
            this.users
              .deleteUser(this.user)
              .then(() =>
                this.generalUtilities.presentToast(
                  'MENU.DELETE_ACCOUNT_SUCCESSFULL_MESSAGE',
                  () => {
                    this.navCtrl.setRoot('LoginPage');
                  }
                )
              )
              .catch(err => this.generalUtilities.errorCatching(err));
          },
        },
      ],
    });
    alert.present();
  }
}
