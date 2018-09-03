import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the AlertTypeCodePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'alertTypeCode',
})
export class AlertTypeCodePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return 'PET_ALERTS.TYPE.' + value.toUpperCase();
  }
}
