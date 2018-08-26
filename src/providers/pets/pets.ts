import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pet } from '../../models/pet';
import { LoginProvider } from '../login/login';
import { SpeciesTypesProvider } from '../../providers/species-types/species-types';

/*
  Generated class for the PetsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PetsProvider {
  private id: number = 0;
  private pets: Pet[] = [];

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
    private speciesTypes: SpeciesTypesProvider,
    public http: HttpClient,
    private login: LoginProvider
  ) {
    enum species_types {
      cat = 'Cat',
      dog = 'Dog',
      other = 'Other',
    }

    this.addPet({
      name: 'Novak',
      owner: login.getUser(),
      species: species_types.cat,
    });
    this.addPet({
      name: 'Mona',
      owner: login.getUser(),
      species: species_types.dog,
    });
    this.addPet({
      name: 'Maratito',
      owner: login.getUser(),
      species: species_types.cat,
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
        owner: pet.owner,
        species: pet.species,
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
