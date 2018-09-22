import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  DateTime,
  Content,
} from 'ionic-angular';
import { User } from '../../models/user';
import { SOS } from '../../models/sos';

import { SosMessagesProvider } from '../../providers/sos-messages/sos-messages';
import { Message } from '../../models/message';
import { LoginProvider } from '../../providers/login/login';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { UsersProvider } from '../../providers/users/users';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs';

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
  public user: User;
  public helper: User;
  public userSOSCreator: User;
  public sos: SOS;
  public messages: Message[] = [];
  public isOwner: boolean = false;
  public messageText: string;

  @ViewChild('textarea')
  textarea;
  @ViewChild(Content)
  content: Content;
  constructor(
    private socket: Socket,
    public viewCtrl: ViewController,
    public userProvider: UsersProvider,
    public login: LoginProvider,
    public msgeProvider: SosMessagesProvider,
    private generalUtilities: GeneralUtilitiesProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.helper = this.navParams.get('helper');
    this.sos = this.navParams.get('sos');
    this.login
      .getUser()
      .then((user: User) => {
        this.user = user;
        this.isOwner = this.sos.userID_creator === this.user.id;
      })
      .catch(err => this.generalUtilities.errorCatching(err));

    this.userProvider
      .getUser(this.sos.userID_creator)
      .then((user: User) => {
        this.userSOSCreator = user;
      })
      .catch(err => this.generalUtilities.errorCatching(err));

    console.log('helper: ' + this.helper, 'sos: ' + this.sos.id);

    this.getMessages();

    //single messages received via socket
    this.getMessagesViaSocket().subscribe((message: Message) => {
      this.messages.push(message);
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 100);
    });
  }

  getMessages() {
    this.msgeProvider
      .getUserMessages(this.sos.id, this.helper.id)
      .then((messages: Message[]) => {
        this.messages = messages;

        //conecting via socket
        this.socket.connect();
        this.socket.emit('join:room', this.sos.id);
      })
      .catch(err => this.generalUtilities.errorCatching(err));
  }
  getMessagesViaSocket() {
    let observable = new Observable(observer => {
      this.socket.on('message', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter SosMessagesDetailPage');
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 200);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SosMessagesDetailPage');
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

  doCreateMessage(): Message {
    let msje: Message = {
      sosId: this.sos.id,
      date: new Date(),
      type: this.isOwner ? 'to' : 'from',
      helperID: this.helper.id,
      message: this.messageText,
      read: false,
    };
    return msje;
  }

  doSendMessage() {
    console.log('[SosMessagesDetailPage] doSendMessage()');
    this.msgeProvider
      .sendMessage(this.sos.id, this.doCreateMessage())
      .then((message: Message) => {
        //sending socket broadcast
        this.socket.emit('message', message);
        console.log('message sent');
        this.messageText = '';
        setTimeout(() => {
          this.textarea.setFocus();
        }, 0);
        //this.getMessages();
      })
      .catch(err => this.generalUtilities.errorCatching(err));
  }

  close() {
    console.log('[SosMessagesDetailPage] close()');
    this.socket.disconnect();
    this.viewCtrl.dismiss();
  }
}
