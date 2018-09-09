import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { SOS } from '../../models/sos';

import { SosMessagesProvider } from '../../providers/sos-messages/sos-messages';
import { Message } from '../../models/message';

/**
 * Generated class for the SosMessagesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sos-messages-detail',
  templateUrl: 'sos-messages-detail.html',
})
export class SosMessagesDetailPage {
  public user1: User;
  public user2: User;
  public sos: SOS;
  public messages: Message[] = [];

  constructor(
    public msgeProvider: SosMessagesProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user1 = this.navParams.get('user1');
    this.user2 = this.navParams.get('user2');
    this.sos = this.navParams.get('sos');
    console.log(this.user1, this.user2, this.sos);
    this.messages = this.msgeProvider.getUserMessages(
      this.sos.id.toString(),
      this.user2.id.toString()
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosMessagesDetailPage');
  }

  close() {
    console.log('[SosMessagesDetailPage] close()');
    this.navCtrl.pop();
  }
}
