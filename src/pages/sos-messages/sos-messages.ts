import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ViewController,
} from 'ionic-angular';
import { SOS } from '../../models/sos';
import { User } from '../../models/user';

import { SosMessagesProvider } from '../../providers/sos-messages/sos-messages';
import { LoginProvider } from '../../providers/login/login';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';

/**
 * Generated class for the SosMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sos-messages',
  templateUrl: 'sos-messages.html',
})
export class SosMessagesPage {
  public sos: SOS;
  public user: User;

  public usersList: User[];

  constructor(
    private viewCtrl: ViewController,
    private generalUtilities: GeneralUtilitiesProvider,
    public modalCtrl: ModalController,
    public login: LoginProvider,
    public msgProvider: SosMessagesProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.sos = this.navParams.get('sos');
    this.login
      .getUser()
      .then((user: User) => (this.user = user))
      .catch(err => console.log(err));
    this.listUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosMessagesPage');
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
  listUsers() {
    this.msgProvider
      .getUsersList(this.sos.id)
      .then((users: User[]) => {
        this.usersList = users;
      })
      .catch(err => this.generalUtilities.errorCatching(err));
  }

  getNotReadCount(userID: string): number {
    return this.msgProvider.getUnreadCounter(this.sos.id.toString(), userID);
  }

  showDetail(helper: User) {
    console.log('[SosMessagesPage] showDetail()');
    let dlg = this.modalCtrl.create('SosMessagesDetailPage', {
      sos: this.sos,
      helper: helper,
    });
    dlg.onDidDismiss(message => {
      if (message) {
        this.listUsers();
      }
    });
    dlg.present();
  }

  close() {
    console.log('[SosMessagesPage] close()');
    //this.navCtrl.pop();
    this.viewCtrl.dismiss();
  }
}
