import { AbstractControl } from '@angular/forms';
import { SpeciesTypes } from '../../models/species-types';
import { serviceTypesList } from '../variables/variables';

import * as libphonenumber from 'google-libphonenumber';

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

export function validateServiceType() {
  return (control: AbstractControl): { [key: string]: any } => {
    let input = control.value;
    let type = serviceTypesList.find(element => {
      return element == input;
    });
    if (type === undefined) {
      return { invalid: true };
    }
    return null;
  };
}

export function validatePhoneNumber() {
  return (control: AbstractControl): { [key: string]: any } => {
    let input = control.value;
    let isValid: boolean;
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    try {
      let phoneNumber = phoneUtil.parse(input);
      //let region = phoneUtil.getRegionCodeForNumber(phoneNumber);
      isValid = phoneUtil.isValidNumber(phoneNumber);
    } catch (e) {
      //console.log(e.message);
      isValid = false;
    }
    if (isValid) {
      return null;
    } else {
      return { invalid: true };
    }
  };
}
