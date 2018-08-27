import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GenderCodePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'genderCode',
})
export class GenderCodePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return 'PET.GENDER_' + value.toUpperCase();
  }
}
