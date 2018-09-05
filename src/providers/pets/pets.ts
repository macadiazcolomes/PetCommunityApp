import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pet } from '../../models/pet';
import { LoginProvider } from '../login/login';

import { socialMediaFormat } from '../../shared/functions/social-media-format';
import { SocialMediaTypesProvider } from '../../providers/social-media-types/social-media-types';
import { SocialMediaTypes } from '../../models/social-media-types';

/*
  Generated class for the PetsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PetsProvider {
  private id: number = 0;
  private pets: Pet[] = [];
  private socialMediaTypes: SocialMediaTypes[];

  private getAge = function(birthday: Date): number {
    var today = new Date();
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
  };

  constructor(
    private SMTypesProvider: SocialMediaTypesProvider,
    public http: HttpClient,
    private login: LoginProvider
  ) {
    this.socialMediaTypes = this.SMTypesProvider.getSocialMediaTypes();

    this.addPet({
      name: 'Novak',
      species: 'cat',
      breed: 'Russian Blue',
    });
    this.addPet({
      name: 'Mona',
      species: 'dog',
    });
    this.addPet({
      name: 'Maratito',
      species: 'dog',
    });
  }

  addPet(pet: Pet): Pet {
    pet.id = this.id++;
    this.pets.push(pet);
    return pet;
  }

  listPets(): Pet[] {
    return this.pets.map(pet => {
      return {
        id: pet.id,
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        social_media: socialMediaFormat(
          pet.social_media,
          this.socialMediaTypes
        ),
      };
    });
  }

  updatePet(pet: Pet): Pet {
    let index = this.pets.findIndex(_pet => _pet.id === pet.id);
    if (index !== -1) {
      this.pets[index] = pet;
      return pet;
    }
  }

  removePet(pet: Pet): boolean {
    let index = this.pets.findIndex(_pet => _pet.id === pet.id);
    if (index !== -1) this.pets.splice(index, 1);
    return index !== -1;
  }
}
