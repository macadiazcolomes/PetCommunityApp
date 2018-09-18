import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetButton,
  ActionSheetController,
  ModalController,
  AlertController,
} from 'ionic-angular';

import { LoginProvider } from '../../providers/login/login';
import { SosProvider } from '../../providers/sos/sos';
import { SOS } from '../../models/sos';
import { User } from '../../models/user';

import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the SosMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sos-main',
  templateUrl: 'sos-main.html',
})
export class SosMainPage {
  public sosSection: string;

  public currentSOSList: SOS[] = [];
  public helpingOutSOSList: SOS[] = [];
  public mySOSList: SOS[] = [];

  public user: User;
  public translate: TranslateService;

  //menu titles
  private action_view_title: string;
  private action_edit_title: string;
  private action_delete_title: string;
  private action_helpout_title: string;
  private action_cancel_helpout_title: string;
  private action_messages_title: string;
  private action_mark_as_resolved_title: string;

  //alert vars
  private alert_title: string;
  private alert_message: string;
  private alert_cancel_btn: string;
  private alert_ok_btn: string;

  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public translateService: TranslateService,
    public actionSheetCtrl: ActionSheetController,
    public login: LoginProvider,
    public SOSProvider: SosProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.sosSection = 'current';
    this.login
      .getUser()
      .then((user: User) => (this.user = user))
      .catch(err => console.log(err));
    this.translate = translateService;
    //translations
    this.translate.get('SOS_MAIN.MENU.VIEW_SOS').subscribe((text: string) => {
      this.action_view_title = text;
    });
    this.translate.get('SOS_MAIN.MENU.EDIT_SOS').subscribe((text: string) => {
      this.action_edit_title = text;
    });
    this.translate.get('SOS_MAIN.MENU.DELETE_SOS').subscribe((text: string) => {
      this.action_delete_title = text;
    });
    this.translate
      .get('SOS_MAIN.MENU.HELPOUT_SOS')
      .subscribe((text: string) => {
        this.action_helpout_title = text;
      });
    this.translate
      .get('SOS_MAIN.MENU.CANCEL_HELPOUT_SOS')
      .subscribe((text: string) => {
        this.action_cancel_helpout_title = text;
      });
    this.translate
      .get('SOS_MAIN.MENU.MESSAGES_SOS')
      .subscribe((text: string) => {
        this.action_messages_title = text;
      });
    this.translate
      .get('SOS_MAIN.MENU.MARKED_AS_RESOLVED')
      .subscribe((text: string) => {
        this.action_mark_as_resolved_title = text;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosMainPage');
    this.listCurrentSOS();
    this.listHelpingOutSOS();
    this.listMySOS();

    console.log(this.helpingOutSOSList);
  }

  alertSetup(
    title: string,
    message: string,
    cancel_btn: string,
    ok_btn: string
  ) {
    this.translate.get(title).subscribe((text: string) => {
      this.alert_title = text;
    });
    this.translate.get(message).subscribe((text: string) => {
      this.alert_message = text;
    });
    this.translate.get(cancel_btn).subscribe((text: string) => {
      this.alert_cancel_btn = text;
    });
    this.translate.get(ok_btn).subscribe((text: string) => {
      this.alert_ok_btn = text;
    });
  }

  listCurrentSOS() {
    console.log('[SosMainPage] listCurrentSOS');
    this.currentSOSList = this.SOSProvider.listCurrentSOS();
  }

  listHelpingOutSOS() {
    console.log('[SosMainPage] listHelpingOutSOS');
    this.helpingOutSOSList = this.SOSProvider.listHelpingOutSOS();
  }

  listMySOS() {
    console.log('[SosMainPage] listMySOS');
    this.mySOSList = this.SOSProvider.listMySOS();
  }

  showSOSMenu(sos: SOS) {
    //button delcarations
    let viewSOSButton: ActionSheetButton = {
      text: this.action_view_title,
      icon: 'eye',
      handler: () => {
        console.log('view SOS');
        this.doViewSOSDetail(sos);
      },
    };

    let editSOSButton: ActionSheetButton = {
      text: this.action_edit_title,
      icon: 'create',
      handler: () => {
        console.log('edit SOS');
        this.doEditSOSDetail(sos);
      },
    };

    let deleteSOSButton: ActionSheetButton = {
      text: this.action_delete_title,
      icon: 'trash',
      handler: () => {
        console.log('delete SOS');
        this.doDeleteSOS(sos);
      },
    };

    let helpOutSOSButton: ActionSheetButton = {
      text: this.action_helpout_title,
      icon: 'help-buoy',
      handler: () => {
        console.log('help out SOS');
        this.doHelpOut(sos, true);
      },
    };

    let cancelHelpOutSOSButton: ActionSheetButton = {
      text: this.action_cancel_helpout_title,
      icon: 'exit',
      handler: () => {
        console.log('cancel help out SOS');
        this.doHelpOut(sos, false);
      },
    };

    let messagesSOSButton: ActionSheetButton = {
      text: this.action_messages_title,
      icon: 'mail',
      handler: () => {
        console.log('messages SOS');
        this.doShowMessages(sos);
      },
    };

    let markAsResolvedButton: ActionSheetButton = {
      text: this.action_mark_as_resolved_title,
      icon: 'checkmark',
      handler: () => {
        console.log('mark as resolved SOS');
        this.doMarkAsResolved(sos);
      },
    };

    let buttons: ActionSheetButton[] = [];

    if (
      (this.sosSection === 'current' || this.sosSection === 'mySOS') &&
      sos.userID_creator.toString() === this.user.id
    ) {
      buttons.push(viewSOSButton);
      buttons.push(editSOSButton);
      buttons.push(deleteSOSButton);
      if (sos.status === 'active') {
        buttons.push(markAsResolvedButton);
      }

      buttons.push(messagesSOSButton);
    } else if (
      this.sosSection === 'current' &&
      sos.userID_creator.toString() !== this.user.id
    ) {
      buttons.push(viewSOSButton);
      if (this.SOSProvider.isUserHelpingOut(this.user.id.toString(), sos)) {
        buttons.push(cancelHelpOutSOSButton);
      } else {
        buttons.push(helpOutSOSButton);
      }
    } else if (this.sosSection === 'helping') {
      buttons.push(viewSOSButton);
      buttons.push(messagesSOSButton);
      buttons.push(cancelHelpOutSOSButton);
    }

    let actionSheet = this.actionSheetCtrl.create({
      buttons: buttons,
    });
    actionSheet.present();
  }

  doViewSOSDetail(sos: SOS) {
    console.log('[SOSainPage] doViewSOSDetail()');
    let helpersList: User[] = this.SOSProvider.listSOShelpers(sos);
    let dlg = this.modalCtrl.create('SosDetailPage', {
      mode: 'view',
      sos: sos,
      helpersList: helpersList,
    });
    dlg.present();
  }

  doEditSOSDetail(sos: SOS) {
    console.log('[SOSainPage] doEditSOSDetail()');
    let helpersList: User[] = this.SOSProvider.listSOShelpers(sos);
    let dlg = this.modalCtrl.create('SosDetailPage', {
      mode: 'edit',
      sos: sos,
      helpersList: helpersList,
    });
    dlg.present();
  }

  doShowMessages(sos: SOS) {
    console.log('[SOSainPage] doShowMessages()');
    let dlg = this.modalCtrl.create('SosMessagesPage', {
      sos: sos,
    });
    dlg.present();
  }

  doDeleteSOS(sos: SOS) {
    console.log('[SOSainPage] doDeleteSOS()');

    this.alertSetup(
      'SOS_MAIN.DELETE_ALERT.TITLE',
      'SOS_MAIN.DELETE_ALERT.MESSAGE',
      'SOS_MAIN.DELETE_ALERT.CANCEL_BTN',
      'SOS_MAIN.DELETE_ALERT.OK_BTN'
    );

    let alert = this.alertCtrl.create({
      title: this.alert_title,
      message: this.alert_message,
      buttons: [
        {
          text: this.alert_cancel_btn,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.alert_ok_btn,
          handler: () => {
            //TODO
            console.log('OK clicked');
          },
        },
      ],
    });
    alert.present();
  }

  doHelpOut(sos: SOS, helpOut: boolean) {
    console.log('[SOSainPage] doDeleteSOS()');
    let title: string;
    if (helpOut) {
      title = 'SOS_MAIN.HELPOUT_ALERT.TITLE_YES';
    } else {
      title = 'SOS_MAIN.HELPOUT_ALERT.TITLE_NO';
    }
    this.alertSetup(
      title,
      'SOS_MAIN.HELPOUT_ALERT.MESSAGE',
      'SOS_MAIN.HELPOUT_ALERT.CANCEL_BTN',
      'SOS_MAIN.HELPOUT_ALERT.OK_BTN'
    );

    let alert = this.alertCtrl.create({
      title: this.alert_title,
      message: this.alert_message,
      buttons: [
        {
          text: this.alert_cancel_btn,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.alert_ok_btn,
          handler: () => {
            //TODO
            console.log('OK clicked');
          },
        },
      ],
    });
    alert.present();
  }

  doMarkAsResolved(sos: SOS) {
    console.log('[SOSainPage] doMarkAsResolved()');

    this.alertSetup(
      'SOS_MAIN.MARK_AS_RESOLVED_ALERT.TITLE',
      'SOS_MAIN.MARK_AS_RESOLVED_ALERT.MESSAGE',
      'SOS_MAIN.MARK_AS_RESOLVED_ALERT.CANCEL_BTN',
      'SOS_MAIN.MARK_AS_RESOLVED_ALERT.OK_BTN'
    );

    let alert = this.alertCtrl.create({
      title: this.alert_title,
      message: this.alert_message,
      buttons: [
        {
          text: this.alert_cancel_btn,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: this.alert_ok_btn,
          handler: () => {
            //TODO
            console.log('OK clicked');
          },
        },
      ],
    });
    alert.present();
  }
}
