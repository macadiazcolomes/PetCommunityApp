import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SpeciesCodePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'speciesCode',
})
export class SpeciesCodePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return 'PET.SPECIES_TEXT.' + value.toUpperCase();
  }
}
