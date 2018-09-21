import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  ModalController,
  AlertController,
} from 'ionic-angular';

import { SavedServicesProvider } from '../../providers/services/saved';
import { SearchServicesProvider } from '../../providers/services/search';
import { Service } from '../../models/service';
import {
  serviceTypesList,
  locationTypesList,
} from '../../shared/variables/variables';
import { TranslateService } from '@ngx-translate/core';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the ServicesMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services-main',
  templateUrl: 'services-main.html',
})
export class ServicesMainPage {
  //translation vars
  private alert_title: string;
  private alert_message: string;
  private alert_cancel_btn: string;
  private alert_ok_btn: string;

  private action_view_title: string;
  private action_edit_title: string;
  private action_delete_title: string;

  public serviceSection: string;
  public serviceSearchType: string;
  public serviceLocationType: string;
  public location: string;

  public serviceTypesList = serviceTypesList;
  public locationTypesList = locationTypesList;

  public savedServices: Service[];
  public foundServices: Service[];

  constructor(
    private generalUtilities: GeneralUtilitiesProvider,
    private login: LoginProvider,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    public searchProvider: SearchServicesProvider,
    public savedProvider: SavedServicesProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.serviceSection = 'saved';
    this.serviceSearchType = 'veterinary_care';
    this.serviceLocationType = 'current';
    this.location = '';

    //translations
    translate
      .get('SERVICES_MAIN.MENU.VIEW_SERVICE')
      .subscribe((text: string) => (this.action_view_title = text));
    translate
      .get('SERVICES_MAIN.MENU.EDIT_SERVICE')
      .subscribe((text: string) => (this.action_edit_title = text));
    translate
      .get('SERVICES_MAIN.MENU.DELETE_SERVICE')
      .subscribe((text: string) => (this.action_delete_title = text));

    translate
      .get('SERVICES_MAIN.DELETE_ALERT.TITLE')
      .subscribe((text: string) => (this.alert_title = text));
    translate
      .get('SERVICES_MAIN.DELETE_ALERT.MESSAGE')
      .subscribe((text: string) => (this.alert_message = text));
    translate
      .get('SERVICES_MAIN.DELETE_ALERT.CANCEL_BTN')
      .subscribe((text: string) => (this.alert_cancel_btn = text));
    translate
      .get('SERVICES_MAIN.DELETE_ALERT.OK_BTN')
      .subscribe((text: string) => (this.alert_ok_btn = text));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesMainPage');
    this.listSavedServices();
    this.findServices();
  }

  ionViewCanEnter() {
    console.log('ionViewCanEnter ' + this.login.isLoggedIn());
    let canEnter: boolean;
    this.login
      .isLoggedIn()
      .then((value: boolean) => {
        canEnter = value;
      })
      .catch(err => {
        canEnter = false;
      });

    return canEnter;
  }

  listSavedServices() {
    console.log('[ServicesMainPage] listSavedServices');
    this.savedProvider
      .listServices()
      .then((services: Service[]) => {
        this.savedServices = services;
      })
      .catch(err => {
        this.generalUtilities.errorCatching(err);
      });
  }

  //TODO
  findServices() {
    console.log('[ServicesMainPage] findServices');
    console.log(
      this.serviceSearchType,
      this.serviceLocationType,
      this.location
    );
    this.foundServices = this.searchProvider.findServices(
      this.serviceSearchType,
      this.serviceLocationType,
      this.location
    );
  }

  showServiceMenu(service: Service) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: this.action_view_title,
          icon: 'eye',
          handler: () => {
            console.log('View service detail');
            this.doViewServiceDetail(service);
          },
        },
        {
          text: this.action_edit_title,
          icon: 'create',
          handler: () => {
            console.log('Edit service detail');
            this.doEditServiceDetail(service);
          },
        },
        {
          text: this.action_delete_title,
          icon: 'trash',
          handler: () => {
            console.log('delete service ');
            this.doDeleteService(service);
          },
        },
      ],
    });
    actionSheet.present();
  }

  doAddService() {
    console.log('[ServicesMainPage] doAddService()');
    let dlg = this.modalCtrl.create('ServicesDetailPage', {
      mode: 'add',
      service: this.savedProvider.getEmptyService(),
    });
    dlg.onDidDismiss(service => {
      if (service) {
        this.listSavedServices();
      }
    });
    dlg.present();
  }

  doViewServiceDetail(service: Service) {
    console.log('[ServicesMainPage] doViewServiceDetail()');
    let dlg = this.modalCtrl.create('ServicesDetailPage', {
      mode: 'view',
      service: service,
    });
    dlg.onDidDismiss(service => {
      if (service) {
        this.listSavedServices();
      }
    });
    dlg.present();
  }

  doEditServiceDetail(service: Service) {
    console.log('[ServicesMainPage] doEditServiceDetail()');
    let dlg = this.modalCtrl.create('ServicesDetailPage', {
      mode: 'edit',
      service: service,
    });

    dlg.onDidDismiss(service => {
      if (service) {
        this.listSavedServices();
      }
    });
    dlg.present();
  }

  doDeleteService(service: Service) {
    console.log('[ServicesMainPage] doDeleteService()');
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
            console.log('OK clicked');
            this.savedProvider
              .removeService(service)
              .then(() => {
                console.log('service removed');
                this.listSavedServices();
              })
              .catch(err => this.generalUtilities.errorCatching(err));
          },
        },
      ],
    });
    alert.present();
  }
}
