import { NgModule } from '@angular/core';
import { GenderCodePipe } from './gender-code/gender-code';
import { ServiceLocationTypeCode } from './service-location-type-code/service-location-type-code';
import { ServiceTypeCode } from './service-type-code/service-type-code';
import { AlertTypeCodePipe } from './alert-type-code/alert-type-code';
@NgModule({
  declarations: [GenderCodePipe, ServiceLocationTypeCode, ServiceTypeCode,
    AlertTypeCodePipe],
  imports: [],
  exports: [GenderCodePipe, ServiceLocationTypeCode, ServiceTypeCode,
    AlertTypeCodePipe],
})
export class PipesModule {}
