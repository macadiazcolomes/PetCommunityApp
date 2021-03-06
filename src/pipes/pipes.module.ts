import { NgModule } from '@angular/core';
import { GenderCodePipe } from './gender-code/gender-code';
import { ServiceLocationTypeCode } from './service-location-type-code/service-location-type-code';
import { ServiceTypeCode } from './service-type-code/service-type-code';
import { AlertTypeCodePipe } from './alert-type-code/alert-type-code';
import { AlertDetailTitleCodePipe } from './alert-detail-title-code/alert-detail-title-code';
import { SosStatusCodePipe } from './sos-status-code/sos-status-code';
import { MomentPipe } from './moment/moment';
import { SpeciesCodePipe } from './species-code/species-code';
@NgModule({
  declarations: [GenderCodePipe, ServiceLocationTypeCode, ServiceTypeCode,
    AlertTypeCodePipe,
    AlertDetailTitleCodePipe,
    SosStatusCodePipe,
    MomentPipe,
    SpeciesCodePipe],
  imports: [],
  exports: [GenderCodePipe, ServiceLocationTypeCode, ServiceTypeCode,
    AlertTypeCodePipe,
    AlertDetailTitleCodePipe,
    SosStatusCodePipe,
    MomentPipe,
    SpeciesCodePipe],
})
export class PipesModule {}
