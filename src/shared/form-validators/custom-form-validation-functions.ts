import { AbstractControl } from '@angular/forms';
import { SpeciesTypes } from '../../models/species-types';

export function validateEqualsTo(fieldName: string) {
  return (control: AbstractControl): { [key: string]: any } => {
    let input = control.value;

    let isValid = control.root.value[fieldName] == input;
    if (!isValid) {
      return { mismatch: { isValid } };
    }
    return null;
  };
}

//TODO: validate city with  https://ionicframework.com/docs/native/native-geocoder/
//Mabye is not necesary to ask for country, if the city exists, I could get the country internally

export function validateCity() {
  return (control: AbstractControl): { [key: string]: any } => {
    let input = control.value;
    return null;
  };
}

export function validateSpecies(speciesList: SpeciesTypes[]) {
  return (control: AbstractControl): { [key: string]: any } => {
    let input = control.value;
    let specie = speciesList.find(element => {
      return element.code == input;
    });
    if (specie === undefined) {
      return { invalid: true };
    }
    return null;
  };
}

export function validateGender(genderList: Array<string>) {
  return (control: AbstractControl): { [key: string]: any } => {
    let input = control.value;
    let gender = genderList.find(element => {
      return element == input;
    });
    if (gender === undefined) {
      return { invalid: true };
    }
    return null;
  };
}
