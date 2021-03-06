import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SosMainPage } from './sos-main';

import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [SosMainPage],
  imports: [
    IonicPageModule.forChild(SosMainPage),
    TranslateModule.forChild(),
    PipesModule,
  ],
})
export class SosMainPageModule {}
