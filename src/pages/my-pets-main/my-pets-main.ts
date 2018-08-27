import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from 'ionic-angular';

import { PetsProvider } from '../../providers/pets/pets';
import { Pet } from '../../models/pet';

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
  private myPets: Pet[];

  constructor(
    private modalCtrl: ModalController,
    private pets: PetsProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPetsMainPage');
    this.listPets();
  }

  listPets() {
    console.log('[MyPetsMainPage] listPets()');
    this.myPets = this.pets.listPets().sort();
  }

  doViewPetProfile(pet: Pet) {
    console.log('[MyPetsMainPage] doViewPetProfile()');
    let dlg = this.modalCtrl.create('MyPetsProfilePage', {
      mode: 'view',
      pet: pet,
    });
    dlg.present();
  }
}
