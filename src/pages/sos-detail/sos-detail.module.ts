import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SosDetailPage } from './sos-detail';

import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [SosDetailPage],
  imports: [
    IonicPageModule.forChild(SosDetailPage),
    TranslateModule.forChild(),
    DirectivesModule,
    PipesModule,
  ],
})
export class SosDetailPageModule {}
