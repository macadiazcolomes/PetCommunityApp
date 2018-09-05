import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the AlertDetailTitleCodePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'alertDetailTitleCode',
})
export class AlertDetailTitleCodePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return 'ALERT_DETAIL.TITLE.' + value.toUpperCase();
  }
}
