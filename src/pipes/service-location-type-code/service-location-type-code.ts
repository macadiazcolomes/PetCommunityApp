import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceLocationTypeCode',
})
export class ServiceLocationTypeCode implements PipeTransform {
  transform(value: string, ...args) {
    return 'SERVICES_MAIN.LOCATION_TYPE.' + value.toUpperCase();
  }
}
