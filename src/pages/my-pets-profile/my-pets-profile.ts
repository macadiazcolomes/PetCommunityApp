import { Component, ViewChild } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  FabContainer,
  ViewController,
} from 'ionic-angular';

import { Pet } from '../../models/pet';
import { SocialMediaTypes } from '../../models/social-media-types';
import { SpeciesTypes } from '../../models/species-types';

import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { SpeciesTypesProvider } from '../../providers/species-types/species-types';
import { DateFormatProvider } from '../../providers/date-format/date-format';
import { PetsProvider } from '../../providers/pets/pets';
import { GeneralUtilitiesProvider } from '../../providers/general-utilities/general-utilities';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import {
  validateSpecies,
  validateGender,
} from '../../shared/form-validators/custom-form-validation-functions';

import { createSocialMediaGroup } from '../../shared/functions/social-media-format';
import { LoginProvider } from '../../providers/login/login';
import { CameraProvider } from '../../providers/camera/camera';
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
  public errorMessages: object;
  public dateformat: string;

  @ViewChild('fab')
  fab: FabContainer;

  constructor(
    private viewCtrl: ViewController,
    private generalUtilities: GeneralUtilitiesProvider,
    private petsProvider: PetsProvider,
    private cameraProvider: CameraProvider,
    private login: LoginProvider,
    private dateFormatProvider: DateFormatProvider,
    private species: SpeciesTypesProvider,
    private smTypes: SocialMediaTypesProvider,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.mode = this.navParams.get('mode');
    this.pet = this.navParams.get('pet');
    this.dateformat = this.dateFormatProvider.getDateFormat(false);

    this.speciesList = this.species.getSpeciesTypes();

    this.smT = this.smTypes.getSocialMediaTypes();

    this.initPetProfileForm();
    this.initErrorMessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPetsProfilePage');
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

  initPetProfileForm() {
    this.petProfileForm = this.formBuilder.group({
      name: [this.pet.name, [Validators.required, Validators.minLength(3)]],
      species: [
        { value: this.pet.species, disabled: this.mode == 'view' },
        [Validators.required, validateSpecies(this.speciesList)],
      ],
      breed: [this.pet.breed || '', [Validators.minLength(3)]],
      gender: [this.pet.gender || '', [validateGender(this.petGenderList)]],
      color: [this.pet.color || '', [Validators.minLength(3)]],
      birthday: [
        { value: this.pet.birthday || '', disabled: this.mode == 'view' },
      ],
      neutered: [
        { value: this.pet.neutered || false, disabled: this.mode == 'view' },
      ],
      microchip: [
        this.pet.microchip || '',
        [Validators.minLength(10), Validators.maxLength(20)],
      ],
      permanentHome: [
        {
          value: this.pet.permanent_home || true,
          disabled: this.mode == 'view',
        },
      ],
      passAway: [
        { value: this.pet.pass_away || false, disabled: this.mode == 'view' },
      ],
      social_media: this.formBuilder.group(
        createSocialMediaGroup(this.smT, this.pet.social_media)
      ),
    });
  }

  initErrorMessages() {
    const erBase: string = 'PET.ERROR_MESSAGES.';
    this.errorMessages = {
      name: [
        { type: 'required', message: `${erBase}PETNAME.REQUIRED` },
        { type: 'minlength', message: `${erBase}PETNAME.MINLENGTH` },
      ],
      species: [
        { type: 'required', message: `${erBase}PETSPECIES.REQUIRED` },
        { type: 'invalid', message: `${erBase}PETSPECIES.MINLENGTH` },
      ],
      breed: [{ type: 'minlength', message: `${erBase}PETBREED.MINLENGTH` }],
      gender: [{ type: 'invalid', message: `${erBase}PETGENDER.INVALID` }],
      color: [{ type: 'minlength', message: `${erBase}PETCOLOR.MINLENGTH` }],
      microchip: [
        { type: 'minlength', message: `${erBase}PETMICROCHIP.MINLENGTH` },
        { type: 'maxlength', message: `${erBase}PETMICROCHIP.MAXLENGTH` },
      ],
    };
  }

  selectAvatar() {
    console.log('[MyPetsProfilePage] selectAvatar()');
    this.fab.close();
    this.cameraProvider
      .selectImage()
      .then((url: string) => {
        console.log('[MyPetsProfilePage] selectAvatar() RESPONSE OK ' + url);
        //this.test = this.sanitizer.bypassSecurityTrustUrl(url);
        this.pet.avatar = url;
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  captureAvatar() {
    console.log('[MyPetsProfilePage] captureAvatar()');
    this.fab.close();
    this.cameraProvider
      .captureImage()
      .then((url: string) => {
        this.pet.avatar = url;
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  doSaveChanges() {
    let values = this.petProfileForm.value;
    if (this.petProfileForm.valid) {
      let updatedPet: Pet;

      //delete all the social media that hs not being set.
      for (const socialMedia in values.social_media) {
        console.log('socialmedia iterator', socialMedia);
        if (values.social_media[socialMedia] === '') {
          delete values.social_media[socialMedia];
        }
      }
      if (Object.keys(values.social_media).length === 0) {
        delete values.social_media;
      }

      //create the updated pet Object
      updatedPet = Object.assign({}, this.pet, values);

      //database create or update
      if (this.mode === 'add') {
        this.petsProvider
          .addPet(updatedPet)
          .then(pet => {
            console.log('pet created succesfully');
            this.viewCtrl.dismiss(pet);
          })
          .catch(err => {
            console.error('pet create error', err);
            this.generalUtilities.errorCatching(err, this.petProfileForm);
          });
      } else if (this.mode === 'edit') {
        this.petsProvider
          .updatePet(updatedPet)
          .then(pet => {
            console.log('pet updated succesfully');
            this.viewCtrl.dismiss(pet);
          })
          .catch(err => {
            console.error('pet updated error', err);
            this.generalUtilities.errorCatching(err, this.petProfileForm);
          });
      }
    }
  }

  edit() {
    this.mode = 'edit';
  }

  close() {
    console.log('[MyPetsProfilePage] close()');
    this.viewCtrl.dismiss();
  }
}
