import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
/*
  Generated class for the DateFormatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateFormatProvider {
  private language: string;

  constructor(public translate: TranslateService, public http: HttpClient) {
    console.log('Hello DateFormatProvider Provider');

    this.language = this.translate.currentLang;
  }

  public getDateFormat(withTime, formatType?: string): string {
    var format;
    if (!formatType) {
      formatType = '1';
    }
    if (formatType === '1') {
      if (this.language === 'es') {
        format = 'DD/MM/YYYY';
      } else {
        format = 'MM/DD/YYYY';
      }
    } else if (formatType === '2') {
      if (this.language === 'es') {
        format = 'dd/MM/yyyy';
      } else {
        format = 'MM/dd/yyyy';
      }
    }

    if (withTime) {
      format = format + ' HH:mm';
    }
    return format;
  }
}
