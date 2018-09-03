import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceTypeCode',
})
export class ServiceTypeCode implements PipeTransform {
  transform(value: string, ...args) {
    return 'SERVICES_MAIN.SERVICE_TYPE.' + value.toUpperCase();
  }
}
