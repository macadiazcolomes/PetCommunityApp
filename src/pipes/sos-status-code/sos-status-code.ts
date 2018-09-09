import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SosStatusCodePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sosStatusCode',
})
export class SosStatusCodePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return 'SOS_STATUS.' + value.toUpperCase();
  }
}
