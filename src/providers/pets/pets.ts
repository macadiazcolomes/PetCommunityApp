import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pet } from '../../models/pet';
import { LoginProvider } from '../login/login';
import { MONGODB_URL } from '../../providers/config';

import { socialMediaFormat } from '../../shared/functions/social-media-format';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { SocialMediaTypes } from '../../models/social-media-types';
import { User } from '../../models/user';

/*
  Generated class for the PetsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PetsProvider {
  private socialMediaTypes: SocialMediaTypes[];

  constructor(
    private SMTypesProvider: SocialMediaTypesProvider,
    public http: HttpClient,
    private login: LoginProvider
  ) {
    this.socialMediaTypes = this.SMTypesProvider.getSocialMediaTypes();
  }

  public getAge(birthday: Date): number {
    var today = new Date();
    birthday = new Date(birthday);
    var thisYear = 0;
    if (today.getMonth() < birthday.getMonth()) {
      thisYear = 1;
    } else if (
      today.getMonth() == birthday.getMonth() &&
      today.getDate() < birthday.getDate()
    ) {
      thisYear = 1;
    }
    var age = today.getFullYear() - birthday.getFullYear() - thisYear;
    return age;
  }

  addPet(pet: Pet): Promise<Pet> {
    console.log('[PetsProvider] addPet(' + JSON.stringify(pet) + ')');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/pets`;
          this.http
            .post(url, pet)
            .subscribe((pet: Pet) => resolve(pet), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  listPets(): Promise<Pet[]> {
    console.log('[PetsProvider] listPets()');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/pets`;
          this.http.get(url).subscribe(
            (pets: Pet[]) => {
              let petsObj: Pet[];
              petsObj = pets.map(pet => {
                pet.social_media = socialMediaFormat(
                  pet.social_media,
                  this.socialMediaTypes
                );
                return pet;
              });
              resolve(petsObj);
            },
            err => reject(err)
          );
        })
        .catch(err => reject(err));
    });
  }

  updatePet(pet: Pet): Promise<Pet> {
    console.log('[PetsProvider] updatePet(' + JSON.stringify(pet) + ')');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/pets/${pet.id}`;
          this.http
            .put(url, pet)
            .subscribe((pet: Pet) => resolve(pet), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  removePet(pet: Pet): Promise<void> {
    console.log('[PetsProvider] removePet(' + JSON.stringify(pet) + ')');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url = MONGODB_URL + `/protected/users/${user.id}/pets/${pet.id}`;
          this.http.delete(url).subscribe(() => resolve(), err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  getEmptyPet() {
    let pet: Pet = {
      name: '',
      species: '',
      alerts_qtys: {
        vaccines: 0,
        vet: 0,
        other: 0,
      },
    };
    pet.social_media = socialMediaFormat(
      pet.social_media,
      this.socialMediaTypes
    );
    return pet;
  }
}
