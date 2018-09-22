import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ModalController,
  AlertController,
  Platform,
} from 'ionic-angular';

import { PetAlertsProvider } from '../../providers/pet-alerts/pet-alerts';
import { Alert } from '../../models/alert';
import { Pet } from '../../models/pet';
import { TranslateService } from '@ngx-translate/core';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { LoginProvider } from '../../providers/login/login';
import { DateFormatProvider } from '../../providers/date-format/date-format';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * Generated class for the MyPetsAlertListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-pets-alert-list',
  templateUrl: 'my-pets-alert-list.html',
})
export class MyPetsAlertListPage {
  //translation vars
  private alert_title: string;
  private alert_message: string;
  private alert_cancel_btn: string;
  private alert_ok_btn: string;

  private action_view_title: string;
  private action_edit_title: string;
  private action_delete_title: string;

  public alertType: string;
  public alerts: Alert[];
  public pet: Pet;
  public dateformat: string;
  constructor(
    private platform: Platform,
    private localNotifications: LocalNotifications,
    private dateFormatProvider: DateFormatProvider,
    private login: LoginProvider,
    private generalUtilities: GeneralUtilitiesProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public translate: TranslateService,
    public actionSheetCtrl: ActionSheetController,
    public petAlertsProvider: PetAlertsProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.alertType = this.navParams.get('alertType');
    this.pet = this.navParams.get('pet');

    this.dateformat = this.dateFormatProvider.getDateFormat(true, '2');

    this.listPetAlerts();

    //translations
    translate
      .get('ALERT_LIST.MENU.VIEW_ALERT')
      .subscribe((text: string) => (this.action_view_title = text));
    translate
      .get('ALERT_LIST.MENU.EDIT_ALERT')
      .subscribe((text: string) => (this.action_edit_title = text));
    translate
      .get('ALERT_LIST.MENU.DELETE_ALERT')
      .subscribe((text: string) => (this.action_delete_title = text));

    translate
      .get('ALERT_LIST.DELETE_ALERT.TITLE')
      .subscribe((text: string) => (this.alert_title = text));
    translate
      .get('ALERT_LIST.DELETE_ALERT.MESSAGE')
      .subscribe((text: string) => (this.alert_message = text));
    translate
      .get('ALERT_LIST.DELETE_ALERT.CANCEL_BTN')
      .subscribe((text: string) => (this.alert_cancel_btn = text));
    translate
      .get('ALERT_LIST.DELETE_ALERT.OK_BTN')
      .subscribe((text: string) => (this.alert_ok_btn = text));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPetsAlertListPage');
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

  listPetAlerts() {
    console.log('[MyPetsAlertListPage] listPetAlerts()');
    this.petAlertsProvider
      .listPetAlerts(this.pet, this.alertType)
      .then((alerts: Alert[]) => {
        this.alerts = alerts;
      })
      .catch(err => {
        this.generalUtilities.errorCatching(err);
      });
  }

  showAlertMenu(alert: Alert) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: this.action_view_title,
          icon: 'eye',
          handler: () => {
            console.log('View alert detail');
            this.doViewAlertDetail(alert);
          },
        },
        {
          text: this.action_edit_title,
          icon: 'create',
          handler: () => {
            console.log('Edit alert');
            this.doEditAlertDetail(alert);
          },
        },
        {
          text: this.action_delete_title,
          icon: 'trash',
          handler: () => {
            console.log('delete alert ');
            this.doDeleteAlert(alert);
          },
        },
      ],
    });
    actionSheet.present();
  }

  doAddAlert() {
    console.log('[MyPetsAlertListPage] doAddAlert()');
    let dlg = this.modalCtrl.create('MyPetsAlertDetailPage', {
      mode: 'add',
      alert: this.petAlertsProvider.getEmptyPetAlert(this.alertType),
      pet: this.pet,
    });
    dlg.onDidDismiss(alert => {
      if (alert) {
        this.listPetAlerts();
      }
    });

    dlg.present();
  }

  doViewAlertDetail(alert: Alert) {
    console.log('[MyPetsAlertListPage] doViewAlertDetail()');
    let dlg = this.modalCtrl.create('MyPetsAlertDetailPage', {
      mode: 'view',
      alert: alert,
      pet: this.pet,
    });
    dlg.onDidDismiss(alert => {
      if (alert) {
        this.listPetAlerts();
      }
    });
    dlg.present();
  }

  doEditAlertDetail(alert: Alert) {
    console.log('[MyPetsAlertListPage] doEditAlertDetail()');
    let dlg = this.modalCtrl.create('MyPetsAlertDetailPage', {
      mode: 'edit',
      alert: alert,
      pet: this.pet,
    });

    dlg.onDidDismiss(alert => {
      if (alert) {
        this.listPetAlerts();
      }
    });
    dlg.present();
  }

  doDeleteAlert(alert: Alert) {
    console.log('[MyPetsAlertListPage] doDeleteAlert()');
    let al = this.alertCtrl.create({
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
            console.log('OK clicked');
            this.petAlertsProvider
              .removePetAlert(this.pet, alert)
              .then(() => {
                console.log('alert deleted');
                if (alert.reminder_id) {
                  this.localNotifications.cancel(alert.reminder_id);
                }
                this.listPetAlerts();
              })
              .catch(err => this.generalUtilities.errorCatching(err));
          },
        },
      ],
    });
    al.present();
  }

  close() {
    this.navCtrl.pop();
  }
}
