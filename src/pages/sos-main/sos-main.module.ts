import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SosMainPage } from './sos-main';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SosMainPage],
  imports: [IonicPageModule.forChild(SosMainPage), TranslateModule.forChild()],
})
export class SosMainPageModule {}
