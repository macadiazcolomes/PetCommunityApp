import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Pet } from '../../models/pet';
import { SocialMediaTypes } from '../../models/social-media-types';
import { SpeciesTypes } from '../../models/species-types';

import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { SpeciesTypesProvider } from '../../providers/species-types/species-types';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import {
  validateSpecies,
  validateGender,
} from '../../shared/form-validators/custom-form-validation-functions';

import { createSocialMediaGroup } from '../../shared/functions/social-media-format';

/**
 * Generated class for the MyPetsProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-pets-profile',
  templateUrl: 'my-pets-profile.html',
})
export class MyPetsProfilePage {
  public pet: Pet;
  public mode: string = 'view';
  public speciesList: SpeciesTypes[];
  public smT: SocialMediaTypes[];
  public petProfileForm: FormGroup;
  public petGenderList = ['male', 'female'];

  constructor(
    private species: SpeciesTypesProvider,
    private smTypes: SocialMediaTypesProvider,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.mode = this.navParams.get('mode');
    this.pet = this.navParams.get('pet');

    this.speciesList = this.species.getSpeciesTypes();
    this.smT = this.smTypes.getSocialMediaTypes();

    this.initPetProfileForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPetsProfilePage');
  }

  initPetProfileForm() {
    this.petProfileForm = this.formBuilder.group({
      petName: [this.pet.name, [Validators.required, Validators.minLength(3)]],
      petSpecies: [
        { value: this.pet.species, disabled: this.mode == 'view' },
        [validateSpecies(this.speciesList)],
      ],
      petBreed: [this.pet.breed || '', [Validators.minLength(3)]],
      petGender: [this.pet.gender || '', [validateGender(this.petGenderList)]],
      petColor: [this.pet.color || '', [Validators.minLength(3)]],
      petBirthday: [
        { value: this.pet.birthday || '', disabled: this.mode == 'view' },
      ],
      petNeutered: [
        { value: this.pet.neutered || false, disabled: this.mode == 'view' },
      ],
      petMicrochip: [
        this.pet.microchip || '',
        [Validators.minLength(10), Validators.maxLength(20)],
      ],
      petPermanentHome: [
        {
          value: this.pet.permanent_home || true,
          disabled: this.mode == 'view',
        },
      ],
      petPassAway: [
        { value: this.pet.pass_away || false, disabled: this.mode == 'view' },
      ],
      social_media: this.formBuilder.group(createSocialMediaGroup(this.smT)),
    });
  }

  close() {
    console.log('[MyPetsProfilePage] close()');
    this.navCtrl.pop();
  }

  save() {}

  edit() {
    this.mode = 'edit';
  }
}
