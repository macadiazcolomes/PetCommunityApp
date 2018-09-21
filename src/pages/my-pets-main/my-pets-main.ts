import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ActionSheetController,
  AlertController,
} from 'ionic-angular';

import { PetsProvider } from '../../providers/pets/pets';
import { Pet } from '../../models/pet';
import { TranslateService } from '@ngx-translate/core';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the MyPetsMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-pets-main',
  templateUrl: 'my-pets-main.html',
})
export class MyPetsMainPage {
  public myPets: Pet[];

  //translation vars
  private alert_title: string;
  private alert_message: string;
  private alert_cancel_btn: string;
  private alert_ok_btn: string;

  private action_view_title: string;
  private action_edit_title: string;
  private action_delete_title: string;

  constructor(
    private login: LoginProvider,
    private generalUtilities: GeneralUtilitiesProvider,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private pets: PetsProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    //translations
    translate
      .get('PET.MENU.VIEW_PROFILE')
      .subscribe((text: string) => (this.action_view_title = text));
    translate
      .get('PET.MENU.EDIT_PROFILE')
      .subscribe((text: string) => (this.action_edit_title = text));
    translate
      .get('PET.MENU.DELETE_PROFILE')
      .subscribe((text: string) => (this.action_delete_title = text));
    translate
      .get('PET.DELETE_ALERT.TITLE')
      .subscribe((text: string) => (this.alert_title = text));
    translate
      .get('PET.DELETE_ALERT.MESSAGE')
      .subscribe((text: string) => (this.alert_message = text));
    translate
      .get('PET.DELETE_ALERT.CANCEL_BTN')
      .subscribe((text: string) => (this.alert_cancel_btn = text));
    translate
      .get('PET.DELETE_ALERT.OK_BTN')
      .subscribe((text: string) => (this.alert_ok_btn = text));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPetsMainPage');
    this.listPets();
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

  listPets() {
    console.log('[MyPetsMainPage] listPets()');
    this.pets
      .listPets()
      .then((pets: Pet[]) => {
        this.myPets = pets;
      })
      .catch(err => {
        this.generalUtilities.errorCatching(err);
        console.log('Error listPets', err);
      });
  }

  getAge(birtthay: Date): number {
    return this.pets.getAge(birtthay);
  }

  showPetMenu(pet: Pet) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: this.action_view_title,
          icon: 'eye',
          handler: () => {
            console.log('View pet profile');
            this.doViewPetProfile(pet);
          },
        },
        {
          text: this.action_edit_title,
          icon: 'create',
          handler: () => {
            console.log('Edit profile');
            this.doEditPetProfile(pet);
          },
        },
        {
          text: this.action_delete_title,
          icon: 'trash',
          handler: () => {
            console.log('delete profile');
            this.doDeleteProfile(pet);
          },
        },
      ],
    });
    actionSheet.present();
  }

  doAddPet() {
    console.log('[MyPetsMainPage] doAddPet()');
    let dlg = this.modalCtrl.create('MyPetsProfilePage', {
      mode: 'add',
      pet: this.pets.getEmptyPet(),
    });
    dlg.onDidDismiss(pet => {
      if (pet) {
        this.listPets();
      }
    });

    dlg.present();
  }

  doViewPetProfile(pet: Pet) {
    console.log('[MyPetsMainPage] doViewPetProfile()');
    let dlg = this.modalCtrl.create('MyPetsProfilePage', {
      mode: 'view',
      pet: pet,
    });
    dlg.onDidDismiss(pet => {
      if (pet) {
        this.listPets();
      }
    });
    dlg.present();
  }

  doEditPetProfile(pet: Pet) {
    console.log('[MyPetsMainPage] doEditPetProfile()');
    let dlg = this.modalCtrl.create('MyPetsProfilePage', {
      mode: 'edit',
      pet: pet,
    });

    dlg.onDidDismiss(pet => {
      if (pet) {
        this.listPets();
      }
    });
    dlg.present();
  }

  doDeleteProfile(pet: Pet) {
    console.log('[MyPetsMainPage] doDeleteEditProfile()');
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
            this.pets
              .removePet(pet)
              .then(() => {
                console.log('pet deleted');
                this.listPets();
              })
              .catch(err => this.generalUtilities.errorCatching(err));
          },
        },
      ],
    });
    alert.present();
  }

  showAlertList(pet: Pet, type: string) {
    let dlg = this.modalCtrl.create('MyPetsAlertListPage', {
      alertType: type,
      pet: pet,
    });
    dlg.onDidDismiss(() => {
      this.listPets();
    });
    dlg.present();
  }
}
