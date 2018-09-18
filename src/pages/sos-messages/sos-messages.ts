import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from 'ionic-angular';
import { SOS } from '../../models/sos';
import { User } from '../../models/user';

import { SosMessagesProvider } from '../../providers/sos-messages/sos-messages';
import { LoginProvider } from '../../providers/login/login';

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
    this.usersList = this.msgProvider.getUsersList(this.sos.id.toString());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosMessagesPage');
  }

  getNotReadCount(userID: string): number {
    return this.msgProvider.getUnreadCounter(this.sos.id.toString(), userID);
  }

  showDetail(user: User) {
    console.log('[SosMessagesPage] showDetail()');
    let dlg = this.modalCtrl.create('SosMessagesDetailPage', {
      sos: this.sos,
      user1: this.user,
      user2: user,
    });
    dlg.present();
  }

  close() {
    console.log('[SosMessagesPage] close()');
    this.navCtrl.pop();
  }
}
